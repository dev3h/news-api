import express from "express";

import DashboardController from "http/controllers/AdminController/DashboardController";
import { verifyAccessToken } from "http/middlewares/verifyToken";

const router = express.Router();

router.use(verifyAccessToken);
router.get("/overview", DashboardController.overview);
router.get("/categories-stats", DashboardController.categoryStat);
router.get("/recent-posts", DashboardController.getRecentPost);
router.get("/authors-stats", DashboardController.getAuthorstat);
router.get("/posts-analytics", DashboardController.getPostsAnalytics);

export default router;
