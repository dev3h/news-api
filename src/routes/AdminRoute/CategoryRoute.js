import express from "express";

import CategoryRequest from "http/requests/CategoryRequest";
import CategoryController from "http/controllers/AdminController/CategoryController";
import { verifyAccessToken } from "http/middlewares/verifyToken";
import { checkAdminRole } from "http/middlewares/checkRole";

const router = express.Router();

router.use(verifyAccessToken);
// router.use(checkAdminRole);
router.get("", CategoryController.getAll);
router.get("/:id/info", CategoryController.getOne);
router.delete("/:id", CategoryController.destroy);

router.use(CategoryRequest);
router.post("/", CategoryController.create);
router.put("/:id", CategoryController.update);

export default router;
