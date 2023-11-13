// import { badRequest, internalServerError } from "../middlewares/handle_error";
import db from "models";
import TagFilter from "modelFilters/TagFilter";
import generateSlug from "helpers/generateSlug";
import {
  generateCreatedByAndUpdatedBy,
  generateUpdatedBy,
} from "helpers/generateCreatedByAndUpdatedBy";
import { internalServerError } from "helpers/generateError";

class TagController {
  static async getAll(req, res) {
    try {
      const {
        search = "",
        sortBy = "id",
        sortType = "ASC",
        page = 1,
        flimit,
      } = req.query;
      const filter = {
        search,
        sortBy,
        sortType,
        page,
        flimit,
      };
      const response = await TagFilter.handleList(filter);
      return res.status(200).json(response);
    } catch (error) {
      internalServerError(error, res);
    }
  }

  static async create(req, res) {
    try {
      // change this
      const { id } = req.user;
      const { created_by, updated_by } = generateCreatedByAndUpdatedBy(id);
      const { name } = req.body;
      const response = await db.Tag.findOrCreate({
        where: { name },
        defaults: {
          ...req.body,
          slug: generateSlug(name),
          created_by,
          updated_by,
        },
      });
      if (response[1] === false)
        return res.status(400).json({
          message: "Tên tag đã tồn tại",
        });
      return res.status(200).json({
        message: "Tạo tag thành công",
      });
    } catch (error) {
      internalServerError(error, res);
    }
  }
}

export default TagController;
