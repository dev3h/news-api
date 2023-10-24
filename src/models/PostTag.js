"use strict";
import columnConfig from "config/columnConfig";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class PostTag extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      PostTag.belongsTo(models.Post, {
        foreignKey: "post_id",
        // as: "post",
      });
      PostTag.belongsTo(models.Tag, {
        foreignKey: "tag_id",
        // as: "tag",
      });
    }
  }
  PostTag.init(
    {
      post_id: DataTypes.INTEGER,
      tag_id: DataTypes.INTEGER,
    },
    {
      sequelize,
      underscored: true,
      ...columnConfig,
      modelName: "PostTag",
      tableName: "post_tag",
      timestamps: false,
    }
  );
  return PostTag;
};
