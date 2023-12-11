import { createBullBoard } from "@bull-board/api";
import { BullAdapter } from "@bull-board/api/bullAdapter";
import { ExpressAdapter } from "@bull-board/express";
import app from "./app";
import connectDB from "config/database";
import { emailQueue } from "./queues";

connectDB();

const serverAdapter = new ExpressAdapter();
serverAdapter.setBasePath("/admin/queues");

const { addQueue, removeQueue, setQueues, replaceQueues } = createBullBoard({
  queues: [new BullAdapter(emailQueue)],
  serverAdapter: serverAdapter,
});

app.use("/admin/queues", serverAdapter.getRouter());

const PORT = process.env.PORT || 5000;

const listener = app.listen(PORT, () => {
  console.log(`Server is running on port ${listener.address().port}`);
  console.log("For Bull Queue UI, open http://localhost:5000/admin/queues");
  console.log("Make sure Redis is running on port 6379 by default");
});
