// import { badRequest, internalServerError } from "../middlewares/handle_error";
import db from "models";
import AuthorFilter from "modelFilters/AuthorFilter";
import generateSlug from "helpers/generateSlug";
import {
  generateCreatedByAndUpdatedBy,
  generateUpdatedBy,
} from "helpers/generateCreatedByAndUpdatedBy";
import { internalServerError, badRequest } from "helpers/generateError";
import RoleSysEnum from "enums/RoleSysEnum";

class ManagerAuthorController {
  static async getAll(req, res) {
    try {
      const {
        search = "",
        sortBy = "id",
        sortType = "ASC",
        page = 1,
        flimit,
      } = req.query;
      const filter = {
        search,
        sortBy,
        sortType,
        page,
        flimit,
      };
      const response = await AuthorFilter.handleList(filter);
      return res.status(200).json(response);
    } catch (error) {
      internalServerError(error, res);
    }
  }

  static async create(req, res) {
    try {
      // change this
      const { username, email } = req.body;
      const existEmail = await db.Admin.findOne({
        where: { email },
      });
      if (existEmail) badRequest(new Error("Email đã tồn tại"), res);

      const response = await db.Admin.findOrCreate({
        where: { username },
        defaults: {
          ...req.body,
          role: RoleSysEnum.AUTHOR,
        },
      });
      if (response[1] === false)
        return res.status(400).json({
          message: "Tác giả đã tồn tại",
        });
      return res.status(200).json({
        message: "Tạo tác giả thành công",
      });
    } catch (error) {
      internalServerError(error, res);
    }
  }

  static async getOne(req, res) {
    try {
      const response = await db.Admin.findOne({
        where: {
          id: req.params.id,
        },
        include: [
          {
            model: db.Post,
            as: "posts",
            attributes: ["id", "title"],
          },
        ],
      });
      if (!response)
        return res.status(404).json({
          message: "Không tìm thấy tác giả",
        });
      response.dataValues.roleInfo = {
        id: response.role,
        name: RoleSysEnum.getRoleSysName(response.role),
      };
      return res.status(200).json(response);
    } catch (error) {
      internalServerError(error, res);
    }
  }

  static async update(req, res) {
    try {
      // change this
      const response = await db.Admin.update(req.body, {
        where: { id: req.params.id },
      });
      if (response[0] === 0)
        return res.status(404).json({
          message: "Không tìm thấy tác giả",
        });
      return res.status(200).json({
        message: "Cập nhật tác giả thành công",
      });
    } catch (error) {
      internalServerError(error, res);
    }
  }

  static async destroy(req, res) {
    try {
      const response = await db.Admin.destroy({
        where: { id: req.params.id },
      });
      if (response === 0)
        return res.status(404).json({
          message: "Không tìm thấy tác giả",
        });
      return res.status(200).json({
        message: "Xóa tác giả thành công",
      });
    } catch (error) {
      internalServerError(error, res);
    }
  }
}

export default ManagerAuthorController;
