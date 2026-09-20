// Aggregated business analytics and shopping funnel data
// Aggregated beauty intelligence analytics engine

export const businessAnalytics = {
  kpis: [
    { id: "kpi-1", label: "Active Shoppers", value: "12.4K", change: "+14.2%", trend: "up", subtitle: "Unique profile identifiers" },
    { id: "kpi-2", label: "Discovery Sessions", value: "28.6K", change: "+22.8%", trend: "up", subtitle: "Natural query searches" },
    { id: "kpi-3", label: "Recommendation Engagement", value: "31.8%", change: "+4.6%", trend: "up", subtitle: "Click-through on matched items" },
    { id: "kpi-4", label: "Feedback Signals", value: "4.2K", change: "+38.1%", trend: "up", subtitle: "Direct texture & finish signals" },
    { id: "kpi-5", label: "Emerging Needs", value: "18", change: "+3 this month", trend: "up", subtitle: "Unsatisfied search clusters" },
    { id: "kpi-6", label: "Opportunity Signals", value: "7", change: "+2 verified", trend: "up", subtitle: "Catalog gap opportunities" }
  ],
  topPreferences: [
    { label: "Lightweight Texture", percentage: 34, count: "4,216 shoppers" },
    { label: "Budget ₹500 – ₹1,000", percentage: 27, count: "3,348 shoppers" },
    { label: "Low Fragrance / Fragrance-Free", percentage: 21, count: "2,604 shoppers" },
    { label: "Minimal 3-Step Routine", percentage: 18, count: "2,232 shoppers" }
  ],
  popularCategories: [
    { name: "Moisturizers", share: 36, growth: "+18%" },
    { name: "Sunscreens", share: 28, growth: "+29%" },
    { name: "Serums", share: 19, growth: "+12%" },
    { name: "Cleansers", share: 11, growth: "+8%" },
    { name: "Toners & Mists", share: 6, growth: "+15%" }
  ],
  funnelSteps: [
    { step: "Search", count: 28600, percentage: 100, dropRate: 0, description: "Initiated smart discovery or catalog browse" },
    { step: "Product View", count: 19560, percentage: 68.4, dropRate: 31.6, description: "Inspected product specifications & match details" },
    { step: "Compare", count: 9780, percentage: 34.2, dropRate: 50.0, description: "Compared 2-4 products against personal preferences" },
    { step: "Wishlist", count: 6180, percentage: 21.6, dropRate: 36.8, description: "Saved to personal consideration list" },
    { step: "Add to Bag", count: 4230, percentage: 14.8, dropRate: 31.5, description: "Added to shopping cart" },
    { step: "Purchase", count: 2745, percentage: 9.6, dropRate: 35.1, description: "Completed checkout" },
    { step: "Feedback", count: 1200, percentage: 4.2, dropRate: 56.3, description: "Shared experience & tuned preference graph" }
  ],
  recommendationAnalytics: {
    clickThroughRate: "31.8%",
    comparisonRate: "24.6%",
    wishlistRate: "18.2%",
    addToBagRate: "14.8%",
    conversionLift: "+32.4%",
    monthlyPerformance: [
      { month: "May", views: 12400, matchedClicks: 3200, orders: 840 },
      { month: "Jun", views: 15600, matchedClicks: 4400, orders: 1180 },
      { month: "Jul", views: 19800, matchedClicks: 5900, orders: 1650 },
      { month: "Aug", views: 24200, matchedClicks: 7500, orders: 2180 },
      { month: "Sep", views: 28600, matchedClicks: 9100, orders: 2745 }
    ]
  }
};
