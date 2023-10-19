// import { badRequest, internalServerError } from "../middlewares/handle_error";
import db from "models";

import generateSlug from "helpers/generateSlug";
import {
  generateCreatedByAndUpdatedBy,
  generateUpdatedBy,
} from "helpers/generateCreatedByAndUpdatedBy";
import { internalServerError } from "helpers/generateError";
import PostFilter from "modelFilters/PostFilter";

class PostController {
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
      const response = await PostFilter.handleList(filter);
      return res.status(200).json(response);
    } catch (error) {
      internalServerError(error, res);
    }
  }

  static async create(req, res) {
    try {
      // change this
      const { created_by, updated_by } = generateCreatedByAndUpdatedBy(1);
      const { name } = req.body;
      const response = await db.Post.findOrCreate({
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
          message: "Tên bài viết đã tồn tại",
        });
      return res.status(200).json({
        message: "Tạo bài viết thành công",
      });
    } catch (error) {
      internalServerError(error, res);
    }
  }

  static async getOne(req, res) {
    try {
      const response = await db.Post.findByPk(req.params.id, {
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
            model: db.GroupPost,
            as: "group_post",
            attributes: ["id", "name"],
          },
        ],
      });
      if (!response)
        return res.status(404).json({
          message: "Không tìm thấy bài viết",
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
      const response = await db.Post.update(
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
          message: "Không tìm thấy bài viết",
        });
      return res.status(200).json({
        message: "Cập nhật bài viết thành công",
      });
    } catch (error) {
      internalServerError(error, res);
    }
  }

  static async destroy(req, res) {
    try {
      const response = await db.Post.destroy({
        where: { id: req.params.id },
      });
      if (response === 0)
        return res.status(404).json({
          message: "Không tìm thấy bài viết",
        });
      return res.status(200).json({
        message: "Xóa bài viết thành công",
      });
    } catch (error) {
      return internalServerError(error, res);
    }
  }
}

export default PostController;
