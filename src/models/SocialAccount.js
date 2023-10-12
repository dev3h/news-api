"use strict";
import columnConfig from "config/columnConfig";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class SocialAccount extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {}
  }
  SocialAccount.init(
    {
      user_id: DataTypes.INTEGER,
      provider_user_id: DataTypes.STRING,
      provider: DataTypes.STRING,
    },
    {
      sequelize,
      underscored: true,
      ...columnConfig,
      modelName: "SocialAccount",
    }
  );
  return SocialAccount;
};
