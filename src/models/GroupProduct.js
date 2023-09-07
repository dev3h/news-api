"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Group_Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Group_Product.belongsTo(models.User, {
        foreignKey: "createdBy",
        as: "created_by_email",
      });
      Group_Product.belongsTo(models.User, {
        foreignKey: "updatedBy",
        as: "updated_by_email",
      });
    }
  }
  Group_Product.init(
    {
      name: DataTypes.STRING,
      is_active: DataTypes.BOOLEAN,
      createdBy: DataTypes.STRING,
      updatedBy: DataTypes.STRING,
    },
    {
      sequelize,
      paranoid: true,
      deletedAt: "deletedAt",
      modelName: "Group_Product",
    }
  );
  return Group_Product;
};
