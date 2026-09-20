// Customer Journey Timeline data representing continuous learning loop
// MERN-ready schema

export const initialJourneyEvents = [
  {
    id: "ev-1",
    date: "Sep 08, 2026",
    type: "SEARCH",
    title: "Initial Problem Discovery",
    description: "Searched: 'moisturizer for oily skin that doesn't feel sticky in humid weather'",
    productName: null,
    systemImpact: "Identified primary concern: Sebum control with humidity resistance."
  },
  {
    id: "ev-2",
    date: "Sep 09, 2026",
    type: "VIEW",
    title: "Explored Barrier Solutions",
    description: "Viewed Ceramide Barrier Defense Cream and HydraGel Ultra-Light side by side.",
    productName: "Ceramide Barrier Defense Cream",
    productId: "prod-3",
    systemImpact: "Noted interest in barrier repair vs lightweight textures."
  },
  {
    id: "ev-3",
    date: "Sep 10, 2026",
    type: "COMPARE",
    title: "Side-by-Side Comparison",
    description: "Compared Clarifying BHA Pore Balance Fluid vs HydraGel Ultra-Light.",
    productName: "HydraGel Ultra-Light vs Clarifying BHA",
    systemImpact: "Preference detected: Skewed toward non-comedogenic gel bases under ₹750."
  },
  {
    id: "ev-4",
    date: "Sep 12, 2026",
    type: "PURCHASE",
    title: "First Order Placed",
    description: "Ordered Glow Hydrating Moisturizer (Order #JOY-10231) for ₹699.",
    productName: "Glow Hydrating Moisturizer",
    productId: "prod-1",
    systemImpact: "Confirmed purchase within targeted budget bracket."
  },
  {
    id: "ev-5",
    date: "Sep 15, 2026",
    type: "EXPERIENCE",
    title: "Product Experience Started",
    description: "Product marked delivered. 3 days of daily daytime usage recorded.",
    productName: "Glow Hydrating Moisturizer",
    systemImpact: "Prompted intelligent follow-up for texture & sensory feedback."
  },
  {
    id: "ev-6",
    date: "Sep 18, 2026",
    type: "FEEDBACK",
    title: "Customer Review & Signal",
    description: "Customer submitted feedback: 'Feels slightly heavy during humid afternoons. Hydrates well but wish it was lighter.'",
    productName: "Glow Hydrating Moisturizer",
    systemImpact: "Negative texture signal captured (-0.4 weight on rich creams)."
  },
  {
    id: "ev-7",
    date: "Sep 18, 2026",
    type: "PREFERENCE_UPDATE",
    title: "Continuous Preference Refinement",
    description: "System updated Beauty Preference Graph: Lightweight texture priority elevated to 94% confidence.",
    productName: null,
    systemImpact: "Ranked water-burst gel formulas to #1 position in future recommendations."
  }
];
