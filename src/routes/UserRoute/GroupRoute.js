import express from "express";

import PostController from "http/controllers/UserController/PostController";
import GroupCategoryController from "http/controllers/UserController/GroupCategoryController";

const router = express.Router();

router.get("/", (req, res, next) => {
  /*
    #swagger.tags = ['User Group']
    #swagger.summary = 'Get all groups'
    #swagger.description = 'Retrieve all group categories'
    #swagger.responses[200] = {
        description: 'List of group categories',
        content: {
            "application/json": {
                schema: {
                    type: 'array',
                    items: {
                        type: 'object',
                        properties: {
                            id: { type: 'integer' },
                            name: { type: 'string' },
                            slug: { type: 'string' }
                        }
                    }
                }
            }
        }
    }
  */
  return GroupCategoryController.getAllGroups(req, res, next);
});

router.get("/:slug/categories", (req, res, next) => {
  /*
    #swagger.tags = ['User Group']
    #swagger.summary = 'Get categories of a group'
    #swagger.description = 'Retrieve all categories of a specific group category by slug'
    #swagger.parameters['slug'] = {
        in: 'path',
        name: 'slug',
        required: true,
        description: 'Group category slug',
        schema: { type: 'string' }
    }
    #swagger.responses[200] = {
        description: 'List of categories of the group',
        content: {
            "application/json": {
                schema: {
                    type: 'array',
                    items: {
                        type: 'object',
                        properties: {
                            id: { type: 'integer' },
                            name: { type: 'string' },
                            slug: { type: 'string' }
                        }
                    }
                }
            }
        }
    }
    #swagger.responses[404] = {
        description: 'Group not found',
        content: {
            "application/json": {
                schema: {
                    $ref: "#/components/schemas/NotFoundResponseSchema"
                }
            }
        }
    }
  */
  return PostController.getCategoriesByGroup(req, res, next);
});

router.get("/:groupSlug/:categorySlug?/posts", (req, res, next) => {
  /*
    #swagger.tags = ['User Group']
    #swagger.summary = 'Get public posts by group and category'
    #swagger.description = 'Retrieve public posts of a group category, optionally filtered by category slug'
    #swagger.parameters['groupSlug'] = {
        in: 'path',
        name: 'groupSlug',
        required: true,
        description: 'Group category slug',
        schema: { type: 'string' }
    }
    #swagger.parameters['categorySlug'] = {
        in: 'path',
        name: 'categorySlug',
        required: false,
        description: 'Category slug',
        schema: { type: 'string' }
    }
    #swagger.parameters['search'] = {
        in: 'query',
        name: 'search',
        description: 'Search by post title',
        schema: { type: 'string' }
    }
    #swagger.parameters['page'] = {
        in: 'query',
        name: 'page',
        description: 'Page number',
        schema: { type: 'integer', default: 1 }
    }
    #swagger.responses[200] = {
        description: 'List of public posts',
        content: {
            "application/json": {
                schema: {
                    type: 'object',
                    properties: {
                        totalItems: { type: 'integer' },
                        data: { type: 'array', items: { type: 'object' } },
                        totalPages: { type: 'integer' },
                        currentPage: { type: 'integer' }
                    }
                }
            }
        }
    }
    #swagger.responses[404] = {
        description: 'Group or category not found',
        content: {
            "application/json": {
                schema: {
                    $ref: "#/components/schemas/NotFoundResponseSchema"
                }
            }
        }
    }
  */
  return PostController.getAllPostByGroupAndCategory(req, res, next);
});

export default router;