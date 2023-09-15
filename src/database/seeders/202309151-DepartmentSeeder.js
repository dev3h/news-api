"use strict";
const { faker } = require("@faker-js/faker");

/** @type {import('sequelize-cli').Migration} */

const getCompanies = async (queryInterface) => {
  const companies = await queryInterface.sequelize.query("SELECT id FROM companies", {
    type: queryInterface.sequelize.QueryTypes.SELECT,
  });
  return companies;
};

module.exports = {
  async up(queryInterface, Sequelize) {
    try {
      const companies = await getCompanies(queryInterface);
      const departments = [...Array(50)].map((department) => ({
        name: faker.company.name(),
        address: faker.location.streetAddress(),
        phone: faker.phone.number("+84 91 ### ## ##"),
        email: faker.internet.email(),
        fax: faker.phone.number("+84 91 ### ## ##"),
        is_active: faker.datatype.boolean(),
        company_id: faker.helpers.arrayElement(companies).id,
        is_warehouse: faker.datatype.boolean(),
        short_name: faker.word.words({ count: 5 }),
        createdAt: faker.date.past(),
        updatedAt: faker.date.recent(),
      }));
      await queryInterface.bulkInsert("departments", departments, {});
    } catch (error) {
      console.error("Error seeding departments:", error);
    }
  },

  async down(queryInterface, Sequelize) {
    try {
      await queryInterface.bulkDelete("departments", null, {});
    } catch (error) {
      console.error("Error undoing department seed:", error);
    }
  },
};
