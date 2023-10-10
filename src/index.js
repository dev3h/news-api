import express, { json, urlencoded } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import "dotenv/config";

import connectDB from "config/database";
import initRoutes from "routes";

const app = express();

const corsOption = {
  credentials: true,
  origin: ["http://127.0.0.1:3000"],
};

app.use(cors(corsOption));

app.use(cookieParser());
app.use(json());
app.use(urlencoded({ extended: true }));

connectDB();

initRoutes(app);

const PORT = process.env.PORT || 5000;

const listener = app.listen(PORT, () => {
  console.log(`Server is running on port ${listener.address().port}`);
});
