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
      const notices = [...Array(20)].map((item) => ({
        title: faker.lorem.words(),
        content: faker.lorem.paragraphs(5, "<br/>\n"),
        created_by: faker.helpers.arrayElement(admins).id,
        updated_by: faker.helpers.arrayElement(admins).id,
        created_at: faker.date.past(),
        updated_at: faker.date.recent(),
      }));
      await queryInterface.bulkInsert("notices", notices, {});
    } catch (error) {
      console.error("Error seeding notices:", error);
    }
  },

  async down(queryInterface, Sequelize) {
    try {
      await queryInterface.bulkDelete("notices", null, {});
    } catch (error) {
      console.error("Error undoing notices seed:", error);
    }
  },
};
