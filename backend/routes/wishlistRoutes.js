import express from "express";
import {
  getWishlist,
  toggleWishlist,
  removeFromWishlist
} from "../controllers/wishlistController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.use(protect);

router.route("/").get(getWishlist).post(toggleWishlist);
router.post("/toggle", toggleWishlist);
router.route("/:productId").delete(removeFromWishlist);

export default router;
