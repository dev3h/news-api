import { Sequelize } from "sequelize";
import "dotenv/config";

const sequelize = new Sequelize(process.env.DB_DATABASE, process.env.DB_USERNAME, null, {
  host: process.env.DB_HOST,
  dialect: "mysql",
  logging: false,
});

const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log("Database connected");
  } catch (error) {
    console.log("connectDB error: ", error);
  }
};

export default connectDB;
