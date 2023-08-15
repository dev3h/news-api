import { badRequest, internalServerError } from "../middlewares/handle_error";
import groupProductRequest from "../requests/groupProductRequest";
import GroupProductService from "../../services/groupProductServices";

class GroupProductController {
  // INDEX
  static async index(req, res) {
    try {
      const response = await GroupProductService.index(req.query);

      return res.status(200).json(response);
    } catch (error) {
      return internalServerError(res);
    }
  }

  // CREATE
  static async create(req, res) {
    try {
      groupProductRequest(req, res, () => {});
      const response = await GroupProductService.create(req.body);
      return res.status(200).json(response);
    } catch (error) {
      return internalServerError(res);
    }
  }

  // SHOW
  static async show(req, res) {
    try {
      const response = await GroupProductService.show(req.params.id);

      return res.status(200).json(response);
    } catch (error) {
      return internalServerError(res);
    }
  }

  // UPDATE
  static async update(req, res) {
    try {
      groupProductRequest(req, res, () => {});

      const response = await GroupProductService.update(req.params.id, req.body);

      return res.status(200).json(response);
    } catch (error) {
      return internalServerError(res);
    }
  }

  // DELETE
  static async destroy(req, res) {
    try {
      const response = await GroupProductService.destroy(req.params.id);

      return res.status(200).json(response);
    } catch (error) {
      return internalServerError(res);
    }
  }
}

export default GroupProductController;
