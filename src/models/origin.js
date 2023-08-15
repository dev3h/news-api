"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Origin extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Origin.belongsToMany(models.User, {
        foreignKey: "createdBy",
        as: "user_createdBy",
      });
      Origin.belongsToMany(models.User, {
        foreignKey: "updatedBy",
        as: "user_updatedBy",
      });
    }
  }
  Origin.init(
    {
      name: DataTypes.STRING,
      is_active: DataTypes.BOOLEAN,
      createdBy: DataTypes.STRING,
      updatedBy: DataTypes.STRING,
    },
    {
      sequelize,
      paranoid: true,
      deletedAt: "deletedAt",
      modelName: "Origin",
    }
  );
  return Origin;
};
