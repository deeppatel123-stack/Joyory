import express from "express";
import {
  getOutcomes,
  updateOutcomeFeedback,
  updateOutcomeStatus
} from "../controllers/outcomeController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.use(protect);

router.route("/").get(getOutcomes);
router.route("/:id/feedback").post(updateOutcomeFeedback).put(updateOutcomeFeedback);
router.route("/:id/status").put(updateOutcomeStatus);

export default router;
