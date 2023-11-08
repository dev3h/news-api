import express from "express";
import GroupCategoryRequest from "http/requests/GroupCategoryRequest";
import GroupCategoryController from "http/controllers/AdminController/GroupCategoryController";
import { verifyAccessToken } from "http/middlewares/verifyToken";
import { checkAdminRole } from "http/middlewares/checkRole";

const router = express.Router();

router.use(verifyAccessToken);
// router.use(checkAdminRole);
router.get("", GroupCategoryController.getAll);
router.get("/:id/info", GroupCategoryController.getOne);

router.delete("/:id", GroupCategoryController.destroy);

router.use(GroupCategoryRequest);
router.post("/", GroupCategoryController.create);
router.put("/:id", GroupCategoryController.update);

export default router;
