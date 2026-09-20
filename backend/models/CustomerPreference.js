import mongoose from "mongoose";

const customerPreferenceSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true
    },
    graphNodes: [
      {
        id: String,
        label: String,
        category: String,
        confidence: Number,
        status: String,
        connections: [String]
      }
    ],
    learnedPreferences: {
      type: Map,
      of: Number,
      default: {}
    },
    statedPreferences: {
      skinType: String,
      concerns: [String],
      budget: String
    },
    evolutionHistory: [
      {
        date: { type: Date, default: Date.now },
        description: String,
        shift: String
      }
    ]
  },
  {
    timestamps: true
  }
);

export const CustomerPreference = mongoose.model("CustomerPreference", customerPreferenceSchema);
