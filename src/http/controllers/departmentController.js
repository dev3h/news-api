import { badRequest, internalServerError } from "../middlewares/handle_error";
import departmentRequest from "../requests/departmentRequest";
import DepartmentService from "../../services/departmentServices";

class DepartmentController {
  // INDEX
  static async index(req, res) {
    try {
      const response = await DepartmentService.index(req.query);

      return res.status(200).json(response);
    } catch (error) {
      return internalServerError(res);
    }
  }

  // CREATE
  static async create(req, res) {
    departmentRequest(req, res, async () => {
      try {
        const response = await DepartmentService.create(req.body);
        return res.status(200).json(response);
      } catch (error) {
        return internalServerError(res);
      }
    });
  }

  // SHOW
  static async show(req, res) {
    try {
      const response = await DepartmentService.show(req.params.id);

      return res.status(200).json(response);
    } catch (error) {
      return internalServerError(res);
    }
  }

  // UPDATE
  static async update(req, res) {
    departmentRequest(req, res, async () => {
      try {
        const response = await DepartmentService.update(req.params.id, req.body);

        return res.status(200).json(response);
      } catch (error) {
        return internalServerError(res);
      }
    });
  }

  // DELETE
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
