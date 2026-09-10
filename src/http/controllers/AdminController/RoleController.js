// import { badRequest, internalServerError } from "../middlewares/handle_error";
import { internalServerError } from "helpers/generateError";
import RoleSysEnum from "enums/RoleSysEnum";

class RoleController {
  static async getAll(req, res) {
    try {
      const response = RoleSysEnum.getAll();
      return res.status(200).json(response);
    } catch (error) {
      internalServerError(error, res);
    }
  }
}

export default RoleController;
