"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Document extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Document.hasMany(models.Document_Detail, {
        foreignKey: "document_id",
        as: "document_detail",
      });
      Document.belongsTo(models.Company, {
        foreignKey: "company_id",
        as: "company",
      });
      Document.belongsTo(models.Department, {
        foreignKey: "department_id",
        as: "department",
      });
      Document.belongsTo(models.Supplier, {
        foreignKey: "supplier_id",
        as: "supplier",
      });
      Document.belongsTo(models.User, {
        foreignKey: "createdBy",
        as: "created_by_email",
      });
      Document.belongsTo(models.User, {
        foreignKey: "updatedBy",
        as: "updated_by_email",
      });
    }
  }
  Document.init(
    {
      document_import: DataTypes.STRING,
      document_export: DataTypes.STRING,
      import_date: DataTypes.DATE,
      export_date: DataTypes.DATE,
      quantity: DataTypes.INTEGER,
      total_price: DataTypes.FLOAT,
      note: DataTypes.TEXT,
      company_id: DataTypes.STRING,
      department_id: DataTypes.STRING,
      supplier_id: DataTypes.STRING,
      status: DataTypes.TINYINT,
      createdBy: DataTypes.STRING,
      updatedBy: DataTypes.STRING,
    },
    {
      sequelize,
      paranoid: true,
      deletedAt: "deletedAt",
      modelName: "Document",
    }
  );

  return Document;
};
