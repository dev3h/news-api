import express from "express";
import SupplierController from "../http/controllers/SupplierController";

const router = express.Router();

router.get("/", SupplierController.getAll);
router.get("/one/:id", SupplierController.getOne);
router.post("/", SupplierController.create);
router.put("/:id", SupplierController.update);
router.delete("/:id", SupplierController.destroy);

export default router;
