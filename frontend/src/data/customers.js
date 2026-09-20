// Demo customer profile and Beauty Preference Graph models
// MERN-ready MongoDB schema compatible

export const initialCustomer = {
  id: "cust-101",
  name: "Aria Chen",
  email: "aria.chen@joyory-demo.com",
  joinedDate: "August 2026",
  avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&auto=format&fit=crop&q=80",
  statedPreferences: {
    skinType: "Oily / Combination",
    primaryGoal: "Hydration without oiliness",
    budgetRange: "₹500 - ₹800",
    maxBudget: 800,
    fragrance: "Low fragrance",
    routine: "Minimal (3 steps)",
    preferredCategories: ["Moisturizer", "Sunscreen", "Cleanser"]
  },
  learnedPreferences: [
    {
      id: "pref-1",
      trait: "Lightweight Texture",
      category: "Texture",
      confidence: 94,
      level: "High",
      learnedFrom: ["Product comparison", "Review feedback", "Wishlist behavior"],
      lastUpdated: "Just now",
      evolution: "Strengthened after feedback: 'Feels slightly heavy'"
    },
    {
      id: "pref-2",
      trait: "Water-Burst Gel Formulation",
      category: "Formulation",
      confidence: 88,
      level: "High",
      learnedFrom: ["Search filters", "HydraGel view history"],
      lastUpdated: "2 days ago",
      evolution: "Elevated from medium confidence after 3 repeat gel searches"
    },
    {
      id: "pref-3",
      trait: "Budget Conscious (< ₹800)",
      category: "Pricing",
      confidence: 82,
      level: "Medium",
      learnedFrom: ["Search queries", "Cart checkouts"],
      lastUpdated: "3 days ago",
      evolution: "Stabilized around ₹600-₹750 sweet spot"
    },
    {
      id: "pref-4",
      trait: "Fragrance-Free / Low Scent",
      category: "Ingredients",
      confidence: 85,
      level: "High",
      learnedFrom: ["Product filtration", "Cica Relief preference"],
      lastUpdated: "1 week ago",
      evolution: "Identified through zero fragrance cart selections"
    },
    {
      id: "pref-5",
      trait: "Pore-Clearing Actives (Niacinamide/BHA)",
      category: "Actives",
      confidence: 76,
      level: "Medium",
      learnedFrom: ["Ingredient tag clicks", "Comparison inspects"],
      lastUpdated: "5 days ago",
      evolution: "Emerging interest detected"
    }
  ],
  graphData: {
    nodes: [
      {
        id: "skin",
        label: "Oily / Combo",
        type: "base",
        category: "Skin Profile",
        confidence: 96,
        source: "Declared in profile & repeated oily-skin search filters",
        updated: "10 days ago"
      },
      {
        id: "texture",
        label: "Lightweight",
        type: "learned",
        category: "Texture",
        confidence: 94,
        source: "Feedback signal on heavier cream + 4 gel comparisons",
        updated: "Just now"
      },
      {
        id: "formulation",
        label: "Gel Texture",
        type: "learned",
        category: "Formulation",
        confidence: 88,
        source: "Selected HydraGel 3x and interacted with water-burst descriptors",
        updated: "2 days ago"
      },
      {
        id: "budget",
        label: "Under ₹800",
        type: "learned",
        category: "Budget",
        confidence: 82,
        source: "Explicit queries 'under 800' + order history average ₹674",
        updated: "3 days ago"
      },
      {
        id: "fragrance",
        label: "Low Fragrance",
        type: "learned",
        category: "Sensory",
        confidence: 85,
        source: "Consistent preference for unscented and sensitive-safe badges",
        updated: "1 week ago"
      },
      {
        id: "routine",
        label: "Minimal Routine",
        type: "base",
        category: "Lifestyle",
        confidence: 75,
        source: "Prefers 3-step routine (Cleanser, Moisturizer, SPF)",
        updated: "2 weeks ago"
      }
    ],
    links: [
      { source: "skin", target: "texture", label: "requires non-greasy" },
      { source: "texture", target: "formulation", label: "manifests as" },
      { source: "formulation", target: "budget", label: "filtered by" },
      { source: "skin", target: "fragrance", label: "avoid sensitivity" },
      { source: "texture", target: "routine", label: "fast daytime prep" }
    ]
  }
};
