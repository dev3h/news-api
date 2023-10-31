import express from "express";
import GroupCategoryRequest from "http/requests/GroupCategoryRequest";
import GroupCategoryController from "../../http/controllers/AdminController/GroupCategoryController";
import { verifyAccessToken } from "../../http/middlewares/verifyToken";

const router = express.Router();

router.use(verifyAccessToken);
router.get("", GroupCategoryController.getAll);
router.get("/:id/info", GroupCategoryController.getOne);

router.delete("/:id", GroupCategoryController.destroy);

router.use(GroupCategoryRequest);
router.post("/", GroupCategoryController.create);
router.put("/:id", GroupCategoryController.update);

export default router;
