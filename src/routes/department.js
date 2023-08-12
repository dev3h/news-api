import express from "express";
import DepartmentController from "../http/controllers/department";

const router = express.Router();

router.get("/", DepartmentController.index);
router.get("/:id", DepartmentController.show);
router.post("/", DepartmentController.create);
router.put("/:id", DepartmentController.update);
router.delete("/:id", DepartmentController.destroy);

export default router;
