import { Op } from "sequelize";
import db from "models";
import { getPagination, getPagingData } from "helpers/pagination";

class GroupCategoryFilter {
  static async handleList({ search, sortBy, sortType, page, flimit }) {
    const queries = {};
    if (search) {
      queries.where = {
        [Op.or]: [{ name: { [Op.like]: `%${search}%` } }, { id: search }],
      };
    }
    queries.order = [[sortBy, sortType]];
    const { limit, offset } = getPagination(page, flimit);
    queries.limit = limit;
    queries.offset = offset;

    const data = await db.Group_Category.findAndCountAll({
      ...queries,
    });
    const response = getPagingData(data, page, limit);

    return response;
  }
}
export default GroupCategoryFilter;
