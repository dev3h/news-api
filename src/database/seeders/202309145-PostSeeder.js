"use strict";
const { faker } = require("@faker-js/faker");

/** @type {import('sequelize-cli').Migration} */
const getAdmins = async (queryInterface) => {
  const data = await queryInterface.sequelize.query("SELECT id FROM admins", {
    type: queryInterface.sequelize.QueryTypes.SELECT,
  });
  return data;
};
const getCategories = async (queryInterface) => {
  const data = await queryInterface.sequelize.query("SELECT id FROM categories", {
    type: queryInterface.sequelize.QueryTypes.SELECT,
  });
  return data;
};
module.exports = {
  async up(queryInterface, Sequelize) {
    try {
      const admins = await getAdmins(queryInterface);
      const categories = await getCategories(queryInterface);
      const posts = [...Array(20)].map((item) => ({
        title: faker.lorem.words(),
        slug: faker.lorem.slug(),
        view: faker.number.int({ min: 100, max: 500 }),
        content: faker.lorem.paragraphs(5, "<br/>\n"),
        category_id: faker.helpers.arrayElement(categories).id,
        created_by: faker.helpers.arrayElement(admins).id,
        updated_by: faker.helpers.arrayElement(admins).id,
        created_at: faker.date.past(),
        updated_at: faker.date.recent(),
      }));
      await queryInterface.bulkInsert("posts", posts, {});
    } catch (error) {
      console.error("Error seeding posts:", error);
    }
  },

  async down(queryInterface, Sequelize) {
    try {
      await queryInterface.bulkDelete("posts", null, {});
    } catch (error) {
      console.error("Error undoing posts seed:", error);
    }
  },
};
