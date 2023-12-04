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
      const group_categories = [...Array(5)].map((item) => ({
        name: faker.lorem.word(),
        slug: faker.lorem.slug(),
        created_by: faker.helpers.arrayElement(admins).id,
        updated_by: faker.helpers.arrayElement(admins).id,
        created_at: faker.date.past(),
        updated_at: faker.date.recent(),
      }));
      await queryInterface.bulkInsert("group_categories", group_categories, {});
    } catch (error) {
      console.error("Error seeding group_categories:", error);
    }
  },

  async down(queryInterface, Sequelize) {
    try {
      await queryInterface.bulkDelete("group_categories", null, {});
    } catch (error) {
      console.error("Error undoing group_categories seed:", error);
    }
  },
};
