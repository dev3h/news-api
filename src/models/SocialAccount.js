"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Social_Account extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {}
  }
  Social_Account.init(
    {
      user_id: DataTypes.INTEGER,
      provider_user_id: DataTypes.STRING,
      provider: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Social_Account",
    }
  );
  return Social_Account;
};
