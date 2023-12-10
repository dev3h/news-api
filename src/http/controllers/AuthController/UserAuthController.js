import db from "models";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { emailQueue } from "queues";
import { Op } from "sequelize";
import crypto from "crypto";
// for production
import { atob, btoa } from "buffer";

import { badRequest, internalServerError } from "helpers/generateError";
import { generateToken, generateRefreshToken } from "helpers/jwt";
import hashPassword from "helpers/hashPassword";
import createPasswordChangeToken from "helpers/createPasswordChangeToken";
import generateCodeVerifyEmail from "helpers/generateCodeVerifyEmail";

class UserAuthController {
  static async register(req, res) {
    try {
      const { email, password, name } = req.body;
      const user = await db.User.findOne({
        where: { email },
      });
      if (user) badRequest(new Error("Email đã tồn tại"), res);
      // lưu tạm thời thông tin đăng ký vào db
      // lưu 1 email kèm theo token vào db
      // nếu người dùng xác nhận email thì trả lại email cho người dùng ban đầu
      // tạo 1 token random 4 chữ số
      const token = generateCodeVerifyEmail();
      const emailEdited = btoa(email) + "@" + token;
      const newUser = await db.User.create({
        email: emailEdited,
        password: hashPassword(password),
        name,
      });
      if (!newUser) badRequest(new Error("Đăng ký thất bại"), res);
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
        internalServerError(error, res);
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
      internalServerError(error, res);
    }
  }

  static async verifyRegister(req, res) {
    try {
      const { token } = req.params;
      const notVerifyEmail = await db.User.findOne({
        where: { email: { [Op.like]: `%${token}` } },
      });
      if (!notVerifyEmail) badRequest(new Error("Email không tồn tại"), res);
      notVerifyEmail.email = atob(notVerifyEmail?.email?.split("@")[0]);
      notVerifyEmail.email_verified_at = new Date();
      await notVerifyEmail.save();

      return res.status(200).json({
        message: "Xác minh email thành công. Vui lòng đăng nhập lại",
      });
    } catch (error) {
      internalServerError(error, res);
    }
  }

  static async login(req, res) {
    try {
      const user = await db.User.findOne({
        where: { email: req.body?.email },
        raw: true,
      });
      if (!user) badRequest(new Error("Email không tồn tại"), res);

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
      if (!accessToken) badRequest(new Error("Sai mật khẩu"), res);
      return res.status(200).json({
        accessToken,
        data: {
          ...rest,
        },
        message: "Đăng nhập thành công",
      });
    } catch (error) {
      internalServerError(error, res);
    }
  }
  static async refreshAccessToken(req, res) {
    try {
      const cookie = req.cookies;
      if (!cookie && !cookie.refreshTokenUser)
        badRequest(new Error("Không có refreshToken trong cookie"), res);
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

      if (!response) badRequest(new Error("Refresh token không tồn tại"), res);
      const newAccessToken = generateToken({ id: response.id });
      return res.status(200).json({
        accessToken: newAccessToken,
        message: "Refresh token thành công",
      });
    } catch (error) {
      internalServerError(error, res);
    }
  }
  static async logout(req, res) {
    try {
      const cookie = req.cookies;
      if (!cookie && !cookie.refreshTokenUser)
        badRequest(new Error("Không có refreshToken trong cookie"), res);
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
      if (!response) badRequest(new Error("Refresh token không tồn tại"), res);
      await db.User.update({ refresh_token: null }, { where: { id } });

      res.clearCookie("refreshTokenUser", "", {
        httpOnly: true,
        secure: true,
      });
      return res.status(200).json({
        message: "Logout thành công",
      });
    } catch (error) {
      internalServerError(error, res);
    }
  }

  static async forgotPassword(req, res) {
    const { email } = req.query;
    if (!email) badRequest(new Error("Cung cấp email"), res);
    const user = await db.User.findOne({ where: { email } });
    if (!user) badRequest(new Error("Email không tồn tại"), res);
    const resetToken = await createPasswordChangeToken(user);

    const html = `Vui lòng click vào link để đổi mật khẩu. Link này hết hạn sau 15p: <a href=${process.env.URL_CLIENT}/auth/reset-password?token=${resetToken}&email=${user.email}>Bấm vào đây</a>`;

    const data = {
      email,
      html,
      subject: "Đổi mật khẩu",
    };
    try {
      await emailQueue.add(data);
    } catch (error) {
      console.error("Error sending email:", error);
      throw error;
    }
    return res.status(200).json({
      message: "Vui lòng kiểm tra email để đổi mật khẩu",
    });
  }

  static async resetPassword(req, res) {
    try {
      const { token, password, email } = req.body;
      if (!token || !password || !email)
        badRequest(new Error("Yêu cầu cung cấp token, email và mật khẩu mới"), res);

      const passwordChangeToken = crypto.createHash("sha256").update(token).digest("hex");
      const user = await db.User.findOne({
        where: {
          email,
        },
      });
      if (!user) badRequest(new Error("Email không tồn tại"), res);
      const userWithToken = await db.User.findOne({
        where: {
          email,
          password_reset_token: passwordChangeToken,
          password_reset_token_expired_at: {
            [Op.gte]: Date.now(), // lớn hơn hoặc bằng
          },
        },
      });
      if (!userWithToken) badRequest(new Error("Token không hợp lệ hoặc hết hạn"), res);

      await user.update({
        password: hashPassword(password),
        password_reset_token: null,
        password_reset_token_expired_at: null,
        password_changed_at: Date.now(),
      });
      return res.status(200).json({
        message: "Đổi mật khẩu thành công",
      });
    } catch (error) {
      internalServerError(error, res);
    }
  }
  static async getCurrent(req, res) {
    try {
      const { id } = req.user;
      const user = await db.User.findOne({
        where: { id },
        raw: true,
      });
      if (!user) badRequest(new Error("Không tìm thấy user"), res);
      return res.status(200).json({
        data: user,
      });
    } catch (error) {
      internalServerError(error, res);
    }
  }
  static async updatePassword(req, res) {
    try {
      const { id } = req.user;
      const { password, newPassword } = req.body;
      const user = await db.User.findOne({
        where: { id },
        raw: true,
      });
      if (!user) badRequest(new Error("Không tìm thấy user"), res);
      const comparePassword = await bcrypt.compare(password, user.password);
      if (!comparePassword) badRequest(new Error("Mật khẩu cũ không đúng"), res);
      await db.User.update(
        {
          password: hashPassword(newPassword),
          password_changed_at: Date.now(),
        },
        { where: { id } }
      );
      return res.status(200).json({
        message: "Đổi mật khẩu thành công",
      });
    } catch (error) {
      internalServerError(error, res);
    }
  }
}

export default UserAuthController;
