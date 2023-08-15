import express from "express";
import CompanyController from "../http/controllers/companyController";

const router = express.Router();

router.get("/", CompanyController.index);
router.get("/:id", CompanyController.show);
router.post("/", CompanyController.create);
router.put("/:id", CompanyController.update);
router.delete("/:id", CompanyController.destroy);

export default router;
