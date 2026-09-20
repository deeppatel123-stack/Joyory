// MERN-Ready Customer Service
// Future integration: maps to GET /api/customer/profile, PATCH /api/customer/preferences

import { initialCustomer } from "../data/customers";

const STORAGE_KEY = "joyory_customer_profile";

export const customerService = {
  // GET /api/customer/profile
  async getProfile() {
    await new Promise(resolve => setTimeout(resolve, 40));
    const cached = localStorage.getItem(STORAGE_KEY);
    if (cached) {
      try {
        return JSON.parse(cached);
      } catch (e) {
        console.error(e);
      }
    }
    localStorage.setItem(STORAGE_KEY, JSON.stringify(initialCustomer));
    return initialCustomer;
  },

  // PATCH /api/customer/preferences
  async updatePreferences(newLearnedPref) {
    await new Promise(resolve => setTimeout(resolve, 40));
    const current = await this.getProfile();

    // Update learned preferences
    const existingIndex = current.learnedPreferences.findIndex(p => p.id === newLearnedPref.id);
    let updatedLearned = [...current.learnedPreferences];
    if (existingIndex >= 0) {
      updatedLearned[existingIndex] = { ...updatedLearned[existingIndex], ...newLearnedPref };
    } else {
      updatedLearned.push(newLearnedPref);
    }

    // Update graph node if exists
    let updatedNodes = current.graphData.nodes.map(node => {
      if (node.id === "texture" && newLearnedPref.category === "Texture") {
        return {
          ...node,
          confidence: newLearnedPref.confidence,
          source: newLearnedPref.evolution || node.source,
          updated: "Just now"
        };
      }
      return node;
    });

    const updatedProfile = {
      ...current,
      learnedPreferences: updatedLearned,
      graphData: {
        ...current.graphData,
        nodes: updatedNodes
      }
    };

    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedProfile));
    return updatedProfile;
  },

  // Reset to initial demo state
  async resetDemoProfile() {
    localStorage.removeItem(STORAGE_KEY);
    return initialCustomer;
  }
};
