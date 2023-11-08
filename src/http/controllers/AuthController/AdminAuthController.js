import db from "models";
import bcrypt from "bcryptjs";
import { badRequest, internalServerError } from "helpers/generateError";
import { generateToken, generateRefreshToken } from "helpers/jwt";
import RoleSysEnum from "enums/RoleSysEnum";
import jwt from "jsonwebtoken";
import { verifyAccessToken } from "../../middlewares/verifyToken";

class AdminAuthController {
  static async login(req, res) {
    try {
      const admin = await db.Admin.findOne({
        where: { username: req.body?.username },
        raw: true,
      });
      if (!admin) return badRequest(new Error("Username không tồn tại"), res);

      const { id, password, role, ...rest } = admin;

      const comparePassword = await bcrypt.compare(req.body?.password, password);
      const accessToken = comparePassword ? generateToken({ id, role }) : null;

      const newRefreshToken = comparePassword ? generateRefreshToken(id) : null;

      await db.Admin.update({ refresh_token: newRefreshToken }, { where: { id } });

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
      const response = await db.Admin.findOne({
        where: {
          id,
          refresh_token: cookie.refreshToken,
        },
        raw: true,
      });
      if (!response) return badRequest(new Error("Refresh token không tồn tại"), res);
      await db.Admin.update({ refresh_token: null }, { where: { id } });

      res.clearCookie("refreshToken", "", {
        httpOnly: true,
        secure: true,
      });
      return res.status(200).json({
        message: "Logout thành công",
      });
    } catch (error) {
      return internalServerError(error, res);
    }
  }
  static async checkRole(req, res) {
    try {
      const { role } = req.user;
      const roleName = RoleSysEnum.getRoleSysName(role);
      return res.status(200).json({
        role_id: role,
        role_name: roleName,
      });
    } catch (error) {
      return internalServerError(error, res);
    }
  }
  static async getCurrent(req, res) {
    try {
      const { id } = req.user;
      const user = await db.Admin.findOne({
        where: { id },
        raw: true,
      });
      if (!user) return badRequest(new Error("Không tìm thấy user"), res);
      return res.status(200).json({
        data: {
          ...user,
          role: {
            role_id: user.role,
            role_name: RoleSysEnum.getRoleSysName(user.role),
          },
        },
      });
    } catch (error) {
      return internalServerError(error, res);
    }
  }
}

export default AdminAuthController;
