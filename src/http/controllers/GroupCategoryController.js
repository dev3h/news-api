// import { badRequest, internalServerError } from "../middlewares/handle_error";
import GroupCategoryFilter from "../../modelFilters/GroupCategoryFilter";

class GroupCategoryController {
  static async getAll(req, res) {
    try {
      const {
        search = "",
        sortBy = "id",
        sortType = "ASC",
        page = 1,
        flimit = 10,
      } = req.query;
      console.log(page);
      const filter = {
        search,
        sortBy,
        sortType,
        page,
        flimit,
      };
      const response = await GroupCategoryFilter.handleList(filter);
      return res.status(200).json(response);
    } catch (error) {
      return res.status(500).json({
        mes: error.message,
      });
    }
  }

  static async create(req, res) {
    try {
      const response = await CompanyService.create(req.body);
      if (response.error === 1) return badRequest(response.mes, res);
      return res.status(200).json(response);
    } catch (error) {
      return internalServerError(res);
    }
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
    try {
      const response = await CompanyService.update(req.params.id, req.body);
      if (response.error === 1) return badRequest(response.mes, res);
      return res.status(200).json(response);
    } catch (error) {
      return internalServerError(res);
    }
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

export default GroupCategoryController;
