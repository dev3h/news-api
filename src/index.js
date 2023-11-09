import express, { json, urlencoded } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import "dotenv/config";
import { createBullBoard } from "@bull-board/api";
import { BullAdapter } from "@bull-board/api/bullAdapter";
import { ExpressAdapter } from "@bull-board/express";
import bodyParser from "body-parser";

import connectDB from "config/database";
import initRoutes from "routes";
import { emailQueue } from "./queues";

const app = express();

const corsOption = {
  credentials: true,
  origin: [process.env.URL_CLIENT],
};

app.use(cors(corsOption));

app.use(bodyParser.json({ limit: "10mb" }));
app.use(cookieParser());
app.use(json());
app.use(urlencoded({ extended: true }));

connectDB();

const serverAdapter = new ExpressAdapter();
serverAdapter.setBasePath("/admin/queues");

const { addQueue, removeQueue, setQueues, replaceQueues } = createBullBoard({
  queues: [new BullAdapter(emailQueue)],
  serverAdapter: serverAdapter,
});

app.use("/admin/queues", serverAdapter.getRouter());
initRoutes(app);

const PORT = process.env.PORT || 5000;

const listener = app.listen(PORT, () => {
  console.log(`Server is running on port ${listener.address().port}`);
  console.log("For Bull Queue UI, open http://localhost:5000/admin/queues");
  console.log("Make sure Redis is running on port 6379 by default");
});
