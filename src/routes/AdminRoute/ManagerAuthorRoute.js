import express from "express";

import ManagerAuthorRequest from "http/requests/ManagerAuthorRequest";
import ManagerAuthorController from "http/controllers/AdminController/ManagerAuthorController";
import { verifyAccessToken } from "http/middlewares/verifyToken";

const router = express.Router();

router.use(verifyAccessToken);

router.get("/", (req, res, next) => {
  /*
    #swagger.tags = ['Admin Author']
    #swagger.summary = 'Get all manager authors'
    #swagger.description = 'Retrieve all manager authors for admin management'
    #swagger.parameters['search'] = {
        in: 'query',
        name: 'search',
        description: 'Search by username or display name',
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
        description: 'List of manager authors',
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
  return ManagerAuthorController.getAll(req, res, next);
});

router.get("/:id/info", (req, res, next) => {
  /*
    #swagger.tags = ['Admin Author']
    #swagger.summary = 'Get manager author by ID'
    #swagger.description = 'Retrieve specific manager author information'
    #swagger.parameters['id'] = {
        in: 'path',
        name: 'id',
        required: true,
        description: 'Manager author id',
        schema: { type: 'string' }
    }
    #swagger.security = [{ "bearerAuth": [] }]
    #swagger.responses[200] = {
        description: 'Manager author information',
        content: {
            "application/json": {
                schema: { type: 'object' }
            }
        }
    }
    #swagger.responses[404] = {
        description: 'Manager author not found',
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
  return ManagerAuthorController.getOne(req, res, next);
});

router.delete("/:id", (req, res, next) => {
  /*
    #swagger.tags = ['Admin Author']
    #swagger.summary = 'Delete manager author'
    #swagger.description = 'Delete a specific manager author'
    #swagger.parameters['id'] = {
        in: 'path',
        name: 'id',
        required: true,
        description: 'Manager author id',
        schema: { type: 'string' }
    }
    #swagger.security = [{ "bearerAuth": [] }]
    #swagger.responses[200] = {
        description: 'Manager author deleted successfully',
        content: {
            "application/json": {
                schema: {
                    type: 'object',
                    properties: {
                        message: { type: 'string', example: 'Xóa manager author thành công' }
                    }
                }
            }
        }
    }
    #swagger.responses[400] = {
        description: 'Manager author is currently in use',
        content: {
            "application/json": {
                schema: {
                    $ref: "#/components/schemas/ErrorResponseSchema"
                }
            }
        }
    }
    #swagger.responses[404] = {
        description: 'Manager author not found',
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
  return ManagerAuthorController.destroy(req, res, next);
});

router.use(ManagerAuthorRequest);

router.post("/", (req, res, next) => {
  /*
    #swagger.tags = ['Admin Author']
    #swagger.summary = 'Create new manager author'
    #swagger.description = 'Create a new manager author account'
    #swagger.requestBody = {
        required: true,
        content: {
            "application/json": {
                schema: {
                    type: 'object',
                    required: ['username', 'display_name', 'email'],
                    properties: {
                        username: { type: 'string', example: 'tuananh' },
                        display_name: { type: 'string', example: 'Tuấn Anh' },
                        email: { type: 'string', format: 'email', example: 'author@example.com' },
                        role: { type: 'integer', enum: [0, 1], description: '0 = ADMIN, 1 = AUTHOR', default: 1 }
                    }
                }
            }
        }
    }
    #swagger.security = [{ "bearerAuth": [] }]
    #swagger.responses[200] = {
        description: 'Manager author created successfully',
        content: {
            "application/json": {
                schema: {
                    type: 'object',
                    properties: {
                        message: { type: 'string', example: 'Tạo manager author thành công' }
                    }
                }
            }
        }
    }
    #swagger.responses[400] = {
        description: 'Username or email already exists',
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
  return ManagerAuthorController.create(req, res, next);
});

router.put("/:id", (req, res, next) => {
  /*
    #swagger.tags = ['Admin Author']
    #swagger.summary = 'Update manager author'
    #swagger.description = 'Update an existing manager author'
    #swagger.parameters['id'] = {
        in: 'path',
        name: 'id',
        required: true,
        description: 'Manager author id',
        schema: { type: 'string' }
    }
    #swagger.requestBody = {
        required: true,
        content: {
            "application/json": {
                schema: {
                    type: 'object',
                    required: ['username', 'display_name', 'email'],
                    properties: {
                        username: { type: 'string', example: 'tuananh' },
                        display_name: { type: 'string', example: 'Tuấn Anh' },
                        email: { type: 'string', format: 'email', example: 'author@example.com' },
                        role: { type: 'integer', enum: [0, 1], description: '0 = ADMIN, 1 = AUTHOR', default: 1 }
                    }
                }
            }
        }
    }
    #swagger.security = [{ "bearerAuth": [] }]
    #swagger.responses[200] = {
        description: 'Manager author updated successfully',
        content: {
            "application/json": {
                schema: {
                    type: 'object',
                    properties: {
                        message: { type: 'string', example: 'Cập nhật manager author thành công' }
                    }
                }
            }
        }
    }
    #swagger.responses[404] = {
        description: 'Manager author not found',
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
  return ManagerAuthorController.update(req, res, next);
});

export default router;