"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable(
      "post_user_like",
      {
        post_id: {
          type: Sequelize.INTEGER,
          references: {
            model: { tableName: "posts" },
            key: "id",
          },
          onUpdate: "CASCADE",
          onDelete: "CASCADE",
          primaryKey: true,
        },
        user_id: {
          type: Sequelize.INTEGER,
          references: {
            model: { tableName: "users" },
            key: "id",
          },
          onUpdate: "CASCADE",
          onDelete: "CASCADE",
          primaryKey: true,
        },
      },
      {
        timestamps: false,
      }
    );
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("post_user_like");
  },
};
