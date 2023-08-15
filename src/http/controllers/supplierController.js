import { badRequest, internalServerError } from "../middlewares/handle_error";
import supplierRequest from "../requests/supplierRequest";
import SupplierService from "../../services/supplierServices";

class SupplierController {
  // INDEX
  static async index(req, res) {
    try {
      const response = await SupplierService.index(req.query);

      return res.status(200).json(response);
    } catch (error) {
      return internalServerError(res);
    }
  }

  // CREATE
  static async create(req, res) {
    try {
      supplierRequest(req, res, () => {});
      const response = await SupplierService.create(req.body);
      return res.status(200).json(response);
    } catch (error) {
      return internalServerError(res);
    }
  }

  // SHOW
  static async show(req, res) {
    try {
      const response = await SupplierService.show(req.params.id);

      return res.status(200).json(response);
    } catch (error) {
      return internalServerError(res);
    }
  }

  // UPDATE
  static async update(req, res) {
    try {
      supplierRequest(req, res, () => {});

      const response = await SupplierService.update(req.params.id, req.body);

      return res.status(200).json(response);
    } catch (error) {
      return internalServerError(res);
    }
  }

  // DELETE
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
