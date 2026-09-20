// Dynamic recommendation matching algorithm and mock recommendation collections
// Maps customer preference graph to product attributes

import { products } from "./products";

export const calculateProductMatch = (product, customer) => {
  let score = 70; // baseline
  const matchReasons = [];

  const customerPreferences = customer?.learnedPreferences || [];
  const stated = customer?.statedPreferences || {};

  // Check lightweight
  const lightweightPref = customerPreferences.find(p => p.trait.toLowerCase().includes("lightweight"));
  if (product.tags.includes("lightweight") || product.preferences.includes("Lightweight")) {
    const boost = lightweightPref ? Math.round(lightweightPref.confidence * 0.15) : 10;
    score += boost;
    matchReasons.push({
      signal: "Lightweight texture",
      detail: `Matches your high-confidence lightweight preference (${lightweightPref ? lightweightPref.confidence : 90}% learned confidence)`,
      aligned: true
    });
  }

  // Check Gel / Texture
  if (product.texture.toLowerCase().includes("gel") || product.texture.toLowerCase().includes("fluid")) {
    score += 8;
    matchReasons.push({
      signal: "Formulation fit",
      detail: `Formulated as ${product.texture}, perfectly suited for humid conditions`,
      aligned: true
    });
  }

  // Check Budget
  const maxBudget = stated.maxBudget || 800;
  if (product.price <= maxBudget) {
    score += 7;
    matchReasons.push({
      signal: "Budget match",
      detail: `At ₹${product.price}, comfortably fits your target under ₹${maxBudget}`,
      aligned: true
    });
  } else {
    score -= 10;
  }

  // Check Skin Type
  if (product.skinType.some(st => st.toLowerCase().includes("oily") || st.toLowerCase().includes("combination") || st.toLowerCase().includes("all"))) {
    score += 6;
    matchReasons.push({
      signal: "Skin profile match",
      detail: "Specially formulated for oily & combination sebum regulation",
      aligned: true
    });
  }

  // Check Fragrance
  if (product.preferences.some(p => p.toLowerCase().includes("fragrance") || p.toLowerCase().includes("scent"))) {
    score += 5;
    matchReasons.push({
      signal: "Sensory alignment",
      detail: "Low or zero synthetic fragrance to avoid sensitization",
      aligned: true
    });
  }

  // Cap between 60% and 98%
  const finalScore = Math.min(98, Math.max(62, score));

  return {
    matchScore: finalScore,
    matchReasons
  };
};

export const getOrganizedRecommendations = (customer) => {
  const scoredProducts = products.map(p => ({
    ...p,
    ...calculateProductMatch(p, customer)
  })).sort((a, b) => b.matchScore - a.matchScore);

  return {
    topMatches: scoredProducts.slice(0, 4),
    becauseYouLiked: scoredProducts.filter(p => p.category === "Moisturizer" || p.category === "Sunscreen").slice(0, 3),
    basedOnPreferences: scoredProducts.filter(p => p.tags.includes("lightweight") || p.tags.includes("gel")).slice(0, 4),
    similarToPurchases: scoredProducts.filter(p => p.category === "Cleanser" || p.category === "Sunscreen").slice(0, 3),
    trendingAmongSimilar: scoredProducts.filter(p => p.price <= 700).slice(0, 3),
    newDiscoveries: scoredProducts.filter(p => p.brand === "Botanica Essence" || p.brand === "DermaBiome").slice(0, 3)
  };
};
