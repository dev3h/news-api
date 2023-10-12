import db from "models";
import { Op } from "sequelize";
import fs from "fs";
import xlsx from "xlsx";
import generateBarcode from "../helpers/createBarCode";
class ProductService {
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
      queries.order = [[orderBy || "created_at", orderType || "DESC"]];

      if (name) {
        queries.where = {
          name: {
            [Op.like]: `%${name}%`,
          },
        };
      }
      const response = await db.Product.findAndCountAll({
        where: query,
        ...queries,
      });

      return {
        error: response ? 0 : 1,
        data: response,
      };
    } catch (error) {
      throw error;
    }
  }
  static async create(data, fileData) {
    try {
      const seq_name = `HH@${new Date().getFullYear()}@${data?.group_product_id}`;
      const sys_seq = await db.Sys_Seq.findOne({
        where: { seq_name },
      });
      if (sys_seq == null) {
        // create seq
        const sys_seq = await db.Sys_Seq.create({ seq_name, seq_value: 1 });
        data.id = generateBarcode(data.group_product_id, sys_seq.seq_value);
      } else {
        data.id = generateBarcode(data.group_product_id, sys_seq.seq_value + 1);
      }
      const response = await db.Product.findOrCreate({
        where: { name: data.name },
        defaults: {
          ...data,
          photo: fileData?.filename,
        },
      });
      if (response[1] && sys_seq != null) {
        await db.Sys_Seq.update(
          { seq_value: sys_seq?.seq_value + 1 },
          { where: { seq_name } }
        );
      }
      if (response[1] === false && fileData) fs.unlinkSync(fileData.path);
      return {
        error: response[1] ? 0 : 1,
        mes: response[1] ? "create success" : "create failed",
      };
    } catch (error) {
      if (fileData) fs.unlinkSync(fileData.path);
      throw error;
    }
  }
  static async getOne(id) {
    try {
      const response = await db.Product.findByPk(id, {
        include: [
          {
            model: db.Group_Product,
            as: "group_product",
            attributes: ["id", "name"],
          },
          {
            model: db.Unit,
            as: "unit",
            attributes: ["id", "name"],
          },
          {
            model: db.Supplier,
            as: "supplier",
            attributes: ["id", "name"],
          },
          {
            model: db.Origin,
            as: "origin",
            attributes: ["id", "name"],
          },
        ],
        attributes: {
          exclude: ["unit_id", "supplier_id", "origin_id", "group_product_id"],
        },
      });
      return {
        error: response ? 0 : 1,
        data: response,
      };
    } catch (error) {
      throw error;
    }
  }
  static async update({ id, ...data }, fileData) {
    try {
      const product = await db.Product.findByPk(id);
      if (product.photo && fileData) fs.unlinkSync(`uploads/${product.photo}`);
      const response = await db.Product.update(
        {
          ...data,
          photo: fileData?.filename,
        },
        { where: { id } }
      );
      return {
        error: response[0] > 0 ? 0 : 1,
        mes: response[0] > 0 ? "update success" : "update failed",
      };
    } catch (error) {
      if (fileData) fs.unlinkSync(fileData.path);
      throw error;
    }
  }
  static async destroy(id) {
    try {
      const response = await db.Product.destroy({ where: { id } });
      return {
        error: response > 0 ? 0 : 1,
        mes: response > 0 ? "delete success" : "delete failed",
      };
    } catch (error) {
      throw error;
    }
  }
  static async exportExcel(res) {
    try {
      // query with association
      const response = await db.Product.findAll({
        include: [
          {
            model: db.Group_Product,
            as: "group_product",
            attributes: ["name"],
          },
          {
            model: db.Unit,
            as: "unit",
            attributes: ["name"],
          },
          {
            model: db.Supplier,
            as: "supplier",
            attributes: ["name"],
          },
          {
            model: db.Origin,
            as: "origin",
            attributes: ["name"],
          },
        ],
        attributes: {
          exclude: [
            "created_at",
            "updated_at",
            "deletedAt",
            "createdBy",
            "updatedBy",
            "photo",
            "filename",
            "is_active",
          ],
        },
      });

      const heading = [
        "id",
        "TÊN HÀNG",
        "TÊN TẮT",
        "GIÁ",
        "MÃ NHÓM",
        "MÃ ĐƠN VỊ TÍNH",
        "MÃ NCC",
        "MÃ XUẤT XỨ",
        "TÊN NHÓM",
        "TÊN ĐƠN VỊ TÍNH",
        "TÊN NCC",
        "XUẤT XỨ",
      ];
      if (!response) return res.status(404).json({ mes: "data not found" });
      const data = response?.map((item) => {
        return [
          item?.id,
          item?.name,
          item?.short_name,
          item?.price,
          item?.group_product_id,
          item?.unit_id,
          item?.supplier_id,
          item?.origin_id,
          item?.group_product?.name,
          item?.unit?.name,
          item?.supplier?.name,
          item?.origin?.name,
        ];
      });
      const workbook = xlsx.utils.book_new();
      const worksheet = xlsx.utils.json_to_sheet(data);
      xlsx.utils.sheet_add_aoa(worksheet, [heading]);
      xlsx.utils.book_append_sheet(workbook, worksheet, "Product");
      const buffer = xlsx.write(workbook, { bookType: "xlsx", type: "buffer" });
      res.attachment("product.xlsx");

      return res.send(buffer);
    } catch (error) {
      throw error;
    }
  }
}
export default ProductService;
