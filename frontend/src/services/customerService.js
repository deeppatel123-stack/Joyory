import { authService } from "./authService";
import { initialCustomer } from "../data/customers";

const getUserProfileKey = () => {
  try {
    const u = JSON.parse(localStorage.getItem("joyory_user") || "{}");
    return `joyory_profile_${u.id || u._id || (u.email ? u.email.toLowerCase() : "guest")}`;
  } catch {
    return "joyory_profile_guest";
  }
};

const isDemoUser = () => {
  try {
    const u = JSON.parse(localStorage.getItem("joyory_user") || "{}");
    return (u.email || "").toLowerCase().includes("aria.chen") || (u.email || "").toLowerCase().includes("customer@joyory.com");
  } catch {
    return false;
  }
};

export const customerService = {
  // GET customer profile
  async getProfile() {
    let authUser = null;
    try {
      authUser = await authService.getMe();
    } catch {
      try {
        authUser = JSON.parse(localStorage.getItem("joyory_user") || "null");
      } catch {
        authUser = null;
      }
    }

    const key = getUserProfileKey();
    const cached = localStorage.getItem(key);
    if (cached) {
      try {
        const parsed = JSON.parse(cached);
        if (authUser) {
          parsed.name = authUser.name || parsed.name;
          parsed.email = authUser.email || parsed.email;
        }
        return parsed;
      } catch (e) {
        console.error(e);
      }
    }

    if (isDemoUser() || !authUser) {
      localStorage.setItem(key, JSON.stringify(initialCustomer));
      return initialCustomer;
    }

    // Dynamic clean profile for new registered customer
    const userPrefs = authUser.beautyPreferences || {};
    const newCustomerProfile = {
      id: authUser.id || authUser._id,
      name: authUser.name,
      email: authUser.email,
      role: authUser.role || "customer",
      phone: authUser.phone || "+91 98765 43210",
      statedPreferences: {
        skinType: userPrefs.skinType || "Oily / Combination",
        primaryGoal: userPrefs.primaryGoal || "Hydration & Balance",
        budgetRange: userPrefs.budget || "₹500 - ₹1,000",
        fragrance: userPrefs.fragrance || "Low / None",
        routine: "Minimal (3 steps)"
      },
      learnedPreferences: [
        {
          id: "pref-texture",
          category: "Texture",
          trait: userPrefs.preferredTexture || "Lightweight",
          confidence: 85,
          evolution: "Selected during onboarding"
        }
      ],
      graphData: {
        nodes: [
          { id: "skinType", label: "Skin Type", value: userPrefs.skinType || "Combination", confidence: 90, source: "Profile" },
          { id: "texture", label: "Texture", value: userPrefs.preferredTexture || "Lightweight", confidence: 85, source: "Preferences" },
          { id: "budget", label: "Budget", value: userPrefs.budget || "₹500 - ₹1,000", confidence: 90, source: "Profile" }
        ],
        links: []
      }
    };

    localStorage.setItem(key, JSON.stringify(newCustomerProfile));
    return newCustomerProfile;
  },

  // Update preferences
  async updatePreferences(newLearnedPref) {
    const current = await this.getProfile();
    const existingIndex = current.learnedPreferences.findIndex(p => p.id === newLearnedPref.id);
    let updatedLearned = [...current.learnedPreferences];
    if (existingIndex >= 0) {
      updatedLearned[existingIndex] = { ...updatedLearned[existingIndex], ...newLearnedPref };
    } else {
      updatedLearned.push(newLearnedPref);
    }

    const updatedProfile = {
      ...current,
      learnedPreferences: updatedLearned
    };

    const key = getUserProfileKey();
    localStorage.setItem(key, JSON.stringify(updatedProfile));

    // Also sync to MongoDB
    try {
      await authService.updateProfile({
        beautyPreferences: {
          preferredTexture: newLearnedPref.trait || current.statedPreferences?.skinType
        }
      });
    } catch (err) {
      console.warn("[customerService] Profile sync note:", err.message);
    }

    return updatedProfile;
  },

  // Reset to initial demo state
  async resetDemoProfile() {
    const key = getUserProfileKey();
    localStorage.removeItem(key);
    return isDemoUser() ? initialCustomer : this.getProfile();
  }
};
