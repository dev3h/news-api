import express from "express";
import UnitController from "../http/controllers/UnitController";

const router = express.Router();

router.get("/", UnitController.index);
router.get("/:id", UnitController.show);
router.post("/", UnitController.create);
router.put("/:id", UnitController.update);
router.delete("/:id", UnitController.destroy);

export default router;
