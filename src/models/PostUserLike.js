"use strict";
import columnConfig from "config/columnConfig";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class PostUserLike extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      PostUserLike.belongsTo(models.Post, {
        foreignKey: "post_id",
        // as: "post",
      });
      PostUserLike.belongsTo(models.User, {
        foreignKey: "user_id",
        // as: "tag",
      });
    }
  }
  PostUserLike.init(
    {
      post_id: DataTypes.INTEGER,
      user_id: DataTypes.INTEGER,
    },
    {
      sequelize,
      underscored: true,
      ...columnConfig,
      modelName: "PostUserLike",
      tableName: "post_user_like",
      timestamps: false,
    }
  );
  return PostUserLike;
};
