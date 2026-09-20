// Dynamic recommendation matching algorithm and mock recommendation collections
// Maps customer preference graph to product attributes

import { products } from "./products";

export const calculateProductMatch = (product = {}, customer = {}) => {
  let score = 70; // baseline
  const matchReasons = [];

  const customerPreferences = customer?.learnedPreferences || [];
  const stated = customer?.statedPreferences || {};

  const tags = Array.isArray(product.tags) ? product.tags : [];
  const preferences = Array.isArray(product.preferences) ? product.preferences : [];
  const skinTypes = Array.isArray(product.skinType)
    ? product.skinType
    : Array.isArray(product.skinTypes)
    ? product.skinTypes
    : [product.skinType || ""].filter(Boolean);
  const texture = (product.texture || "").toLowerCase();

  // Check lightweight
  const lightweightPref = customerPreferences.find(p => p.trait?.toLowerCase().includes("lightweight"));
  if (tags.some(t => t.toLowerCase().includes("lightweight")) || preferences.some(p => p.toLowerCase().includes("lightweight"))) {
    const boost = lightweightPref ? Math.round(lightweightPref.confidence * 0.15) : 10;
    score += boost;
    matchReasons.push({
      signal: "Lightweight texture",
      detail: "Lightweight, fast-absorbing texture that won't feel heavy on your skin.",
      aligned: true
    });
  }

  // Check Gel / Texture
  if (texture.includes("gel") || texture.includes("fluid")) {
    score += 8;
    matchReasons.push({
      signal: "Formulation fit",
      detail: `Light and refreshing ${product.texture || "gel"} texture suitable for everyday use.`,
      aligned: true
    });
  }

  // Check Budget
  const maxBudget = stated.maxBudget || 800;
  if (product.price && product.price <= maxBudget) {
    score += 7;
    matchReasons.push({
      signal: "Budget friendly",
      detail: `Priced at ₹${product.price}, well within your preferred price range.`,
      aligned: true
    });
  } else {
    score -= 5;
  }

  // Check Skin Type
  if (skinTypes.some(st => {
    const s = String(st).toLowerCase();
    return s.includes("oily") || s.includes("combination") || s.includes("all");
  })) {
    score += 6;
    matchReasons.push({
      signal: "Skin type match",
      detail: "Formulated to help balance and comfort your skin type.",
      aligned: true
    });
  }

  // Check Fragrance
  if (preferences.some(p => p.toLowerCase().includes("fragrance") || p.toLowerCase().includes("scent"))) {
    score += 5;
    matchReasons.push({
      signal: "Low fragrance",
      detail: "Gentle formula with minimal to no added fragrance.",
      aligned: true
    });
  }

  const finalScore = Math.min(98, Math.max(62, score));

  return {
    matchScore: finalScore,
    matchReasons
  };
};

export const getOrganizedRecommendations = (customer) => {
  const scoredProducts = (products || []).map(p => ({
    ...p,
    ...calculateProductMatch(p, customer)
  })).sort((a, b) => (b.matchScore || 0) - (a.matchScore || 0));

  return {
    topMatches: scoredProducts.slice(0, 4),
    becauseYouLiked: scoredProducts.filter(p => p.category === "Moisturizer" || p.subcategory === "Moisturizer" || p.category === "Sunscreen").slice(0, 3),
    basedOnPreferences: scoredProducts.filter(p => (p.tags || []).includes("lightweight") || (p.tags || []).includes("gel")).slice(0, 4),
    similarToPurchases: scoredProducts.filter(p => p.category === "Cleanser" || p.subcategory === "Face Wash" || p.category === "Sunscreen").slice(0, 3),
    trendingAmongSimilar: scoredProducts.filter(p => p.price <= 700).slice(0, 3),
    newDiscoveries: scoredProducts.filter(p => p.brand === "Botanica Essence" || p.brand === "DermaBiome").slice(0, 3)
  };
};
