import db from "models";
import bcrypt from "bcryptjs";
import AuthService from "services/AuthServices";
import { badRequest, internalServerError } from "helpers/generateError";
import { generateToken, generateRefreshToken } from "helpers/jwt";
import RoleSysEnum from "enums/RoleSysEnum";

class AdminAuthController {
  static async login(req, res) {
    try {
      const admin = await db.Admin.findOne({
        where: { username: req.body?.username },
        raw: true,
      });
      if (!admin) return badRequest(new Error("Username không tồn tại"), res);

      const { id, password, refreshToken, role, ...rest } = admin;

      const comparePassword = await bcrypt.compare(req.body?.password, password);
      const accessToken = comparePassword ? generateToken({ id, role }) : null;

      const newRefreshToken = comparePassword ? generateRefreshToken(id) : null;
      if (refreshToken) {
        await db.Admin.update({ refresh_token: newRefreshToken }, { where: { id } });
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
      internalServerError(error, res);
    }
  }
  static async refreshAccessToken(req, res) {
    try {
      const cookie = req.cookies;
      if (!cookie && !cookie.refreshToken)
        return badRequest(res, "Refresh token is required");
      const response = await AuthService.refreshAccessToken(cookie.refreshToken);
      if (response.error === 1) return badRequest(response.mes, res);
      return res.status(200).json(response);
    } catch (error) {
      return internalServerError(res);
    }
  }
  static async logout(req, res) {
    try {
      const cookie = req.cookies;
      if (!cookie && !cookie.refreshToken)
        return badRequest(res, "Refresh token is required");
      const response = await AuthService.logout(cookie.refreshToken);
      if (response.error === 1) return badRequest(response.mes, res);
      res.clearCookie("refreshToken", "", {
        httpOnly: true,
        secure: true,
      });
      return res.status(200).json(response);
    } catch (error) {
      return internalServerError(res);
    }
  }
}

export default AdminAuthController;
