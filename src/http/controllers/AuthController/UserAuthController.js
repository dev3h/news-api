import db from "models";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { v4 as uuidv4 } from "uuid";
import { badRequest, internalServerError } from "helpers/generateError";
import { generateToken, generateRefreshToken } from "helpers/jwt";
import { emailQueue } from "queues";
import hashPassword from "helpers/hashPassword";

class UserAuthController {
  static async register(req, res) {
    try {
      const { email, password } = req.body;
      const user = await db.User.findOne({
        where: { email },
      });
      if (user) return badRequest(new Error("Email đã tồn tại"), res);

      // lưu tạm thời thông tin đăng ký vào db
      // lưu 1 email kèm theo token vào db
      // nếu người dùng xác nhận email thì trả lại email cho người dùng ban đầu
      const token = uuidv4();
      const emailEdited = btoa(email) + "@" + token;
      const newUser = await db.User.create({
        email: emailEdited,
        password: hashPassword(password),
      });
      if (!newUser) return badRequest(new Error("Đăng ký thất bại"), res);
      const html = `<h2>Mã đăng ký: </h2> <blockquote>${token}</blockquote>`;
      const data = {
        email,
        html,
        subject: "Xác nhận đăng ký tài khoản",
      };
      try {
        await emailQueue.add(data);
      } catch (error) {
        console.error("Error sending email:", error);
        throw error;
      }
      setTimeout(async () => {
        const user = await db.User.findOne({
          where: { email: emailEdited },
        });
        if (user) {
          await user.destroy({
            // hard delete
            force: true,
          });
        }
      }, 1000 * 60 * 15); // 15p
      return res.status(200).json({
        message: "Vui lòng kiểm tra email để hoàn tất đăng ký",
      });
    } catch (error) {
      return internalServerError(error, res);
    }
  }

  static async verifyRegister(req, res) {
    try {
      const { token } = req.params;
      console.log(token);
      const notVerifyEmail = await db.User.findOne({
        where: { email: { [db.Sequelize.Op.like]: `%${token}` } },
      });
      if (!notVerifyEmail) return badRequest(new Error("Email không tồn tại"), res);
      notVerifyEmail.email = atob(notVerifyEmail?.email?.split("@")[0]);
      notVerifyEmail.email_verified_at = new Date();
      await notVerifyEmail.save();

      return res.status(200).json({
        message: "Xác minh email thành công. Vui lòng đăng nhập",
      });
    } catch (error) {
      return internalServerError(error, res);
    }
  }

  static async login(req, res) {
    try {
      const user = await db.User.findOne({
        where: { email: req.body?.email },
        raw: true,
      });
      if (!user) return badRequest(new Error("Email không tồn tại"), res);

      const { id, password, refresh_token, ...rest } = user;

      const comparePassword = await bcrypt.compare(req.body?.password, password);
      const accessToken = comparePassword ? generateToken({ id }) : null;

      const newRefreshToken = comparePassword ? generateRefreshToken(id) : null;
      await db.User.update({ refresh_token: newRefreshToken }, { where: { id } });
      if (newRefreshToken)
        res.cookie("refreshTokenUser", newRefreshToken, {
          httpOnly: true,
          maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
        });
      if (!accessToken) return badRequest(new Error("Sai mật khẩu"), res);
      return res.status(200).json({
        accessToken,
        data: {
          ...rest,
        },
        message: "Login thành công",
      });
    } catch (error) {
      return internalServerError(error, res);
    }
  }
  static async refreshAccessToken(req, res) {
    try {
      const cookie = req.cookies;
      if (!cookie && !cookie.refreshTokenUser)
        return badRequest(new Error("Không có refreshToken trong cookie"), res);
      const verifyRefreshToken = await jwt.verify(
        cookie.refreshTokenUser,
        process.env.JWT_SECRET
      );
      const response = await db.User.findOne({
        where: {
          id: verifyRefreshToken.id,
          refresh_token: cookie.refreshTokenUser,
        },
      });

      if (!response) return badRequest(new Error("Refresh token không tồn tại"), res);
      const newAccessToken = generateToken({ id: response.id });
      return res.status(200).json({
        accessToken: newAccessToken,
        message: "Refresh token thành công",
      });
    } catch (error) {
      return internalServerError(error, res);
    }
  }
  static async logout(req, res) {
    try {
      const cookie = req.cookies;
      if (!cookie && !cookie.refreshTokenUser)
        return badRequest(new Error("Không có refreshToken trong cookie"), res);
      const verifyRefreshToken = await jwt.verify(
        cookie.refreshTokenUser,
        process.env.JWT_SECRET
      );
      const { id } = verifyRefreshToken;
      const response = await db.User.findOne({
        where: {
          id,
          refresh_token: cookie.refreshTokenUser,
        },
        raw: true,
      });
      if (!response) return badRequest(new Error("Refresh token không tồn tại"), res);
      await db.User.update({ refresh_token: null }, { where: { id } });

      res.clearCookie("refreshTokenUser", "", {
        httpOnly: true,
        secure: true,
      });
      return res.status(200).json({
        message: "Logout thành công",
      });
    } catch (error) {
      return internalServerError(res);
    }
  }

  static async forgotPassword(req, res) {
    const { email } = req.query;
    if (!email) return badRequest(new Error("Cung cấp email"), res);
    const user = await db.User.findOne({ where: { email } });
    if (!user) return badRequest(new Error("Email không tồn tại"), res);
    const resetToken = user.createPasswordChangeToken();
    await user.save();

    const html = `Vui lòng click vào link để đổi mật khẩu. Link này hết hạn sau 15p: <a href=${process.env.URL_SERVER}/api/v1/user/resetpassword/${resetToken}>Click here</a>`;

    const data = {
      email,
      html,
      subject: "Đổi mật khẩu",
    };
    const rs = await sendMail(data);
    return res.status(200).json({
      success: true,
      rs,
    });
  }

  static async resetPassword(req, res) {
    const { token, password } = req.body;
    if (!token || !password) throw new Error("Please provide token and password");

    const passwordChangeToken = crypto.createHash("sha256").update(token).digest("hex");
    console.log(passwordChangeToken);
    const user = await db.User.findOne({
      passwordResetToken: passwordChangeToken,
      passwordResetExpires: { $gt: Date.now() }, // passwordResetExpires > Date.now()
    });
    if (!user) throw new Error("Invalid reset token");

    user.password = password;
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;
    user.passwordChangedAt = Date.now();
    await user.save();

    return res.status(200).json({
      success: user ? true : false,
      mes: user ? "Update password successfully" : "Update password failed",
    });
  }
}

export default UserAuthController;
