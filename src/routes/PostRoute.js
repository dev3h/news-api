import express from "express";
import PostController from "http/controllers/PostController";

import upload from "http/middlewares/upload-image";
import PostRequest from "http/requests/PostRequest";

const router = express.Router();

router.get("/", PostController.getAll);
router.get("/:id", PostController.getOne);
// router.get("/export-excel", PostController.exportExcel);
router.delete("/:id", PostController.destroy);

router.use(PostRequest);
router.post("/", upload.single("photo"), PostController.create);
router.put("/:id", PostController.update);

export default router;
