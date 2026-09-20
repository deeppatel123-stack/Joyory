// MERN / Python ML ready Recommendation Service
// Future integration: maps to GET /api/recommendations and POST /api/recommendations/rerank

import { getOrganizedRecommendations, calculateProductMatch } from "../data/recommendations";
import { customerService } from "./customerService";

export const recommendationService = {
  // GET /api/recommendations
  async getRecommendations() {
    await new Promise(resolve => setTimeout(resolve, 50));
    const customer = await customerService.getProfile();
    return getOrganizedRecommendations(customer);
  },

  // Calculate specific product match for current customer
  async getProductMatch(product) {
    const customer = await customerService.getProfile();
    return calculateProductMatch(product, customer);
  }
};
