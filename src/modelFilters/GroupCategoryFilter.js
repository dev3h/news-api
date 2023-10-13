import { Op } from "sequelize";
import db from "models";
import { getPagination, getPagingData } from "helpers/pagination";
import { generateOrder } from "helpers";

class GroupCategoryFilter {
  static async handleList({ search, sortBy, sortType, page, flimit }) {
    const queries = {};
    if (search) {
      queries.where = {
        [Op.or]: [{ name: { [Op.like]: `%${search}%` } }, { id: search }],
      };
    }
    const order = generateOrder(sortBy, sortType);
    queries.order = order;
    const { limit, offset } = getPagination(page, flimit);
    queries.limit = limit;
    queries.offset = offset;

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
      ],
      attributes: { exclude: ["created_by", "updated_by"] },
    });
    const response = getPagingData(data, page, limit);

    return response;
  }
}
export default GroupCategoryFilter;
