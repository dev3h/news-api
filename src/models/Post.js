"use strict";
import columnConfig from "config/columnConfig";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Post extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Post.belongsTo(models.Admin, {
        foreignKey: "created_by",
        as: "created_by_admin",
      });
      Post.belongsTo(models.Admin, {
        foreignKey: "updated_by",
        as: "updated_by_admin",
      });
      Post.belongsTo(models.Category, {
        foreignKey: "category_id",
        as: "category",
      });
    }
  }
  Post.init(
    {
      title: DataTypes.STRING,
      slug: DataTypes.STRING,
      photo: DataTypes.STRING,
      content: DataTypes.TEXT,
      view: DataTypes.INTEGER,
      category_id: DataTypes.INTEGER,
      status: DataTypes.TINYINT,
      created_by: DataTypes.INTEGER,
      updated_by: DataTypes.INTEGER,
    },
    {
      sequelize,
      paranoid: true,
      underscored: true,
      ...columnConfig,
      modelName: "Post",
    }
  );
  return Post;
};
