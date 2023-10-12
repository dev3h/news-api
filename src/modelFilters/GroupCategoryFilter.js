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
      // include: [
      //   { model: db.Admin, as: "created_by_email" },
      //   { model: db.Admin, as: "updated_by_email" },
      // ],
    });
    const response = getPagingData(data, page, limit);

    return response;
  }
}
export default GroupCategoryFilter;
