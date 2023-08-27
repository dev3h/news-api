"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Product.belongsTo(models.Unit, {
        foreignKey: "unit_id",
        as: "unit",
      });
      Product.belongsTo(models.Supplier, {
        foreignKey: "supplier_id",
        as: "supplier",
      });
      Product.belongsTo(models.Origin, {
        foreignKey: "origin_id",
        as: "origin",
      });
      Product.belongsTo(models.Group_Product, {
        foreignKey: "group_product_id",
        as: "group_product",
      });
      Product.belongsTo(models.User, {
        foreignKey: "createdBy",
        as: "created_by_email",
      });
      Product.belongsTo(models.User, {
        foreignKey: "updatedBy",
        as: "updated_by_email",
      });
    }
  }
  Product.init(
    {
      name: DataTypes.STRING,
      short_name: DataTypes.STRING,
      price: DataTypes.FLOAT,
      photo: DataTypes.STRING,
      filename: DataTypes.STRING,
      unit_id: DataTypes.INTEGER,
      supplier_id: DataTypes.INTEGER,
      origin_id: DataTypes.INTEGER,
      group_product_id: DataTypes.INTEGER,
      is_active: DataTypes.BOOLEAN,
      createdBy: DataTypes.STRING,
      updatedBy: DataTypes.STRING,
    },
    {
      sequelize,
      paranoid: true,
      deletedAt: "deletedAt",
      modelName: "Product",
    }
  );
  return Product;
};
