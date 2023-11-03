import db from "models";
import PostFilter from "modelFilters/PostFilter";
import { internalServerError } from "helpers/generateError";

class PostController {
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
      const response = await PostFilter.handleList(filter);
      return res.status(200).json(response);
    } catch (error) {
      internalServerError(error, res);
    }
  }

  static async getOne(req, res) {
    try {
      const response = await db.Post.findOne({
        where: {
          slug: req.params.slug,
        },
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
            attributes: ["id"],
          },
          {
            model: db.User,
            as: "users_like",
            through: {
              model: db.PostUserLike,
            },
            attributes: ["email"],
          },
          {
            model: db.PostComment,
            as: "comments",
            include: [
              {
                model: db.User,
                as: "user",
                attributes: ["id", "email"],
              },
            ],
            attributes: {
              exclude: ["post_id", "user_id"],
            },
            order: [["created_at", "DESC"]],
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

  static async toggleLike(req, res) {
    try {
      const { id: user_id } = req.user;
      const post = await db.Post.findOne({
        where: {
          slug: req.params.slug,
        },
      });
      if (!post)
        return res.status(404).json({
          message: "Không tìm thấy bài viết",
        });
      const postUserLike = await db.PostUserLike.findOne({
        where: {
          post_id: post.id,
          user_id,
        },
      });
      if (postUserLike) {
        await postUserLike.destroy();
        return res.status(200).json({
          message: "Bỏ thích thành công",
        });
      }
      await db.PostUserLike.create({
        post_id: post.id,
        user_id,
      });
      return res.status(200).json({
        message: "Thích thành công",
      });
    } catch (error) {
      internalServerError(error, res);
    }
  }
  static async createComment(req, res) {
    try {
      const { id: user_id } = req.user;
      const post = await db.Post.findOne({
        where: {
          slug: req.params.slug,
        },
      });
      if (!post)
        return res.status(404).json({
          message: "Không tìm thấy bài viết",
        });
      const response = await db.PostComment.create({
        content: req.body?.content,
        post_id: post.id,
        user_id,
      });
      return res.status(200).json(response);
    } catch (error) {
      internalServerError(error, res);
    }
  }
}

export default PostController;
