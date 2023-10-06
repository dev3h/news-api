import { badRequest, internalServerError } from "../middlewares/handle_error";
import DocumentRequest from "../requests/DocumentRequest";
import DocumentService from "../../services/DocumentServices";
import DocumentUploadRequest from "../requests/DocumentUploadRequest";

class DocumentController {
  static async getAll(req, res) {
    try {
      const response = await DocumentService.getAll(req.query);
      if (response.error === 1) return badRequest(response.mes, res);
      return res.status(200).json(response);
    } catch (error) {
      return internalServerError(res);
    }
  }

  static async create(req, res) {
    DocumentRequest(req, res, async () => {
      try {
        const response = await DocumentService.create(req.body);
        if (response.error === 1) return badRequest(response.mes, res);
        return res.status(200).json(response);
      } catch (error) {
        return internalServerError(res);
      }
    });
  }
  static async importExcel(req, res) {
    DocumentUploadRequest(req, res, async () => {
      try {
        const fileData = req.file;
        const response = await DocumentService.importExcel(fileData);
        if (response.error === 1) return badRequest(response.mes, res);
        return res.status(200).json(response);
      } catch (error) {
        return internalServerError(res);
      }
    });
  }

  static async getOne(req, res) {
    try {
      const response = await DocumentService.getOne(req.params.id);
      if (response.error === 1) return badRequest(response.mes, res);
      return res.status(200).json(response);
    } catch (error) {
      return internalServerError(res);
    }
  }

  static async update(req, res) {
    DocumentRequest(req, res, async () => {
      try {
        const fileData = req.file;
        const response = await DocumentService.update(req.body, fileData);
        if (response.error === 1) return badRequest(response.mes, res);
        return res.status(200).json(response);
      } catch (error) {
        return internalServerError(res);
      }
    });
  }

  static async destroy(req, res) {
    try {
      const response = await DocumentService.destroy(req.params.id);
      if (response.error === 1) return badRequest(response.mes, res);
      return res.status(200).json(response);
    } catch (error) {
      return internalServerError(res);
    }
  }
}

export default DocumentController;
