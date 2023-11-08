import express from "express";

import ManagerAuthorController from "http/controllers/AdminController/ManagerAuthorController";
import { verifyAccessToken } from "http/middlewares/verifyToken";
import ManagerAuthorRequest from "http/requests/ManagerAuthorRequest";
import { checkAdminRole } from "http/middlewares/checkRole";

const router = express.Router();

router.use(verifyAccessToken);
// router.use(checkAdminRole);
router.get("", ManagerAuthorController.getAll);
router.get("/:id/info", ManagerAuthorController.getOne);
router.delete("/:id", ManagerAuthorController.destroy);

router.use(ManagerAuthorRequest);
router.post("/", ManagerAuthorController.create);
router.put("/:id", ManagerAuthorController.update);

export default router;
