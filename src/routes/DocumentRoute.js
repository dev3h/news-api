import express from "express";
import DocumentController from "../http/controllers/DocumentController";
import uploadFile from "../http/middlewares/upload-file-data";
const router = express.Router();

router.get("/", DocumentController.getAll);
router.get("/one/:id", DocumentController.getOne);
router.post(
  "/import-excel",
  uploadFile.single("data_excel"),
  DocumentController.importExcel
);
router.post("/", DocumentController.create);
router.put("/:id", DocumentController.update);
router.delete("/:id", DocumentController.destroy);

export default router;
