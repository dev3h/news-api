import express from "express";
import PostController from "http/controllers/UserController/PostController";

const router = express.Router();

// router.use(verifyAccessToken);
router.get("", PostController.getAll);
router.get("/:slug/detail", PostController.getOne);

export default router;
