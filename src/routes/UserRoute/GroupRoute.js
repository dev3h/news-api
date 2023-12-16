import express from "express";
import PostController from "http/controllers/UserController/PostController";
const router = express.Router();

router.get("/:slug/categories", PostController.getCategoriesByGroup);
router.get(
  "/:groupSlug/:categorySlug?/posts",
  PostController.getAllPostByGroupAndCategory
);

export default router;
