import dotenv from "dotenv";
dotenv.config();

import app from "./app.js";
import { connectDB } from "./config/db.js";

const PORT = process.env.PORT || 5000;

// Connect to MongoDB
connectDB();

app.listen(PORT, () => {
  console.log(`[Server] Joyory Backend running on http://localhost:${PORT} in ${process.env.NODE_ENV || "development"} mode`);
});
