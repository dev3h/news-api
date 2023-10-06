import express from "express";
import AuthController from "../http/controllers/AuthController";

const router = express.Router();

router.post("/login", AuthController.login);
router.post("/refresh-token", AuthController.refreshAccessToken);
router.get("/logout", AuthController.logout);
export default router;
