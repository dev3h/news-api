import express from "express";
import GroupProductController from "../http/controllers/GroupProductController";

const router = express.Router();

router.get("/", GroupProductController.index);
router.get("/:id", GroupProductController.show);
router.post("/", GroupProductController.create);
router.put("/:id", GroupProductController.update);
router.delete("/:id", GroupProductController.destroy);

export default router;
