"use strict";
const { faker } = require("@faker-js/faker");

/** @type {import('sequelize-cli').Migration} */

const companies = [...Array(50)].map((company) => ({
  id: faker.string.uuid(),
  name: faker.company.name(),
  address: faker.location.streetAddress(),
  phone: faker.phone.number("+84 91 ### ## ##"),
  email: faker.internet.email(),
  fax: faker.phone.number("+84 91 ### ## ##"),
  is_active: faker.datatype.boolean(),
  createdAt: faker.date.past(),
  updatedAt: faker.date.recent(),
}));

module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert("companies", companies, {});
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete("companies", null, {});
  },
};
