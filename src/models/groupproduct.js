"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class GroupProduct extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      GroupProduct.belongsToMany(models.User, {
        foreignKey: "createdBy",
        as: "user_createdBy",
      });
      GroupProduct.belongsToMany(models.User, {
        foreignKey: "updatedBy",
        as: "user_updatedBy",
      });
    }
  }
  GroupProduct.init(
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
      modelName: "GroupProduct",
    }
  );
  return GroupProduct;
};
