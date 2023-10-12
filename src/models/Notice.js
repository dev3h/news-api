"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Notice extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {}
  }
  Notice.init(
    {
      title: DataTypes.STRING,
      content: DataTypes.TEXT,
      status: DataTypes.TINYINT,
      created_by: DataTypes.INTEGER,
      updated_by: DataTypes.INTEGER,
    },
    {
      sequelize,
      paranoid: true,
      underscored: true,
      modelName: "Notice",
    }
  );
  return Notice;
};
