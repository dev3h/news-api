import express from "express";
import SupplierController from "../http/controllers/SupplierController";

const router = express.Router();

router.get("/", SupplierController.index);
router.get("/:id", SupplierController.show);
router.post("/", SupplierController.create);
router.put("/:id", SupplierController.update);
router.delete("/:id", SupplierController.destroy);

export default router;
