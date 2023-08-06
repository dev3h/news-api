"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Departments", {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.STRING,
      },
      name: {
        type: Sequelize.STRING,
        unique: true,
      },
      address: {
        type: Sequelize.TEXT,
      },
      phone: {
        type: Sequelize.STRING,
        unique: true,
      },
      email: {
        type: Sequelize.STRING,
        unique: true,
      },
      fax: {
        type: Sequelize.STRING,
        unique: true,
      },
      is_active: {
        type: Sequelize.BOOLEAN,
        comment: "0: inactive, 1: active",
        defaultValue: 1,
      },
      company_id: {
        type: Sequelize.STRING,
        allowNull: false,
        references: {
          model: { tableName: "companies" },
          key: "id",
        },
        onUpdate: "cascade",
        onDelete: "cascade",
      },
      is_warehouse: {
        type: Sequelize.BOOLEAN,
        defaultValue: 0,
      },
      sign: {
        type: Sequelize.STRING,
        unique: true,
      },
      createdBy: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      updatedBy: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      deletedAt: {
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Departments");
  },
};
