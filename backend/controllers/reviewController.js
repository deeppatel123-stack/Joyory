import { Review } from "../models/Review.js";
import { Product } from "../models/Product.js";
import { Order } from "../models/Order.js";

export const getProductReviews = async (req, res, next) => {
  try {
    const { productId } = req.params;
    const reviews = await Review.find({ product: productId, status: "approved" }).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: reviews.length,
      data: reviews
    });
  } catch (error) {
    next(error);
  }
};

export const createReview = async (req, res, next) => {
  try {
    const { productId, rating, title, comment, textureRating } = req.body;

    if (!productId || !rating || !title || !comment) {
      return res.status(400).json({ success: false, message: "Please provide product, rating, title, and comment." });
    }

    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ success: false, message: "Product not found." });
    }

    // Check if user has purchased this product
    const hasPurchased = await Order.findOne({
      user: req.user._id,
      "items.product": productId,
      status: "Delivered"
    });

    const review = await Review.create({
      user: req.user._id,
      userName: req.user.name,
      product: productId,
      rating: Number(rating),
      title,
      comment,
      textureRating: textureRating || "Just Right",
      skinType: req.user.beautyPreferences?.skinType || "Combination",
      verifiedPurchase: !!hasPurchased,
      status: "approved"
    });

    // Recalculate product rating and count
    const approvedReviews = await Review.find({ product: productId, status: "approved" });
    const avgRating = approvedReviews.reduce((acc, r) => acc + r.rating, 0) / approvedReviews.length;

    product.rating = Number(avgRating.toFixed(1));
    product.reviewCount = approvedReviews.length;
    await product.save();

    res.status(201).json({
      success: true,
      message: "Review submitted successfully.",
      data: review
    });
  } catch (error) {
    next(error);
  }
};

export const getAllReviews = async (req, res, next) => {
  try {
    const { status } = req.query;
    const filter = status ? { status } : {};
    const reviews = await Review.find(filter)
      .sort({ createdAt: -1 })
      .populate("product", "name brand image price");

    res.status(200).json({
      success: true,
      count: reviews.length,
      data: reviews
    });
  } catch (error) {
    next(error);
  }
};

export const updateReviewStatus = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!["approved", "hidden", "pending"].includes(status)) {
      return res.status(400).json({ success: false, message: "Invalid review status." });
    }

    const review = await Review.findByIdAndUpdate(id, { status }, { new: true });
    if (!review) {
      return res.status(404).json({ success: false, message: "Review not found." });
    }

    res.status(200).json({
      success: true,
      message: `Review marked as ${status}.`,
      data: review
    });
  } catch (error) {
    next(error);
  }
};
