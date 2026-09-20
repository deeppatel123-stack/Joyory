import mongoose from "mongoose";

const beautyOutcomeSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    productId: { type: String, required: true },
    productName: { type: String, required: true },
    brand: { type: String, required: true },
    category: { type: String, required: true },
    image: { type: String },
    orderId: { type: String },
    purchaseDate: { type: Date, default: Date.now },
    status: {
      type: String,
      enum: ["Purchased", "Trying", "Used", "Experience Logged", "Preference Updated"],
      default: "Purchased"
    },
    usageDays: { type: Number, default: 0 },
    feedback: {
      overallRating: Number,
      textureFeel: String,
      breakoutOrReaction: String,
      hydrationScore: Number,
      scentExperience: String,
      repurchaseIntent: String,
      comments: String,
      submittedAt: Date
    },
    learnedInsight: {
      type: String
    },
    preferenceImpact: {
      calibratedAttributes: [String],
      scoreShift: String
    }
  },
  {
    timestamps: true
  }
);

export const BeautyOutcome = mongoose.model("BeautyOutcome", beautyOutcomeSchema);
