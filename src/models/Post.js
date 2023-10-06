"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Post extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {}
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
      deletedAt: "deleted_at",
      modelName: "Post",
    }
  );
  return Post;
};
