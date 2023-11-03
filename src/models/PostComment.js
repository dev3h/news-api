"use strict";
import columnConfig from "config/columnConfig";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class PostComment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      PostComment.belongsTo(models.Post, {
        foreignKey: "post_id",
        as: "post",
      });
      PostComment.belongsTo(models.User, {
        foreignKey: "user_id",
        as: "user",
      });
    }
  }
  PostComment.init(
    {
      post_id: DataTypes.INTEGER,
      user_id: DataTypes.INTEGER,
      content: DataTypes.TEXT,
    },
    {
      sequelize,
      underscored: true,
      ...columnConfig,
      modelName: "PostComment",
    }
  );
  return PostComment;
};
