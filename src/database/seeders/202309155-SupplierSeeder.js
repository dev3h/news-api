"use strict";
const { faker } = require("@faker-js/faker");

/** @type {import('sequelize-cli').Migration} */

module.exports = {
  async up(queryInterface, Sequelize) {
    try {
      const suppliers = [...Array(50)].map((company) => ({
        name: faker.word.noun(),
        address: faker.location.streetAddress(),
        phone: faker.phone.number("+84 91 ### ## ##"),
        email: faker.internet.email(),
        fax: faker.phone.number("+84 91 ### ## ##"),
        is_active: faker.datatype.boolean(),
        createdAt: faker.date.past(),
        updatedAt: faker.date.recent(),
      }));
      await queryInterface.bulkInsert("suppliers", suppliers, {});
    } catch (error) {
      console.error("Error seeding suppliers:", error);
    }
  },

  async down(queryInterface, Sequelize) {
    try {
      await queryInterface.bulkDelete("suppliers", null, {});
    } catch (error) {
      console.error("Error undoing supplier seed:", error);
    }
  },
};
