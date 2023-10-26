import express from "express";

import AdminAuthRequest from "http/requests/AdminAuthRequest";
import AdminAuthController from "http/controllers/AuthController/AdminAuthController";
const router = express.Router();

router.post("/login", AdminAuthRequest, AdminAuthController.login);
router.post("/refresh-token", AdminAuthController.refreshAccessToken);
router.get("/logout", AdminAuthController.logout);
export default router;
