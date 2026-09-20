import mongoose from "mongoose";

const needGapSchema = new mongoose.Schema(
  {
    category: { type: String, required: true },
    title: { type: String, required: true },
    severity: {
      type: String,
      enum: ["Critical", "High", "Moderate"],
      default: "High"
    },
    gapScore: { type: Number, required: true },
    monthlySearchVolume: { type: Number, required: true },
    catalogSkuCount: { type: Number, required: true },
    targetPriceRange: { type: String, required: true },
    currentCatalogMinPrice: { type: String, required: true },
    bounceRateOnZeroResults: { type: String, required: true },
    topQueries: [{ type: String }],
    customerVoiceSnippets: [{ type: String }],
    recommendationAction: { type: String, required: true }
  },
  {
    timestamps: true
  }
);

export const NeedGap = mongoose.model("NeedGap", needGapSchema);
