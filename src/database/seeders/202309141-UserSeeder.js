"use strict";
const { faker } = require("@faker-js/faker");
const bcrypt = require("bcryptjs");

/** @type {import('sequelize-cli').Migration} */

const hashPassword = (password) => {
  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(password, salt);
  return hash;
};

module.exports = {
  async up(queryInterface, Sequelize) {
    try {
      const password = await hashPassword("1");
      const users = [...Array(20)].map((item) => ({
        name: faker.person.fullName(),
        email: faker.internet.email(),
        password: password,
        created_at: faker.date.past(),
        updated_at: faker.date.recent(),
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
