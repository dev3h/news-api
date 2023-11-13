import express from "express";

import AdminAuthRequest from "http/requests/AdminAuthRequest";
import AdminAuthController from "http/controllers/AuthController/AdminAuthController";
import { verifyAccessToken } from "http/middlewares/verifyToken";
const router = express.Router();

router.post("/login", AdminAuthRequest, AdminAuthController.login);
router.post("/refresh-token", AdminAuthController.refreshAccessToken);
router.get("/current", verifyAccessToken, AdminAuthController.getCurrent);

router.get("/logout", AdminAuthController.logout);
router.get("/check-role", verifyAccessToken, AdminAuthController.checkRole);
export default router;
