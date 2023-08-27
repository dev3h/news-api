import express from "express";
import OriginController from "../http/controllers/OriginController";

const router = express.Router();

router.get("/", OriginController.index);
router.get("/:id", OriginController.show);
router.post("/", OriginController.create);
router.put("/:id", OriginController.update);
router.delete("/:id", OriginController.destroy);

export default router;
