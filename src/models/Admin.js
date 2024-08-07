"use strict";
import columnConfig from "config/columnConfig";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Admin extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Admin.hasMany(models.Post, {
        foreignKey: "created_by",
        as: "posts",
      });
    }
  }
  Admin.init(
    {
      username: DataTypes.STRING,
      display_name: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      refresh_token: DataTypes.STRING,
      role: DataTypes.TINYINT,
    },
    {
      sequelize,
      // soft delete
      paranoid: true,
      underscored: true,
      ...columnConfig,
      modelName: "Admin",
    }
  );
  return Admin;
};
