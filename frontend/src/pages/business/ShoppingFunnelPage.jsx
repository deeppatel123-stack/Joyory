import React from "react";
import { FunnelVisualizer } from "../../components/business/FunnelVisualizer";
import { businessAnalytics } from "../../data/analytics";
import { Filter, Sparkles, ArrowRight } from "lucide-react";
import { Badge } from "../../components/common/Badge";

export const ShoppingFunnelPage = () => {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="border-b border-stone-200/80 dark:border-stone-800/80 pb-6">
        <span className="text-xs font-semibold uppercase tracking-wider text-[#C26D53]">
          Conversion Architecture
        </span>
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-stone-950 dark:text-stone-50 mt-1">
          Shopping Journey Funnel
        </h1>
        <p className="text-xs sm:text-sm text-stone-500 dark:text-stone-400 mt-1">
          Conversion rates through search, product view, comparison, wishlist, checkout, and post-purchase feedback.
        </p>
      </div>

      {/* Visualizer Component */}
      <FunnelVisualizer steps={businessAnalytics.funnelSteps} />

      {/* Funnel Observations Card */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
        <div className="p-5 rounded-xl border border-stone-200/80 dark:border-stone-800/80 bg-white dark:bg-stone-900 space-y-2">
          <span className="text-[10px] uppercase font-semibold text-stone-400 block">High Engagement Stage</span>
          <h4 className="font-semibold text-stone-900 dark:text-stone-100">Compare Tool Usage</h4>
          <p className="text-stone-500 leading-relaxed">
            34.2% of shoppers use side-by-side comparison, lifting order checkout conversion by +32%.
          </p>
        </div>

        <div className="p-5 rounded-xl border border-stone-200/80 dark:border-stone-800/80 bg-white dark:bg-stone-900 space-y-2">
          <span className="text-[10px] uppercase font-semibold text-[#C26D53] block">Key Opportunity Area</span>
          <h4 className="font-semibold text-stone-900 dark:text-stone-100">Wishlist to Bag Drop-off</h4>
          <p className="text-stone-500 leading-relaxed">
            36.8% drop between wishlist and cart is heavily linked to price sensitivity above ₹800.
          </p>
        </div>

        <div className="p-5 rounded-xl border border-stone-200/80 dark:border-stone-800/80 bg-white dark:bg-stone-900 space-y-2">
          <span className="text-[10px] uppercase font-semibold text-emerald-600 block">Feedback Loop Health</span>
          <h4 className="font-semibold text-stone-900 dark:text-stone-100">4.2% Post-Order Signals</h4>
          <p className="text-stone-500 leading-relaxed">
            Over 1,200 customers shared texture reviews, providing continuous training weights for recommendations.
          </p>
        </div>
      </div>
    </div>
  );
};
