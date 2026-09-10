"use strict";
const { faker } = require("@faker-js/faker");

/** @type {import('sequelize-cli').Migration} */

const getUsers = async (queryInterface) => {
  const data = await queryInterface.sequelize.query("SELECT id FROM users", {
    type: queryInterface.sequelize.QueryTypes.SELECT,
  });
  return data;
};
const getPosts = async (queryInterface) => {
  const data = await queryInterface.sequelize.query("SELECT id FROM posts", {
    type: queryInterface.sequelize.QueryTypes.SELECT,
  });
  return data;
};

module.exports = {
  async up(queryInterface, Sequelize) {
    try {
      const users = await getUsers(queryInterface);
      const posts = await getPosts(queryInterface);
      const postComments = [...Array(20)].map((item) => ({
        user_id: faker.helpers.arrayElement(users).id,
        post_id: faker.helpers.arrayElement(posts).id,
        content: faker.lorem.paragraphs(5, "<br/>\n"),
        created_at: faker.date.past(),
        updated_at: faker.date.recent(),
      }));
      await queryInterface.bulkInsert("post_comments", postComments, {});
    } catch (error) {
      console.error("Error seeding postComments:", error);
    }
  },

  async down(queryInterface, Sequelize) {
    try {
      await queryInterface.bulkDelete("post_comments", null, {});
    } catch (error) {
      console.error("Error undoing postComments seed:", error);
    }
  },
};
