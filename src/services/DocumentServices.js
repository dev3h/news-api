import db from "models";
import { Op } from "sequelize";
import xlsx from "xlsx";
import fs from "fs";
class DocumentService {
  static async getAll({ page, limit, name, orderBy, orderType, ...query }) {
    try {
      const queries = {
        raw: true,
        nest: true,
      };
      const offset = !page || +page <= 1 ? 0 : +page - 1;
      const fLimit = +limit || 10;
      queries.offset = offset * fLimit;
      queries.limit = fLimit;
      queries.order = [[orderBy || "createdAt", orderType || "DESC"]];

      if (name) {
        queries.where = {
          name: {
            [Op.like]: `%${name}%`,
          },
        };
      }
      const response = await db.Document.findAndCountAll({
        where: query,
        ...queries,
        include: [
          {
            model: db.Document_Detail,
            as: "document_detail",
            include: [
              {
                model: db.Product,
                as: "product",
                attributes: ["id", "name"],
              },
            ],
            attributes: {
              exclude: [
                "product_id",
                "document_id",
                "createdBy",
                "updatedBy",
                "createdAt",
                "updatedAt",
                "deletedAt",
              ],
            },
          },
        ],
      });

      return {
        error: response ? 0 : 1,
        data: response,
      };
    } catch (error) {
      throw error;
    }
  }
  // phần này cần phải sửa lại
  static async create(data) {
    const { product_info, ...document_data } = data;
    try {
      const response = await db.Document.findOrCreate({
        where: { document_import: data.document_import },
        defaults: document_data,
      });
      const [document, created] = response;
      if (!created) throw new Error("document already exists");
      const document_detail_data = product_info.map((item) => {
        const total_price = item.quantity * item.price;
        return {
          document_id: document.id,
          product_id: item.id,
          quantity: item.quantity,
          price: item.price,
          total_price: total_price,
        };
      });
      // insert multiple rows
      await db.Document_Detail.bulkCreate(document_detail_data);

      return {
        error: response[1] ? 0 : 1,
        mes: response[1] ? "create success" : "create failed",
      };
    } catch (error) {
      const current_document = await db.Document.findOne({
        where: { document_import: data.document_import },
      });
      if (current_document) {
        await db.Document.destroy({
          where: { id: current_document.id },
          force: true,
        });
      }
      throw error;
    }
  }
  static async getOne(id) {
    try {
      const response = await db.Document.findByPk(id, {
        include: [
          {
            model: db.Document_Detail,
            as: "document_detail",
            include: [
              {
                model: db.Product,
                as: "product",
                attributes: ["id", "name"],
              },
            ],
            attributes: {
              exclude: [
                "product_id",
                "document_id",
                "createdBy",
                "updatedBy",
                "createdAt",
                "updatedAt",
                "deletedAt",
              ],
            },
          },
        ],
      });
      return {
        error: response ? 0 : 1,
        data: response,
      };
    } catch (error) {
      throw error;
    }
  }
  static async update(id, data) {
    try {
      const response = await db.Document.update(data, { where: { id } });
      return {
        error: response[0] > 0 ? 0 : 1,
        mes: response[0] > 0 ? "update success" : "update failed",
      };
    } catch (error) {
      throw error;
    }
  }
  static async destroy(id) {
    try {
      const response = await db.Document.destroy({ where: { id } });
      return {
        error: response > 0 ? 0 : 1,
        mes: response > 0 ? "delete success" : "delete failed",
      };
    } catch (error) {
      throw error;
    }
  }
  static async importExcel(fileData) {
    try {
      const workbook = xlsx.readFile(fileData.path);
      const sheetName = workbook.SheetNames[0];
      const sheetData = xlsx.utils.sheet_to_json(workbook.Sheets[sheetName]);
      // Check if sheet has exactly 2 columns
      const columnNames = Object.keys(sheetData[0]);
      if (columnNames.length !== 2) {
        fs.unlinkSync(fileData.path);
        return {
          error: 1,
          mes: "Sheet không có đúng 2 cột",
          data: null,
        };
      }
      // Check if the column names are "product_id" and "quantity"
      const expectedColumnNames = ["product_id", "quantity"];
      if (!columnNames.every((name) => expectedColumnNames.includes(name))) {
        fs.unlinkSync(fileData.path);
        return {
          error: 1,
          mes: "Cột phải có tên là product_id và quantity",
          data: null,
        };
      }

      fs.unlinkSync(fileData.path);
      return {
        error: 0,
        mes: "import success",
        data: sheetData,
      };
    } catch (error) {
      fs.unlinkSync(fileData.path);
      throw error;
    }
  }
}
export default DocumentService;
