import { Op } from "sequelize";
import db from "models";
import { getPagination, getPagingData } from "helpers/pagination";
import RoleSysEnum from "../enums/RoleSysEnum";
import { generateOrderAuthor } from "helpers/generateOrder";

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
    const order = generateOrderAuthor(sortBy, sortType);
    queries.order = order;
    const { limit, offset } = getPagination(page, flimit);
    if (limit !== Number.MAX_SAFE_INTEGER) {
      queries.limit = limit;
      queries.offset = offset;
    }

    const data = await db.Admin.findAndCountAll({
      ...queries,
      // where: { ...queries.where, role: RoleSysEnum.AUTHOR },
      where: { ...queries.where },
    });
    const newRows = data?.rows?.map((item) => {
      return {
        ...item?.dataValues,
        roleInfo: {
          id: item?.role,
          name: RoleSysEnum.getRoleSysName(item?.role),
        },
      };
    });
    const newData = { ...data, rows: newRows };
    if (limit !== Number.MAX_SAFE_INTEGER) {
      const response = getPagingData(newData, page, limit);
      return response;
    } else {
      const response = newData;

      return response;
    }
  }
}
export default AuthorFilter;
