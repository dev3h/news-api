import express from "express";

import TagController from "http/controllers/AdminController/TagController";
import { verifyAccessToken } from "http/middlewares/verifyToken";

const router = express.Router();

router.use(verifyAccessToken);

router.get("/", (req, res, next) => {
  /*
    #swagger.tags = ['Admin Tag']
    #swagger.summary = 'Get all tags'
    #swagger.description = 'Retrieve all tags for admin management'
    #swagger.parameters['search'] = {
        in: 'query',
        name: 'search',
        description: 'Search by tag name',
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
        description: 'List of tags',
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
  return TagController.getAll(req, res, next);
});

router.get("/:id/info", (req, res, next) => {
  /*
    #swagger.tags = ['Admin Tag']
    #swagger.summary = 'Get tag by ID'
    #swagger.description = 'Retrieve specific tag information'
    #swagger.parameters['id'] = {
        in: 'path',
        name: 'id',
        required: true,
        description: 'Tag id',
        schema: { type: 'string' }
    }
    #swagger.security = [{ "bearerAuth": [] }]
    #swagger.responses[200] = {
        description: 'Tag information',
        content: {
            "application/json": {
                schema: { type: 'object' }
            }
        }
    }
    #swagger.responses[404] = {
        description: 'Tag not found',
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
  return TagController.getOne(req, res, next);
});

router.delete("/:id", (req, res, next) => {
  /*
    #swagger.tags = ['Admin Tag']
    #swagger.summary = 'Delete tag'
    #swagger.description = 'Delete a specific tag'
    #swagger.parameters['id'] = {
        in: 'path',
        name: 'id',
        required: true,
        description: 'Tag id',
        schema: { type: 'string' }
    }
    #swagger.security = [{ "bearerAuth": [] }]
    #swagger.responses[200] = {
        description: 'Tag deleted successfully',
        content: {
            "application/json": {
                schema: {
                    type: 'object',
                    properties: {
                        message: { type: 'string', example: 'Xóa tag thành công' }
                    }
                }
            }
        }
    }
    #swagger.responses[400] = {
        description: 'Tag is currently in use',
        content: {
            "application/json": {
                schema: {
                    $ref: "#/components/schemas/ErrorResponseSchema"
                }
            }
        }
    }
    #swagger.responses[404] = {
        description: 'Tag not found',
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
  return TagController.destroy(req, res, next);
});

router.post("/", (req, res, next) => {
  /*
    #swagger.tags = ['Admin Tag']
    #swagger.summary = 'Create new tag'
    #swagger.description = 'Create a new tag'
    #swagger.requestBody = {
        required: true,
        content: {
            "application/json": {
                schema: {
                    type: 'object',
                    required: ['name'],
                    properties: {
                        name: { type: 'string', example: 'NodeJS' }
                    }
                }
            }
        }
    }
    #swagger.security = [{ "bearerAuth": [] }]
    #swagger.responses[200] = {
        description: 'Tag created successfully',
        content: {
            "application/json": {
                schema: {
                    type: 'object',
                    properties: {
                        message: { type: 'string', example: 'Tạo tag thành công' }
                    }
                }
            }
        }
    }
    #swagger.responses[400] = {
        description: 'Tag name already exists',
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
  return TagController.create(req, res, next);
});

router.put("/:id", (req, res, next) => {
  /*
    #swagger.tags = ['Admin Tag']
    #swagger.summary = 'Update tag'
    #swagger.description = 'Update an existing tag'
    #swagger.parameters['id'] = {
        in: 'path',
        name: 'id',
        required: true,
        description: 'Tag id',
        schema: { type: 'string' }
    }
    #swagger.requestBody = {
        required: true,
        content: {
            "application/json": {
                schema: {
                    type: 'object',
                    required: ['name'],
                    properties: {
                        name: { type: 'string', example: 'Javascript' }
                    }
                }
            }
        }
    }
    #swagger.security = [{ "bearerAuth": [] }]
    #swagger.responses[200] = {
        description: 'Tag updated successfully',
        content: {
            "application/json": {
                schema: {
                    type: 'object',
                    properties: {
                        message: { type: 'string', example: 'Cập nhật tag thành công' }
                    }
                }
            }
        }
    }
    #swagger.responses[404] = {
        description: 'Tag not found',
        content: {
            "application/json": {
                schema: {
                    $ref: "#/components/schemas/NotFoundResponseSchema"
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
  return TagController.update(req, res, next);
});

export default router;