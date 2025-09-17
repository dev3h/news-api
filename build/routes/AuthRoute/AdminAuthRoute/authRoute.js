"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = _interopRequireDefault(require("express"));
var _AdminAuthRequest = _interopRequireDefault(require("../../../http/requests/AdminAuthRequest"));
var _AdminAuthController = _interopRequireDefault(require("../../../http/controllers/AuthController/AdminAuthController"));
var _verifyToken = require("../../../http/middlewares/verifyToken");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var router = _express["default"].Router();

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
router.post("/login", _AdminAuthRequest["default"], _AdminAuthController["default"].login);

// #swagger.tags = ['Admin Auth']
// #swagger.summary = 'Refresh access token'
// #swagger.description = 'Generate new access token using refresh token'
/* #swagger.responses[200] = {
  description: 'Token refreshed successfully'
} */
router.post("/refresh-token", _AdminAuthController["default"].refreshAccessToken);

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
router.get("/current", _verifyToken.verifyAccessToken, _AdminAuthController["default"].getCurrent);

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
router.get("/logout", _AdminAuthController["default"].logout);

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
router.get("/check-role", _verifyToken.verifyAccessToken, _AdminAuthController["default"].checkRole);
var _default = exports["default"] = router;