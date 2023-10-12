// import { badRequest, internalServerError } from "../middlewares/handle_error";
import db from "models";
import GroupCategoryFilter from "modelFilters/GroupCategoryFilter";
import generateSlug from "helpers/generateSlug";
import {
  generateCreatedByAndUpdatedBy,
  generateUpdatedBy,
} from "helpers/generateCreatedByAndUpdatedBy";
import { internalServerError } from "helpers/generateError";

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
      internalServerError(error, res);
    }
  }

  static async create(req, res) {
    try {
      // change this
      const { created_by, updated_by } = generateCreatedByAndUpdatedBy(1);
      const response = await db.GroupCategory.findOrCreate({
        where: { name: req.body.name },
        defaults: {
          name: req.body.name,
          slug: generateSlug(req.body.name),
          created_by,
          updated_by,
        },
      });
      if (response[1] === false)
        return res.status(422).json({
          mes: "Tên nhóm đã tồn tại",
        });
      return res.status(200).json({
        mes: "Tạo nhóm thành công",
      });
    } catch (error) {
      internalServerError(error, res);
    }
  }

  static async getOne(req, res) {
    try {
      const response = await db.GroupCategory.findByPk(req.params.id);
      if (!response)
        return res.status(404).json({
          mes: "Không tìm thấy nhóm",
        });
      return res.status(200).json(response);
    } catch (error) {
      internalServerError(error, res);
    }
  }

  static async update(req, res) {
    try {
      // change this
      const { updated_by } = generateUpdatedBy(1);
      const response = await db.GroupCategory.update(
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
          mes: "Không tìm thấy nhóm",
        });
      return res.status(200).json({
        mes: "Cập nhật nhóm thành công",
      });
    } catch (error) {
      internalServerError(error, res);
    }
  }

  static async destroy(req, res) {
    try {
      const response = await db.GroupCategory.destroy({
        where: { id: req.params.id },
      });
      if (response === 0)
        return res.status(404).json({
          mes: "Không tìm thấy nhóm",
        });
      return res.status(200).json({
        mes: "Xóa nhóm thành công",
      });
    } catch (error) {
      return internalServerError(error, res);
    }
  }
}

export default GroupCategoryController;
