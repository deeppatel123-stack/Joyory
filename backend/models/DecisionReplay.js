import mongoose from "mongoose";

const decisionReplaySchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    productName: { type: String, required: true },
    brand: { type: String, required: true },
    category: { type: String, required: true },
    image: { type: String },
    orderDate: { type: String },
    rating: { type: Number },
    steps: [
      {
        stepNumber: Number,
        stage: String,
        title: String,
        timestamp: String,
        details: String,
        status: String
      }
    ],
    primaryDrivers: [String],
    alternativeConsidered: {
      name: String,
      brand: String,
      whyNotChosen: String
    },
    outcomeCorrelation: {
      satisfactionRate: String,
      verifiedMatch: Boolean,
      retrospectiveNote: String
    }
  },
  {
    timestamps: true
  }
);

export const DecisionReplay = mongoose.model("DecisionReplay", decisionReplaySchema);
