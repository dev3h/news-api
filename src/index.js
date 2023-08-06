import express, { json, urlencoded } from "express";
import cors from "cors";
import "dotenv/config";

import connectDB from "config/database";
import initRoutes from "routes";

const app = express();

app.use(
  cors({
    origin: process.env.CLIENT_URL,
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);
app.use(json());
app.use(urlencoded({ extended: false }));

connectDB();

initRoutes(app);

const PORT = process.env.PORT || 5000;

const listener = app.listen(PORT, () => {
  console.log(`Server is running on port ${listener.address().port}`);
});
