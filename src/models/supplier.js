"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Supplier extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Supplier.belongsToMany(models.User, {
        foreignKey: "createdBy",
        as: "user_createdBy",
      });
      Supplier.belongsToMany(models.User, {
        foreignKey: "updatedBy",
        as: "user_updatedBy",
      });
    }
  }
  Supplier.init(
    {
      name: DataTypes.STRING,
      address: DataTypes.TEXT,
      phone: DataTypes.STRING,
      email: DataTypes.STRING,
      fax: DataTypes.STRING,
      is_active: DataTypes.BOOLEAN,
      createdBy: DataTypes.STRING,
      updatedBy: DataTypes.STRING,
    },
    {
      sequelize,
      paranoid: true,
      deletedAt: "deletedAt",
      modelName: "Supplier",
    }
  );
  return Supplier;
};
