// Feature 3: Beauty Decision Replay Mock Dataset
// Reconstructs the complete decision path and explainability behind product selections

export const initialDecisionReplays = [
  {
    id: "replay-1",
    productId: "prod-1",
    productName: "HydraGel Ultra-Light Moisturizer",
    brand: "Joyory Labs",
    image: "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=600&auto=format&fit=crop&q=80",
    orderId: "JOY-10231",
    orderDate: "Sep 12, 2026",
    price: 649,
    overallMatchScore: 94,

    // Explainable Matching Factors
    matchFactors: [
      {
        title: "Lightweight Texture",
        detail: "Formulated as an oil-free water-gel, matching your high-confidence lightweight requirement.",
        supported: true
      },
      {
        title: "Within Your Usual Budget",
        detail: "At ₹649, sits comfortably below your ₹800 budget ceiling.",
        supported: true
      },
      {
        title: "Low Fragrance",
        detail: "Completely free of artificial synthetic perfumes, honoring your sensitive barrier signal.",
        supported: true
      },
      {
        title: "Similar to Past Successes",
        detail: "Shares 3 core soothing actives (Centella, Niacinamide, Hyaluronic Acid) with previous well-rated items.",
        supported: true
      }
    ],

    // Chronological Decision Journey Replay Steps
    steps: [
      {
        time: "10:31 AM",
        type: "SEARCH",
        action: "Initiated Intent Search",
        detail: 'Searched: "lightweight moisturizer for oily skin under ₹800"',
        meta: "Intent extracted: Oily skin • Moisturizer • Lightweight • < ₹800"
      },
      {
        time: "10:34 AM",
        type: "VIEW",
        action: "Explored Specifications",
        detail: "Inspected HydraGel Ultra-Light ingredients (2% Hyaluronic Acid, Niacinamide) and AI review summary.",
        meta: "94% Positive review sentiment verified"
      },
      {
        time: "10:37 AM",
        type: "COMPARE",
        action: "Side-by-Side Comparison",
        detail: "Compared HydraGel Ultra-Light vs Clarifying BHA Fluid vs Ceramide Barrier Defense Cream.",
        meta: "Identified HydraGel as superior in heat & humidity resistance"
      },
      {
        time: "10:40 AM",
        type: "WISHLIST",
        action: "Saved for Consideration",
        detail: "Added to personal Wishlist alongside Invisible Water SPF.",
        meta: "Saved in budget tier ₹600–₹750"
      },
      {
        time: "10:45 AM",
        type: "PURCHASE",
        action: "Selected & Purchased",
        detail: "Completed checkout for ₹649 via Order #JOY-10231.",
        meta: "Fast daytime delivery dispatched"
      },
      {
        time: "5 days later",
        type: "EXPERIENCE",
        action: "Experience Logged",
        detail: 'Submitted post-usage review: "Feels slightly heavy during humid afternoons. Excellent hydration."',
        meta: "Texture: Heavy signal captured"
      },
      {
        time: "6 days later",
        type: "MEMORY",
        action: "Beauty Memory Updated",
        detail: "Longitudinal Beauty Memory and Preference Graph elevated Lightweight priority to 96% confidence.",
        meta: "Next recommendations shifted to water-burst formulations"
      }
    ]
  },
  {
    id: "replay-2",
    productId: "prod-4",
    productName: "Invisible Water SPF 50+ Sun Gel",
    brand: "Joyory Labs",
    image: "https://images.unsplash.com/photo-1567928815117-69b56f8f0729?w=600&auto=format&fit=crop&q=80",
    orderId: "JOY-10492",
    orderDate: "Sep 16, 2026",
    price: 699,
    overallMatchScore: 92,
    matchFactors: [
      {
        title: "Zero White Cast",
        detail: "Invisible water-drop base dissolves clear on deeper complexions without ashiness.",
        supported: true
      },
      {
        title: "Eye-Safe Formulation",
        detail: "Non-migrating UV filters prevent stinging during outdoor runs.",
        supported: true
      },
      {
        title: "Budget Compliant",
        detail: "At ₹699, fits your ₹800 suncare allocation.",
        supported: true
      }
    ],
    steps: [
      {
        time: "02:15 PM",
        type: "SEARCH",
        action: "Intent Search",
        detail: 'Searched: "sunscreen for oily skin zero white cast"',
        meta: "Intent extracted: Sunscreen • SPF 50 • Zero cast"
      },
      {
        time: "02:22 PM",
        type: "VIEW",
        action: "Viewed Formulation Details",
        detail: "Reviewed sweat-resistance and matte finish claims.",
        meta: "95% Positive review sentiment"
      },
      {
        time: "02:28 PM",
        type: "PURCHASE",
        action: "Selected & Ordered",
        detail: "Placed Order #JOY-10492 for ₹699.",
        meta: "Marked delivered on Sep 18"
      },
      {
        time: "In Progress",
        type: "EXPERIENCE",
        action: "Trying Formulation",
        detail: "Currently undergoing active daytime usage. Awaiting 7-day outcome feedback.",
        meta: "Scheduled for Outcome Loop prompt"
      }
    ]
  }
];
