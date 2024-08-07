import { Op } from "sequelize";
import db from "models";
import { getPagination, getPagingData } from "helpers/pagination";
import { generateOrderPost } from "helpers/generateOrder";
import RoleSysEnum from "enums/RoleSysEnum";
import PostStatusEnum from "enums/PostStatusEnum";

class PostFilter {
  static async handleList({
    search,
    sortBy,
    sortType,
    page,
    flimit,
    user = {},
    isPublic = false,
  }) {
    const queries = {};
    if (search) {
      queries.where = {
        [Op.or]: [{ title: { [Op.like]: `%${search}%` } }, { id: search }],
      };
    }
    if (isPublic) {
      queries.where = {
        ...queries.where,
        status: PostStatusEnum.PUBLIC,
      };
    }
    if (user?.role === RoleSysEnum.AUTHOR) {
      queries.where = {
        ...queries.where,
        [Op.or]: [
          { created_by: user?.id }, // Thay userId bằng id của người đó
        ],
      };
    }
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
          model: db.Admin,
          as: "created_by_admin",
          attributes: ["id", "username", "email"],
        },
        {
          model: db.Admin,
          as: "updated_by_admin",
          attributes: ["id", "username", "email"],
        },
        {
          model: db.Category,
          as: "category",
          attributes: ["id", "name"],
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
export default PostFilter;
