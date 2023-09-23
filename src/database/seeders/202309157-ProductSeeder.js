"use strict";
const { faker } = require("@faker-js/faker");

/** @type {import('sequelize-cli').Migration} */

const getUnits = async (queryInterface) => {
  const units = await queryInterface.sequelize.query("SELECT id FROM units", {
    type: queryInterface.sequelize.QueryTypes.SELECT,
  });
  return units;
};
const getSuppliers = async (queryInterface) => {
  const suppliers = await queryInterface.sequelize.query("SELECT id FROM suppliers", {
    type: queryInterface.sequelize.QueryTypes.SELECT,
  });
  return suppliers;
};
const getOrigins = async (queryInterface) => {
  const origins = await queryInterface.sequelize.query("SELECT id FROM origins", {
    type: queryInterface.sequelize.QueryTypes.SELECT,
  });
  return origins;
};
const getGroupProducts = async (queryInterface) => {
  const groupProducts = await queryInterface.sequelize.query(
    "SELECT id FROM group_products",
    {
      type: queryInterface.sequelize.QueryTypes.SELECT,
    }
  );
  return groupProducts;
};

module.exports = {
  async up(queryInterface, Sequelize) {
    try {
      const units = await getUnits(queryInterface);
      const suppliers = await getSuppliers(queryInterface);
      const origins = await getOrigins(queryInterface);
      const groupProducts = await getGroupProducts(queryInterface);
      const products = [...Array(50)].map((product) => ({
        id: faker.string.uuid(),
        name: faker.word.noun(20),
        short_name: faker.word.noun(10),
        price: faker.commerce.price(),
        unit_id: faker.helpers.arrayElement(units).id,
        supplier_id: faker.helpers.arrayElement(suppliers).id,
        origin_id: faker.helpers.arrayElement(origins).id,
        group_product_id: faker.helpers.arrayElement(groupProducts).id,
        is_active: faker.datatype.boolean(),
        createdAt: faker.date.past(),
        updatedAt: faker.date.recent(),
      }));
      await queryInterface.bulkInsert("products", products, {});
    } catch (error) {
      console.error("Error seeding products:", error);
    }
  },

  async down(queryInterface, Sequelize) {
    try {
      await queryInterface.bulkDelete("products", null, {});
    } catch (error) {
      console.error("Error undoing products seed:", error);
    }
  },
};
