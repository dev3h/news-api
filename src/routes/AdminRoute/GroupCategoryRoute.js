import express from "express";

import GroupCategoryRequest from "http/requests/GroupCategoryRequest";
import GroupCategoryController from "http/controllers/AdminController/GroupCategoryController";
import { verifyAccessToken } from "http/middlewares/verifyToken";

const router = express.Router();

router.use(verifyAccessToken);

router.get("/", (req, res, next) => {
  /*
    #swagger.tags = ['Admin Group Category']
    #swagger.summary = 'Get all group categories'
    #swagger.description = 'Retrieve all group categories for admin management'
    #swagger.parameters['search'] = {
        in: 'query',
        name: 'search',
        description: 'Search by group category name',
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
        description: 'List of group categories',
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
  return GroupCategoryController.getAll(req, res, next);
});

router.get("/:id/info", (req, res, next) => {
  /*
    #swagger.tags = ['Admin Group Category']
    #swagger.summary = 'Get group category by ID'
    #swagger.description = 'Retrieve specific group category information'
    #swagger.parameters['id'] = {
        in: 'path',
        name: 'id',
        required: true,
        description: 'Group category id',
        schema: { type: 'string' }
    }
    #swagger.security = [{ "bearerAuth": [] }]
    #swagger.responses[200] = {
        description: 'Group category information',
        content: {
            "application/json": {
                schema: { type: 'object' }
            }
        }
    }
    #swagger.responses[404] = {
        description: 'Group category not found',
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
  return GroupCategoryController.getOne(req, res, next);
});

router.delete("/:id", (req, res, next) => {
  /*
    #swagger.tags = ['Admin Group Category']
    #swagger.summary = 'Delete group category'
    #swagger.description = 'Delete a specific group category'
    #swagger.parameters['id'] = {
        in: 'path',
        name: 'id',
        required: true,
        description: 'Group category id',
        schema: { type: 'string' }
    }
    #swagger.security = [{ "bearerAuth": [] }]
    #swagger.responses[200] = {
        description: 'Group category deleted successfully',
        content: {
            "application/json": {
                schema: {
                    type: 'object',
                    properties: {
                        message: { type: 'string', example: 'Xóa group category thành công' }
                    }
                }
            }
        }
    }
    #swagger.responses[400] = {
        description: 'Group category is currently in use',
        content: {
            "application/json": {
                schema: {
                    $ref: "#/components/schemas/ErrorResponseSchema"
                }
            }
        }
    }
    #swagger.responses[404] = {
        description: 'Group category not found',
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
  return GroupCategoryController.destroy(req, res, next);
});

router.use(GroupCategoryRequest);

router.post("/", (req, res, next) => {
  /*
    #swagger.tags = ['Admin Group Category']
    #swagger.summary = 'Create new group category'
    #swagger.description = 'Create a new group category'
    #swagger.requestBody = {
        required: true,
        content: {
            "application/json": {
                schema: {
                    type: 'object',
                    required: ['name'],
                    properties: {
                        name: { type: 'string', example: 'Tin tức' }
                    }
                }
            }
        }
    }
    #swagger.security = [{ "bearerAuth": [] }]
    #swagger.responses[200] = {
        description: 'Group category created successfully',
        content: {
            "application/json": {
                schema: {
                    type: 'object',
                    properties: {
                        message: { type: 'string', example: 'Tạo group category thành công' }
                    }
                }
            }
        }
    }
    #swagger.responses[400] = {
        description: 'Group category name already exists',
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
  return GroupCategoryController.create(req, res, next);
});

router.put("/:id", (req, res, next) => {
  /*
    #swagger.tags = ['Admin Group Category']
    #swagger.summary = 'Update group category'
    #swagger.description = 'Update an existing group category'
    #swagger.parameters['id'] = {
        in: 'path',
        name: 'id',
        required: true,
        description: 'Group category id',
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
                        name: { type: 'string', example: 'Tin tức mới' }
                    }
                }
            }
        }
    }
    #swagger.security = [{ "bearerAuth": [] }]
    #swagger.responses[200] = {
        description: 'Group category updated successfully',
        content: {
            "application/json": {
                schema: {
                    type: 'object',
                    properties: {
                        message: { type: 'string', example: 'Cập nhật group category thành công' }
                    }
                }
            }
        }
    }
    #swagger.responses[404] = {
        description: 'Group category not found',
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
  return GroupCategoryController.update(req, res, next);
});

export default router;