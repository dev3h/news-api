"use strict";
const { faker } = require("@faker-js/faker");

/** @type {import('sequelize-cli').Migration} */

module.exports = {
  async up(queryInterface, Sequelize) {
    try {
      const groupProducts = [...Array(50)].map((groupProduct) => ({
        name: faker.word.noun(20),
        is_active: faker.datatype.boolean(),
        createdAt: faker.date.past(),
        updatedAt: faker.date.recent(),
      }));
      await queryInterface.bulkInsert("group_products", groupProducts, {});
    } catch (error) {
      console.error("Error seeding groupProducts:", error);
    }
  },

  async down(queryInterface, Sequelize) {
    try {
      await queryInterface.bulkDelete("group_products", null, {});
    } catch (error) {
      console.error("Error undoing group product seed:", error);
    }
  },
};
