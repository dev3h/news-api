import express from "express";
import PostController from "http/controllers/UserController/PostController";
import { verifyAccessToken } from "http/middlewares/verifyToken";
const router = express.Router();

router.get("", PostController.getAll);
router.get("/post-of-group", PostController.getPostOfGroup);
router.get("/group-category", PostController.getGroupCategory);
router.get("/:slug/detail", PostController.getOne);
router.post("/:slug/increase-view", PostController.increaseViewOfPost);

router.use(verifyAccessToken);
router.put("/:slug/like", PostController.toggleLike);
router.post("/:slug/comment", PostController.createComment);

export default router;
