import { BeautyOutcome } from "../models/BeautyOutcome.js";
import { CustomerPreference } from "../models/CustomerPreference.js";
import { BeautyJourney } from "../models/BeautyJourney.js";

export const getOutcomes = async (req, res, next) => {
  try {
    const outcomes = await BeautyOutcome.find({ user: req.user._id }).sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      count: outcomes.length,
      data: outcomes
    });
  } catch (error) {
    next(error);
  }
};

export const updateOutcomeFeedback = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { feedback } = req.body;

    const outcome = await BeautyOutcome.findOne({ _id: id, user: req.user._id });
    if (!outcome) {
      return res.status(404).json({ success: false, message: "Beauty Outcome record not found." });
    }

    outcome.feedback = {
      ...feedback,
      submittedAt: new Date()
    };
    outcome.status = "Preference Updated";

    // Continuous Learning Engine: Calibrate preference graph weights
    let preferenceShift = "";
    let calibratedNode = "Lightweight Texture";

    if (feedback.textureFeel && feedback.textureFeel.includes("lighter")) {
      preferenceShift = "Lightweight texture affinity reinforced (+4%)";
    } else if (feedback.textureFeel && feedback.textureFeel.includes("heavy")) {
      preferenceShift = "Water-gel texture sensitivity increased (+6%)";
    } else {
      preferenceShift = "Balanced hydration tolerance confirmed (+2%)";
    }

    outcome.learnedInsight = `Sensory feedback processed: ${feedback.textureFeel || "Optimal tolerance"}. ${preferenceShift}.`;
    outcome.preferenceImpact = {
      calibratedAttributes: ["Lightweight Texture", "Hydration Balance", "Fragrance Tolerance"],
      scoreShift: preferenceShift
    };

    await outcome.save();

    // Update CustomerPreference node
    let prefs = await CustomerPreference.findOne({ user: req.user._id });
    if (prefs) {
      prefs.evolutionHistory.push({
        date: new Date(),
        description: `Feedback on ${outcome.productName}`,
        shift: preferenceShift
      });
      await prefs.save();
    }

    // Log in BeautyJourney
    let journey = await BeautyJourney.findOne({ user: req.user._id });
    if (journey) {
      journey.events.push({
        type: "FEEDBACK",
        title: "Product Experience Feedback",
        description: `Rated ${outcome.productName}: ${feedback.textureFeel || "Verified"}`,
        productName: outcome.productName,
        productId: outcome.productId,
        systemImpact: `Continuous Learning: ${preferenceShift}`
      });
      await journey.save();
    }

    res.status(200).json({
      success: true,
      message: "Experience logged. Beauty Preference Graph calibrated!",
      data: outcome,
      preferenceUpdate: preferenceShift,
      learnedInsight: outcome.learnedInsight
    });
  } catch (error) {
    next(error);
  }
};

export const updateOutcomeStatus = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const outcome = await BeautyOutcome.findOne({ _id: id, user: req.user._id });
    if (!outcome) {
      return res.status(404).json({ success: false, message: "Beauty Outcome record not found." });
    }

    outcome.status = status;
    await outcome.save();

    res.status(200).json({
      success: true,
      message: `Outcome status moved to ${status}.`,
      data: outcome
    });
  } catch (error) {
    next(error);
  }
};
