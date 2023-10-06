"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable(
      "Notice_Author",
      {
        notice_id: {
          type: Sequelize.INTEGER,
          references: {
            model: { tableName: "notices" },
            key: "id",
          },
          onUpdate: "CASCADE",
          onDelete: "CASCADE",
          primaryKey: true,
        },
        author_id: {
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
    await queryInterface.dropTable("Notice_Author");
  },
};
