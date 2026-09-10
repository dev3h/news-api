import express from "express";

import PostController from "http/controllers/UserController/PostController";
import { verifyAccessToken } from "http/middlewares/verifyToken";

const router = express.Router();

router.get("/", (req, res, next) => {
  /*
    #swagger.tags = ['User Post']
    #swagger.summary = 'Get all public posts'
    #swagger.description = 'Retrieve all public posts with pagination and filtering'
    #swagger.parameters['search'] = {
        in: 'query',
        name: 'search',
        description: 'Search by post title',
        schema: { type: 'string' }
    }
    #swagger.parameters['category'] = {
        in: 'query',
        name: 'category',
        description: 'Filter by category id or slug',
        schema: { type: 'string' }
    }
    #swagger.parameters['groupCategory'] = {
        in: 'query',
        name: 'groupCategory',
        description: 'Filter by group category id or slug',
        schema: { type: 'string' }
    }
    #swagger.parameters['page'] = {
        in: 'query',
        name: 'page',
        description: 'Page number',
        schema: { type: 'integer', default: 1 }
    }
    #swagger.responses[200] = {
        description: 'List of public posts',
        content: {
            "application/json": {
                schema: {
                    type: 'object',
                    properties: {
                        totalItems: { type: 'integer' },
                        data: { type: 'array', items: { type: 'object' } },
                        totalPages: { type: 'integer' },
                        currentPage: { type: 'integer' }
                    }
                }
            }
        }
    }
  */
  return PostController.getAll(req, res, next);
});

router.get("/post-of-group", (req, res, next) => {
  /*
    #swagger.tags = ['User Post']
    #swagger.summary = 'Get posts of a group'
    #swagger.description = 'Retrieve public posts belonging to a specific group category with pagination'
    #swagger.parameters['groupId'] = {
        in: 'query',
        name: 'groupId',
        required: true,
        description: 'Group category id',
        schema: { type: 'string' }
    }
    #swagger.parameters['categoryId'] = {
        in: 'query',
        name: 'categoryId',
        description: 'Category id to filter',
        schema: { type: 'string' }
    }
    #swagger.parameters['page'] = {
        in: 'query',
        name: 'page',
        description: 'Page number',
        schema: { type: 'integer', default: 1 }
    }
    #swagger.responses[200] = {
        description: 'List of posts of the group',
        content: {
            "application/json": {
                schema: {
                    type: 'object',
                    properties: {
                        totalItems: { type: 'integer' },
                        data: { type: 'array', items: { type: 'object' } },
                        totalPages: { type: 'integer' },
                        currentPage: { type: 'integer' }
                    }
                }
            }
        }
    }
    #swagger.responses[400] = {
        description: 'Missing groupId parameter',
        content: {
            "application/json": {
                schema: {
                    $ref: "#/components/schemas/ErrorResponseSchema"
                }
            }
        }
    }
  */
  return PostController.getPostOfGroup(req, res, next);
});

router.get("/group-category", (req, res, next) => {
  /*
    #swagger.tags = ['User Post']
    #swagger.summary = 'Get groups with categories'
    #swagger.description = 'Retrieve all group categories together with their categories'
    #swagger.responses[200] = {
        description: 'List of group categories with their categories',
        content: {
            "application/json": {
                schema: {
                    type: 'array',
                    items: {
                        type: 'object',
                        properties: {
                            id: { type: 'integer' },
                            name: { type: 'string' },
                            slug: { type: 'string' },
                            categories: { type: 'array', items: { type: 'object' } }
                        }
                    }
                }
            }
        }
    }
  */
  return PostController.getGroupCategory(req, res, next);
});

router.get("/:slug/detail", (req, res, next) => {
  /*
    #swagger.tags = ['User Post']
    #swagger.summary = 'Get post detail'
    #swagger.description = 'Retrieve public post detail by slug'
    #swagger.parameters['slug'] = {
        in: 'path',
        name: 'slug',
        required: true,
        description: 'Post slug',
        schema: { type: 'string' }
    }
    #swagger.responses[200] = {
        description: 'Post detail',
        content: {
            "application/json": {
                schema: {
                    type: 'object',
                    properties: {
                        code: { type: 'integer', example: 0 },
                        data: { type: 'object' }
                    }
                }
            }
        }
    }
    #swagger.responses[404] = {
        description: 'Post not found',
        content: {
            "application/json": {
                schema: {
                    $ref: "#/components/schemas/NotFoundResponseSchema"
                }
            }
        }
    }
  */
  return PostController.getOne(req, res, next);
});

router.post("/:slug/increase-view", (req, res, next) => {
  /*
    #swagger.tags = ['User Post']
    #swagger.summary = 'Increase post view count'
    #swagger.description = 'Increase the view count of a specific post'
    #swagger.parameters['slug'] = {
        in: 'path',
        name: 'slug',
        required: true,
        description: 'Post slug',
        schema: { type: 'string' }
    }
    #swagger.responses[200] = {
        description: 'View count increased',
        content: {
            "application/json": {
                schema: {
                    type: 'object',
                    properties: {
                        message: { type: 'string', example: 'Tăng lượt xem thành công' }
                    }
                }
            }
        }
    }
  */
  return PostController.increaseViewOfPost(req, res, next);
});

router.use(verifyAccessToken);

router.put("/:slug/like", (req, res, next) => {
  /*
    #swagger.tags = ['User Post']
    #swagger.summary = 'Like or unlike a post'
    #swagger.description = 'Toggle like status of a specific post for the authenticated user'
    #swagger.parameters['slug'] = {
        in: 'path',
        name: 'slug',
        required: true,
        description: 'Post slug',
        schema: { type: 'string' }
    }
    #swagger.security = [{ "bearerAuth": [] }]
    #swagger.requestBody = {
        required: true,
        content: {
            "application/json": {
                schema: {
                    type: 'object',
                    required: ['post_liked'],
                    properties: {
                        post_liked: { type: 'boolean', default: true }
                    }
                }
            }
        }
    }
    #swagger.responses[200] = {
        description: 'Like status updated',
        content: {
            "application/json": {
                schema: {
                    type: 'object',
                    properties: {
                        message: { type: 'string', example: 'Cập nhật trạng thái thích thành công' }
                    }
                }
            }
        }
    }
    #swagger.responses[401] = {
        description: 'Missing or invalid access token',
        content: {
            "application/json": {
                schema: {
                    $ref: "#/components/schemas/UnauthorizedResponseSchema"
                }
            }
        }
    }
  */
  return PostController.toggleLike(req, res, next);
});

router.post("/:slug/comment", (req, res, next) => {
  /*
    #swagger.tags = ['User Post']
    #swagger.summary = 'Comment on a post'
    #swagger.description = 'Add a comment to a specific post'
    #swagger.parameters['slug'] = {
        in: 'path',
        name: 'slug',
        required: true,
        description: 'Post slug',
        schema: { type: 'string' }
    }
    #swagger.security = [{ "bearerAuth": [] }]
    #swagger.requestBody = {
        required: true,
        content: {
            "application/json": {
                schema: {
                    type: 'object',
                    required: ['content'],
                    properties: {
                        content: { type: 'string', example: 'Bài viết rất hay!' }
                    }
                }
            }
        }
    }
    #swagger.responses[200] = {
        description: 'Comment created',
        content: {
            "application/json": {
                schema: {
                    type: 'object',
                    properties: {
                        message: { type: 'string', example: 'Bình luận thành công' }
                    }
                }
            }
        }
    }
    #swagger.responses[401] = {
        description: 'Missing or invalid access token',
        content: {
            "application/json": {
                schema: {
                    $ref: "#/components/schemas/UnauthorizedResponseSchema"
                }
            }
        }
    }
  */
  return PostController.createComment(req, res, next);
});

export default router;