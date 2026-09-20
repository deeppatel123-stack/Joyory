import React from "react";
import { customerSegments } from "../../data/segments";
import { Users, TrendingUp, Sparkles, PieChart } from "lucide-react";
import { Badge } from "../../components/common/Badge";

export const CustomerSegmentsPage = () => {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="border-b border-stone-200/80 dark:border-stone-800/80 pb-6">
        <span className="text-xs font-semibold uppercase tracking-wider text-[#C26D53]">
          Behavioral Clustering
        </span>
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-stone-950 dark:text-stone-50 mt-1">
          Customer Segments
        </h1>
        <p className="text-xs sm:text-sm text-stone-500 dark:text-stone-400 mt-1">
          Behavioral clusters discovered through search patterns, comparison habits, and budget thresholds.
        </p>
      </div>

      {/* Segments Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {customerSegments.map((seg) => (
          <div
            key={seg.id}
            className="rounded-xl border border-stone-200/80 dark:border-stone-800/80 bg-white dark:bg-stone-900 p-6 shadow-2xs space-y-4 flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <Badge variant="accent" size="sm" className="font-semibold">
                  {seg.share}% of Shoppers
                </Badge>
                <span className="text-xs text-emerald-600 dark:text-emerald-400 font-medium">
                  {seg.growthTrend}
                </span>
              </div>

              <div>
                <h3 className="text-base font-semibold text-stone-900 dark:text-stone-100">
                  {seg.name}
                </h3>
                <span className="text-xs text-stone-400">
                  {seg.shopperCount} Active Shoppers
                </span>
              </div>

              <p className="text-xs text-stone-600 dark:text-stone-300 leading-relaxed">
                {seg.description}
              </p>

              {/* Metrics mini box */}
              <div className="grid grid-cols-2 gap-2 p-3 rounded-lg bg-stone-50 dark:bg-stone-950/40 border border-stone-100 dark:border-stone-800 text-xs">
                <div>
                  <span className="text-[10px] uppercase text-stone-400 block">Engagement</span>
                  <span className="font-semibold text-stone-900 dark:text-stone-100">{seg.engagementRate}</span>
                </div>
                <div>
                  <span className="text-[10px] uppercase text-stone-400 block">Avg Order Value</span>
                  <span className="font-semibold text-stone-900 dark:text-stone-100">{seg.avgOrderValue}</span>
                </div>
              </div>
            </div>

            {/* Popular categories & key traits */}
            <div className="space-y-3 pt-3 border-t border-stone-100 dark:border-stone-800 text-xs">
              <div>
                <span className="text-[10px] uppercase tracking-wider text-stone-400 block mb-1">
                  Popular Categories:
                </span>
                <div className="flex flex-wrap gap-1">
                  {seg.popularCategories.map((cat, i) => (
                    <span
                      key={i}
                      className="px-2 py-0.5 rounded text-[10px] bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300"
                    >
                      {cat}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <span className="text-[10px] uppercase tracking-wider text-stone-400 block mb-1">
                  Key Preferences:
                </span>
                <div className="flex flex-wrap gap-1">
                  {seg.keyPreferences.map((pref, i) => (
                    <span
                      key={i}
                      className="px-2 py-0.5 rounded text-[10px] bg-[#C26D53]/10 text-[#C26D53]"
                    >
                      {pref}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
