import dotenv from "dotenv";
import app from "../src/app.js";
import connectDB from "../src/config/db.js";

dotenv.config();

// ensure database is connected before running tests
beforeAll(async () => {
  await connectDB();
});

export default app;
