import express from "express";
import DocumentController from "../http/controllers/DocumentController";

const router = express.Router();

router.get("/", DocumentController.getAll);
router.get("/one/:id", DocumentController.getOne);
// router.get("/import-excel", DocumentController.importExcel);
router.put("/:id", DocumentController.update);
router.delete("/:id", DocumentController.destroy);

export default router;
