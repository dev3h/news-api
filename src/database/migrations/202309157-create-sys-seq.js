"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable(
      "Sys_Seqs",
      {
        seq_name: {
          type: Sequelize.STRING,
          primaryKey: true,
        },
        seq_value: {
          type: Sequelize.INTEGER,
        },
      },
      {
        timestamps: false,
      }
    );
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Sys_Seqs");
  },
};
