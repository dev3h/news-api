import express, { json, urlencoded } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import "dotenv/config";
import bodyParser from "body-parser";

import initRoutes from "routes";

const app = express();

const whitelist = [process.env.URL_CLIENT, process.env.URL_SERVER];

const corsOption = {
  credentials: true,
  origin: function (origin, callback) {
    if (!origin || whitelist.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  }
};

app.use(cors(corsOption));

app.use(bodyParser.json({ limit: "10mb" }));
app.use(cookieParser());
app.use(json());
app.use(urlencoded({ extended: true }));

initRoutes(app);

module.exports = app;
