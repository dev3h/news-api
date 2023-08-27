import { badRequest, internalServerError } from "../middlewares/handle_error";
import originRequest from "../requests/originRequest";
import OriginService from "../../services/OriginServices";

class OriginController {
  // INDEX
  static async index(req, res) {
    try {
      const response = await OriginService.index(req.query);

      return res.status(200).json(response);
    } catch (error) {
      return internalServerError(res);
    }
  }

  // CREATE
  static async create(req, res) {
    originRequest(req, res, async () => {
      try {
        const response = await OriginService.create(req.body);
        return res.status(200).json(response);
      } catch (error) {
        return internalServerError(res);
      }
    });
  }

  // SHOW
  static async show(req, res) {
    try {
      const response = await OriginService.show(req.params.id);

      return res.status(200).json(response);
    } catch (error) {
      return internalServerError(res);
    }
  }

  // UPDATE
  static async update(req, res) {
    originRequest(req, res, async () => {
      try {
        const response = await OriginService.update(req.params.id, req.body);

        return res.status(200).json(response);
      } catch (error) {
        return internalServerError(res);
      }
    });
  }

  // DELETE
  static async destroy(req, res) {
    try {
      const response = await OriginService.destroy(req.params.id);

      return res.status(200).json(response);
    } catch (error) {
      return internalServerError(res);
    }
  }
}

export default OriginController;
