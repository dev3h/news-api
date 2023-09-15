"use strict";
const { faker } = require("@faker-js/faker");

/** @type {import('sequelize-cli').Migration} */

module.exports = {
  async up(queryInterface, Sequelize) {
    try {
      const origins = [...Array(50)].map((company) => ({
        name: faker.word.noun(24),
        is_active: faker.datatype.boolean(),
        createdAt: faker.date.past(),
        updatedAt: faker.date.recent(),
      }));
      await queryInterface.bulkInsert("origins", origins, {});
    } catch (error) {
      console.error("Error seeding origins:", error);
    }
  },

  async down(queryInterface, Sequelize) {
    try {
      await queryInterface.bulkDelete("origins", null, {});
    } catch (error) {
      console.error("Error undoing origin seed:", error);
    }
  },
};
