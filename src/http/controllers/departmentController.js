import { badRequest, internalServerError } from "../middlewares/handle_error";
import DepartmentRequest from "../requests/DepartmentRequest";
import DepartmentService from "../../services/DepartmentServices";

class DepartmentController {
  static async getAll(req, res) {
    try {
      const response = await DepartmentService.getAll(req.query);

      return res.status(200).json(response);
    } catch (error) {
      return internalServerError(res);
    }
  }

  static async create(req, res) {
    DepartmentRequest(req, res, async () => {
      try {
        const response = await DepartmentService.create(req.body);
        return res.status(200).json(response);
      } catch (error) {
        return internalServerError(res);
      }
    });
  }

  static async getOne(req, res) {
    try {
      const response = await DepartmentService.getOne(req.params.id);

      return res.status(200).json(response);
    } catch (error) {
      return internalServerError(res);
    }
  }

  static async update(req, res) {
    DepartmentRequest(req, res, async () => {
      try {
        const response = await DepartmentService.update(req.params.id, req.body);

        return res.status(200).json(response);
      } catch (error) {
        return internalServerError(res);
      }
    });
  }

  static async destroy(req, res) {
    try {
      const response = await DepartmentService.destroy(req.params.id);

      return res.status(200).json(response);
    } catch (error) {
      return internalServerError(res);
    }
  }
}

export default DepartmentController;
