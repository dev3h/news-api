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
          message: "Tên thẻ đã tồn tại",
        });
      return res.status(200).json({
        message: "Tạo thẻ thành công",
      });
    } catch (error) {
      internalServerError(error, res);
    }
  }
  static async getOne(req, res) {
    try {
      const response = await db.Tag.findByPk(req.params.id, {
        include: [
          {
            model: db.Admin,
            as: "created_by_admin",
            attributes: ["id", "username", "email"],
          },
          {
            model: db.Admin,
            as: "updated_by_admin",
            attributes: ["id", "username", "email"],
          },
        ],
      });
      if (!response)
        return res.status(404).json({
          message: "Không tìm thấy thẻ",
        });
      return res.status(200).json(response);
    } catch (error) {
      internalServerError(error, res);
    }
  }

  static async update(req, res) {
    try {
      const { id } = req.user;
      const { updated_by } = generateUpdatedBy(id);
      const response = await db.Tag.update(
        {
          ...req.body,
          slug: generateSlug(req.body.name),
          updated_by,
        },
        {
          where: { id: req.params.id },
        }
      );
      if (response[0] === 0)
        return res.status(404).json({
          message: "Không tìm thấy thẻ",
        });
      return res.status(200).json({
        message: "Cập nhật thẻ thành công",
      });
    } catch (error) {
      internalServerError(error, res);
    }
  }

  static async destroy(req, res) {
    try {
      const response = await db.Tag.destroy({
        where: { id: req.params.id },
      });
      if (response === 0)
        return res.status(404).json({
          message: "Không tìm thấy thẻ",
        });
      return res.status(200).json({
        message: "Xóa thẻ thành công",
      });
    } catch (error) {
      internalServerError(error, res);
    }
  }
}

export default TagController;
