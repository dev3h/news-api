import { badRequest, internalServerError } from "../middlewares/handle_error";
import CompanyRequest from "../requests/CompanyRequest";
import CompanyService from "../../services/CompanyServices";

class CompanyController {
  static async getAll(req, res) {
    try {
      const response = await CompanyService.getAll(req.query);
      if (response.error === 1) return badRequest(response.mes, res);
      return res.status(200).json(response);
    } catch (error) {
      return internalServerError(res);
    }
  }

  static async create(req, res) {
    CompanyRequest(req, res, async () => {
      try {
        const response = await CompanyService.create(req.body);
        if (response.error === 1) return badRequest(response.mes, res);
        return res.status(200).json(response);
      } catch (error) {
        return internalServerError(res);
      }
    });
  }

  static async getOne(req, res) {
    try {
      const response = await CompanyService.getOne(req.params.id);
      if (response.error === 1) return badRequest(response.mes, res);
      return res.status(200).json(response);
    } catch (error) {
      return internalServerError(res);
    }
  }

  static async update(req, res) {
    CompanyRequest(req, res, async () => {
      try {
        const response = await CompanyService.update(req.params.id, req.body);
        if (response.error === 1) return badRequest(response.mes, res);
        return res.status(200).json(response);
      } catch (error) {
        return internalServerError(res);
      }
    });
  }

  static async destroy(req, res) {
    try {
      const response = await CompanyService.destroy(req.params.id);
      if (response.error === 1) return badRequest(response.mes, res);
      return res.status(200).json(response);
    } catch (error) {
      return internalServerError(res);
    }
  }
}

export default CompanyController;
