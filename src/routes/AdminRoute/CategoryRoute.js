import express from "express";

import CategoryRequest from "http/requests/CategoryRequest";
import CategoryController from "http/controllers/AdminController/CategoryController";
import { verifyAccessToken } from "http/middlewares/verifyToken";

const router = express.Router();

router.use(verifyAccessToken);

router.get("/", (req, res, next) => {
  /*
    #swagger.tags = ['Admin Category']
    #swagger.summary = 'Get all categories'
    #swagger.description = 'Retrieve all categories for admin management'
    #swagger.parameters['search'] = {
        in: 'query',
        name: 'search',
        description: 'Search by category name',
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
        description: 'List of categories',
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
  return CategoryController.getAll(req, res, next);
});

router.get("/:id/info", (req, res, next) => {
  /*
    #swagger.tags = ['Admin Category']
    #swagger.summary = 'Get category by ID'
    #swagger.description = 'Retrieve specific category information'
    #swagger.parameters['id'] = {
        in: 'path',
        name: 'id',
        required: true,
        description: 'Category id',
        schema: { type: 'string' }
    }
    #swagger.security = [{ "bearerAuth": [] }]
    #swagger.responses[200] = {
        description: 'Category information',
        content: {
            "application/json": {
                schema: { type: 'object' }
            }
        }
    }
    #swagger.responses[404] = {
        description: 'Category not found',
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
  return CategoryController.getOne(req, res, next);
});

router.delete("/:id", (req, res, next) => {
  /*
    #swagger.tags = ['Admin Category']
    #swagger.summary = 'Delete category'
    #swagger.description = 'Delete a specific category'
    #swagger.parameters['id'] = {
        in: 'path',
        name: 'id',
        required: true,
        description: 'Category id',
        schema: { type: 'string' }
    }
    #swagger.security = [{ "bearerAuth": [] }]
    #swagger.responses[200] = {
        description: 'Category deleted successfully',
        content: {
            "application/json": {
                schema: {
                    type: 'object',
                    properties: {
                        message: { type: 'string', example: 'Xóa category thành công' }
                    }
                }
            }
        }
    }
    #swagger.responses[400] = {
        description: 'Category is currently in use',
        content: {
            "application/json": {
                schema: {
                    $ref: "#/components/schemas/ErrorResponseSchema"
                }
            }
        }
    }
    #swagger.responses[404] = {
        description: 'Category not found',
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
  return CategoryController.destroy(req, res, next);
});

router.use(CategoryRequest);

router.post("/", (req, res, next) => {
  /*
    #swagger.tags = ['Admin Category']
    #swagger.summary = 'Create new category'
    #swagger.description = 'Create a new category'
    #swagger.requestBody = {
        required: true,
        content: {
            "application/json": {
                schema: {
                    type: 'object',
                    required: ['name', 'group_category_id'],
                    properties: {
                        name: { type: 'string', example: 'Công nghệ' },
                        group_category_id: { type: 'integer', example: 1 }
                    }
                }
            }
        }
    }
    #swagger.security = [{ "bearerAuth": [] }]
    #swagger.responses[200] = {
        description: 'Category created successfully',
        content: {
            "application/json": {
                schema: {
                    type: 'object',
                    properties: {
                        message: { type: 'string', example: 'Tạo category thành công' }
                    }
                }
            }
        }
    }
    #swagger.responses[400] = {
        description: 'Category name already exists or group category not found',
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
  return CategoryController.create(req, res, next);
});

router.put("/:id", (req, res, next) => {
  /*
    #swagger.tags = ['Admin Category']
    #swagger.summary = 'Update category'
    #swagger.description = 'Update an existing category'
    #swagger.parameters['id'] = {
        in: 'path',
        name: 'id',
        required: true,
        description: 'Category id',
        schema: { type: 'string' }
    }
    #swagger.requestBody = {
        required: true,
        content: {
            "application/json": {
                schema: {
                    type: 'object',
                    required: ['name', 'group_category_id'],
                    properties: {
                        name: { type: 'string', example: 'Công nghệ mới' },
                        group_category_id: { type: 'integer', example: 1 }
                    }
                }
            }
        }
    }
    #swagger.security = [{ "bearerAuth": [] }]
    #swagger.responses[200] = {
        description: 'Category updated successfully',
        content: {
            "application/json": {
                schema: {
                    type: 'object',
                    properties: {
                        message: { type: 'string', example: 'Cập nhật category thành công' }
                    }
                }
            }
        }
    }
    #swagger.responses[400] = {
        description: 'Category name already exists or group category not found',
        content: {
            "application/json": {
                schema: {
                    $ref: "#/components/schemas/ErrorResponseSchema"
                }
            }
        }
    }
    #swagger.responses[404] = {
        description: 'Category not found',
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
  return CategoryController.update(req, res, next);
});

export default router;