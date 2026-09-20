// Core Business Feature: Unmet Need Detector dataset
// MERN & Python ML service compatible structure

export const opportunities = [
  {
    id: "opp-1",
    title: "Lightweight Gel Moisturizer Under ₹700",
    category: "Moisturizer",
    demandScore: 92,
    searchVolume: "14,800/mo",
    catalogCoverage: "Low (1 Product)",
    customerInterest: "Very High",
    opportunitySignal: "Critical High",
    status: "Active Opportunity",
    createdAt: "September 2026",
    summary: "Surging customer demand for ultra-lightweight, non-sticky water gel moisturizers priced between ₹500 and ₹700 suitable for hot & humid climates, currently undersupplied in catalog.",
    explanation: "High customer interest with limited matching products in the current catalog.",
    metrics: {
      searchGrowth: "+48% MoM",
      unmetQueriesCount: "3,420 queries with 0 checkout",
      avgTargetPrice: "₹620",
      targetVolume: "75ml preferred",
      sentimentDriver: "Existing products perceived as slightly heavy in peak humidity"
    },
    requestedAttributes: [
      { name: "Texture", preference: "Water-burst / Oil-free Gel", demandRatio: "88%" },
      { name: "Price Band", preference: "₹550 – ₹680", demandRatio: "91%" },
      { name: "Finish", preference: "Zero-shine Soft Matte", demandRatio: "79%" },
      { name: "Fragrance", preference: "100% Fragrance-Free", demandRatio: "84%" },
      { name: "Packaging", preference: "Hygienic Pump / Tube (avoid open jar)", demandRatio: "74%" }
    ],
    topSearchQueries: [
      { query: "lightweight gel moisturizer for oily skin under 700", count: "4,120", growth: "+52%" },
      { query: "non greasy moisturizer hot weather india", count: "3,340", growth: "+41%" },
      { query: "fragrance free water gel moisturizer", count: "2,890", growth: "+36%" },
      { query: "cica matte gel under 600", count: "1,980", growth: "+29%" }
    ],
    contributingSegments: [
      { segment: "Budget Conscious", share: 44, color: "#C26D53" },
      { segment: "Minimal Routine", share: 31, color: "#8E7D73" },
      { segment: "Ingredient Focused", share: 18, color: "#A8A29E" },
      { segment: "Discovery Explorers", share: 7, color: "#D6D3D1" }
    ],
    demandTrend: [
      { month: "May", demand: 42, coverage: 15 },
      { month: "Jun", demand: 54, coverage: 15 },
      { month: "Jul", demand: 68, coverage: 18 },
      { month: "Aug", demand: 81, coverage: 20 },
      { month: "Sep", demand: 92, coverage: 22 }
    ],
    existingCatalogCoverage: [
      {
        id: "prod-1",
        name: "HydraGel Ultra-Light Moisturizer",
        price: 649,
        gapNote: "Strong match, but jar packaging and 50ml volume leads to repeat requests for larger pump size."
      }
    ]
  },
  {
    id: "opp-2",
    title: "Fragrance-Free Matte Fluid Sunscreen SPF 50",
    category: "Sunscreen",
    demandScore: 88,
    searchVolume: "19,200/mo",
    catalogCoverage: "Medium-Low (2 Products)",
    customerInterest: "High",
    opportunitySignal: "High",
    status: "Active Opportunity",
    createdAt: "August 2026",
    summary: "Substantial search concentration for sweat-resistant invisible fluid sunscreen without white cast or eye irritation under ₹650.",
    explanation: "Rapid increase in search volume outpacing available inventory in the entry-premium tier.",
    metrics: {
      searchGrowth: "+38% MoM",
      unmetQueriesCount: "2,890 queries",
      avgTargetPrice: "₹599",
      targetVolume: "60ml",
      sentimentDriver: "Desire for high SPF without stinging eyes during workouts"
    },
    requestedAttributes: [
      { name: "Texture", preference: "Milky Shake Fluid", demandRatio: "85%" },
      { name: "Sensory", preference: "Eye-safe / Zero Sting", demandRatio: "92%" },
      { name: "Price Band", preference: "₹500 – ₹650", demandRatio: "76%" },
      { name: "White Cast", preference: "Completely clear on Fitzpatrick IV-VI", demandRatio: "97%" }
    ],
    topSearchQueries: [
      { query: "fluid sunscreen oily skin no white cast", count: "5,410", growth: "+44%" },
      { query: "sunscreen that doesn't sting eyes", count: "3,890", growth: "+39%" },
      { query: "matte finish sunscreen under 600", count: "3,110", growth: "+28%" }
    ],
    contributingSegments: [
      { segment: "Ingredient Focused", share: 38, color: "#C26D53" },
      { segment: "Budget Conscious", share: 35, color: "#8E7D73" },
      { segment: "Discovery Explorers", share: 17, color: "#A8A29E" },
      { segment: "Minimal Routine", share: 10, color: "#D6D3D1" }
    ],
    demandTrend: [
      { month: "May", demand: 50, coverage: 30 },
      { month: "Jun", demand: 62, coverage: 32 },
      { month: "Jul", demand: 75, coverage: 35 },
      { month: "Aug", demand: 84, coverage: 35 },
      { month: "Sep", demand: 88, coverage: 38 }
    ],
    existingCatalogCoverage: [
      {
        id: "prod-4",
        name: "Invisible Water SPF 50+ Sun Gel",
        price: 699,
        gapNote: "Popular formulation but sits at upper boundary of mass budget bracket."
      }
    ]
  },
  {
    id: "opp-3",
    title: "Centella & Zinc Barrier Serum Under ₹550",
    category: "Serum",
    demandScore: 81,
    searchVolume: "9,600/mo",
    catalogCoverage: "Low (0 Direct Matches)",
    customerInterest: "Medium-High",
    opportunitySignal: "Moderate-High",
    status: "Emerging Opportunity",
    createdAt: "September 2026",
    summary: "Growing user feedback asking for dedicated post-acne redness soother combining pure Cica with gentle 1% Zinc PCA at an approachable price point.",
    explanation: "Zero direct catalog match combining soothing Centella with gentle oil control in under ₹550 tier.",
    metrics: {
      searchGrowth: "+29% MoM",
      unmetQueriesCount: "1,840 queries",
      avgTargetPrice: "₹499",
      targetVolume: "30ml",
      sentimentDriver: "Users seeking barrier restoration that doesn't trigger fungal acne"
    },
    requestedAttributes: [
      { name: "Actives", preference: "High% Cica + Zinc PCA", demandRatio: "89%" },
      { name: "Price Band", preference: "Under ₹550", demandRatio: "94%" },
      { name: "Texture", preference: "Watery Drops", demandRatio: "82%" },
      { name: "Fragrance", preference: "Zero Added Scent", demandRatio: "90%" }
    ],
    topSearchQueries: [
      { query: "cica serum for redness oily skin", count: "2,760", growth: "+32%" },
      { query: "zinc soother under 500", count: "1,940", growth: "+26%" },
      { query: "barrier serum acne prone budget", count: "1,420", growth: "+19%" }
    ],
    contributingSegments: [
      { segment: "Ingredient Focused", share: 48, color: "#C26D53" },
      { segment: "Budget Conscious", share: 32, color: "#8E7D73" },
      { segment: "Minimal Routine", share: 12, color: "#A8A29E" },
      { segment: "Discovery Explorers", share: 8, color: "#D6D3D1" }
    ],
    demandTrend: [
      { month: "May", demand: 32, coverage: 5 },
      { month: "Jun", demand: 44, coverage: 5 },
      { month: "Jul", demand: 58, coverage: 8 },
      { month: "Aug", demand: 71, coverage: 10 },
      { month: "Sep", demand: 81, coverage: 12 }
    ],
    existingCatalogCoverage: []
  }
];
