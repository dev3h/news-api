import express from "express";

import RoleController from "http/controllers/AdminController/RoleController";
import { verifyAccessToken } from "http/middlewares/verifyToken";

const router = express.Router();

router.use(verifyAccessToken);

router.get("/", (req, res, next) => {
  /*
    #swagger.tags = ['Admin Role']
    #swagger.summary = 'Get all roles'
    #swagger.description = 'Retrieve all system roles for admin management'
    #swagger.security = [{ "bearerAuth": [] }]
    #swagger.responses[200] = {
        description: 'List of roles',
        content: {
            "application/json": {
                schema: {
                    type: 'array',
                    items: {
                        type: 'object',
                        properties: {
                            id: { type: 'integer', enum: [0, 1] },
                            name: { type: 'string', enum: ['ADMIN', 'AUTHOR'] }
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
  return RoleController.getAll(req, res, next);
});

export default router;