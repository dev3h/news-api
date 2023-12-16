import { Op } from "sequelize";
import db from "models";
import { getPagination, getPagingData } from "helpers/pagination";
import { generateOrderPost } from "helpers/generateOrder";
import RoleSysEnum from "enums/RoleSysEnum";
import PostStatusEnum from "enums/PostStatusEnum";

class GroupPostFilter {
  static async handleList({ sortBy, sortType, page, flimit, groupSlug, categorySlug }) {
    const queries = {};
    queries.where = {
      ...queries.where,
      status: PostStatusEnum.PUBLIC,
    };
    const order = generateOrderPost(sortBy, sortType);
    queries.order = order;
    const { limit, offset } = getPagination(page, flimit);
    if (limit !== Number.MAX_SAFE_INTEGER) {
      queries.limit = limit;
      queries.offset = offset;
    }
    const postData = await db.Post.findAndCountAll({
      ...queries,
      include: [
        {
          model: db.Category,
          as: "category",
          attributes: ["id", "name", "slug"],
          where: categorySlug !== "undefined" ? { slug: categorySlug } : {},
          include: [
            {
              model: db.GroupCategory,
              as: "group_category",
              attributes: ["id", "name", "slug"],
              where: {
                slug: groupSlug ? groupSlug : "",
              },
            },
          ],
        },
      ],
      raw: true,
      nest: true,
      attributes: { exclude: ["created_by", "updated_by"] },
    });
    const rowData = postData?.rows?.map((post) => {
      const statusPost = {
        id: post?.status,
        name: PostStatusEnum.getLabel(post?.status),
      };

      return {
        ...post,
        statusPost,
      };
    });
    const data = {
      count: postData?.count,
      rows: rowData,
    };

    if (limit !== Number.MAX_SAFE_INTEGER) {
      const response = getPagingData(data, page, limit);
      return response;
    } else {
      const response = data;

      return response;
    }
  }
}
export default GroupPostFilter;
