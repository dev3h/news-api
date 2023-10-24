import express from "express";
import PostController from "http/controllers/PostController";

import uploader from "config/cloudinaryConfig";
import PostRequest from "http/requests/PostRequest";
import UploadRequest from "http/requests/uploadRequest";

const router = express.Router();

router.get("/", PostController.getAll);
router.get("/:id/info", PostController.getOne);
router.get("/getAllStatus", PostController.getAllStatus);
// router.get("/export-excel", PostController.exportExcel);
router.delete("/:id", PostController.destroy);

router.post(
  "/upload-photo",
  [uploader.single("photo"), UploadRequest],
  PostController.uploadPhoto
);
router.use(PostRequest);
router.post("/", uploader.single("photo"), PostController.create);
router.put("/:id", uploader.single("photo"), PostController.update);

export default router;
