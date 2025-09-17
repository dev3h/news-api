"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = _interopRequireDefault(require("express"));
var _UserAuthController = _interopRequireDefault(require("../../../http/controllers/AuthController/UserAuthController"));
var _UserAuthRequest = _interopRequireDefault(require("../../../http/requests/UserAuthRequest"));
var _verifyToken = require("../../../http/middlewares/verifyToken");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var router = _express["default"].Router();

/**
 * @swagger
 * /api/v1/auth/user/final-register/{token}:
 *   put:
 *     tags: [User Auth]
 *     summary: Verify user registration
 *     description: Complete user registration with verification token
 *     parameters:
 *       - in: path
 *         name: token
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Registration verified successfully
 */
router.put("/final-register/:token", _UserAuthController["default"].verifyRegister);

/**
 * @swagger
 * /api/v1/auth/user/forgot-password:
 *   get:
 *     tags: [User Auth]
 *     summary: Forgot password
 *     description: Send password reset link to user email
 *     responses:
 *       200:
 *         description: Reset link sent successfully
 */
router.get("/forgot-password", _UserAuthController["default"].forgotPassword);

/**
 * @swagger
 * /api/v1/auth/user/reset-password:
 *   put:
 *     tags: [User Auth]
 *     summary: Reset password
 *     description: Reset user password with token
 *     responses:
 *       200:
 *         description: Password reset successfully
 */
router.put("/reset-password", _UserAuthController["default"].resetPassword);

/**
 * @swagger
 * /api/v1/auth/user/logout:
 *   get:
 *     tags: [User Auth]
 *     summary: User logout
 *     description: Logout user
 *     responses:
 *       200:
 *         description: Logout successful
 */
router.get("/logout", _UserAuthController["default"].logout);

/**
 * @swagger
 * /api/v1/auth/user/current:
 *   get:
 *     tags: [User Auth]
 *     summary: Get current user
 *     description: Retrieve current authenticated user information
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Current user data
 */
router.get("/current", _verifyToken.verifyAccessToken, _UserAuthController["default"].getCurrent);

/**
 * @swagger
 * /api/v1/auth/user/update-password:
 *   put:
 *     tags: [User Auth]
 *     summary: Update password
 *     description: Update user password
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Password updated successfully
 */
router.put("/update-password", _verifyToken.verifyAccessToken, _UserAuthController["default"].updatePassword);

/**
 * @swagger
 * /api/v1/auth/user/refresh-token:
 *   post:
 *     tags: [User Auth]
 *     summary: Refresh access token
 *     description: Generate new access token using refresh token
 *     responses:
 *       200:
 *         description: Token refreshed successfully
 */
router.post("/refresh-token", _UserAuthController["default"].refreshAccessToken);
router.use(_UserAuthRequest["default"]);

/**
 * @swagger
 * /api/v1/auth/user/register:
 *   post:
 *     tags: [User Auth]
 *     summary: User registration
 *     description: Register new user account
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *               firstname:
 *                 type: string
 *               lastname:
 *                 type: string
 *     responses:
 *       201:
 *         description: User registered successfully
 */
router.post("/register", _UserAuthController["default"].register);

/**
 * @swagger
 * /api/v1/auth/user/login:
 *   post:
 *     tags: [User Auth]
 *     summary: User login
 *     description: Authenticate user and return access token
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Login successful
 */
router.post("/login", _UserAuthController["default"].login);
var _default = exports["default"] = router;