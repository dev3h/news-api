import app from "./app";
import connectDB from "config/database";

connectDB();

const PORT = process.env.PORT || 5000;

const listener = app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${listener.address().port}`);
  console.log(`🌐 API Base URL: http://localhost:${PORT}/api-docs`);
});
