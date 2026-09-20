import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    userName: {
      type: String,
      required: true
    },
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true
    },
    rating: {
      type: Number,
      required: true,
      min: 1,
      max: 5
    },
    title: {
      type: String,
      required: true,
      trim: true
    },
    comment: {
      type: String,
      required: true
    },
    textureRating: {
      type: String,
      default: "Just Right"
    },
    skinType: {
      type: String,
      default: "Combination"
    },
    status: {
      type: String,
      enum: ["approved", "pending", "hidden"],
      default: "approved"
    },
    verifiedPurchase: {
      type: Boolean,
      default: true
    }
  },
  {
    timestamps: true
  }
);

reviewSchema.index({ product: 1, status: 1 });

export const Review = mongoose.model("Review", reviewSchema);
