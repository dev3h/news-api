"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Company extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Company.hasMany(models.User);
      Company.hasMany(models.Department);
    }
  }
  Company.init(
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
      // soft delete
      paranoid: true,
      deletedAt: "destroyTime",

      modelName: "Company",
    }
  );
  return Company;
};
