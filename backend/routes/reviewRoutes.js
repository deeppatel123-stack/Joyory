import express from "express";
import {
  getProductReviews,
  createReview,
  getAllReviews,
  updateReviewStatus
} from "../controllers/reviewController.js";
import { protect, adminOnly } from "../middleware/authMiddleware.js";

const router = express.Router();

router.route("/product/:productId").get(getProductReviews);
router.route("/").post(protect, createReview).get(protect, adminOnly, getAllReviews);
router.route("/:id/status").put(protect, adminOnly, updateReviewStatus);

export default router;
