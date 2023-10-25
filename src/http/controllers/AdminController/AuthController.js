import { badRequest, internalServerError } from "http/middlewares/handle_error";
import AuthService from "services/AuthServices";
import { generateToken, generateRefreshToken } from "helpers/jwt";

class AuthController {
  static async login(req, res) {
    try {
      const admin = await db.Admin.findOne({
        where: { username: req.body?.username },
        raw: true,
      });

      const { id, password, refreshToken, ...rest } = admin;

      const comparePassword = await bcrypt.compare(req.body?.password, password);
      const accessToken = comparePassword ? generateToken(id) : null;

      const newRefreshToken = comparePassword ? generateRefreshToken(id) : null;
      if (refreshToken) {
        await db.Admin.update({ refresh_token: newRefreshToken }, { where: { id } });
      }
      if (newRefreshToken)
        res.cookie("refreshToken", newRefreshToken, {
          httpOnly: true,
          maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
        });
      if (!accessToken) return badRequest("Wrong password", res);
      return res.status(200).json({
        accessToken,
        newRefreshToken,
        data: rest,
        message: "Login success",
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

export default AuthController;
