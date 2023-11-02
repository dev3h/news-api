import { Op } from "sequelize";
import db from "models";
import { getPagination, getPagingData } from "helpers/pagination";
import { generateOrderPost } from "helpers/generateOrder";

class PostFilter {
  static async handleList({ search, sortBy, sortType, page, flimit }) {
    const queries = {};
    if (search) {
      queries.where = {
        [Op.or]: [{ title: { [Op.like]: `%${search}%` } }, { id: search }],
      };
    }
    const order = generateOrderPost(sortBy, sortType);
    queries.order = order;
    const { limit, offset } = getPagination(page, flimit);
    if (limit !== Number.MAX_SAFE_INTEGER) {
      queries.limit = limit;
      queries.offset = offset;
    }

    const data = await db.Post.findAndCountAll({
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
      attributes: { exclude: ["created_by", "updated_by"] },
    });
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
