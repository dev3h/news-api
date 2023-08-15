"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Unit extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Unit.belongsToMany(models.User, {
        foreignKey: "createdBy",
        as: "user_createdBy",
      });
      Unit.belongsToMany(models.User, {
        foreignKey: "updatedBy",
        as: "user_updatedBy",
      });
    }
  }
  Unit.init(
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
      modelName: "Unit",
    }
  );
  return Unit;
};
