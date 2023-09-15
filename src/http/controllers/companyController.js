import { badRequest, internalServerError } from "../middlewares/handle_error";
import CompanyRequest from "../requests/CompanyRequest";
import CompanyService from "../../services/CompanyServices";

class CompanyController {
  static async getAll(req, res) {
    try {
      const response = await CompanyService.getAll(req.query);

      return res.status(200).json(response);
    } catch (error) {
      return internalServerError(res);
    }
  }

  static async create(req, res) {
    try {
      CompanyRequest(req, res, async () => {
        try {
          const response = await CompanyService.create(req.body);
          return res.status(200).json(response);
        } catch (error) {
          return internalServerError(res);
        }
      });
    } catch (error) {
      return internalServerError(res);
    }
  }

  static async getOne(req, res) {
    try {
      const response = await CompanyService.getOne(req.params.id);

      return res.status(200).json(response);
    } catch (error) {
      return internalServerError(res);
    }
  }

  static async update(req, res) {
    try {
      CompanyRequest(req, res, () => {});

      const response = await CompanyService.update(req.params.id, req.body);

      return res.status(200).json(response);
    } catch (error) {
      return internalServerError(res);
    }
  }

  static async destroy(req, res) {
    try {
      const response = await CompanyService.destroy(req.params.id);

      return res.status(200).json(response);
    } catch (error) {
      return internalServerError(res);
    }
  }
}

export default CompanyController;
