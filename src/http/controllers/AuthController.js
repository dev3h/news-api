import { badRequest, internalServerError } from "../middlewares/handle_error";
import AuthRequest from "../requests/AuthRequest";
import AuthService from "../../services/AuthServices";

class AuthController {
  static async login(req, res) {
    try {
      AuthRequest(req, res, async () => {
        try {
          const response = await AuthService.login(req.body);
          return res.status(200).json(response);
        } catch (error) {
          return internalServerError(res);
        }
      });
    } catch (error) {
      return internalServerError(res);
    }
  }
}

export default AuthController;
