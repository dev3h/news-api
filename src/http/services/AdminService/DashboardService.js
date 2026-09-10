import db from "models";
import { generateColor } from "helpers";
import RoleSysEnum from "enums/RoleSysEnum";

class DashboardService {
    static async overview() {
        const totalPosts = await db.Post.count() || 0;
        const totalCategories = await db.Category.count() || 0;
        const totalTags = await db.Tag.count() || 0;
        const totalAuthors = await db.Admin.count() || 0;
        const publishedPosts = await db.Post.count({
            where: {
                published_at: {
                    [db.Sequelize.Op.ne]: null
                }
            }
        }) || 0;
        const draftPosts = await db.Post.count({
            where: {
                published_at: null
            }
        }) || 0;
        const totalViews = await db.Post.sum('view') || 0;
        const todayViews = await db.Post.sum('view', {
            where: db.Sequelize.where(
                db.Sequelize.fn('DATE', db.Sequelize.col('updated_at')),
                '=',
                db.Sequelize.fn('CURDATE')
            )
        }) || 0;
        return {
            totalPosts,
            totalCategories,
            totalTags,
            totalAuthors,
            publishedPosts,
            draftPosts,
            totalViews,
            todayViews
        }
    }

    static async categoryStat() {
        const categoryStats = await db.Category.findAll({
            attributes: [
                'id',
                'name',
                [db.Sequelize.fn('COUNT', db.Sequelize.col('posts.id')), 'postCount']
            ],
            include: [
                {
                    model: db.Post,
                    as: 'posts',
                    attributes: [],
                    required: false, // LEFT JOIN để category không có post vẫn hiện
                }
            ],
            group: ['Category.id', 'Category.name'],
            raw: true,
        });

        return categoryStats.map(category => ({
            id: category.id,
            name: category.name,
            posts: Number.parseInt(category.postCount) || 0,
            color: generateColor(),
        }));
    }
    static async recentPost(limit) {
        const recentPosts = await db.Post.findAll({
            attributes: ['id', 'title', 'status', 'view', 'created_at', 'published_at'],
            order: [['created_at', 'DESC']],
            limit,
            include: [
                {
                    model: db.Admin,
                    as: 'created_by_admin',
                    attributes: ['id', 'display_name'],
                },
                {
                    model: db.Category,
                    as: 'category',
                    attributes: ['id', 'name'],
                }
            ],
        });

        return recentPosts;
    }
    static async authorStat(limit) {
        const authorStats = await db.Admin.findAll({
            attributes: [
                'id',
                'display_name', 
                'role',
                [db.Sequelize.fn('COUNT', db.Sequelize.col('posts.id')), 'postCount'],
                [db.Sequelize.fn('SUM', db.Sequelize.col('posts.view')), 'postView'],
            ],
            include: [
                {
                    model: db.Post,
                    as: 'posts',
                    attributes: [],
                    required: false,
                }
            ],
            group: ['Admin.id', 'Admin.display_name', 'Admin.role'],
            order: [[db.Sequelize.literal('postView'), 'DESC'], [db.Sequelize.literal('postCount'), 'DESC']],
            limit,
            raw: true,
            subQuery: false,
        });

        return authorStats.map(author => ({
            id: author?.id,
            name: author?.display_name,
            posts: Number.parseInt(author?.postCount) || 0,
            views: Number.parseInt(author?.postView) || 0,
            role: RoleSysEnum.getRoleSysName(author?.role),
        }));
    }
    static async postsAnalytics(period) {
        let dateFormat = '%Y-%m-%d';
        const periodAnalytics = new Date().setDate(new Date().getDate() - period);
        const analyticsData = await db.Post.findAll({
            attributes: [
                [db.Sequelize.fn('DATE_FORMAT', db.Sequelize.col('published_at'), dateFormat), 'period'],
                [db.Sequelize.fn('COUNT', db.Sequelize.col('id')), 'postCount'],
                [db.Sequelize.fn('SUM', db.Sequelize.col('view')), 'totalViews'],
            ],
            where: {
                published_at: {
                    [db.Sequelize.Op.ne]: null,
                    [db.Sequelize.Op.gte]: periodAnalytics,
                }
            },
            group: ['period'],
            order: [['period', 'ASC']],
            raw: true,
        });

        const posts = [];
        const views = [];

        analyticsData.forEach(data => {
            const formattedDate = new Date(data.period).toLocaleDateString('vi-VN', {
                day: '2-digit',
                month: '2-digit'
            });

            posts.push({ [formattedDate]: Number.parseInt(data.postCount) || 0 });
            views.push({ [formattedDate]: Number.parseInt(data.totalViews) || 0 });
        });

        return {
            posts,
            views
        };
    }
}

export default DashboardService