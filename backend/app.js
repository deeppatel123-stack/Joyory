import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";

// Routes
import authRoutes from "./routes/authRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import cartRoutes from "./routes/cartRoutes.js";
import wishlistRoutes from "./routes/wishlistRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import reviewRoutes from "./routes/reviewRoutes.js";
import outcomeRoutes from "./routes/outcomeRoutes.js";
import memoryRoutes from "./routes/memoryRoutes.js";
import decisionRoutes from "./routes/decisionRoutes.js";
import journeyRoutes from "./routes/journeyRoutes.js";
import businessRoutes from "./routes/businessRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";

const app = express();

app.use(
  cors({
    origin: (origin, callback) => {
      // allow localhost on any port (5173, 5174, etc.) or no origin (curl/mobile/tools)
      if (!origin || /^http:\/\/localhost(:\d+)?$/.test(origin) || /^http:\/\/127\.0\.0\.1(:\d+)?$/.test(origin)) {
        callback(null, true);
      } else {
        callback(null, true);
      }
    },
    credentials: true
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Health check
app.get("/api/health", (req, res) => {
  res.status(200).json({
    status: "ok",
    message: "Joyory Intelligence API is healthy and operational",
    timestamp: new Date()
  });
});

// Mount Routes
app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/wishlist", wishlistRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/reviews", reviewRoutes);
app.use("/api/beauty-outcomes", outcomeRoutes);
app.use("/api/beauty-memory", memoryRoutes);
app.use("/api/decision-replay", decisionRoutes);
app.use("/api/journey", journeyRoutes);
app.use("/api/business", businessRoutes);
app.use("/api/admin", adminRoutes);

// Error Middleware
app.use(notFound);
app.use(errorHandler);

export default app;
