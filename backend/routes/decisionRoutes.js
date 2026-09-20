import express from "express";
import { getDecisionReplays } from "../controllers/decisionController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", protect, getDecisionReplays);

export default router;
