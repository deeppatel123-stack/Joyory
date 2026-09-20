// MERN-Ready Journey Service
// Future integration: maps to GET /api/customer/journey and POST /api/customer/journey/event

import { initialJourneyEvents } from "../data/journey";

const JOURNEY_KEY = "joyory_customer_journey";

export const journeyService = {
  // GET /api/customer/journey
  async getJourney() {
    await new Promise(resolve => setTimeout(resolve, 40));
    const cached = localStorage.getItem(JOURNEY_KEY);
    if (cached) {
      try {
        return JSON.parse(cached);
      } catch (e) {
        console.error(e);
      }
    }
    localStorage.setItem(JOURNEY_KEY, JSON.stringify(initialJourneyEvents));
    return initialJourneyEvents;
  },

  // POST /api/customer/journey/event
  async addEvent(newEvent) {
    const current = await this.getJourney();
    const eventWithId = {
      id: `ev-${Date.now()}`,
      date: new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
      ...newEvent
    };
    const updated = [eventWithId, ...current];
    localStorage.setItem(JOURNEY_KEY, JSON.stringify(updated));
    return updated;
  },

  async resetJourney() {
    localStorage.removeItem(JOURNEY_KEY);
    return initialJourneyEvents;
  }
};
