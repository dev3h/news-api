import express from "express";

import uploader from "config/cloudinaryConfig";
import PostRequest from "http/requests/PostRequest";
import UploadRequest from "http/requests/UploadRequest";
import PostController from "http/controllers/AdminController/PostController";
import { verifyAccessToken } from "http/middlewares/verifyToken";
import { checkAdminOrAuthorRole } from "http/middlewares/checkRole";

const router = express.Router();

router.use(verifyAccessToken);
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
router.get("/", PostController.getAll);

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
router.get("/:id/info", PostController.getOne);

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
router.get("/getAllStatus", PostController.getAllStatus);

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
router.post("/delete-photo", PostController.deletePhoto);

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
router.delete("/:id", PostController.destroy);

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
router.post(
  "/upload-photo",
  [uploader.single("photo"), UploadRequest],
  PostController.uploadPhoto
);

router.use(PostRequest);

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
router.post("/", uploader.single("photo"), PostController.create);

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
router.put("/:id", uploader.single("photo"), PostController.update);

export default router;
