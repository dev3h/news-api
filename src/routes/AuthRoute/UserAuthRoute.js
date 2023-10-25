import express from "express";
import AdminAuthController from "../../http/controllers/AdminController/AdminAdminAuthController";

const router = express.Router();

router.post("/login", AdminAuthController.login);
router.post("/refresh-token", AdminAuthController.refreshAccessToken);
router.get("/logout", AdminAuthController.logout);
export default router;
