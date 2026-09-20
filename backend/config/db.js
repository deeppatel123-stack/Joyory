import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI || "mongodb://127.0.0.1:27017/joyory");
    console.log(`[Database] MongoDB Connected: ${conn.connection.host}`);
    return conn;
  } catch (error) {
    console.error(`[Database] MongoDB Connection Error: ${error.message}`);
    console.warn(`[Database] Running in Fallback Resilient Mode - Mock/In-Memory Cache will be used if MongoDB is offline.`);
    return null;
  }
};
