import express from "express";
import { getBeautyMemory } from "../controllers/memoryController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", protect, getBeautyMemory);

export default router;
