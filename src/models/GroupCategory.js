"use strict";
const { Model } = require("sequelize");
import columnConfig from "config/columnConfig";
module.exports = (sequelize, DataTypes) => {
  class GroupCategory extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      GroupCategory.belongsTo(models.Admin, {
        foreignKey: "created_by",
        as: "created_by_admin",
      });
      GroupCategory.belongsTo(models.Admin, {
        foreignKey: "updated_by",
        as: "updated_by_admin",
      });
    }
  }
  GroupCategory.init(
    {
      name: DataTypes.STRING,
      slug: DataTypes.STRING,
      created_by: DataTypes.STRING,
      updated_by: DataTypes.STRING,
    },
    {
      sequelize,
      paranoid: true,
      underscored: true,
      ...columnConfig,
      modelName: "GroupCategory",
    }
  );

  return GroupCategory;
};
