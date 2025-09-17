import express from "express";

import AdminAuthRequest from "http/requests/AdminAuthRequest";
import AdminAuthController from "http/controllers/AuthController/AdminAuthController";
import { verifyAccessToken } from "http/middlewares/verifyToken";
const router = express.Router();

// #swagger.tags = ['Admin Auth']
// #swagger.summary = 'Admin login'
// #swagger.description = 'Authenticate admin user and return access token'
/* #swagger.parameters['body'] = {
  in: 'body',
  description: 'Admin login credentials',
  required: true,
  schema: {
    username: 'string',
    password: 'string'
  }
} */
/* #swagger.responses[200] = {
  description: 'Login successful'
} */
/* #swagger.responses[401] = {
  description: 'Invalid credentials'
} */
router.post("/login", AdminAuthRequest, AdminAuthController.login);

// #swagger.tags = ['Admin Auth']
// #swagger.summary = 'Refresh access token'
// #swagger.description = 'Generate new access token using refresh token'
/* #swagger.responses[200] = {
  description: 'Token refreshed successfully'
} */
router.post("/refresh-token", AdminAuthController.refreshAccessToken);

// #swagger.tags = ['Admin Auth']
// #swagger.summary = 'Get current admin user'
// #swagger.description = 'Retrieve current authenticated admin user information'
// #swagger.security = [{ bearerAuth: [] }]
/* #swagger.responses[200] = {
  description: 'Current user data'
} */
/* #swagger.responses[401] = {
  description: 'Unauthorized'
} */
router.get("/current", verifyAccessToken, AdminAuthController.getCurrent);

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
router.get("/logout", AdminAuthController.logout);

/**
 * @swagger
 * /api/v1/auth/admin/check-role:
 *   get:
 *     tags: [Admin Auth]
 *     summary: Check admin role
 *     description: Verify admin user role and permissions
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Role information
 *       401:
 *         description: Unauthorized
 */
router.get("/check-role", verifyAccessToken, AdminAuthController.checkRole);

export default router;
