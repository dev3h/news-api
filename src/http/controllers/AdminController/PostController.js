// import { badRequest, internalServerError } from "../middlewares/handle_error";
import db from "models";
const cloudinary = require("cloudinary").v2;

import generateSlug from "helpers/generateSlug";
import {
  generateCreatedByAndUpdatedBy,
  generateUpdatedBy,
} from "helpers/generateCreatedByAndUpdatedBy";
import { internalServerError, forbidden } from "helpers/generateError";
import PostFilter from "modelFilters/PostFilter";
import PostStatusEnum from "enums/PostStatusEnum";
import RoleSysEnum from "enums/RoleSysEnum";
import PostObservers from "observers/PostObservers";
import PostSchedule from "schedule/PostSchedule";

class PostController {
  static async getAll(req, res) {
    try {
      const { user } = req;
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
        user,
      };
      const response = await PostFilter.handleList(filter);
      return res.status(200).json(response);
    } catch (error) {
      internalServerError(error, res);
    }
  }

  static async create(req, res) {
    try {
      const { id } = req.user;
      const { created_by, updated_by } = generateCreatedByAndUpdatedBy(id);
      const { title, photo, tags, ...rest } = req.body;

      const response = await db.Post.findOrCreate({
        where: { title },
        defaults: {
          ...rest,
          slug: generateSlug(title),
          photo: photo?.file?.response?.data?.path,
          filename: photo?.file?.response?.data?.filename,
          created_by,
          updated_by,
        },
      });
      if (response[1] === false)
        return res.status(400).json({
          message: "Tên bài viết đã tồn tại",
        });
      else {
        if (response[0].status === PostStatusEnum.SCHEDULE) {
          PostSchedule.schedulePost(response[0].id);
        }
        PostObservers.saved(response[0].id, tags);
        return res.status(200).json({
          message: "Tạo bài viết thành công",
        });
      }
    } catch (error) {
      const { photo } = req.body;
      if (photo) cloudinary.uploader.destroy(photo?.file?.response?.data?.filename);
      internalServerError(error, res);
    }
  }

  static uploadPhoto(req, res) {
    try {
      const { file } = req;
      if (!file)
        return res.status(400).json({
          message: "Không có file nào được gửi lên",
        });
      // Lấy filename của file cũ từ request (nếu có)
      const oldFilename = req.body.oldPhoto;

      // Nếu có file cũ, xóa nó trên Cloudinary
      if (oldFilename) {
        cloudinary.uploader.destroy(oldFilename, (error, result) => {
          if (error) {
            console.error("Lỗi khi xóa file cũ trên Cloudinary: " + error);
          }
        });
      }

      return res.status(200).json({
        data: {
          path: file.path,
          filename: file.filename,
        },
      });
    } catch (error) {
      if (req.file) cloudinary.uploader.destroy(req.file.filename);
      internalServerError(error, res);
    }
  }
  static async deletePhoto(req, res) {
    try {
      const { filename } = req.body;
      if (!filename)
        return res.status(400).json({
          message: "Không có file nào được gửi lên",
        });
      cloudinary.uploader.destroy(filename, (error, result) => {
        if (error) {
          console.error("Lỗi khi xóa file cũ trên Cloudinary: " + error);
        }
      });
      return res.status(200).json({
        message: "Xóa ảnh thành công",
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
            model: db.Category,
            as: "category",
            attributes: ["id", "name"],
          },
          {
            model: db.Tag,
            as: "tags",
            through: {
              model: db.PostTag,
            },
            attributes: ["id", "name"],
          },
        ],
      });
      if (!response)
        return res.status(404).json({
          message: "Không tìm thấy bài viết",
        });
      const tagIds = response.tags.map((tag) => tag.id.toString());
      return res.status(200).json({
        ...response.toJSON(),
        tags: tagIds,
        tags_info: response.tags,
      });
    } catch (error) {
      internalServerError(error, res);
    }
  }

  static async getAllStatus(_, res) {
    try {
      const response = PostStatusEnum.getAll();
      return res.status(200).json(response);
    } catch (error) {
      internalServerError(error, res);
    }
  }

  static async update(req, res) {
    try {
      // change this
      const { user } = req;
      const { updated_by } = generateUpdatedBy(user?.id);
      const { title, photo, tags, ...rest } = req.body;
      const oldImage = await db.Post.findOne({
        where: { id: req.params.id },
        attributes: ["filename"],
      });
      const post = await db.Post.findByPk(req.params.id);
      const postByTitle = await db.Post.findOne({
        where: { title },
        attributes: ["id"],
      });
      if (postByTitle && postByTitle.id !== post.id)
        return res.status(400).json({
          message: "Tên bài viết đã tồn tại",
        });
      if (post) {
        if (user.role !== RoleSysEnum.ADMIN && post.created_by !== user.id)
          return forbidden(new Error("Bạn không có quyền cập nhật bài viết này"), res);
      }

      const response = await db.Post.update(
        {
          ...rest,
          title,
          slug: generateSlug(title),
          photo: photo?.file?.response?.data?.path,
          filename: photo?.file?.response?.data?.filename,
          updated_by,
        },
        {
          where: { id: req.params.id },
        }
      );
      if (response[0] === 0) {
        if (photo) cloudinary.uploader.destroy(photo?.file?.response?.data?.filename);
        if (req.body.status === PostStatusEnum.SCHEDULE) {
          PostSchedule.schedulePost(req.params.id);
        }
        return res.status(404).json({
          message: "Không tìm thấy bài viết",
        });
      }
      if (response[0] > 0 && photo && oldImage)
        cloudinary.uploader.destroy(oldImage.filename);
      PostObservers.saved(post.id, tags);
      return res.status(200).json({
        message: "Cập nhật bài viết thành công",
      });
    } catch (error) {
      const { photo } = req.body;
      if (photo) cloudinary.uploader.destroy(photo?.file?.response?.data?.filename);
      internalServerError(error, res);
    }
  }

  static async destroy(req, res) {
    try {
      const { user } = req;
      const post = await db.Post.findByPk(req.params.id);
      if (post) {
        if (user.role !== RoleSysEnum.ADMIN && post.created_by !== user.id)
          return forbidden(new Error("Bạn không có quyền xóa bài viết này"), res);
      }
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
      internalServerError(error, res);
    }
  }
}

export default PostController;
