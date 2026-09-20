import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Product name is required"],
      trim: true
    },
    brand: {
      type: String,
      required: [true, "Brand is required"],
      trim: true
    },
    category: {
      type: String,
      required: [true, "Category is required"],
      trim: true
    },
    subcategory: {
      type: String,
      default: ""
    },
    price: {
      type: Number,
      required: [true, "Price is required"],
      min: 0
    },
    mrp: {
      type: Number,
      required: [true, "MRP is required"],
      min: 0
    },
    discount: {
      type: Number,
      default: 0
    },
    images: [
      {
        type: String,
        required: true
      }
    ],
    description: {
      type: String,
      required: true
    },
    shortDescription: {
      type: String,
      default: ""
    },
    ingredients: [{ type: String }],
    benefits: [{ type: String }],
    howToUse: {
      type: String,
      default: "Apply a coin-sized amount onto cleansed skin and massage gently until absorbed."
    },
    texture: {
      type: String,
      default: "Lightweight Gel"
    },
    finish: {
      type: String,
      default: "Matte"
    },
    skinTypes: [{ type: String }],
    concerns: [{ type: String }],
    tags: [{ type: String }],
    rating: {
      type: Number,
      default: 4.5,
      min: 1,
      max: 5
    },
    reviewCount: {
      type: Number,
      default: 0
    },
    stock: {
      type: Number,
      default: 50,
      min: 0
    },
    sku: {
      type: String,
      unique: true,
      sparse: true
    },
    isFeatured: {
      type: Boolean,
      default: false
    },
    isBestSeller: {
      type: Boolean,
      default: false
    },
    isNewArrival: {
      type: Boolean,
      default: false
    },
    reviewSummary: {
      positiveThemes: [{ type: String }],
      concerns: [{ type: String }],
      sentimentScore: { type: Number, default: 0.9 },
      sentimentLabel: { type: String, default: "Highly Positive" }
    }
  },
  {
    timestamps: true
  }
);

// Search indexes
productSchema.index({ name: "text", brand: "text", category: "text", tags: "text", description: "text" });
productSchema.index({ category: 1, price: 1 });
productSchema.index({ brand: 1 });
productSchema.index({ isBestSeller: 1 });
productSchema.index({ isNewArrival: 1 });
productSchema.index({ isFeatured: 1 });

export const Product = mongoose.model("Product", productSchema);
