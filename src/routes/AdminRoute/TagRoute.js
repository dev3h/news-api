import express from "express";
import TagController from "../../http/controllers/AdminController/TagController";

const router = express.Router();

router.get("", TagController.getAll);

export default router;
