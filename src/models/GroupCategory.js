"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Group_Category extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {}
  }
  Group_Category.init(
    {
      name: DataTypes.STRING,
      slug: DataTypes.STRING,
      created_by: DataTypes.STRING,
      updated_by: DataTypes.STRING,
    },
    {
      sequelize,
      paranoid: true,
      deletedAt: "deleted_at",
      modelName: "Group_Category",
    }
  );

  return Group_Category;
};
