import express from "express";
import { getJourneyEvents, addJourneyEvent } from "../controllers/journeyController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.use(protect);

router.route("/").get(getJourneyEvents).post(addJourneyEvent);

export default router;
