import { badRequest, internalServerError } from "../middlewares/handle_error";
import UnitRequest from "../requests/UnitRequest";
import UnitService from "../../services/UnitServices";

class UnitController {
  static async getAll(req, res) {
    try {
      const response = await UnitService.getAll(req.query);

      return res.status(200).json(response);
    } catch (error) {
      return internalServerError(res);
    }
  }

  static async create(req, res) {
    UnitRequest(req, res, async () => {
      try {
        const response = await UnitService.create(req.body);
        return res.status(200).json(response);
      } catch (error) {
        return internalServerError(res);
      }
    });
  }

  static async getOne(req, res) {
    try {
      const response = await UnitService.getOne(req.params.id);

      return res.status(200).json(response);
    } catch (error) {
      return internalServerError(res);
    }
  }

  static async update(req, res) {
    UnitRequest(req, res, async () => {
      try {
        const response = await UnitService.update(req.params.id, req.body);
        return res.status(200).json(response);
      } catch (error) {
        return internalServerError(res);
      }
    });
  }

  static async destroy(req, res) {
    try {
      const response = await UnitService.destroy(req.params.id);

      return res.status(200).json(response);
    } catch (error) {
      return internalServerError(res);
    }
  }
}

export default UnitController;
