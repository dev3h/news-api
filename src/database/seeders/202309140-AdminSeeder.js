"use strict";
const { faker } = require("@faker-js/faker");

/** @type {import('sequelize-cli').Migration} */

module.exports = {
  async up(queryInterface, Sequelize) {
    try {
      const admins = [...Array(20)].map((item) => ({
        username: faker.internet.userName(),
        display_name: faker.person.fullName(),
        email: faker.internet.email(),
        password: faker.internet.password(),
        role: 0,
        createdAt: faker.date.past(),
        updatedAt: faker.date.recent(),
      }));
      await queryInterface.bulkInsert("admins", admins, {});
    } catch (error) {
      console.error("Error seeding admins:", error);
    }
  },

  async down(queryInterface, Sequelize) {
    try {
      await queryInterface.bulkDelete("admins", null, {});
    } catch (error) {
      console.error("Error undoing admins seed:", error);
    }
  },
};
