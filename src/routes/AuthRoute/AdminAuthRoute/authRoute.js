import express from "express";

import AdminAuthRequest from "http/requests/AdminAuthRequest";
import AdminAuthController from "http/controllers/AuthController/AdminAuthController";
import { verifyAccessToken } from "http/middlewares/verifyToken";
const router = express.Router();

router.post("/login", AdminAuthRequest, (req, res, next) => {
  /*
    #swagger.tags = ['Admin Auth']
    #swagger.summary = 'Admin login'
    #swagger.description = 'Authenticate admin user and return access token'
    #swagger.requestBody = {
        required: true,
        content: {
            "application/json": {
                schema: {
                    type: 'object',
                    required: ['username', 'password'],
                    properties: {
                        username: { type: 'string', example: 'admin' },
                        password: { type: 'string', example: 'Abcd1234@' }
                    }
                }
            }
        }
    }
    #swagger.responses[200] = {
        description: 'Login successful',
        content: {
            "application/json": {
                schema: {
                    $ref: "#/components/schemas/AdminLoginResponseSchema"
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
  */
  return AdminAuthController.login(req, res, next);
});

router.post("/refresh-token", (req, res, next) => {
  /*
    #swagger.tags = ['Admin Auth']
    #swagger.summary = 'Refresh access token'
    #swagger.description = 'Generate new access token using the refresh token stored in the refreshToken cookie'
    #swagger.responses[200] = {
        description: 'Token refreshed successfully',
        content: {
            "application/json": {
                schema: {
                    $ref: "#/components/schemas/RefreshTokenResponseSchema"
                }
            }
        }
    }
    #swagger.responses[401] = {
        description: 'Refresh token is invalid or missing',
        content: {
            "application/json": {
                schema: {
                    $ref: "#/components/schemas/UnauthorizedResponseSchema"
                }
            }
        }
    }
  */
  return AdminAuthController.refreshAccessToken(req, res, next);
});

router.get("/current", verifyAccessToken, (req, res, next) => {
  /*
    #swagger.tags = ['Admin Auth']
    #swagger.summary = 'Get current admin user'
    #swagger.description = 'Retrieve current authenticated admin user information'
    #swagger.security = [{ "bearerAuth": [] }]
    #swagger.responses[200] = {
        description: 'Successfully retrieved current user data',
        content: {
            "application/json": {
                schema: {
                    $ref: "#/components/schemas/AdminCurrentUserResponseSchema"
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
  return AdminAuthController.getCurrent(req, res, next);
});

router.get("/logout", (req, res, next) => {
  /*
    #swagger.tags = ['Admin Auth']
    #swagger.summary = 'Admin logout'
    #swagger.description = 'Logout admin user by clearing the refresh token cookie'
    #swagger.responses[200] = {
        description: 'Logout successful',
        content: {
            "application/json": {
                schema: {
                    $ref: "#/components/schemas/AdminLogoutResponseSchema"
                }
            }
        }
    }
  */
  return AdminAuthController.logout(req, res, next);
});

router.get("/check-role", verifyAccessToken, (req, res, next) => {
  /*
    #swagger.tags = ['Admin Auth']
    #swagger.summary = 'Check admin role'
    #swagger.description = 'Verify admin user role'
    #swagger.security = [{ "bearerAuth": [] }]
    #swagger.responses[200] = {
        description: 'Successfully retrieved role information',
        content: {
            "application/json": {
                schema: {
                    $ref: "#/components/schemas/AdminCheckRoleResponseSchema"
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
  return AdminAuthController.checkRole(req, res, next);
});

export default router;