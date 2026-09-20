import express from "express";
import { getNeedGaps, getOpportunities, getAnalytics } from "../controllers/businessController.js";

const router = express.Router();

router.get("/need-gaps", getNeedGaps);
router.get("/opportunities", getOpportunities);
router.get("/analytics", getAnalytics);

export default router;
