"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = _interopRequireDefault(require("express"));
var _cloudinaryConfig = _interopRequireDefault(require("../../config/cloudinaryConfig"));
var _PostRequest = _interopRequireDefault(require("../../http/requests/PostRequest"));
var _UploadRequest = _interopRequireDefault(require("../../http/requests/UploadRequest"));
var _PostController = _interopRequireDefault(require("../../http/controllers/AdminController/PostController"));
var _verifyToken = require("../../http/middlewares/verifyToken");
var _checkRole = require("../../http/middlewares/checkRole");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var router = _express["default"].Router();
router.use(_verifyToken.verifyAccessToken);
// router.use(checkAdminOrAuthorRole);

/**
 * @swagger
 * /api/v1/post:
 *   get:
 *     tags: [Admin]
 *     summary: Get all posts
 *     description: Retrieve all posts for admin management
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of posts
 */
router.get("/", _PostController["default"].getAll);

/**
 * @swagger
 * /api/v1/post/{id}/info:
 *   get:
 *     tags: [Admin]
 *     summary: Get post by ID
 *     description: Retrieve specific post information
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Post information
 */
router.get("/:id/info", _PostController["default"].getOne);

/**
 * @swagger
 * /api/v1/post/getAllStatus:
 *   get:
 *     tags: [Admin]
 *     summary: Get all post statuses
 *     description: Retrieve available post statuses
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of post statuses
 */
router.get("/getAllStatus", _PostController["default"].getAllStatus);

// router.get("/export-excel", PostController.exportExcel);

/**
 * @swagger
 * /api/v1/post/delete-photo:
 *   post:
 *     tags: [Admin]
 *     summary: Delete post photo
 *     description: Delete photo associated with a post
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Photo deleted successfully
 */
router.post("/delete-photo", _PostController["default"].deletePhoto);

/**
 * @swagger
 * /api/v1/post/{id}:
 *   delete:
 *     tags: [Admin]
 *     summary: Delete post
 *     description: Delete a specific post
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Post deleted successfully
 */
router["delete"]("/:id", _PostController["default"].destroy);

/**
 * @swagger
 * /api/v1/post/upload-photo:
 *   post:
 *     tags: [Admin]
 *     summary: Upload post photo
 *     description: Upload photo for a post
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               photo:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: Photo uploaded successfully
 */
router.post("/upload-photo", [_cloudinaryConfig["default"].single("photo"), _UploadRequest["default"]], _PostController["default"].uploadPhoto);
router.use(_PostRequest["default"]);

/**
 * @swagger
 * /api/v1/post:
 *   post:
 *     tags: [Admin]
 *     summary: Create new post
 *     description: Create a new post
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               content:
 *                 type: string
 *               photo:
 *                 type: string
 *                 format: binary
 *     responses:
 *       201:
 *         description: Post created successfully
 */
router.post("/", _cloudinaryConfig["default"].single("photo"), _PostController["default"].create);

/**
 * @swagger
 * /api/v1/post/{id}:
 *   put:
 *     tags: [Admin]
 *     summary: Update post
 *     description: Update an existing post
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               content:
 *                 type: string
 *               photo:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: Post updated successfully
 */
router.put("/:id", _cloudinaryConfig["default"].single("photo"), _PostController["default"].update);
var _default = exports["default"] = router;