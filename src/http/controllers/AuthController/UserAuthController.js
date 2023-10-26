import db from "models";
import bcrypt from "bcryptjs";
import RoleSysEnum from "enums/RoleSysEnum";
import jwt from "jsonwebtoken";
import { v4 as uuidv4 } from "uuid";
import { badRequest, internalServerError } from "helpers/generateError";
import { generateToken, generateRefreshToken } from "helpers/jwt";
import { emailQueue } from "queues";

class UserAuthController {
  static async register(req, res) {
    try {
      const { email } = req.body;
      const user = await db.User.findOne({
        where: { email },
      });
      if (user) return badRequest(new Error("Email đã tồn tại"), res);

      // lưu tạm thời thông tin đăng ký vào cookie
      const token = uuidv4();
      const body = { ...req.body, token };
      res.cookie("data_register", body, {
        httpOnly: true,
        maxAge: 15 * 60 * 1000,
      });
      const html = `Vui lòng click vào link để hoàn tất đăng ký. Link này hết hạn sau 15p: <a href=${process.env.URL_SERVER}/api/v1/user/final-register/${token}>Click here</a>`;
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
      return res.status(200).json({
        message: "Vui lòng kiểm tra email để hoàn tất đăng ký",
      });
    } catch (error) {
      return internalServerError(error, res);
    }
  }

  static async login(req, res) {
    try {
      const user = await db.User.findOne({
        where: { username: req.body?.username },
        raw: true,
      });
      if (!user) return badRequest(new Error("Username không tồn tại"), res);

      const { id, password, refreshToken, role, ...rest } = user;

      const comparePassword = await bcrypt.compare(req.body?.password, password);
      const accessToken = comparePassword ? generateToken({ id, role }) : null;

      const newRefreshToken = comparePassword ? generateRefreshToken(id) : null;
      if (refreshToken) {
        await db.User.update({ refresh_token: newRefreshToken }, { where: { id } });
      }
      if (newRefreshToken)
        res.cookie("refreshToken", newRefreshToken, {
          httpOnly: true,
          maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
        });
      if (!accessToken) return badRequest(new Error("Sai mật khẩu"), res);
      return res.status(200).json({
        accessToken,
        data: {
          ...rest,
          role: {
            role_id: role,
            role_name: RoleSysEnum.getRoleSysName(role),
          },
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
      if (!cookie && !cookie.refreshToken)
        return badRequest(new Error("Không có refreshToken trong cookie"), res);
      const verifyRefreshToken = await jwt.verify(
        cookie.refreshToken,
        process.env.JWT_SECRET
      );
      const response = await db.User.findOne({
        where: {
          id: verifyRefreshToken.id,
          refresh_token: cookie.refreshToken,
        },
      });

      if (!response) return badRequest(new Error("Refresh token không tồn tại"), res);
      const newAccessToken = generateToken({ id: response.id, role: response.role });
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
      if (!cookie && !cookie.refreshToken)
        return badRequest(new Error("Không có refreshToken trong cookie"), res);
      const verifyRefreshToken = await jwt.verify(
        cookie.refreshToken,
        process.env.JWT_SECRET
      );
      const { id } = verifyRefreshToken;
      const response = await db.User.findOne({
        where: {
          id,
          refresh_token: cookie.refreshToken,
        },
        raw: true,
      });
      if (!response) return badRequest(new Error("Refresh token không tồn tại"), res);
      await db.User.update({ refresh_token: null }, { where: { id } });

      res.clearCookie("refreshToken", "", {
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
}

export default UserAuthController;
