import { badRequest, internalServerError } from "../middlewares/handle_error";
import SupplierRequest from "../requests/SupplierRequest";
import SupplierService from "../../services/SupplierServices";

class SupplierController {
  static async getAll(req, res) {
    try {
      const response = await SupplierService.getAll(req.query);

      return res.status(200).json(response);
    } catch (error) {
      return internalServerError(res);
    }
  }

  static async create(req, res) {
    SupplierRequest(req, res, async () => {
      try {
        const response = await SupplierService.create(req.body);
        return res.status(200).json(response);
      } catch (error) {
        return internalServerError(res);
      }
    });
  }

  static async getOne(req, res) {
    try {
      const response = await SupplierService.getOne(req.params.id);

      return res.status(200).json(response);
    } catch (error) {
      return internalServerError(res);
    }
  }

  static async update(req, res) {
    SupplierRequest(req, res, async () => {
      try {
        const response = await SupplierService.update(req.params.id, req.body);

        return res.status(200).json(response);
      } catch (error) {
        return internalServerError(res);
      }
    });
  }

  static async destroy(req, res) {
    try {
      const response = await SupplierService.destroy(req.params.id);

      return res.status(200).json(response);
    } catch (error) {
      return internalServerError(res);
    }
  }
}

export default SupplierController;
