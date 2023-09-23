"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Document_Detail extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Document_Detail.belongsTo(models.Product, {
        foreignKey: "product_id",
        as: "product",
      });
      Document_Detail.belongsTo(models.User, {
        foreignKey: "createdBy",
        as: "created_by_email",
      });
      Document_Detail.belongsTo(models.User, {
        foreignKey: "updatedBy",
        as: "updated_by_email",
      });
    }
  }
  Document_Detail.init(
    {
      document_id: DataTypes.INTEGER,
      product_id: DataTypes.STRING,
      quantity: DataTypes.INTEGER,
      price: DataTypes.FLOAT,
      discount: DataTypes.FLOAT,
      total_price: DataTypes.FLOAT,
      createdBy: DataTypes.INTEGER,
      updatedBy: DataTypes.INTEGER,
    },
    {
      sequelize,
      paranoid: true,
      deletedAt: "deletedAt",
      modelName: "Document_Detail",
    }
  );
  return Document_Detail;
};
