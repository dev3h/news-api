import { createBullBoard } from "@bull-board/api";
import { BullAdapter } from "@bull-board/api/bullAdapter";
import { ExpressAdapter } from "@bull-board/express";
import { emailQueue } from "../queues";

// Create Bull Board server adapter
const serverAdapter = new ExpressAdapter();
serverAdapter.setBasePath("/admin/queues");

// Create Bull Board with queues
const { addQueue, removeQueue, setQueues, replaceQueues } = createBullBoard({
  queues: [new BullAdapter(emailQueue)],
  serverAdapter: serverAdapter,
});

// Export Bull Board utilities
export {
  serverAdapter,
  addQueue,
  removeQueue,
  setQueues,
  replaceQueues
};

// Log Bull Board info
const PORT = process.env.PORT || 5000;
console.log(`📊 Bull Queue UI will be available at: http://localhost:${PORT}/admin/queues`);
console.log("🔴 Make sure Redis is running on port 6379 by default");