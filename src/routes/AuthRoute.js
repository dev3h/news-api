import express from "express";
import AuthController from "../http/controllers/AuthController";

const router = express.Router();

router.post("/login", AuthController.login);
router.post("/refresh-token", controllers.refreshAccessToken);
router.get("/logout", controllers.logout);
export default router;
