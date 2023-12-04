"use strict";
const { faker } = require("@faker-js/faker");

/** @type {import('sequelize-cli').Migration} */

const getGroupCategories = async (queryInterface) => {
  const data = await queryInterface.sequelize.query("SELECT id FROM group_categories", {
    type: queryInterface.sequelize.QueryTypes.SELECT,
  });
  return data;
};
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
      const groupCategories = await getGroupCategories(queryInterface);
      const admins = await getAdmins(queryInterface);
      const categories = [...Array(20)].map((item) => ({
        name: faker.lorem.word(),
        slug: faker.lorem.slug(),
        group_category_id: faker.helpers.arrayElement(groupCategories).id,
        created_by: faker.helpers.arrayElement(admins).id,
        updated_by: faker.helpers.arrayElement(admins).id,
        created_at: faker.date.past(),
        updated_at: faker.date.recent(),
      }));
      await queryInterface.bulkInsert("categories", categories, {});
    } catch (error) {
      console.error("Error seeding categories:", error);
    }
  },

  async down(queryInterface, Sequelize) {
    try {
      await queryInterface.bulkDelete("categories", null, {});
    } catch (error) {
      console.error("Error undoing categories seed:", error);
    }
  },
};
