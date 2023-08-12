"use strict";
const { faker } = require("@faker-js/faker");
/** @type {import('sequelize-cli').Migration} */

const getCompanies = async (queryInterface) => {
  const companies = await queryInterface.sequelize.query("SELECT id FROM companies", {
    type: queryInterface.sequelize.QueryTypes.SELECT,
  });
  return companies;
};
const getDepartments = async (queryInterface) => {
  const departments = await queryInterface.sequelize.query("SELECT id FROM departments", {
    type: queryInterface.sequelize.QueryTypes.SELECT,
  });
  return departments;
};

module.exports = {
  async up(queryInterface, Sequelize) {
    try {
      const companies = await getCompanies(queryInterface);
      const departments = await getDepartments(queryInterface);
      const users = [...Array(50)].map((user) => ({
        username: faker.internet.userName(),
        password: faker.internet.password(),
        company_id: faker.helpers.arrayElement(companies).id,
        department_id: faker.helpers.arrayElement(departments).id,
        address: faker.location.streetAddress(),
        phone: faker.phone.number("+84 91 ### ## ##"),
        email: faker.internet.email(),
        is_active: faker.datatype.boolean(),
        is_group: faker.datatype.boolean(),
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
