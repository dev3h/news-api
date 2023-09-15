import express from "express";
import GroupProductController from "../http/controllers/GroupProductController";

const router = express.Router();

router.get("/", GroupProductController.getAll);
router.get("/one/:id", GroupProductController.getOne);
router.post("/", GroupProductController.create);
router.put("/:id", GroupProductController.update);
router.delete("/:id", GroupProductController.destroy);

export default router;
