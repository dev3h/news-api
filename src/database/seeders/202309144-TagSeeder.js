"use strict";
const { faker } = require("@faker-js/faker");

/** @type {import('sequelize-cli').Migration} */
const getAdmins = async (queryInterface) => {
  const data = await queryInterface.sequelize.query(
    "SELECT id FROM admins where role=0",
    {
      type: queryInterface.sequelize.QueryTypes.SELECT,
    }
  );
  return data;
};
module.exports = {
  async up(queryInterface, Sequelize) {
    try {
      const admins = await getAdmins(queryInterface);
      const tags = [...Array(20)].map((item) => ({
        name: faker.lorem.word(),
        slug: faker.lorem.slug(),
        created_by: faker.helpers.arrayElement(admins).id,
        updated_by: faker.helpers.arrayElement(admins).id,
        createdAt: faker.date.past(),
        updatedAt: faker.date.recent(),
      }));
      await queryInterface.bulkInsert("tags", tags, {});
    } catch (error) {
      console.error("Error seeding tags:", error);
    }
  },

  async down(queryInterface, Sequelize) {
    try {
      await queryInterface.bulkDelete("tags", null, {});
    } catch (error) {
      console.error("Error undoing tags seed:", error);
    }
  },
};
