import { badRequest, internalServerError } from "../middlewares/handle_error";
import unitRequest from "../requests/unitRequest";
import UnitService from "../../services/unitServices";

class UnitController {
  // INDEX
  static async index(req, res) {
    try {
      const response = await UnitService.index(req.query);

      return res.status(200).json(response);
    } catch (error) {
      return internalServerError(res);
    }
  }

  // CREATE
  static async create(req, res) {
    unitRequest(req, res, async () => {
      try {
        const response = await UnitService.create(req.body);
        return res.status(200).json(response);
      } catch (error) {
        return internalServerError(res);
      }
    });
  }

  // SHOW
  static async show(req, res) {
    try {
      const response = await UnitService.show(req.params.id);

      return res.status(200).json(response);
    } catch (error) {
      return internalServerError(res);
    }
  }

  // UPDATE
  static async update(req, res) {
    unitRequest(req, res, async () => {
      try {
        const response = await UnitService.update(req.params.id, req.body);
        return res.status(200).json(response);
      } catch (error) {
        return internalServerError(res);
      }
    });
  }

  // DELETE
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
