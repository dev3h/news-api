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
      // define association here
    }
  }
  Document.init(
    {
      name: DataTypes.STRING,
      document_import: DataTypes.STRING,
      document_export: DataTypes.STRING,
      import_date: DataTypes.DATE,
      export_date: DataTypes.DATE,
      quantity: DataTypes.INTEGER,
      total_price: DataTypes.FLOAT,
      company_id: DataTypes.STRING,
      department_id: DataTypes.STRING,
      supplier_id: DataTypes.STRING,
      createdBy: DataTypes.STRING,
      updatedBy: DataTypes.STRING,
      status: DataTypes.TINYINT,
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
