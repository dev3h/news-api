import express from "express";
import PostController from "http/controllers/UserController/PostController";
import GroupCategoryController from "http/controllers/UserController/GroupCategoryController";
const router = express.Router();

router.get('/', GroupCategoryController.getAllGroups);
router.get("/:slug/categories", PostController.getCategoriesByGroup);
router.get(
  "/:groupSlug/:categorySlug?/posts",
  PostController.getAllPostByGroupAndCategory
);

export default router;
