import mongoose from "mongoose";

const journeyEventSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ["SEARCH", "VIEW", "COMPARE", "WISHLIST", "ADD_TO_CART", "PURCHASE", "FEEDBACK", "PREFERENCE_UPDATE"],
    required: true
  },
  title: { type: String, required: true },
  description: { type: String, required: true },
  productName: { type: String },
  productId: { type: String },
  systemImpact: { type: String },
  timestamp: { type: Date, default: Date.now }
});

const beautyJourneySchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true
    },
    events: [journeyEventSchema]
  },
  {
    timestamps: true
  }
);

export const BeautyJourney = mongoose.model("BeautyJourney", beautyJourneySchema);
