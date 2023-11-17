import express from "express";
import TagController from "http/controllers/AdminController/TagController";
import { verifyAccessToken } from "http/middlewares/verifyToken";

const router = express.Router();

router.use(verifyAccessToken);
router.get("", TagController.getAll);
router.get("/:id/info", TagController.getOne);

router.delete("/:id", TagController.destroy);

router.post("/", TagController.create);
router.put("/:id", TagController.update);
export default router;
