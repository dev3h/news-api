import { badRequest, internalServerError } from "../middlewares/handle_error";
import OriginRequest from "../requests/OriginRequest";
import OriginService from "../../services/OriginServices";

class OriginController {
  static async getAll(req, res) {
    try {
      const response = await OriginService.getAll(req.query);
      if (response.error === 1) return badRequest(response.mes, res);
      return res.status(200).json(response);
    } catch (error) {
      return internalServerError(res);
    }
  }

  static async create(req, res) {
    OriginRequest(req, res, async () => {
      try {
        const response = await OriginService.create(req.body);
        if (response.error === 1) return badRequest(response.mes, res);
        return res.status(200).json(response);
      } catch (error) {
        return internalServerError(res);
      }
    });
  }

  static async getOne(req, res) {
    try {
      const response = await OriginService.getOne(req.params.id);
      if (response.error === 1) return badRequest(response.mes, res);
      return res.status(200).json(response);
    } catch (error) {
      return internalServerError(res);
    }
  }

  static async update(req, res) {
    OriginRequest(req, res, async () => {
      try {
        const response = await OriginService.update(req.params.id, req.body);
        if (response.error === 1) return badRequest(response.mes, res);
        return res.status(200).json(response);
      } catch (error) {
        return internalServerError(res);
      }
    });
  }

  static async destroy(req, res) {
    try {
      const response = await OriginService.destroy(req.params.id);
      if (response.error === 1) return badRequest(response.mes, res);
      return res.status(200).json(response);
    } catch (error) {
      return internalServerError(res);
    }
  }
}

export default OriginController;
