// Feature 1: Beauty Outcome Loop Mock Dataset
// Tracks post-purchase product usage and structured feedback

export const initialBeautyOutcomes = [
  {
    id: "outcome-1",
    productId: "prod-1",
    productName: "HydraGel Ultra-Light Moisturizer",
    brand: "Joyory Labs",
    image: "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=600&auto=format&fit=crop&q=80",
    price: 649,
    purchaseDate: "12 Aug 2026",
    status: "Experience Logged", // Purchased | Trying | Used | Experience Logged | Preference Updated
    daysInUse: 18,
    structuredFeedback: {
      texture: "Lightweight",
      absorption: "Fast",
      fragrance: "None",
      overallExperience: "Very Good",
      rating: 4,
      result: "Better than expected",
      wouldBuyAgain: "Yes",
      verifiedObservations: [
        "Lightweight texture confirmed in 85% humidity",
        "Absorbs in under 15 seconds without tacky film",
        "Zero clogged pores after 2 weeks",
        "Jar format requires clean fingers/spatula"
      ]
    },
    learnedInsights: [
      "Lightweight water-burst texture preference strengthened (+6% confidence)",
      "Non-comedogenic gel base confirmed as optimal daytime formula",
      "Low-fragrance requirement reaffirmed"
    ],
    lastUpdated: "Sep 18, 2026"
  },
  {
    id: "outcome-2",
    productId: "prod-4",
    productName: "Invisible Water SPF 50+ Sun Gel",
    brand: "Joyory Labs",
    image: "https://images.unsplash.com/photo-1567928815117-69b56f8f0729?w=600&auto=format&fit=crop&q=80",
    price: 699,
    purchaseDate: "16 Sep 2026",
    status: "Trying", // Currently in active usage
    daysInUse: 4,
    structuredFeedback: null,
    learnedInsights: [],
    lastUpdated: "Sep 16, 2026"
  },
  {
    id: "outcome-3",
    productId: "prod-8",
    productName: "Amino Acid Gentle Foaming Cleanser",
    brand: "Joyory Labs",
    image: "https://images.unsplash.com/photo-1556228722-d0b5be7490bf?w=600&auto=format&fit=crop&q=80",
    price: 499,
    purchaseDate: "28 Aug 2026",
    status: "Preference Updated",
    daysInUse: 22,
    structuredFeedback: {
      texture: "Lightweight",
      absorption: "Fast",
      fragrance: "Mild",
      overallExperience: "Very Good",
      rating: 5,
      result: "As expected",
      wouldBuyAgain: "Yes",
      verifiedObservations: [
        "Zero stripping or dry tight sensation",
        "Dense micro-foam effectively dissolves oil",
        "Gentle pH 5.5 verified"
      ]
    },
    learnedInsights: [
      "Sulfate-free surfactant preference strengthened",
      "Affinity for green tea soothing agents elevated"
    ],
    lastUpdated: "Sep 12, 2026"
  }
];
