// Search trends and emerging combination intelligence
// Aggregated customer queries without exposing PII

export const searchTrendsData = {
  trendingSearches: [
    { query: "Lightweight moisturizer", growth: "+31%", volume: "24,800", sentiment: "High Intent", category: "Moisturizer" },
    { query: "Sunscreen for oily skin", growth: "+24%", volume: "18,400", sentiment: "High Intent", category: "Sunscreen" },
    { query: "Fragrance-free serum", growth: "+18%", volume: "12,900", sentiment: "Specific Need", category: "Serum" },
    { query: "Budget skincare under 800", growth: "+15%", volume: "31,200", sentiment: "Price Sensitive", category: "General" },
    { query: "Cica cooling gel", growth: "+42%", volume: "9,700", sentiment: "Emerging", category: "Moisturizer" },
    { query: "Non-comedogenic cleanser", growth: "+19%", volume: "14,100", sentiment: "Preventative", category: "Cleanser" }
  ],
  emergingCombinations: [
    {
      combination: "Oily Skin + Lightweight SPF",
      growth: "+46%",
      insight: "Customers strongly reject greasy sunscreen formulations; highest volume in coastal cities.",
      relevanceScore: 95
    },
    {
      combination: "Dry Skin + Fragrance-Free",
      growth: "+38%",
      insight: "Rising intolerance to synthetic scent in barrier repair creams.",
      relevanceScore: 89
    },
    {
      combination: "Budget Moisturizer + Gel Texture",
      growth: "+54%",
      insight: "Largest unsatisfied volume: shoppers want Korean water-gel textures at Indian domestic price points (< ₹700).",
      relevanceScore: 98
    },
    {
      combination: "Salicylic Acid + Soothing Oat",
      growth: "+29%",
      insight: "Interest in gentle chemical exfoliation that avoids skin irritation.",
      relevanceScore: 84
    }
  ],
  queryVolumeHistory: [
    { week: "W1 Aug", lightweight: 18200, barrier: 12100, sunscreen: 16500 },
    { week: "W2 Aug", lightweight: 19800, barrier: 12500, sunscreen: 17200 },
    { week: "W3 Aug", lightweight: 21500, barrier: 13200, sunscreen: 18400 },
    { week: "W4 Aug", lightweight: 23100, barrier: 13900, sunscreen: 19100 },
    { week: "W1 Sep", lightweight: 25400, barrier: 14500, sunscreen: 20600 },
    { week: "W2 Sep", lightweight: 27800, barrier: 15200, sunscreen: 22100 }
  ]
};
