"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      User.belongsTo(models.Company);
      User.belongsTo(models.Department);
    }
  }
  User.init(
    {
      username: DataTypes.STRING,
      password: DataTypes.STRING,
      company_id: DataTypes.STRING,
      department_id: DataTypes.STRING,
      address: DataTypes.TEXT,
      phone: DataTypes.STRING,
      email: DataTypes.STRING,
      is_active: DataTypes.BOOLEAN,
      is_group: DataTypes.BOOLEAN,
      refresh_token: DataTypes.STRING,
      password_changed_at: DataTypes.DATE,
      password_reset_token: DataTypes.STRING,
      password_reset_token_expired_at: DataTypes.DATE,
    },
    {
      sequelize,

      paranoid: true,
      deletedAt: "deletedAt",
      modelName: "User",
    }
  );
  return User;
};
