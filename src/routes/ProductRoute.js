import express from "express";
import ProductController from "../http/controllers/ProductController";
import upload from "../http/middlewares/upload";

const router = express.Router();

router.get("/", ProductController.getAll);
router.get("/one/:id", ProductController.getOne);
router.get("/export-excel", ProductController.exportExcel);
router.post("/", upload.single("photo"), ProductController.create);
router.put("/:id", ProductController.update);
router.delete("/:id", ProductController.destroy);

export default router;
