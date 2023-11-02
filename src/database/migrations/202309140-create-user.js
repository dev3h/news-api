"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Users", {
      id: {
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
        type: Sequelize.INTEGER,
      },
      name: {
        type: Sequelize.STRING,
        defaultValue: "User",
      },
      email: {
        type: Sequelize.STRING,
        allowNulll: false,
      },
      email_verified_at: {
        type: Sequelize.DATE,
      },
      password: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      refresh_token: {
        type: Sequelize.STRING,
      },
      password_changed_at: {
        type: Sequelize.DATE,
      },
      password_reset_token: {
        type: Sequelize.STRING,
      },
      password_reset_token_expired_at: {
        type: Sequelize.DATE,
      },
      created_at: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      },
      updated_at: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      },
      deleted_at: {
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Users");
  },
};
