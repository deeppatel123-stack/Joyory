// Aggregated feedback intelligence dataset (Voice of the Customer)

export const feedbackIntelligence = {
  overallSentiment: {
    positive: 78,
    neutral: 14,
    negative: 8,
    averageRating: 4.7
  },
  positiveThemes: [
    { theme: "Lightweight texture", count: 1840, percentage: 82, example: "Absorbs like water without any heaviness." },
    { theme: "Easy seamless application", count: 1520, percentage: 76, example: "Glides over skin with zero tugging." },
    { theme: "Soft natural/matte finish", count: 1410, percentage: 74, example: "Leaves skin naturally hydrated without greasy shine." },
    { theme: "Non-comedogenic / Clean pores", count: 1280, percentage: 68, example: "Didn't cause a single clogged pore." }
  ],
  negativeThemes: [
    { theme: "Packaging & dispensing", count: 540, percentage: 28, example: "Would love a pump instead of an open jar." },
    { theme: "Fragrance sensitivity", count: 460, percentage: 24, example: "Prefer completely unscented formulations." },
    { theme: "Texture heaviness in humidity", count: 390, percentage: 19, example: "Felt slightly heavy on hot humid afternoons." }
  ],
  sentimentTrends: [
    { month: "May", positive: 70, neutral: 18, negative: 12 },
    { month: "Jun", positive: 72, neutral: 17, negative: 11 },
    { month: "Jul", positive: 75, neutral: 15, negative: 10 },
    { month: "Aug", positive: 76, neutral: 15, negative: 9 },
    { month: "Sep", positive: 78, neutral: 14, negative: 8 }
  ],
  recentFeedbackQuotes: [
    {
      id: "fb-1",
      product: "HydraGel Ultra-Light Moisturizer",
      category: "Moisturizer",
      rating: 4,
      sentiment: "Positive",
      comment: "Feels slightly heavy during peak afternoon heat, but hydrates very well. Looking forward to an even lighter fluid.",
      impact: "Preference update: Lightweight texture priority elevated to 94%",
      date: "Sep 18, 2026"
    },
    {
      id: "fb-2",
      product: "Invisible Water SPF 50+ Sun Gel",
      category: "Sunscreen",
      rating: 5,
      sentiment: "Positive",
      comment: "Finally a sunscreen that leaves zero white cast on my warm undertone! Doesn't sting eyes at all during workouts.",
      impact: "Zero white cast signal strengthened in recommendation engine",
      date: "Sep 17, 2026"
    },
    {
      id: "fb-3",
      product: "Centella Asiatica Calming Relief Gel",
      category: "Moisturizer",
      rating: 5,
      sentiment: "Positive",
      comment: "Calms my redness after outdoor sun exposure instantly. Cools on contact.",
      impact: "Cica affinity score updated (+15%)",
      date: "Sep 16, 2026"
    }
  ]
};
