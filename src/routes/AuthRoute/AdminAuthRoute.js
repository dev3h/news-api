import express from "express";
import AdminAuthController from "http/controllers/AdminController/AuthController";
import AdminAuthRequest from "http/requests/AdminAuthRequest";
const router = express.Router();

router.use(AdminAuthRequest);
router.post("/login", AdminAuthController.login);
router.post("/refresh-token", AdminAuthController.refreshAccessToken);
router.get("/logout", AdminAuthController.logout);
export default router;
