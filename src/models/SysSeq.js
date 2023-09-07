"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Sys_Seq extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Sys_Seq.init(
    {
      seq_name: DataTypes.STRING,
      seq_value: DataTypes.INTEGER,
    },
    {
      sequelize,
      timestamps: false,
      modelName: "Sys_Seq",
    }
  );
  Sys_Seq.removeAttribute("id");
  return Sys_Seq;
};
