// MERN / ML ready Opportunity Service
// Future integration: maps to GET /api/business/opportunities and GET /api/business/opportunities/:id

import { opportunities } from "../data/opportunities";

export const opportunityService = {
  // GET /api/business/opportunities
  async getOpportunities(filterCategory = "All") {
    await new Promise(resolve => setTimeout(resolve, 50));
    if (filterCategory === "All") return opportunities;
    return opportunities.filter(o => o.category.toLowerCase() === filterCategory.toLowerCase());
  },

  // GET /api/business/opportunities/:id
  async getOpportunityById(id) {
    await new Promise(resolve => setTimeout(resolve, 40));
    const opp = opportunities.find(o => o.id === id);
    if (!opp) throw new Error("Opportunity not found");
    return opp;
  }
};
