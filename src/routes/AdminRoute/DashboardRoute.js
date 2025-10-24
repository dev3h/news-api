import express from "express";

import DashboardController from "http/controllers/AdminController/DashboardController";
import { verifyAccessToken } from "http/middlewares/verifyToken";

const router = express.Router();

router.use(verifyAccessToken);
router.get("/overview", (req, res, next) => {/*
      #swagger.tags = ['Admin Dashboard']
      #swagger.summary = 'Get overview statistic'
      #swagger.description = 'Retrieve overview statistics for the admin dashboard'
      #swagger.responses[200] = {
          description: 'Successfully retrieved overview statistics',
           content: {
                "application/json": {
                    schema:{
                        $ref: "#/components/schemas/OverviewResponseSchema"
                    }
                }
            }
          }
      }
      #swagger.security = [{ "bearerAuth": [] }]
    */
    return DashboardController.overview(req, res, next);
});
router.get("/categories-stats", (req, res, next) => {
    /*
        #swagger.tags = ['Admin Dashboard']
        #swagger.summary = 'Get category statistics'
        #swagger.description = 'Retrieve statistics for categories in the admin dashboard'
        #swagger.responses[200] = {
            description: 'Successfully retrieved category statistics',
                content: {
                    "application/json": {
                        schema:{
                            $ref: "#/components/schemas/CategoryStatResponseSchema"
                        }
                    }
                }
            }
        }
        #swagger.security = [{ "bearerAuth": [] }]
      */
    return DashboardController.categoryStat(req, res, next);
});
router.get("/recent-posts", (req, res, next) => {
    /*
        #swagger.tags = ['Admin Dashboard']
        #swagger.summary = 'Get recent posts'
        #swagger.description = 'Retrieve recent posts for the admin dashboard'
        #swagger.parameters['limit'] = {
            in: 'query',
            description: 'Number of posts to retrieve',
            type: 'number',
            default: 5,
}
        #swagger.responses[200] = {
            description: 'Successfully retrieved recent posts',
                content: {
                    "application/json": {
                        schema:{
                            $ref: "#/components/schemas/RecentPostsResponseSchema"
                        }
                    }
                }
            }
        }
        #swagger.security = [{ "bearerAuth": [] }]
      */
    return DashboardController.getRecentPost(req, res, next);
});
router.get("/authors-stats", (req, res, next) => {
    /*
        #swagger.tags = ['Admin Dashboard']
        #swagger.summary = 'Get author statistics'
        #swagger.description = 'Retrieve statistics for authors in the admin dashboard'
        #swagger.responses[200] = {
            description: 'Successfully retrieved author statistics',
                content: {
                    "application/json": {
                        schema:{
                            $ref: "#/components/schemas/AuthorStatResponseSchema"
                        }
                    }
                }
            }
        }
        #swagger.security = [{ "bearerAuth": [] }]
      */
    return DashboardController.getAuthorstat(req, res, next);
});
router.get("/posts-analytics", (req, res, next) => {
    /*
        #swagger.tags = ['Admin Dashboard']
        #swagger.summary = 'Get posts analytics'
        #swagger.description = 'Retrieve posts analytics data for the admin dashboard'
        #swagger.parameters['period'] = {
            in: 'query',
            description: 'day period for the analytics data',
            type: 'string',
            default: '7',
}
        #swagger.responses[200] = {
            description: 'Successfully retrieved posts analytics data',
                content: {
                    "application/json": {
                        schema:{
                            $ref: "#/components/schemas/PostsAnalyticsResponseSchema"
                        }
                    }
                }
            }
        }
        #swagger.security = [{ "bearerAuth": [] }]
      */
    return DashboardController.getPostsAnalytics(req, res, next);
});

export default router;
