"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Department extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Department.belongsTo(models.Company, {
        foreignKey: "company_id",
        as: "company",
      });
      Department.hasMany(models.User);
    }
  }
  Department.init(
    {
      name: DataTypes.STRING,
      address: DataTypes.TEXT,
      phone: DataTypes.STRING,
      email: DataTypes.STRING,
      fax: DataTypes.STRING,
      is_active: DataTypes.BOOLEAN,
      company_id: DataTypes.STRING,
      is_warehouse: DataTypes.BOOLEAN,
      sign: DataTypes.STRING,
      createdBy: DataTypes.STRING,
      updatedBy: DataTypes.STRING,
    },
    {
      sequelize,
      paranoid: true,
      deletedAt: "deletedAt",
      modelName: "Department",
    }
  );
  return Department;
};
