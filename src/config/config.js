require("dotenv").config();

module.exports = {
  development: {
    username: "root",
    password: null,
    database: "news_api",
    host: "127.0.0.1",
    dialect: "mysql",
    logging: false,
    timezone: "+07:00",
  },
  test: {
    username: "root",
    password: null,
    database: "database_test",
    host: "127.0.0.1",
    dialect: "mysql",
  },
  production: {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DATABASE,
    host: process.env.DB_HOST,
    dialect: "mysql",
    timezone: "+07:00",
  },
};
