// Feature 2: Beauty Memory / Personal Beauty Passport Mock Dataset
// Longitudinal customer memory and evolutionary shifts over time

export const initialBeautyMemory = {
  passportId: "PASS-JOY-8821",
  holderName: "Aria Chen",
  memberSince: "May 2026",
  totalInteractionsAnalyzed: 48,
  totalOutcomesLogged: 3,

  // Current Preference Ratings (Meters)
  currentPreferences: [
    { trait: "Lightweight Texture", score: 94, level: "High", target: "Water-burst & gel formulas" },
    { trait: "Low / Zero Fragrance", score: 85, level: "High", target: "Unscented & allergen-free" },
    { trait: "Natural Matte Finish", score: 88, level: "High", target: "Sebum-balanced, non-greasy" },
    { trait: "Budget Alignment", score: 92, level: "Strict", target: "₹500 — ₹800 sweet spot" },
    { trait: "Minimal Routine", score: 78, level: "Medium", target: "3-step daytime regimen" }
  ],

  // What Worked vs What Didn't Work
  likedAttributes: [
    { name: "Water-burst gel textures", source: "HydraGel outcome confirmation", date: "Sep 2026" },
    { name: "Centella Asiatica (Cica)", source: "Redness relief search & view", date: "Aug 2026" },
    { name: "Zinc PCA sebum regulator", source: "Clarifying BHA comparison", date: "Aug 2026" },
    { name: "Non-nano mineral/chemical SPF hybrid", source: "Sun gel usage trial", date: "Sep 2026" }
  ],

  dislikedAttributes: [
    { name: "Heavy occlusive shea butter creams", reason: "Caused midday congestion in humidity", date: "Jun 2026" },
    { name: "Artificial synthetic floral perfume", reason: "Triggered cheek sensitivity", date: "Jul 2026" },
    { name: "Sticky silicone primers", reason: "Pilled under daily sunscreen", date: "May 2026" }
  ],

  // Longitudinal Preference Evolution (3 Months Ago vs Now)
  preferenceEvolution: {
    periodFrom: "May 2026",
    periodTo: "Present",
    shifts: [
      {
        attribute: "Texture Requirement",
        pastState: "Medium rich creams",
        pastContext: "Assumed dry skin needed heavy moisturizers",
        currentState: "Ultra-Lightweight Gel",
        currentContext: "After 4 trials revealed dehydration, not lack of oil",
        trigger: "Post-purchase outcome logging on HydraGel"
      },
      {
        attribute: "Fragrance Tolerance",
        pastState: "Standard scented skincare",
        pastContext: "Preferred pleasant scent in products",
        currentState: "Strictly Low / Fragrance-Free",
        currentContext: "Eliminated synthetic perfume to calm redness",
        trigger: "Search filtering and adverse feedback signal"
      },
      {
        attribute: "Price Bracket",
        pastState: "Variable (up to ₹1,400)",
        pastContext: "Believed higher price ensured better efficacy",
        currentState: "Value Focused (₹500 – ₹800)",
        currentContext: "Consistently repurchased within entry-premium band",
        trigger: "Order history and compare evaluation"
      }
    ]
  },

  // Chronological Memory Timeline
  memoryTimeline: [
    {
      id: "mem-1",
      date: "August 2026",
      headline: "You preferred lightweight moisturizer",
      detail: "Strengthened preference for water-gel formulations after logging positive daytime wear.",
      category: "Texture Preference"
    },
    {
      id: "mem-2",
      date: "July 2026",
      headline: "You disliked strongly fragranced products",
      detail: "Identified mild cheek flare after scented serum; marked synthetic fragrance as negative signal.",
      category: "Sensory Dislike"
    },
    {
      id: "mem-3",
      date: "June 2026",
      headline: "You purchased a gel-based moisturizer",
      detail: "First transition from traditional cold creams to hyaluronic acid water-burst bases.",
      category: "Purchase Milestone"
    },
    {
      id: "mem-4",
      date: "May 2026",
      headline: "You preferred products under ₹1000",
      detail: "Established primary cost boundary, focusing discovery searches within ₹500–₹800 tier.",
      category: "Budget Calibration"
    }
  ]
};
