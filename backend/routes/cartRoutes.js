import express from "express";
import {
  getCart,
  addToCart,
  updateCartItem,
  removeCartItem,
  clearCart
} from "../controllers/cartController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.use(protect);

router.route("/").get(getCart).post(addToCart).delete(clearCart);
router.post("/add", addToCart);
router.put("/update", (req, res, next) => {
  if (req.body && req.body.productId) req.params.productId = req.body.productId;
  updateCartItem(req, res, next);
});
router.delete("/remove/:productId", removeCartItem);
router.delete("/clear", clearCart);
router.route("/:productId").put(updateCartItem).delete(removeCartItem);

export default router;
