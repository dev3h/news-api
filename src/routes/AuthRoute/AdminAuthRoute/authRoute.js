import express from "express";

import AdminAuthRequest from "http/requests/AdminAuthRequest";
import AdminAuthController from "http/controllers/AuthController/AdminAuthController";
import { verifyAccessToken } from "http/middlewares/verifyToken";
const router = express.Router();

router.post("/login", AdminAuthRequest,
  (req, res, next) => {
    /*
      #swagger.tags = ['Admin Auth']
      #swagger.summary = 'Admin login'
      #swagger.description = 'Authenticate admin user and return access token'
      #swagger.requestBody = {
            required: true,
            content: {
                "application/json": {
                    schema: { $ref: "#/components/schemas/AdminLoginSchema" }
                }
            }
      }
      #swagger.responses[200] = {
          description: 'Login successful',
           content: {
                "application/json": {
                    schema:{
                        $ref: "#/components/schemas/AdminLoginResponseSchema"
                    }
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
      #swagger.description = 'Generate new access token using refresh token'
      #swagger.responses[200] = {
          description: 'Token refreshed successfully',
           content: {
                "application/json": {
                    schema: { $ref: "#/components/schemas/AdminLoginResponseSchema" }
                }
            }
          }
      }
    */
  return AdminAuthController.refreshAccessToken(req, res, next);
});

router.get("/current", verifyAccessToken,
  (req, res, next) => {
    /*
      #swagger.tags = ['Admin Auth']
      #swagger.summary = 'Get current admin user'
      #swagger.description = 'Retrieve current authenticated admin user information'
      #swagger.responses[200] = {
          description: 'Successfully retrieved current user data',
           content: {
                "application/json": {
                    schema:{
                        $ref: "#/components/schemas/AdminCurrentUserResponseSchema"
                    }
                }
            }
          }
      }
      #swagger.security = [{ "bearerAuth": [] }]
    */
    return AdminAuthController.getCurrent(req, res, next);
  });

/**
 * @swagger
 * /api/v1/auth/admin/logout:
 *   get:
 *     tags: [Admin Auth]
 *     summary: Admin logout
 *     description: Logout admin user
 *     responses:
 *       200:
 *         description: Logout successful
 */
router.get("/logout", (req, res, next) => {
  /*
      #swagger.tags = ['Admin Auth']
      #swagger.summary = 'Admin logout'
      #swagger.description = 'Logout admin user'
      #swagger.responses[200] = {
          description: 'Logout successful',
           content: {
                "application/json": {
                    schema:{
                        $ref: "#/components/schemas/AdminLogoutResponseSchema"
                    }
                }
            }
          }
      }
      #swagger.security = [{ "bearerAuth": [] }]
    */
  return AdminAuthController.logout(req, res, next);
});

router.get("/check-role", verifyAccessToken,
  (req, res, next) => {
    /*
      #swagger.tags = ['Admin Auth']
      #swagger.summary = 'Check admin role'
      #swagger.description = 'Verify admin user role'
      #swagger.responses[200] = {
          description: 'Successfully retrieved role information',
           content: {
                "application/json": {
                    schema:{
                        $ref: "#/components/schemas/AdminCheckRoleResponseSchema"
                    }
                }
            }
          }
      }
      #swagger.security = [{ "bearerAuth": [] }]
    */
    return AdminAuthController.checkRole(req, res, next);
  });

export default router;
