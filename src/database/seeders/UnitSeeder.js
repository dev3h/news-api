"use strict";
const { faker } = require("@faker-js/faker");

/** @type {import('sequelize-cli').Migration} */

module.exports = {
  async up(queryInterface, Sequelize) {
    try {
      const units = [...Array(50)].map((company) => ({
        name: faker.word.noun(),
        is_active: faker.datatype.boolean(),
        createdAt: faker.date.past(),
        updatedAt: faker.date.recent(),
      }));
      await queryInterface.bulkInsert("units", units, {});
    } catch (error) {
      console.error("Error seeding units:", error);
    }
  },

  async down(queryInterface, Sequelize) {
    try {
      await queryInterface.bulkDelete("units", null, {});
    } catch (error) {
      console.error("Error undoing unit seed:", error);
    }
  },
};
