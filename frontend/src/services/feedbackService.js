// MERN / Python NLP ready Feedback Service
// Future integration: maps to POST /api/feedback and POST /api/nlp/sentiment

import { customerService } from "./customerService";
import { journeyService } from "./journeyService";

export const feedbackService = {
  // POST /api/feedback
  async submitFeedback(feedbackPayload) {
    await new Promise(resolve => setTimeout(resolve, 80));

    const {
      orderId,
      productId,
      productName,
      textureRating,
      fragranceRating,
      applicationRating,
      overallRating,
      comments
    } = feedbackPayload;

    // Detect preference signal
    const isHeavy = textureRating?.toLowerCase().includes("heavy") || comments?.toLowerCase().includes("heavy");
    let preferenceSignal = "Neutral alignment";
    let preferenceUpdate = "Preferences maintained";

    if (isHeavy) {
      preferenceSignal = "Texture: Heavy";
      preferenceUpdate = "Lightweight texture preference strengthened (+6% confidence)";

      // Update customer profile learned preferences
      await customerService.updatePreferences({
        id: "pref-1",
        trait: "Lightweight Texture",
        category: "Texture",
        confidence: 96,
        level: "High",
        learnedFrom: ["Order review", "Texture feedback", "Recent comparison"],
        lastUpdated: "Just now",
        evolution: "Lightweight texture requirement strengthened to 96% after feedback signal: 'Feels slightly heavy'"
      });

      // Log event in customer journey
      await journeyService.addEvent({
        type: "PREFERENCE_UPDATE",
        title: "Continuous Preference Refinement",
        description: `Feedback on ${productName || "Moisturizer"}: Customer indicated texture was too heavy. Elevated Lightweight priority to 96%.`,
        productName: productName,
        systemImpact: "Lightweight water-burst and gel textures prioritized to top recommendation tier."
      });
    }

    return {
      success: true,
      feedbackId: `fb-${Date.now()}`,
      preferenceSignal,
      preferenceUpdate,
      confidenceBoost: isHeavy ? 96 : 92,
      timestamp: new Date().toISOString()
    };
  }
};
