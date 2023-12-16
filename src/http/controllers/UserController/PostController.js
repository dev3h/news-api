import db from "models";
import PostFilter from "modelFilters/PostFilter";
import { internalServerError } from "helpers/generateError";
import UserCache from "cache/UserCache";
import PostStatusEnum from "enums/PostStatusEnum";
import GroupPostFilter from "modelFilters/GroupPostFilter";

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
        isPublic: true,
      };
      const response = await PostFilter.handleList(filter);
      return res.status(200).json(response);
    } catch (error) {
      internalServerError(error, res);
    }
  }

  static async getAllPostByGroupAndCategory(req, res) {
    try {
      const { sortBy = "id", sortType = "ASC", page = 1, flimit } = req.query;
      const { groupSlug, categorySlug } = req.params;
      const filter = {
        sortBy,
        sortType,
        page,
        flimit,
        groupSlug,
        categorySlug,
      };
      const response = await GroupPostFilter.handleList(filter);
      return res.status(200).json(response);
    } catch (error) {
      internalServerError(error, res);
    }
  }

  static async getGroupCategory(req, res) {
    try {
      const response = await db.GroupCategory.findAll({
        attributes: ["id", "name", "slug"],
      });
      return res.status(200).json(response);
    } catch (error) {
      internalServerError(error, res);
    }
  }

  static async getCategoriesByGroup(req, res) {
    try {
      const response = await db.GroupCategory.findOne({
        where: {
          slug: req.params?.slug,
        },
        attributes: ["id", "name", "slug"],
        include: [
          {
            model: db.Category,
            as: "categories",
            attributes: ["id", "name", "slug"],
          },
        ],
      });
      if (!response)
        return res.status(404).json({
          message: "Không tìm thấy nhóm danh mục",
        });
      return res.status(200).json(response);
    } catch (error) {
      internalServerError(error, res);
    }
  }

  static async getPostOfGroup(req, res) {
    try {
      const response = await db.GroupCategory.findAll({
        attributes: ["id", "name", "slug"],
        include: [
          {
            model: db.Category,
            as: "categories",
            attributes: ["id", "name", "slug"],
            include: [
              {
                model: db.Post,
                as: "posts",
                attributes: ["id", "title", "slug", "photo", "view", "created_at"],
                limit: 5,
                order: [["view", "DESC"]],
                include: [
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
                    attributes: ["id", "user_id"],
                    order: [["created_at", "DESC"]],
                  },
                ],
                where: {
                  status: PostStatusEnum.PUBLIC,
                },
              },
            ],
          },
        ],
      });
      const postsOfGroupCategory = response.map((groupCategory) => {
        const { categories } = groupCategory;
        const filteredCategories = categories.filter(
          (category) => category.posts.length > 0
        );

        if (filteredCategories.length === 0) return null;

        const posts = filteredCategories.map((category) => {
          const { posts } = category;
          const newPosts = posts.map((post) => {
            const { users_like, comments } = post;
            return {
              ...post.toJSON(),
              users_like: users_like.length,
              comments: comments.length,
            };
          });
          return {
            ...category.toJSON(),
            posts: newPosts,
          };
        });

        return {
          ...groupCategory.toJSON(),
          categories: posts,
        };
      });

      const filteredResult = postsOfGroupCategory.filter(
        (groupCategory) => groupCategory !== null
      );

      return res.status(200).json(filteredResult);
    } catch (error) {
      internalServerError(error, res);
    }
  }

  static async getOne(req, res) {
    try {
      const response = await db.Post.findOne({
        where: {
          slug: req.params.slug,
          status: PostStatusEnum.PUBLIC,
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
          status: PostStatusEnum.PUBLIC,
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
          status: PostStatusEnum.PUBLIC,
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
  static async increaseViewOfPost(req, res) {
    try {
      const { ip } = req.body;

      const post = await db.Post.findOne({
        where: {
          slug: req.params.slug,
          status: PostStatusEnum.PUBLIC,
        },
      });
      if (!post)
        return res.status(404).json({
          message: "Không tìm thấy bài viết",
        });
      const key = `views:${post.id}:${ip}`;
      const lastView = UserCache.get(key);
      if (lastView !== ip) {
        const a = UserCache.set(key, ip, 86400); // 1 day
        await db.Post.update(
          {
            view: post.view + 1,
          },
          {
            where: { id: post.id },
          }
        );
      }
      return res.status(200).json({
        message: "Tăng lượt xem thành công",
      });
    } catch (error) {
      internalServerError(error, res);
    }
  }
}

export default PostController;
