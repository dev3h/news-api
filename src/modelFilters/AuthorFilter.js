import { Op } from "sequelize";
import db from "models";
import { getPagination, getPagingData } from "helpers/pagination";
import { generateOrderBasic } from "helpers/generateOrder";
import RoleSysEnum from "../enums/RoleSysEnum";

class AuthorFilter {
  static async handleList({ search, sortBy, sortType, page, flimit }) {
    const queries = {};
    if (search) {
      queries.where = {
        [Op.or]: [
          { username: { [Op.like]: `%${search}%` } },
          { display_name: { [Op.like]: `%${search}%` } },
          { id: search },
        ],
      };
    }
    const order = generateOrderBasic(sortBy, sortType);
    queries.order = order;
    const { limit, offset } = getPagination(page, flimit);
    if (limit !== Number.MAX_SAFE_INTEGER) {
      queries.limit = limit;
      queries.offset = offset;
    }

    const data = await db.Admin.findAndCountAll({
      ...queries,
      where: { ...queries.where, role: RoleSysEnum.AUTHOR },
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
export default AuthorFilter;
