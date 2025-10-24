import db from "models";
import { internalServerError } from "helpers/generateError";

class GroupCategoryController {
  static async getAllGroups(req, res) {
    try {
      const response = await db.GroupCategory.findAll({
        attributes: ["id", "name", "slug"],
        include: [
          {
            model: db.Category,
            as: "categories",
            attributes: ["id", "name", "slug"],
          },
        ],
      });
      return res.status(200).json(response);
    } catch (error) {
      internalServerError(error, res);
    }
  }
}

export default GroupCategoryController;
