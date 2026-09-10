// import { badRequest, internalServerError } from "../middlewares/handle_error";
import db from "models";

import generateSlug from "helpers/generateSlug";
import {
  generateCreatedByAndUpdatedBy,
  generateUpdatedBy,
} from "helpers/generateCreatedByAndUpdatedBy";
import { internalServerError } from "helpers/generateError";
import CategoryFilter from "modelFilters/CategoryFilter";

class CategoryController {
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
      const response = await CategoryFilter.handleList(filter);
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
      const response = await db.Category.findOrCreate({
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
          message: "Tên danh mục đã tồn tại",
        });
      return res.status(200).json({
        message: "Tạo danh mục thành công",
      });
    } catch (error) {
      internalServerError(error, res);
    }
  }

  static async getOne(req, res) {
    try {
      const response = await db.Category.findByPk(req.params.id, {
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
          {
            model: db.GroupCategory,
            as: "group_category",
            attributes: ["id", "name"],
          },
        ],
      });
      if (!response)
        return res.status(404).json({
          message: "Không tìm thấy danh mục",
        });
      return res.status(200).json(response);
    } catch (error) {
      internalServerError(error, res);
    }
  }

  static async update(req, res) {
    try {
      // change this
      const { id } = req.user;
      const { updated_by } = generateUpdatedBy(id);
      const response = await db.Category.update(
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
          message: "Không tìm thấy danh mục",
        });
      return res.status(200).json({
        message: "Cập nhật danh mục thành công",
      });
    } catch (error) {
      internalServerError(error, res);
    }
  }

  static async destroy(req, res) {
    try {
      const response = await db.Category.destroy({
        where: { id: req.params.id },
      });
      if (response === 0)
        return res.status(404).json({
          message: "Không tìm thấy danh mục",
        });
      return res.status(200).json({
        message: "Xóa danh mục thành công",
      });
    } catch (error) {
      internalServerError(error, res);
    }
  }
}

export default CategoryController;
