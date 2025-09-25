"use strict";
const { faker } = require("@faker-js/faker");
const bcrypt = require("bcryptjs");
const { default: RoleSysEnum } = require("../../enums/RoleSysEnum");

/** @type {import('sequelize-cli').Migration} */

const hashPassword = (password) => {
  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(password, salt);
  return hash;
};

module.exports = {
  async up(queryInterface, Sequelize) {
    try {
      const password = await hashPassword("Abcd1234@");
      const admins = [...Array(20)].map((item) => ({
        username: faker.internet.userName().replace(/[^a-zA-Z0-9]/g, ""),
        display_name: faker.person.fullName(),
        email: faker.internet.email(),
        password,
        role: Math.round(Math.random()),
        created_at: faker.date.past(),
        updated_at: faker.date.recent(),
      }));
      const baseAdmin = {
        username: "admin",
        display_name: "Admin",
        email: "admin@example.com",
        password,
        role: RoleSysEnum.ADMIN,
        created_at: new Date(),
        updated_at: new Date(),
      };
      await queryInterface.bulkInsert("admins", [baseAdmin, ...admins], {});
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
