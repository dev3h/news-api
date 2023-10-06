"use strict";
const { faker } = require("@faker-js/faker");
/** @type {import('sequelize-cli').Migration} */

module.exports = {
  async up(queryInterface, Sequelize) {
    try {
      const users = [...Array(50)].map((item) => ({
        name: faker.person.fullName(),
        email: faker.internet.email(),
        password: faker.internet.password(),
        createdAt: faker.date.past(),
        updatedAt: faker.date.recent(),
      }));
      await queryInterface.bulkInsert("users", users, {});
    } catch (error) {
      console.error("Error seeding user:", error);
    }
  },

  async down(queryInterface, Sequelize) {
    try {
      await queryInterface.bulkDelete("users", null, {});
    } catch (error) {
      console.error("Error undoing user seed:", error);
    }
  },
};
