import React, { useState, useEffect } from "react";
import { recommendationService } from "../../services/recommendationService";
import { ProductCard } from "../../components/customer/ProductCard";
import { useCustomer } from "../../context/CustomerContext";
import { Sparkles, Info } from "lucide-react";
import { Badge } from "../../components/common/Badge";
import { SkeletonLoader } from "../../components/common/SkeletonLoader";

export const RecommendationsPage = () => {
  const { profile } = useCustomer();
  const [bundles, setBundles] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchRecs() {
      setLoading(true);
      try {
        const data = await recommendationService.getRecommendations();
        setBundles(data);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    }
    fetchRecs();
  }, [profile]);

  if (loading) {
    return (
      <div className="space-y-8">
        <SkeletonLoader type="card" count={3} />
      </div>
    );
  }

  const sections = [
    {
      title: "Because you liked HydraGel Ultra-Light...",
      subtitle: "Formulations sharing water-burst absorption and non-comedogenic bases",
      products: bundles?.becauseYouLiked || [],
      reason: "Based on positive ratings for water-gel formulations with Niacinamide"
    },
    {
      title: "Based on your learned preferences",
      subtitle: "High confidence match for lightweight, gel formulations under ₹800",
      products: bundles?.basedOnPreferences || [],
      reason: "Learned from your recent feedback signal: 'Feels slightly heavy' (+6% lightweight priority)"
    },
    {
      title: "Similar to your previous purchases",
      subtitle: "Gentle foaming cleansers & invisible broad-spectrum sun gels",
      products: bundles?.similarToPurchases || [],
      reason: "Complements Order #JOY-10231 with daily pH-balanced essentials"
    },
    {
      title: "Trending among similar shoppers",
      subtitle: "Popular with the 'Budget Conscious' & 'Minimal Routine' segments",
      products: bundles?.trendingAmongSimilar || [],
      reason: "Frequently paired by customers with combination/oily skin in humid regions"
    },
    {
      title: "New formulation discoveries",
      subtitle: "Emerging botanical and barrier-strengthening innovations",
      products: bundles?.newDiscoveries || [],
      reason: "Introduces non-fragranced rice ferments and oat milk emulsions"
    }
  ];

  return (
    <div className="space-y-12">
      {/* Header */}
      <div className="border-b border-stone-200/80 dark:border-stone-800/80 pb-6">
        <span className="text-xs font-semibold uppercase tracking-wider text-[#C26D53]">
          Continuous Learning Feed
        </span>
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-stone-950 dark:text-stone-50 mt-1">
          Recommended for you
        </h1>
        <p className="text-xs sm:text-sm text-stone-500 dark:text-stone-400 mt-1">
          Every suggestion below explains the explicit signal behind its placement in your feed.
        </p>
      </div>

      {/* Sections list */}
      <div className="space-y-12">
        {sections.map((sec, idx) => (
          <section key={idx} className="space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1 border-b border-stone-100 dark:border-stone-800/80 pb-3">
              <div>
                <h2 className="text-base font-semibold text-stone-900 dark:text-stone-100">
                  {sec.title}
                </h2>
                <p className="text-xs text-stone-500 dark:text-stone-400 mt-0.5">
                  {sec.subtitle}
                </p>
              </div>
              <div className="flex items-center gap-1.5 text-[11px] text-[#C26D53] bg-[#C26D53]/10 px-2.5 py-1 rounded-md mt-1 sm:mt-0 self-start sm:self-auto">
                <Info className="w-3 h-3" />
                <span>{sec.reason}</span>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
              {sec.products.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
};
