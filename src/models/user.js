"use strict";
import columnConfig from "config/columnConfig";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      User.belongsToMany(models.Post, {
        through: models.PostUserLike,
        foreignKey: "user_id",
        as: "posts_like",
      });
    }
  }
  User.init(
    {
      name: DataTypes.STRING,
      email: DataTypes.STRING,
      email_verified_at: DataTypes.DATE,
      password: DataTypes.STRING,
      refresh_token: DataTypes.STRING,
      password_changed_at: DataTypes.DATE,
      password_reset_token: DataTypes.STRING,
      password_reset_token_expired_at: DataTypes.DATE,
    },
    {
      sequelize,
      paranoid: true,
      underscored: true,
      ...columnConfig,
      modelName: "User",
    }
  );
  return User;
};
