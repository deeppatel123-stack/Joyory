// MERN-Ready Outcome, Memory, Decision Replay & Need Gap Service
// Connects the 4 new innovation features to the core engine

import { initialBeautyOutcomes } from "../data/mockBeautyOutcomes";
import { initialBeautyMemory } from "../data/mockBeautyMemory";
import { initialDecisionReplays } from "../data/mockDecisionReplays";
import { mockNeedGaps, needGapRadarKPIs } from "../data/mockNeedGaps";
import { customerService } from "./customerService";
import { journeyService } from "./journeyService";

const OUTCOMES_KEY = "joyory_beauty_outcomes";
const MEMORY_KEY = "joyory_beauty_memory";
const REPLAYS_KEY = "joyory_decision_replays";

export const outcomeService = {
  // 1. Beauty Outcome Loop
  async getBeautyOutcomes() {
    await new Promise(resolve => setTimeout(resolve, 40));
    const cached = localStorage.getItem(OUTCOMES_KEY);
    if (cached) {
      try {
        return JSON.parse(cached);
      } catch (e) {
        console.error(e);
      }
    }
    localStorage.setItem(OUTCOMES_KEY, JSON.stringify(initialBeautyOutcomes));
    return initialBeautyOutcomes;
  },

  async updateOutcomeExperience(outcomeId, feedbackData) {
    await new Promise(resolve => setTimeout(resolve, 70));
    const currentOutcomes = await this.getBeautyOutcomes();

    const targetOutcome = currentOutcomes.find(o => o.id === outcomeId);
    if (!targetOutcome) throw new Error("Outcome record not found");

    const updatedOutcomes = currentOutcomes.map(item => {
      if (item.id === outcomeId) {
        return {
          ...item,
          status: "Preference Updated",
          structuredFeedback: {
            texture: feedbackData.texture,
            absorption: feedbackData.absorption,
            fragrance: feedbackData.fragrance,
            overallExperience: feedbackData.overallExperience,
            rating: feedbackData.rating,
            result: feedbackData.result,
            wouldBuyAgain: feedbackData.wouldBuyAgain,
            verifiedObservations: [
              `Logged: ${feedbackData.texture} texture preference`,
              `Observed: ${feedbackData.absorption} absorption rate`,
              `Fragrance: ${feedbackData.fragrance}`,
              `Result: ${feedbackData.result}`
            ]
          },
          learnedInsights: [
            `${feedbackData.texture} texture preference strengthened in personal memory`,
            `${feedbackData.fragrance} fragrance tolerance calibrated`,
            "Longitudinal Beauty Memory & Preference Graph updated"
          ],
          lastUpdated: "Just now"
        };
      }
      return item;
    });

    localStorage.setItem(OUTCOMES_KEY, JSON.stringify(updatedOutcomes));

    // 2. Automatically update Customer Profile & Preference Graph
    const isLightweight = feedbackData.texture?.toLowerCase().includes("light");
    if (isLightweight) {
      await customerService.updatePreferences({
        id: "pref-1",
        trait: "Lightweight Texture",
        category: "Texture",
        confidence: 96,
        level: "High",
        learnedFrom: ["Outcome Loop review", "Verified product usage", "Comparison inspects"],
        lastUpdated: "Just now",
        evolution: "Strengthened to 96% confidence after post-purchase outcome feedback."
      });
    }

    // 3. Automatically add memory event to Beauty Memory
    await this.recordMemoryEvent({
      headline: `Verified ${feedbackData.texture} texture in daily usage`,
      detail: `Outcome logged for ${targetOutcome.productName}: Rating ${feedbackData.rating}/5, ${feedbackData.absorption} absorption.`,
      category: "Outcome Confirmation"
    });

    // 4. Log event in Journey Timeline
    await journeyService.addEvent({
      type: "PREFERENCE_UPDATE",
      title: "Beauty Outcome Loop Processed",
      description: `Structured experience on ${targetOutcome.productName}: ${feedbackData.texture} texture, ${feedbackData.absorption} absorption.`,
      productName: targetOutcome.productName,
      systemImpact: "Personal Beauty Memory calibrated; lightweight water-burst priority elevated."
    });

    return {
      success: true,
      updatedOutcome: updatedOutcomes.find(o => o.id === outcomeId),
      learnedPreferences: [
        `✓ ${feedbackData.texture} textures`,
        `✓ ${feedbackData.absorption} absorption`,
        `✓ Low / ${feedbackData.fragrance} fragrance products`
      ]
    };
  },

  // 2. Beauty Memory / Personal Beauty Passport
  async getBeautyMemory() {
    await new Promise(resolve => setTimeout(resolve, 40));
    const cached = localStorage.getItem(MEMORY_KEY);
    if (cached) {
      try {
        return JSON.parse(cached);
      } catch (e) {
        console.error(e);
      }
    }
    localStorage.setItem(MEMORY_KEY, JSON.stringify(initialBeautyMemory));
    return initialBeautyMemory;
  },

  async recordMemoryEvent(newEvent) {
    const memory = await this.getBeautyMemory();
    const eventRecord = {
      id: `mem-${Date.now()}`,
      date: new Date().toLocaleDateString("en-US", { month: "short", year: "numeric" }),
      ...newEvent
    };

    const updated = {
      ...memory,
      totalInteractionsAnalyzed: memory.totalInteractionsAnalyzed + 1,
      totalOutcomesLogged: memory.totalOutcomesLogged + 1,
      memoryTimeline: [eventRecord, ...memory.memoryTimeline]
    };

    localStorage.setItem(MEMORY_KEY, JSON.stringify(updated));
    return updated;
  },

  // 3. Beauty Decision Replay
  async getDecisionReplays() {
    await new Promise(resolve => setTimeout(resolve, 40));
    const cached = localStorage.getItem(REPLAYS_KEY);
    if (cached) {
      try {
        return JSON.parse(cached);
      } catch (e) {
        console.error(e);
      }
    }
    localStorage.setItem(REPLAYS_KEY, JSON.stringify(initialDecisionReplays));
    return initialDecisionReplays;
  },

  async getDecisionReplayById(id) {
    const replays = await this.getDecisionReplays();
    return replays.find(r => r.id === id || r.productId === id) || replays[0];
  },

  // 4. Customer Need Gap Radar (Business Intelligence)
  async getNeedGaps() {
    await new Promise(resolve => setTimeout(resolve, 40));
    return mockNeedGaps;
  },

  async getNeedGapRadarKPIs() {
    await new Promise(resolve => setTimeout(resolve, 30));
    return needGapRadarKPIs;
  },

  async getNeedGapById(id) {
    await new Promise(resolve => setTimeout(resolve, 30));
    const gap = mockNeedGaps.find(g => g.id === id);
    if (!gap) throw new Error("Need gap record not found");
    return gap;
  }
};
