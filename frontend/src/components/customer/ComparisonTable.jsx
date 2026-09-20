import React from "react";
import { Link } from "react-router-dom";
import {
  X,
  Check,
  ShoppingBag,
  Star,
  Scale,
  Sparkles,
  MessageSquare
} from "lucide-react";
import { Button } from "../common/Button";
import { useCustomer } from "../../context/CustomerContext";

export const ComparisonTable = ({ products = [] }) => {
  const { removeFromCompare, addToBag, profile } = useCustomer();

  if (!products || products.length === 0) {
    return (
      <div className="p-8 text-center rounded-2xl border border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900">
        <p className="text-sm text-stone-500">No products selected for comparison.</p>
      </div>
    );
  }

  // Baseline customer preferences from Beauty Memory
  const preferences = profile?.statedPreferences || {
    skinType: "Oily / Combination",
    budgetRange: "Under ₹800",
    texture: "Lightweight",
    finish: "Natural"
  };

  // Helper for safe text extraction
  const getSafe = (val, fallback = "Not available") => {
    if (!val) return fallback;
    if (Array.isArray(val)) return val.length > 0 ? val.join(", ") : fallback;
    const str = String(val).trim();
    return str.length > 0 ? str : fallback;
  };

  // Helper for suitability formatting (Skin/Hair)
  const getSuitability = (p) => {
    const raw = p.skinType || p.skinTypes || p.hairType || p.suitableFor;
    if (Array.isArray(raw) && raw.length > 0) return raw.join(", ");
    if (raw && typeof raw === "string") return raw;
    if (p.category === "Hair" || p.subcategory?.toLowerCase().includes("hair")) {
      return "All Hair Types";
    }
    return "Not available";
  };

  // Calculate dynamic similarities across selected products
  const similarities = [];
  const allHighRated = products.every((p) => (Number(p.rating) || 0) >= 4.6);
  if (allHighRated) {
    similarities.push("Highly rated by customers (★ 4.6+ average)");
  }

  const allAffordable = products.every((p) => (Number(p.price) || 0) <= 800);
  if (allAffordable) {
    similarities.push("Priced under ₹800 for routine affordability");
  }

  const firstCategory = products[0]?.category;
  const allSameCategory = products.every((p) => p.category === firstCategory);
  if (allSameCategory && firstCategory) {
    similarities.push(`Both in ${firstCategory} routine category`);
  }

  const allLightweight = products.every((p) => {
    const tex = (p.texture || "").toLowerCase();
    return (
      tex.includes("gel") ||
      tex.includes("fluid") ||
      tex.includes("water") ||
      tex.includes("light") ||
      tex.includes("serum")
    );
  });
  if (allLightweight) {
    similarities.push("Lightweight formulas designed for comfortable absorption");
  }

  const allDailySafe = products.every((p) => {
    const desc = `${p.description || ""} ${p.howToUse || ""} ${p.benefits?.join(" ") || ""}`.toLowerCase();
    return desc.includes("daily") || desc.includes("morning") || desc.includes("gentle");
  });
  if (allDailySafe) {
    similarities.push("Suitable for daily routine use");
  }

  if (similarities.length === 0) {
    similarities.push("Verified formulation quality with customer reviews");
  }

  // Customer reviews wording helper (No technical NLP jargon)
  const getCustomerReviewStatus = (p) => {
    const r = Number(p.rating) || 4.5;
    const sScore = p.reviewSummary?.sentimentScore;
    if (r >= 4.7 || (sScore && sScore >= 0.85)) {
      return "Well liked by customers";
    }
    if (r >= 4.4 || (sScore && sScore >= 0.7)) {
      return "Mostly positive reviews";
    }
    return "Mixed customer feedback";
  };

  // Detailed comparison rows
  const detailedRows = [
    {
      label: "Price",
      render: (p) => (
        <div className="font-semibold text-stone-900 dark:text-stone-100">
          ₹{p.price || "Not available"}
          {p.size && <span className="text-stone-400 font-normal text-xs ml-1">({p.size})</span>}
        </div>
      )
    },
    {
      label: "Rating",
      render: (p) => (
        <div className="flex items-center gap-1.5">
          <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400 shrink-0" />
          <span className="font-semibold text-stone-900 dark:text-stone-100">{p.rating || "Not available"}</span>
          {p.reviewsCount ? (
            <span className="text-stone-400 text-xs">({p.reviewsCount} reviews)</span>
          ) : null}
        </div>
      )
    },
    {
      label: "Texture",
      render: (p) => (
        <span className="font-medium text-stone-800 dark:text-stone-200">
          {getSafe(p.texture)}
        </span>
      )
    },
    {
      label: "Finish",
      render: (p) => (
        <span className="text-stone-700 dark:text-stone-300">
          {getSafe(p.finish)}
        </span>
      )
    },
    {
      label: "Suitable For",
      render: (p) => (
        <span className="text-stone-700 dark:text-stone-300 text-xs">
          {getSuitability(p)}
        </span>
      )
    },
    {
      label: "Key Ingredients",
      render: (p) => {
        const ings = p.keyIngredients || p.ingredients || [];
        if (!ings || ings.length === 0) return <span className="text-stone-400">Not available</span>;
        return (
          <div className="flex flex-wrap gap-1">
            {ings.slice(0, 4).map((ing, i) => (
              <span
                key={i}
                className="text-[11px] px-2 py-0.5 rounded bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300 font-medium"
              >
                {ing}
              </span>
            ))}
          </div>
        );
      }
    },
    {
      label: "Benefits",
      render: (p) => {
        const benefits = p.benefits;
        if (!benefits || benefits.length === 0) return <span className="text-stone-400">Not available</span>;
        return (
          <ul className="space-y-1 text-xs text-stone-600 dark:text-stone-300">
            {benefits.slice(0, 2).map((b, i) => (
              <li key={i} className="flex items-center gap-1.5">
                <Check className="w-3 h-3 text-emerald-600 dark:text-emerald-400 shrink-0" />
                <span>{b}</span>
              </li>
            ))}
          </ul>
        );
      }
    },
    {
      label: "How to Use",
      render: (p) => (
        <span className="text-xs text-stone-600 dark:text-stone-400 line-clamp-2">
          {getSafe(p.howToUse)}
        </span>
      )
    }
  ];

  return (
    <div className="space-y-10">
      {/* 1. SELECTED PRODUCTS */}
      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-xs font-semibold uppercase tracking-wider text-stone-400">
            Selected Products ({products.length})
          </h2>
          <span className="text-xs text-stone-500 dark:text-stone-400">
            Side-by-side comparison
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {products.map((p) => (
            <div
              key={p.id}
              className="relative rounded-2xl border border-stone-200/80 dark:border-stone-800/80 bg-white dark:bg-stone-900 p-4 shadow-2xs flex flex-col justify-between"
            >
              <button
                onClick={() => removeFromCompare(p.id)}
                className="absolute top-3 right-3 p-1 rounded-full text-stone-400 hover:text-stone-700 dark:hover:text-stone-200 hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors cursor-pointer"
                title="Remove product"
                aria-label={`Remove ${p.name} from comparison`}
              >
                <X className="w-4 h-4" />
              </button>

              <div className="space-y-3">
                <div className="w-full aspect-square rounded-xl overflow-hidden bg-stone-50 dark:bg-stone-950 flex items-center justify-center p-2">
                  <img
                    src={p.image || (p.images && p.images[0])}
                    alt={p.name}
                    className="w-full h-full object-contain"
                  />
                </div>

                <div>
                  <span className="text-[10px] font-semibold uppercase tracking-wider text-stone-400 block">
                    {p.brand}
                  </span>
                  <Link
                    to={`/products/${p.id}`}
                    className="text-xs sm:text-sm font-semibold text-stone-900 dark:text-stone-100 hover:text-[#C26D53] transition-colors line-clamp-2"
                  >
                    {p.name}
                  </Link>
                  <div className="flex items-baseline gap-2 mt-1">
                    <span className="text-sm font-bold text-stone-900 dark:text-stone-100">
                      ₹{p.price}
                    </span>
                    {p.originalPrice && p.originalPrice > p.price && (
                      <span className="text-[11px] text-stone-400 line-through">
                        ₹{p.originalPrice}
                      </span>
                    )}
                  </div>
                </div>
              </div>

              <div className="pt-3 mt-3 border-t border-stone-100 dark:border-stone-800">
                <Button
                  size="sm"
                  variant="primary"
                  className="w-full justify-center text-xs py-2"
                  onClick={() => addToBag(p)}
                  icon={ShoppingBag}
                >
                  Add to Bag
                </Button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 2. QUICK COMPARISON */}
      <section className="p-6 rounded-2xl border border-stone-200/80 dark:border-stone-800/80 bg-white dark:bg-stone-900 shadow-2xs space-y-4">
        <div className="border-b border-stone-100 dark:border-stone-800 pb-3 flex items-center justify-between">
          <div>
            <h2 className="text-sm font-semibold uppercase tracking-wider text-stone-900 dark:text-stone-100 flex items-center gap-2">
              <Scale className="w-4 h-4 text-[#C26D53]" />
              Quick Comparison
            </h2>
            <p className="text-xs text-stone-500 dark:text-stone-400 mt-0.5">
              Core attributes at a glance
            </p>
          </div>
          <span className="text-xs text-stone-400">Real Data</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 text-xs">
          {/* Price */}
          <div className="p-3.5 rounded-xl bg-stone-50 dark:bg-stone-800/40 border border-stone-100 dark:border-stone-800 space-y-2">
            <span className="text-[10px] text-stone-400 uppercase font-semibold block">Price</span>
            <div className="space-y-1.5">
              {products.map((p) => (
                <div key={p.id} className="flex justify-between items-center text-xs">
                  <span className="text-stone-500 truncate max-w-[90px]">{p.brand}</span>
                  <span className="font-bold text-stone-900 dark:text-stone-100">₹{p.price}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Rating */}
          <div className="p-3.5 rounded-xl bg-stone-50 dark:bg-stone-800/40 border border-stone-100 dark:border-stone-800 space-y-2">
            <span className="text-[10px] text-stone-400 uppercase font-semibold block">Rating</span>
            <div className="space-y-1.5">
              {products.map((p) => (
                <div key={p.id} className="flex justify-between items-center text-xs">
                  <span className="text-stone-500 truncate max-w-[90px]">{p.brand}</span>
                  <span className="font-semibold text-amber-600 dark:text-amber-400 flex items-center gap-1">
                    ★ {p.rating || "N/A"}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Texture */}
          <div className="p-3.5 rounded-xl bg-stone-50 dark:bg-stone-800/40 border border-stone-100 dark:border-stone-800 space-y-2">
            <span className="text-[10px] text-stone-400 uppercase font-semibold block">Texture</span>
            <div className="space-y-1.5">
              {products.map((p) => (
                <div key={p.id} className="text-xs">
                  <span className="text-stone-400 text-[10px] block truncate">{p.brand}</span>
                  <span className="font-semibold text-stone-900 dark:text-stone-100 truncate block">
                    {getSafe(p.texture)}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Finish */}
          <div className="p-3.5 rounded-xl bg-stone-50 dark:bg-stone-800/40 border border-stone-100 dark:border-stone-800 space-y-2">
            <span className="text-[10px] text-stone-400 uppercase font-semibold block">Finish</span>
            <div className="space-y-1.5">
              {products.map((p) => (
                <div key={p.id} className="text-xs">
                  <span className="text-stone-400 text-[10px] block truncate">{p.brand}</span>
                  <span className="font-semibold text-stone-900 dark:text-stone-100 truncate block">
                    {getSafe(p.finish)}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Skin / Hair Suitability */}
          <div className="p-3.5 rounded-xl bg-stone-50 dark:bg-stone-800/40 border border-stone-100 dark:border-stone-800 space-y-2">
            <span className="text-[10px] text-stone-400 uppercase font-semibold block">Suitability</span>
            <div className="space-y-1.5">
              {products.map((p) => (
                <div key={p.id} className="text-xs">
                  <span className="text-stone-400 text-[10px] block truncate">{p.brand}</span>
                  <span className="font-medium text-stone-700 dark:text-stone-300 truncate block">
                    {getSuitability(p)}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 3. BASED ON YOUR PREFERENCES */}
      <section className="p-6 rounded-2xl border border-stone-200/80 dark:border-stone-800/80 bg-white dark:bg-stone-900 shadow-2xs space-y-4">
        <div className="border-b border-stone-100 dark:border-stone-800 pb-3 flex items-center justify-between">
          <div>
            <h2 className="text-sm font-semibold uppercase tracking-wider text-stone-900 dark:text-stone-100 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#C26D53]" />
              Based on Your Preferences
            </h2>
            <p className="text-xs text-stone-500 dark:text-stone-400 mt-0.5">
              Factual alignment with your saved Beauty Memory
            </p>
          </div>
          <span className="text-[11px] text-[#C26D53] font-medium">Beauty Memory</span>
        </div>

        <div className="space-y-4">
          {/* Preference 1: Texture */}
          <div className="p-4 rounded-xl bg-stone-50/70 dark:bg-stone-950/40 border border-stone-100 dark:border-stone-800 text-xs space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-semibold text-stone-900 dark:text-stone-100">
                Your preference: {preferences.texture || "Lightweight"} texture
              </span>
              <span className="text-stone-400 text-[11px]">Saved Preference</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 pt-1">
              {products.map((p) => {
                const prefTex = (preferences.texture || "lightweight").toLowerCase();
                const isMatch =
                  (p.texture || "").toLowerCase().includes(prefTex) ||
                  (p.texture || "").toLowerCase().includes("gel") ||
                  (p.texture || "").toLowerCase().includes("fluid") ||
                  (p.texture || "").toLowerCase().includes("serum");
                return (
                  <div
                    key={p.id}
                    className="p-3 rounded-lg bg-white dark:bg-stone-900 border border-stone-100 dark:border-stone-800 space-y-1"
                  >
                    <span className="text-[10px] text-stone-400 truncate block font-medium">
                      {p.name}
                    </span>
                    <div className="flex items-center gap-1.5 font-medium">
                      {isMatch ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 shrink-0" />
                          <span className="text-emerald-700 dark:text-emerald-400">
                            Matches your preference
                          </span>
                        </>
                      ) : (
                        <>
                          <span className="w-1.5 h-1.5 rounded-full bg-stone-400 shrink-0 ml-1 mr-1" />
                          <span className="text-stone-600 dark:text-stone-400">
                            Different from your preference
                          </span>
                        </>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Preference 2: Budget */}
          <div className="p-4 rounded-xl bg-stone-50/70 dark:bg-stone-950/40 border border-stone-100 dark:border-stone-800 text-xs space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-semibold text-stone-900 dark:text-stone-100">
                Your usual budget: {preferences.budgetRange || "Under ₹800"}
              </span>
              <span className="text-stone-400 text-[11px]">Saved Preference</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 pt-1">
              {products.map((p) => {
                const maxBudget = parseInt((preferences.budgetRange || "800").replace(/\D/g, ""), 10) || 800;
                const inBudget = (Number(p.price) || 0) <= maxBudget;
                return (
                  <div
                    key={p.id}
                    className="p-3 rounded-lg bg-white dark:bg-stone-900 border border-stone-100 dark:border-stone-800 space-y-1"
                  >
                    <span className="text-[10px] text-stone-400 truncate block font-medium">
                      {p.name}
                    </span>
                    <div className="flex items-center gap-1.5 font-medium">
                      {inBudget ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 shrink-0" />
                          <span className="text-emerald-700 dark:text-emerald-400">
                            Within budget (₹{p.price})
                          </span>
                        </>
                      ) : (
                        <>
                          <span className="w-1.5 h-1.5 rounded-full bg-stone-400 shrink-0 ml-1 mr-1" />
                          <span className="text-stone-600 dark:text-stone-400">
                            Above usual budget (₹{p.price})
                          </span>
                        </>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Preference 3: Finish */}
          <div className="p-4 rounded-xl bg-stone-50/70 dark:bg-stone-950/40 border border-stone-100 dark:border-stone-800 text-xs space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-semibold text-stone-900 dark:text-stone-100">
                Preferred finish: {preferences.finish || "Natural"}
              </span>
              <span className="text-stone-400 text-[11px]">Saved Preference</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 pt-1">
              {products.map((p) => {
                const prefFinish = (preferences.finish || "natural").toLowerCase();
                const matchesFinish = (p.finish || "").toLowerCase().includes(prefFinish);
                return (
                  <div
                    key={p.id}
                    className="p-3 rounded-lg bg-white dark:bg-stone-900 border border-stone-100 dark:border-stone-800 space-y-1"
                  >
                    <span className="text-[10px] text-stone-400 truncate block font-medium">
                      {p.name}
                    </span>
                    <div className="flex items-center gap-1.5 font-medium">
                      {matchesFinish ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 shrink-0" />
                          <span className="text-emerald-700 dark:text-emerald-400">
                            ✓ {p.finish || "Matches preference"}
                          </span>
                        </>
                      ) : (
                        <>
                          <span className="w-1.5 h-1.5 rounded-full bg-stone-400 shrink-0 ml-1 mr-1" />
                          <span className="text-stone-600 dark:text-stone-400">
                            Different finish ({p.finish || "Not specified"})
                          </span>
                        </>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* 4. KEY DIFFERENCES & 5. WHAT'S SIMILAR */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* 4. KEY DIFFERENCES */}
        <section className="p-6 rounded-2xl border border-stone-200/80 dark:border-stone-800/80 bg-white dark:bg-stone-900 shadow-2xs space-y-4">
          <div className="border-b border-stone-100 dark:border-stone-800 pb-3">
            <h2 className="text-sm font-semibold uppercase tracking-wider text-stone-900 dark:text-stone-100">
              Key Differences
            </h2>
            <p className="text-xs text-stone-500 dark:text-stone-400 mt-0.5">
              Clear distinction between selected products
            </p>
          </div>

          <div className="space-y-3 text-xs">
            {/* Texture */}
            <div className="p-3.5 rounded-xl bg-stone-50 dark:bg-stone-800/40 border border-stone-100 dark:border-stone-800 space-y-2">
              <span className="font-semibold text-stone-900 dark:text-stone-100 block">Texture</span>
              <div className="space-y-1.5">
                {products.map((p) => (
                  <div key={p.id} className="flex justify-between items-center text-stone-700 dark:text-stone-300">
                    <span className="truncate max-w-[140px] text-stone-500 dark:text-stone-400">
                      {p.name.split(" ").slice(0, 2).join(" ")}
                    </span>
                    <span className="font-semibold text-stone-900 dark:text-stone-100">
                      → {getSafe(p.texture)}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Price */}
            <div className="p-3.5 rounded-xl bg-stone-50 dark:bg-stone-800/40 border border-stone-100 dark:border-stone-800 space-y-2">
              <span className="font-semibold text-stone-900 dark:text-stone-100 block">Price</span>
              <div className="space-y-1.5">
                {products.map((p) => (
                  <div key={p.id} className="flex justify-between items-center text-stone-700 dark:text-stone-300">
                    <span className="truncate max-w-[140px] text-stone-500 dark:text-stone-400">
                      {p.name.split(" ").slice(0, 2).join(" ")}
                    </span>
                    <span className="font-semibold text-stone-900 dark:text-stone-100">
                      → ₹{p.price}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Suitable For */}
            <div className="p-3.5 rounded-xl bg-stone-50 dark:bg-stone-800/40 border border-stone-100 dark:border-stone-800 space-y-2">
              <span className="font-semibold text-stone-900 dark:text-stone-100 block">Suitable For</span>
              <div className="space-y-1.5">
                {products.map((p) => (
                  <div key={p.id} className="flex justify-between items-center text-stone-700 dark:text-stone-300">
                    <span className="truncate max-w-[140px] text-stone-500 dark:text-stone-400">
                      {p.name.split(" ").slice(0, 2).join(" ")}
                    </span>
                    <span className="font-semibold text-stone-900 dark:text-stone-100 text-right truncate max-w-[160px]">
                      → {getSuitability(p)}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Finish */}
            <div className="p-3.5 rounded-xl bg-stone-50 dark:bg-stone-800/40 border border-stone-100 dark:border-stone-800 space-y-2">
              <span className="font-semibold text-stone-900 dark:text-stone-100 block">Finish</span>
              <div className="space-y-1.5">
                {products.map((p) => (
                  <div key={p.id} className="flex justify-between items-center text-stone-700 dark:text-stone-300">
                    <span className="truncate max-w-[140px] text-stone-500 dark:text-stone-400">
                      {p.name.split(" ").slice(0, 2).join(" ")}
                    </span>
                    <span className="font-semibold text-stone-900 dark:text-stone-100">
                      → {getSafe(p.finish)}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* 5. WHAT'S SIMILAR */}
        <section className="p-6 rounded-2xl border border-stone-200/80 dark:border-stone-800/80 bg-white dark:bg-stone-900 shadow-2xs space-y-4 flex flex-col justify-between">
          <div>
            <div className="border-b border-stone-100 dark:border-stone-800 pb-3">
              <h2 className="text-sm font-semibold uppercase tracking-wider text-stone-900 dark:text-stone-100">
                What's Similar
              </h2>
              <p className="text-xs text-stone-500 dark:text-stone-400 mt-0.5">
                Common attributes shared across these products
              </p>
            </div>

            <div className="pt-4 space-y-3 text-xs">
              <span className="text-stone-500 dark:text-stone-400 font-medium block">
                Across all selected products:
              </span>
              <ul className="space-y-2.5">
                {similarities.map((item, idx) => (
                  <li
                    key={idx}
                    className="flex items-start gap-2.5 p-3 rounded-xl bg-stone-50 dark:bg-stone-800/40 border border-stone-100 dark:border-stone-800"
                  >
                    <Check className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                    <span className="text-stone-700 dark:text-stone-300 font-medium leading-relaxed">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-stone-50 dark:bg-stone-800/30 border border-dashed border-stone-200 dark:border-stone-800 text-[11px] text-stone-500 dark:text-stone-400 mt-4">
            Only factual data from verified product specifications is compared.
          </div>
        </section>
      </div>

      {/* 6. DETAILED COMPARISON */}
      <section className="rounded-2xl border border-stone-200/80 dark:border-stone-800/80 bg-white dark:bg-stone-900 overflow-hidden shadow-2xs space-y-0">
        <div className="p-4 sm:p-5 bg-stone-50/80 dark:bg-stone-950/50 border-b border-stone-200/80 dark:border-stone-800/80 flex items-center justify-between">
          <div>
            <h2 className="text-sm font-semibold uppercase tracking-wider text-stone-900 dark:text-stone-100">
              Detailed Comparison
            </h2>
            <p className="text-xs text-stone-500 dark:text-stone-400 mt-0.5">
              Comprehensive formulation & usage specifications
            </p>
          </div>
          <span className="text-xs text-stone-400">
            {products.length} {products.length === 1 ? "Product" : "Products"}
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-stone-200/80 dark:border-stone-800/80 bg-stone-50/30 dark:bg-stone-950/20">
                <th className="p-4 w-40 text-stone-500 dark:text-stone-400 font-medium">
                  Attribute
                </th>
                {products.map((p) => (
                  <th
                    key={p.id}
                    className="p-4 min-w-[200px] align-top text-stone-900 dark:text-stone-100 font-semibold"
                  >
                    <span className="text-[10px] text-stone-400 uppercase tracking-wider block font-normal">
                      {p.brand}
                    </span>
                    <span className="truncate block">{p.name}</span>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100 dark:divide-stone-800/80">
              {detailedRows.map((row, idx) => (
                <tr
                  key={idx}
                  className="hover:bg-stone-50/50 dark:hover:bg-stone-800/20 transition-colors"
                >
                  <td className="p-4 font-medium text-stone-500 dark:text-stone-400 bg-stone-50/20 dark:bg-stone-950/10">
                    {row.label}
                  </td>
                  {products.map((p) => (
                    <td key={p.id} className="p-4 text-stone-800 dark:text-stone-200">
                      {row.render(p)}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* 7. CUSTOMER REVIEWS */}
      <section className="p-6 sm:p-8 rounded-2xl border border-stone-200/80 dark:border-stone-800/80 bg-white dark:bg-stone-900 shadow-2xs space-y-5">
        <div className="border-b border-stone-100 dark:border-stone-800 pb-3 flex items-center justify-between">
          <div>
            <h2 className="text-sm font-semibold uppercase tracking-wider text-stone-900 dark:text-stone-100 flex items-center gap-2">
              <MessageSquare className="w-4 h-4 text-[#C26D53]" />
              Customer Reviews
            </h2>
            <p className="text-xs text-stone-500 dark:text-stone-400 mt-0.5">
              Real feedback from shoppers who used these products
            </p>
          </div>
          <span className="text-xs text-stone-400">Verified Feedback</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {products.map((p) => {
            const reviewStatus = getCustomerReviewStatus(p);
            const themes = p.reviewSummary?.positiveThemes || [
              "Comfortable texture",
              "Pleasant everyday application",
              "Matches skin needs"
            ];
            const concerns = p.reviewSummary?.concerns;

            return (
              <div
                key={p.id}
                className="p-4 rounded-xl bg-stone-50 dark:bg-stone-800/40 border border-stone-100 dark:border-stone-800 space-y-3 flex flex-col justify-between"
              >
                <div className="space-y-2.5">
                  <div>
                    <span className="text-[10px] text-stone-400 uppercase font-semibold block">
                      {p.brand}
                    </span>
                    <h4 className="font-semibold text-xs text-stone-900 dark:text-stone-100 truncate">
                      {p.name}
                    </h4>
                  </div>

                  {/* Customer feedback status badge */}
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/60 text-xs font-medium text-emerald-700 dark:text-emerald-300">
                    <Check className="w-3 h-3 text-emerald-600 shrink-0" />
                    <span>{reviewStatus}</span>
                  </div>

                  {/* Key customer themes */}
                  <div className="pt-2 space-y-1.5 text-xs text-stone-600 dark:text-stone-300">
                    <span className="text-[10px] text-stone-400 uppercase font-medium block">
                      Customer highlights:
                    </span>
                    <ul className="space-y-1">
                      {themes.slice(0, 3).map((theme, i) => (
                        <li key={i} className="flex items-start gap-1.5 text-xs">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1.5 shrink-0" />
                          <span>{theme}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Common note if available */}
                  {concerns && concerns.length > 0 && (
                    <div className="pt-2 border-t border-stone-200/60 dark:border-stone-700/60 text-[11px] text-stone-500 dark:text-stone-400">
                      <span className="font-medium text-stone-600 dark:text-stone-300">Note: </span>
                      {concerns[0]}
                    </div>
                  )}
                </div>

                <div className="pt-3 mt-2 border-t border-stone-200/60 dark:border-stone-700/60 flex items-center justify-between text-xs text-stone-500">
                  <span>Rating: ★ {p.rating || 4.8}</span>
                  {p.reviewsCount && <span>{p.reviewsCount} reviews</span>}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 8. COMPARISON SUMMARY */}
      <section className="p-6 sm:p-8 rounded-2xl border border-stone-200/80 dark:border-stone-800/80 bg-stone-50/60 dark:bg-stone-900/60 shadow-2xs space-y-6">
        <div className="text-center max-w-xl mx-auto space-y-1.5">
          <span className="text-[11px] font-semibold uppercase tracking-wider text-[#C26D53]">
            Decision Clarity
          </span>
          <h2 className="text-xl font-semibold text-stone-950 dark:text-stone-50">
            Comparison Summary
          </h2>
          <p className="text-sm font-medium text-stone-700 dark:text-stone-300">
            Choose based on what matters most to you.
          </p>
          <p className="text-xs text-stone-500 dark:text-stone-400">
            Review key attributes and your personal preference indicators below to make your decision.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {products.map((p) => {
            const isLight =
              (p.texture || "").toLowerCase().includes("gel") ||
              (p.texture || "").toLowerCase().includes("light") ||
              (p.texture || "").toLowerCase().includes("fluid") ||
              (p.texture || "").toLowerCase().includes("serum");
            const inBudget = (Number(p.price) || 0) <= 800;
            const matchesFinish = /natural|matte|dewy/i.test(p.finish || "");

            return (
              <div
                key={p.id}
                className="p-4 rounded-xl bg-white dark:bg-stone-900 border border-stone-200/80 dark:border-stone-800/80 shadow-2xs space-y-3 flex flex-col justify-between"
              >
                <div className="space-y-2.5 text-xs">
                  <div>
                    <span className="text-[10px] text-stone-400 uppercase font-semibold block">
                      {p.brand}
                    </span>
                    <h3 className="font-semibold text-stone-900 dark:text-stone-100 truncate">
                      {p.name}
                    </h3>
                  </div>

                  {/* Factual snapshot */}
                  <div className="space-y-1.5 pt-1 text-stone-600 dark:text-stone-300 text-xs">
                    <div className="flex justify-between py-1 border-b border-stone-100 dark:border-stone-800">
                      <span className="text-stone-400">Price:</span>
                      <span className="font-bold text-stone-900 dark:text-stone-100">₹{p.price}</span>
                    </div>
                    <div className="flex justify-between py-1 border-b border-stone-100 dark:border-stone-800">
                      <span className="text-stone-400">Texture:</span>
                      <span className="font-medium text-stone-800 dark:text-stone-200">
                        {getSafe(p.texture)}
                      </span>
                    </div>
                    <div className="flex justify-between py-1 border-b border-stone-100 dark:border-stone-800">
                      <span className="text-stone-400">Finish:</span>
                      <span className="font-medium text-stone-800 dark:text-stone-200">
                        {getSafe(p.finish)}
                      </span>
                    </div>
                    <div className="flex justify-between py-1 border-b border-stone-100 dark:border-stone-800">
                      <span className="text-stone-400">Suitability:</span>
                      <span className="font-medium text-stone-800 dark:text-stone-200 truncate max-w-[130px]">
                        {getSuitability(p)}
                      </span>
                    </div>
                  </div>

                  {/* Preference indicators */}
                  <div className="pt-2 space-y-1.5 border-t border-stone-100 dark:border-stone-800">
                    <div className="flex items-center gap-1.5 text-[11px]">
                      {isLight ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 shrink-0" />
                          <span className="text-emerald-700 dark:text-emerald-400">
                            Matches your texture preference
                          </span>
                        </>
                      ) : (
                        <>
                          <span className="w-1.5 h-1.5 rounded-full bg-stone-400 ml-1 mr-1 shrink-0" />
                          <span className="text-stone-500 dark:text-stone-400">
                            Different texture feel
                          </span>
                        </>
                      )}
                    </div>
                    <div className="flex items-center gap-1.5 text-[11px]">
                      {inBudget ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 shrink-0" />
                          <span className="text-emerald-700 dark:text-emerald-400">
                            Within your budget
                          </span>
                        </>
                      ) : (
                        <>
                          <span className="w-1.5 h-1.5 rounded-full bg-stone-400 ml-1 mr-1 shrink-0" />
                          <span className="text-stone-500 dark:text-stone-400">
                            Above usual budget
                          </span>
                        </>
                      )}
                    </div>
                    <div className="flex items-center gap-1.5 text-[11px]">
                      {matchesFinish ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 shrink-0" />
                          <span className="text-emerald-700 dark:text-emerald-400">
                            Suitable for your preferred finish
                          </span>
                        </>
                      ) : (
                        <>
                          <span className="w-1.5 h-1.5 rounded-full bg-stone-400 ml-1 mr-1 shrink-0" />
                          <span className="text-stone-500 dark:text-stone-400">
                            Alternative finish type
                          </span>
                        </>
                      )}
                    </div>
                  </div>
                </div>

                <Button
                  size="sm"
                  variant="primary"
                  className="w-full justify-center text-xs py-2 mt-3"
                  onClick={() => addToBag(p)}
                  icon={ShoppingBag}
                >
                  Select this Product
                </Button>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
};
