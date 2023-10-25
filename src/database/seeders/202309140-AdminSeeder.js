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
      const admins = [...Array(20)].map((item) => ({
        username: faker.internet.userName(),
        display_name: faker.person.fullName(),
        email: faker.internet.email(),
        password: password,
        role: 0,
        created_at: faker.date.past(),
        updated_at: faker.date.recent(),
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
