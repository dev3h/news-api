import AdminAuthService from "http/services/AuthService/AdminAuthService";
import { internalServerError, badRequest } from "helpers/generateError";
import { JWT_CONFIG } from "config/jwt";


class AdminAuthController {
  static async login(req, res) {
    try {
      const result = await AdminAuthService.login(req, res);

      res.cookie("refreshToken", result.refreshToken, {
        httpOnly: true,
        maxAge: JWT_CONFIG.refreshTokenExpiresIn
      });

      return res.status(200).json({
        accessToken: result.accessToken,
        message: result.message,
      });
    } catch (error) {
      internalServerError(error, res);
    }
  }
  static async refreshAccessToken(req, res) {
    try {
      const cookie = req.cookies;
      if (!cookie && !cookie.refreshToken) {
        badRequest(new Error("Không có refreshToken trong cookie"), res);
      }
      const result = await AdminAuthService.refreshAccessToken(cookie?.refreshToken);
      return res.status(200).json(result);
    } catch (error) {
      if (error.name === 'JsonWebTokenError' || error.name === 'TokenExpiredError') {
        return badRequest(new Error("Refresh token không hợp lệ"), res);
      }
      internalServerError(error, res);
    }
  }
  static async logout(req, res) {
   try {
    const cookie = req.cookies;
    if (!cookie && !cookie.refreshToken) {
      badRequest(new Error("Không có refreshToken trong cookie"), res);
    }
    const result = AdminAuthService.logout(cookie?.refreshToken);

    res.clearCookie("refreshToken", "", {
        httpOnly: true,
        secure: true,
    });

    return res.status(200).json(result);
   } catch (error) {
      if (error.name === 'JsonWebTokenError' || error.name === 'TokenExpiredError') {
        return badRequest(new Error("Refresh token không hợp lệ"), res);
      }
      internalServerError(error, res);
    }
  }
  static async checkRole(req, res) {
    try {
      const { role } = req.user;
      const result = await AdminAuthService.checkRole(role);
      return res.status(200).json(result);
    } catch (error) {
      internalServerError(error, res);
    }
  }
  static async getCurrent(req, res) {
    try {
      const { id } = req.user;
      const userData = await AdminAuthService.getCurrent(id);
      return res.status(200).json({
        data: userData,
      });
    } catch (error) {
      internalServerError(error, res);
    }
  }
}

export default AdminAuthController;
