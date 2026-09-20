// Feature 4: Customer Need Gap Radar Mock Dataset
// Identifies high-demand customer inquiries where existing catalog coverage is insufficient

export const needGapRadarKPIs = [
  { id: "gap-kpi-1", label: "Active Need Gaps", value: "24", change: "+4 this month", trend: "up", subtitle: "Identified unsatisfied clusters" },
  { id: "gap-kpi-2", label: "High Demand Signals", value: "18", change: "+6 MoM", trend: "up", subtitle: "Queries with >1,000 inquiries" },
  { id: "gap-kpi-3", label: "Low Catalog Coverage", value: "11", change: "Immediate R&D priority", trend: "up", subtitle: "≤6 matching SKUs in catalog" },
  { id: "gap-kpi-4", label: "Emerging Opportunities", value: "7", change: "+2 validated", trend: "up", subtitle: "Potential new formulation briefs" }
];

export const mockNeedGaps = [
  {
    id: "gap-1",
    customerNeed: "Lightweight moisturizer under ₹700",
    category: "Moisturizer",
    demand: 1842,
    catalogCoverage: 6,
    gapLevel: "High",
    trend: "up",
    searchVolume: 4920,
    wishlists: 1120,
    purchases: 284,
    avgCatalogPrice: 890,
    customerTargetPrice: "₹500 – ₹700",
    signals: [
      "I want something lightweight that doesn't feel sticky in humid weather.",
      "Most quality water gels on the market are priced above ₹900.",
      "Looking for a daily hydrating gel with zero heavy oils under ₹700.",
      "Wish you had a 75ml pump bottle instead of open jars."
    ],
    summary: "Surging demand for non-greasy, water-burst daily moisturizers priced between ₹500 and ₹700 suitable for hot & coastal climates.",
    opportunityConclusion: "High Demand + Low Catalog Coverage + Repeated Price Friction = Potential opportunity detected for a dedicated 75ml pump gel formula."
  },
  {
    id: "gap-2",
    customerNeed: "Fragrance-free active serum",
    category: "Serum",
    demand: 1240,
    catalogCoverage: 4,
    gapLevel: "High",
    trend: "up",
    searchVolume: 3410,
    wishlists: 780,
    purchases: 195,
    avgCatalogPrice: 950,
    customerTargetPrice: "₹550 – ₹750",
    signals: [
      "Need fragrance-free options that don't trigger redness or stinging.",
      "Most brightening serums contain essential oils or artificial perfume.",
      "Looking for a pure 10% Niacinamide formula with soothing Zinc and zero fragrance."
    ],
    summary: "Customers with sensitive barriers actively searching for high-concentration actives with zero synthetic scent or masking botanicals.",
    opportunityConclusion: "High Demand + Low Catalog Coverage + Repeated Sensitivity Signals = Potential opportunity detected for clinical unscented active booster."
  },
  {
    id: "gap-3",
    customerNeed: "Sensitive-skin foaming cleanser",
    category: "Cleanser",
    demand: 980,
    catalogCoverage: 8,
    gapLevel: "Medium",
    trend: "up",
    searchVolume: 2650,
    wishlists: 540,
    purchases: 320,
    avgCatalogPrice: 650,
    customerTargetPrice: "₹450 – ₹600",
    signals: [
      "Not enough foaming products for sensitive skin that avoid SLS.",
      "Need gentle amino acid surfactants that don't strip moisture.",
      "Want an affordable pH 5.5 daily cloud cleanser."
    ],
    summary: "Stable high demand for sulfate-free, non-stripping foam cleansers in entry price tier.",
    opportunityConclusion: "Moderate Demand + Moderate Catalog Coverage = Monitor catalog performance."
  },
  {
    id: "gap-4",
    customerNeed: "Matte sunscreen SPF 50 zero white cast",
    category: "Sunscreen",
    demand: 760,
    catalogCoverage: 5,
    gapLevel: "Medium",
    trend: "neutral",
    searchVolume: 2190,
    wishlists: 610,
    purchases: 210,
    avgCatalogPrice: 799,
    customerTargetPrice: "₹550 – ₹650",
    signals: [
      "Need high SPF that doesn't melt into shiny grease after 2 hours.",
      "Must not leave chalky white streaks on Fitzpatrick IV-VI skin tones.",
      "Eyes sting with most chemical options during workouts."
    ],
    summary: "Repeated customer requests for sweat-resistant, non-chalky invisible fluids.",
    opportunityConclusion: "Moderate Demand + Moderate Coverage = Potential expansion in shade-free fluids."
  },
  {
    id: "gap-5",
    customerNeed: "Centella & Zinc calming barrier gel",
    category: "Moisturizer",
    demand: 1490,
    catalogCoverage: 3,
    gapLevel: "High",
    trend: "up",
    searchVolume: 3820,
    wishlists: 890,
    purchases: 170,
    avgCatalogPrice: 820,
    customerTargetPrice: "₹500 – ₹650",
    signals: [
      "Post-acne redness soother needed without pore-clogging shea butter.",
      "Cica cooling gel is very popular in K-beauty but hard to find in domestic budget tier.",
      "Looking for lightweight daytime calming gel under ₹600."
    ],
    summary: "Rapidly expanding cluster for barrier repair targeted specifically at oily and acne-prone skin.",
    opportunityConclusion: "High Demand + Very Low Catalog Coverage (3 SKUs) = High potential product opportunity detected."
  },
  {
    id: "gap-6",
    customerNeed: "Oil-free night recovery jelly",
    category: "Moisturizer",
    demand: 820,
    catalogCoverage: 2,
    gapLevel: "High",
    trend: "up",
    searchVolume: 2400,
    wishlists: 510,
    purchases: 110,
    avgCatalogPrice: 899,
    customerTargetPrice: "₹600 – ₹750",
    signals: [
      "Most night masks are too greasy and rub off onto pillowcases.",
      "Want an overnight sleeping pack that absorbs dry and bouncy.",
      "Looking for oil-free overnight hydration."
    ],
    summary: "Clear whitespace in non-greasy sleeping packs with only 2 current catalog matches.",
    opportunityConclusion: "High Demand Deficit = Potential opportunity detected in overnight category."
  }
];
