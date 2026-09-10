import express from "express";

import uploader from "config/cloudinaryConfig";
import PostRequest from "http/requests/PostRequest";
import UploadRequest from "http/requests/UploadRequest";
import PostController from "http/controllers/AdminController/PostController";
import { verifyAccessToken } from "http/middlewares/verifyToken";
import { checkAdminOrAuthorRole } from "http/middlewares/checkRole";

const router = express.Router();

router.use(verifyAccessToken);
// router.use(checkAdminOrAuthorRole);

router.get("/", (req, res, next) => {
  /*
    #swagger.tags = ['Admin Post']
    #swagger.summary = 'Get all posts'
    #swagger.description = 'Retrieve all posts for admin management'
    #swagger.parameters['search'] = {
        in: 'query',
        name: 'search',
        description: 'Search by post title or id',
        schema: { type: 'string' }
    }
    #swagger.parameters['sortBy'] = {
        in: 'query',
        name: 'sortBy',
        description: 'Sort field',
        schema: { type: 'string', default: 'id' }
    }
    #swagger.parameters['sortType'] = {
        in: 'query',
        name: 'sortType',
        description: 'Sort direction',
        schema: { type: 'string', enum: ['ASC', 'DESC'], default: 'ASC' }
    }
    #swagger.parameters['page'] = {
        in: 'query',
        name: 'page',
        description: 'Page number',
        schema: { type: 'integer', default: 1 }
    }
    #swagger.parameters['flimit'] = {
        in: 'query',
        name: 'flimit',
        description: 'Number of items per page',
        schema: { type: 'integer' }
    }
    #swagger.security = [{ "bearerAuth": [] }]
    #swagger.responses[200] = {
        description: 'List of posts',
        content: {
            "application/json": {
                schema: {
                    type: 'object',
                    properties: {
                        count: { type: 'integer' },
                        rows: { type: 'array', items: { type: 'object' } }
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
  return PostController.getAll(req, res, next);
});

router.get("/:id/info", (req, res, next) => {
  /*
    #swagger.tags = ['Admin Post']
    #swagger.summary = 'Get post by ID'
    #swagger.description = 'Retrieve specific post information'
    #swagger.parameters['id'] = {
        in: 'path',
        name: 'id',
        required: true,
        description: 'Post id',
        schema: { type: 'string' }
    }
    #swagger.security = [{ "bearerAuth": [] }]
    #swagger.responses[200] = {
        description: 'Post information',
        content: {
            "application/json": {
                schema: { type: 'object' }
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
  return PostController.getOne(req, res, next);
});

router.get("/getAllStatus", (req, res, next) => {
  /*
    #swagger.tags = ['Admin Post']
    #swagger.summary = 'Get all post statuses'
    #swagger.description = 'Retrieve available post statuses'
    #swagger.security = [{ "bearerAuth": [] }]
    #swagger.responses[200] = {
        description: 'List of post statuses',
        content: {
            "application/json": {
                schema: {
                    type: 'array',
                    items: {
                        type: 'object',
                        properties: {
                            id: { type: 'integer', enum: [0, 1, 2] },
                            name: { type: 'string', enum: ['Private', 'Public', 'Schedule'] }
                        }
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
  return PostController.getAllStatus(req, res, next);
});

router.post("/delete-photo", (req, res, next) => {
  /*
    #swagger.tags = ['Admin Post']
    #swagger.summary = 'Delete post photo'
    #swagger.description = 'Delete photo associated with a post'
    #swagger.requestBody = {
        required: true,
        content: {
            "application/json": {
                schema: {
                    type: 'object',
                    required: ['filename'],
                    properties: {
                        filename: { type: 'string', description: 'Cloudinary filename of the photo' }
                    }
                }
            }
        }
    }
    #swagger.security = [{ "bearerAuth": [] }]
    #swagger.responses[200] = {
        description: 'Photo deleted successfully',
        content: {
            "application/json": {
                schema: {
                    type: 'object',
                    properties: {
                        message: { type: 'string', example: 'Xóa ảnh thành công' }
                    }
                }
            }
        }
    }
    #swagger.responses[400] = {
        description: 'No filename provided',
        content: {
            "application/json": {
                schema: {
                    $ref: "#/components/schemas/ErrorResponseSchema"
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
  return PostController.deletePhoto(req, res, next);
});

router.post(
  "/upload-photo",
  [uploader.single("photo"), UploadRequest],
  (req, res, next) => {
    /*
      #swagger.tags = ['Admin Post']
      #swagger.summary = 'Upload post photo'
      #swagger.description = 'Upload photo for a post (returns Cloudinary path and filename)'
      #swagger.requestBody = {
          required: true,
          content: {
              'multipart/form-data': {
                  schema: {
                      type: 'object',
                      required: ['photo'],
                      properties: {
                          photo: { type: 'string', format: 'binary' },
                          oldPhoto: { type: 'string', description: 'Cloudinary filename of the old photo to replace' }
                      }
                  }
              }
          }
      }
      #swagger.security = [{ "bearerAuth": [] }]
      #swagger.responses[200] = {
          description: 'Photo uploaded successfully',
          content: {
              "application/json": {
                  schema: {
                      type: 'object',
                      properties: {
                          data: {
                              type: 'object',
                              properties: {
                                  path: { type: 'string' },
                                  filename: { type: 'string' }
                              }
                          }
                      }
                  }
              }
          }
      }
      #swagger.responses[400] = {
          description: 'No file uploaded',
          content: {
              "application/json": {
                  schema: {
                      $ref: "#/components/schemas/ErrorResponseSchema"
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
    return PostController.uploadPhoto(req, res, next);
  }
);

router.delete("/:id", (req, res, next) => {
  /*
    #swagger.tags = ['Admin Post']
    #swagger.summary = 'Delete post'
    #swagger.description = 'Delete a specific post'
    #swagger.parameters['id'] = {
        in: 'path',
        name: 'id',
        required: true,
        description: 'Post id',
        schema: { type: 'string' }
    }
    #swagger.security = [{ "bearerAuth": [] }]
    #swagger.responses[200] = {
        description: 'Post deleted successfully',
        content: {
            "application/json": {
                schema: {
                    type: 'object',
                    properties: {
                        message: { type: 'string', example: 'Xóa bài viết thành công' }
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
    #swagger.responses[403] = {
        description: 'Not allowed to delete this post',
        content: {
            "application/json": {
                schema: {
                    $ref: "#/components/schemas/ForbiddenResponseSchema"
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
  return PostController.destroy(req, res, next);
});

router.use(PostRequest);

router.post("/", uploader.single("photo"), (req, res, next) => {
  /*
    #swagger.tags = ['Admin Post']
    #swagger.summary = 'Create new post'
    #swagger.description = 'Create a new post with multipart form data'
    #swagger.requestBody = {
        required: true,
        content: {
            'multipart/form-data': {
                schema: {
                    type: 'object',
                    required: ['title', 'content', 'status', 'category_id'],
                    properties: {
                        title: { type: 'string', example: 'Bài viết mới' },
                        content: { type: 'string', example: 'Nội dung bài viết' },
                        status: { type: 'integer', enum: [0, 1, 2], description: '0 = Private, 1 = Public, 2 = Schedule' },
                        category_id: { type: 'integer' },
                        published_at: { type: 'string', format: 'date-time', description: 'Scheduling date (only when status is 2)' },
                        tags: { type: 'array', items: { type: 'integer' } },
                        photo: { type: 'string', format: 'binary' }
                    }
                }
            }
        }
    }
    #swagger.security = [{ "bearerAuth": [] }]
    #swagger.responses[200] = {
        description: 'Post created successfully',
        content: {
            "application/json": {
                schema: {
                    type: 'object',
                    properties: {
                        message: { type: 'string', example: 'Tạo bài viết thành công' }
                    }
                }
            }
        }
    }
    #swagger.responses[400] = {
        description: 'Post title already exists',
        content: {
            "application/json": {
                schema: {
                    $ref: "#/components/schemas/ErrorResponseSchema"
                }
            }
        }
    }
    #swagger.responses[422] = {
        description: 'Validation failed',
        content: {
            "application/json": {
                schema: {
                    $ref: "#/components/schemas/ValidationErrorResponseSchema"
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
  return PostController.create(req, res, next);
});

router.put("/:id", uploader.single("photo"), (req, res, next) => {
  /*
    #swagger.tags = ['Admin Post']
    #swagger.summary = 'Update post'
    #swagger.description = 'Update an existing post'
    #swagger.parameters['id'] = {
        in: 'path',
        name: 'id',
        required: true,
        description: 'Post id',
        schema: { type: 'string' }
    }
    #swagger.requestBody = {
        required: true,
        content: {
            'multipart/form-data': {
                schema: {
                    type: 'object',
                    properties: {
                        title: { type: 'string', example: 'Bài viết cập nhật' },
                        content: { type: 'string', example: 'Nội dung bài viết' },
                        status: { type: 'integer', enum: [0, 1, 2], description: '0 = Private, 1 = Public, 2 = Schedule' },
                        category_id: { type: 'integer' },
                        published_at: { type: 'string', format: 'date-time' },
                        filename_old: { type: 'string', description: 'Cloudinary filename of the photo being replaced' },
                        tags: { type: 'array', items: { type: 'integer' } },
                        photo: { type: 'string', format: 'binary' }
                    }
                }
            }
        }
    }
    #swagger.security = [{ "bearerAuth": [] }]
    #swagger.responses[200] = {
        description: 'Post updated successfully',
        content: {
            "application/json": {
                schema: {
                    type: 'object',
                    properties: {
                        message: { type: 'string', example: 'Cập nhật bài viết thành công' }
                    }
                }
            }
        }
    }
    #swagger.responses[400] = {
        description: 'Post title already exists',
        content: {
            "application/json": {
                schema: {
                    $ref: "#/components/schemas/ErrorResponseSchema"
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
    #swagger.responses[403] = {
        description: 'Not allowed to update this post',
        content: {
            "application/json": {
                schema: {
                    $ref: "#/components/schemas/ForbiddenResponseSchema"
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
  return PostController.update(req, res, next);
});

export default router;