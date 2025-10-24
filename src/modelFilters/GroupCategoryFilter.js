import { Op } from "sequelize";
import db from "models";
import { getPagination, getPagingData } from "helpers/pagination";
import { generateOrderBasic } from "helpers/generateOrder";

class GroupCategoryFilter {
  static async handleList({ search, sortBy, sortType, page, flimit }) {
    const queries = {};
    if (search) {
      queries.where = {
        [Op.or]: [{ name: { [Op.like]: `%${search}%` } }, { id: search }],
      };
    }
    const order = generateOrderBasic(sortBy, sortType);
    queries.order = order;
    const { limit, offset } = getPagination(page, flimit);
    if (limit !== Number.MAX_SAFE_INTEGER) {
      queries.limit = limit;
      queries.offset = offset;
    }

    const data = await db.GroupCategory.findAndCountAll({
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
          as: "categories",
          attributes: ["id", "name"],
          separate: true,
        }
      ],
      attributes: {
        exclude: ["created_by", "updated_by"],
      },
    });
    data.rows = data.rows.map(groupCategory => ({
      ...groupCategory.toJSON(),
      categories_count: groupCategory.categories ? groupCategory.categories.length : 0
    }));
    if (limit !== Number.MAX_SAFE_INTEGER) {
      const response = getPagingData(data, page, limit);
      return response;
    } else {
      const response = data;

      return response;
    }
  }
}
export default GroupCategoryFilter;
