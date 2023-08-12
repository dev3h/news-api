"use strict";
const { faker } = require("@faker-js/faker");

/** @type {import('sequelize-cli').Migration} */

module.exports = {
  async up(queryInterface, Sequelize) {
    try {
      const companies = [...Array(50)].map((company) => ({
        name: faker.company.name(),
        address: faker.location.streetAddress(),
        phone: faker.phone.number("+84 91 ### ## ##"),
        email: faker.internet.email(),
        fax: faker.phone.number("+84 91 ### ## ##"),
        is_active: faker.datatype.boolean(),
        createdAt: faker.date.past(),
        updatedAt: faker.date.recent(),
      }));
      await queryInterface.bulkInsert("companies", companies, {});
    } catch (error) {
      console.error("Error seeding companies:", error);
    }
  },

  async down(queryInterface, Sequelize) {
    try {
      await queryInterface.bulkDelete("companies", null, {});
    } catch (error) {
      console.error("Error undoing company seed:", error);
    }
  },
};
