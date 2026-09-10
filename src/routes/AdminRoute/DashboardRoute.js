import express from "express";

import DashboardController from "http/controllers/AdminController/DashboardController";
import { verifyAccessToken } from "http/middlewares/verifyToken";

const router = express.Router();

router.use(verifyAccessToken);

router.get("/overview", (req, res, next) => {
  /*
    #swagger.tags = ['Admin Dashboard']
    #swagger.summary = 'Get overview statistic'
    #swagger.description = 'Retrieve overview statistics for the admin dashboard'
    #swagger.security = [{ "bearerAuth": [] }]
    #swagger.responses[200] = {
        description: 'Successfully retrieved overview statistics',
        content: {
            "application/json": {
                schema: {
                    $ref: "#/components/schemas/OverviewResponseSchema"
                }
            }
        }
    }
    #swagger.responses[401] = {
        description: 'Missing or invalid access token',
        content: {
            "application/json": {
                schema: {
                    $ref: "#/components/schemas/UnauthorizedResponseSchema"
                }
            }
        }
    }
  */
  return DashboardController.overview(req, res, next);
});

router.get("/categories-stats", (req, res, next) => {
  /*
    #swagger.tags = ['Admin Dashboard']
    #swagger.summary = 'Get category statistics'
    #swagger.description = 'Retrieve statistics for categories in the admin dashboard'
    #swagger.security = [{ "bearerAuth": [] }]
    #swagger.responses[200] = {
        description: 'Successfully retrieved category statistics',
        content: {
            "application/json": {
                schema: {
                    $ref: "#/components/schemas/CategoryStatResponseSchema"
                }
            }
        }
    }
    #swagger.responses[401] = {
        description: 'Missing or invalid access token',
        content: {
            "application/json": {
                schema: {
                    $ref: "#/components/schemas/UnauthorizedResponseSchema"
                }
            }
        }
    }
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
        name: 'limit',
        description: 'Number of posts to retrieve',
        schema: { type: 'number', example: 5 }
    }
    #swagger.security = [{ "bearerAuth": [] }]
    #swagger.responses[200] = {
        description: 'Successfully retrieved recent posts',
        content: {
            "application/json": {
                schema: {
                    $ref: "#/components/schemas/RecentPostsResponseSchema"
                }
            }
        }
    }
    #swagger.responses[401] = {
        description: 'Missing or invalid access token',
        content: {
            "application/json": {
                schema: {
                    $ref: "#/components/schemas/UnauthorizedResponseSchema"
                }
            }
        }
    }
  */
  return DashboardController.getRecentPost(req, res, next);
});

router.get("/authors-stats", (req, res, next) => {
  /*
    #swagger.tags = ['Admin Dashboard']
    #swagger.summary = 'Get author statistics'
    #swagger.description = 'Retrieve statistics for authors in the admin dashboard'
    #swagger.parameters['limit'] = {
        in: 'query',
        name: 'limit',
        description: 'Number of authors to retrieve',
        schema: { type: 'number', example: 5 }
    }
    #swagger.security = [{ "bearerAuth": [] }]
    #swagger.responses[200] = {
        description: 'Successfully retrieved author statistics',
        content: {
            "application/json": {
                schema: {
                    $ref: "#/components/schemas/AuthorStatResponseSchema"
                }
            }
        }
    }
    #swagger.responses[401] = {
        description: 'Missing or invalid access token',
        content: {
            "application/json": {
                schema: {
                    $ref: "#/components/schemas/UnauthorizedResponseSchema"
                }
            }
        }
    }
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
        name: 'period',
        description: 'Day period for the analytics data',
        schema: { type: 'string', example: '7d', default: '7d' }
    }
    #swagger.security = [{ "bearerAuth": [] }]
    #swagger.responses[200] = {
        description: 'Successfully retrieved posts analytics data',
        content: {
            "application/json": {
                schema: {
                    $ref: "#/components/schemas/PostsAnalyticsResponseSchema"
                }
            }
        }
    }
    #swagger.responses[401] = {
        description: 'Missing or invalid access token',
        content: {
            "application/json": {
                schema: {
                    $ref: "#/components/schemas/UnauthorizedResponseSchema"
                }
            }
        }
    }
  */
  return DashboardController.getPostsAnalytics(req, res, next);
});

export default router;