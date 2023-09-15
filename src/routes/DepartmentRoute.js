import express from "express";
import DepartmentController from "../http/controllers/DepartmentController";

const router = express.Router();

router.get("/", DepartmentController.getAll);
router.get("/one/:id", DepartmentController.getOne);
router.post("/", DepartmentController.create);
router.put("/:id", DepartmentController.update);
router.delete("/:id", DepartmentController.destroy);

export default router;
