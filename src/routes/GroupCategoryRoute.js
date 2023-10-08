import express from "express";
import CompanyController from "../http/controllers/CompanyController";

const router = express.Router();

router.get("/", CompanyController.getAll);
router.get("/one/:id", CompanyController.getOne);
router.post("/", CompanyController.create);
router.put("/:id", CompanyController.update);
router.delete("/:id", CompanyController.destroy);

export default router;
