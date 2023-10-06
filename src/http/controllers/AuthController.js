import { badRequest, internalServerError } from "../middlewares/handle_error";
import AuthRequest from "../requests/AuthRequest";
import AuthService from "../../services/AuthServices";

class AuthController {
  static async login(req, res) {
    AuthRequest(req, res, async () => {
      try {
        const response = await AuthService.login(req.body);
        if (response.error === 1) return badRequest(response.mes, res);
        if (response.newRefreshToken)
          res.cookie("refreshToken", response.newRefreshToken, {
            httpOnly: true,
            maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
          });
        return res.status(200).json(response);
      } catch (error) {
        return internalServerError(error);
      }
    });
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

export default AuthController;
