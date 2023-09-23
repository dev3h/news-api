import db from "models";
import { Op } from "sequelize";
class AuthService {
  static async login(data) {
    try {
      const response = await db.User.findOne({
        where: { email: data.email },
        raw: true,
      });

      return {
        error: response[1] ? 0 : 1,
        mes: response[1] ? "create success" : "create failed",
      };
    } catch (error) {
      throw error;
    }
  }
}
export default AuthService;
