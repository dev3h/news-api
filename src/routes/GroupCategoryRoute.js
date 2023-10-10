import express from "express";
import GroupCategoryController from "http/controllers/GroupCategoryController";
import GroupCategoryRequest from "http/requests/GroupCategoryRequest";

const router = express.Router();

router.get("", GroupCategoryController.getAll);
router.get("/:id", GroupCategoryController.getOne);
router.delete("/:id", GroupCategoryController.destroy);

router.use(GroupCategoryRequest);
router.post("/", GroupCategoryController.create);
router.put("/:id", GroupCategoryController.update);

export default router;
