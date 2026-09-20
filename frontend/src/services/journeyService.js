import { apiClient } from "./apiClient";
import { initialJourneyEvents } from "../data/journey";

const getUserJourneyKey = () => {
  try {
    const u = JSON.parse(localStorage.getItem("joyory_user") || "{}");
    return `joyory_journey_${u.id || u._id || (u.email ? u.email.toLowerCase() : "guest")}`;
  } catch {
    return "joyory_journey_guest";
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

export const journeyService = {
  // GET /api/journey
  async getJourney() {
    try {
      const res = await apiClient.get("/journey");
      if (res && res.data && Array.isArray(res.data)) {
        // Map backend event structure if needed
        return res.data.map(ev => ({
          id: ev._id || `ev-${Date.now()}`,
          date: ev.timestamp ? new Date(ev.timestamp).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }) : "Today",
          type: ev.type,
          title: ev.title,
          description: ev.description,
          productName: ev.productName,
          productId: ev.productId,
          systemImpact: ev.systemImpact
        }));
      }
    } catch (err) {
      console.warn("[journeyService] Fallback to user storage:", err.message);
    }

    const key = getUserJourneyKey();
    const cached = localStorage.getItem(key);
    if (cached) {
      try {
        return JSON.parse(cached);
      } catch (e) {
        console.error(e);
      }
    }

    // Only demo customer gets demo journey events, new customers start clean
    const defaults = isDemoUser() ? initialJourneyEvents : [];
    localStorage.setItem(key, JSON.stringify(defaults));
    return defaults;
  },

  // POST /api/journey
  async addEvent(newEvent) {
    try {
      await apiClient.post("/journey", newEvent);
    } catch (err) {
      console.warn("[journeyService] Offline event logging:", err.message);
    }

    const key = getUserJourneyKey();
    const current = await this.getJourney();
    const eventWithId = {
      id: `ev-${Date.now()}`,
      date: new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
      ...newEvent
    };
    const updated = [eventWithId, ...current];
    localStorage.setItem(key, JSON.stringify(updated));
    return updated;
  },

  async resetJourney() {
    const key = getUserJourneyKey();
    localStorage.removeItem(key);
    return isDemoUser() ? initialJourneyEvents : [];
  }
};
