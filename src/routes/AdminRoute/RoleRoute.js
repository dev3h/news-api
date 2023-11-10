import express from "express";
import { verifyAccessToken } from "http/middlewares/verifyToken";
import RoleController from "http/controllers/AdminController/RoleController";

const router = express.Router();

router.use(verifyAccessToken);
// router.use(checkAdminRole);
router.get("", RoleController.getAll);

export default router;
