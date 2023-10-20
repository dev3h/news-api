"use strict";
import columnConfig from "config/columnConfig";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Tag extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Tag.belongsTo(models.Admin, {
        foreignKey: "created_by",
        as: "created_by_admin",
      });
      Tag.belongsTo(models.Admin, {
        foreignKey: "updated_by",
        as: "updated_by_admin",
      });
    }
  }
  Tag.init(
    {
      name: DataTypes.STRING,
      slug: DataTypes.STRING,
      created_by: DataTypes.INTEGER,
      updated_by: DataTypes.INTEGER,
    },
    {
      sequelize,
      paranoid: true,
      underscored: true,
      ...columnConfig,
      modelName: "Tag",
    }
  );
  return Tag;
};
