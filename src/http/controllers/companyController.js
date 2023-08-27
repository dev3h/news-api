import { badRequest, internalServerError } from "../middlewares/handle_error";
import companyRequest from "../requests/companyRequest";
import CompanyService from "../../services/CompanyServices";

class CompanyController {
  // INDEX
  static async index(req, res) {
    try {
      const response = await CompanyService.index(req.query);

      return res.status(200).json(response);
    } catch (error) {
      return internalServerError(res);
    }
  }

  // CREATE
  static async create(req, res) {
    try {
      companyRequest(req, res, async () => {
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

  // SHOW
  static async show(req, res) {
    try {
      const response = await CompanyService.show(req.params.id);

      return res.status(200).json(response);
    } catch (error) {
      return internalServerError(res);
    }
  }

  // UPDATE
  static async update(req, res) {
    try {
      companyRequest(req, res, () => {});

      const response = await CompanyService.update(req.params.id, req.body);

      return res.status(200).json(response);
    } catch (error) {
      return internalServerError(res);
    }
  }

  // DELETE
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
