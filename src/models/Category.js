"use strict";
import columnConfig from "config/columnConfig";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Category extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Category.hasMany(models.Post, {
        foreignKey: "category_id",
        as: "posts",
      });
      Category.belongsTo(models.Admin, {
        foreignKey: "created_by",
        as: "created_by_admin",
      });
      Category.belongsTo(models.Admin, {
        foreignKey: "updated_by",
        as: "updated_by_admin",
      });
      Category.belongsTo(models.GroupCategory, {
        foreignKey: "group_category_id",
        as: "group_category",
      });
    }
  }
  Category.init(
    {
      name: DataTypes.STRING,
      slug: DataTypes.STRING,
      group_category_id: DataTypes.INTEGER,
      created_by: DataTypes.INTEGER,
      updated_by: DataTypes.INTEGER,
    },
    {
      sequelize,
      paranoid: true,
      underscored: true,
      ...columnConfig,
      modelName: "Category",
    }
  );
  return Category;
};
