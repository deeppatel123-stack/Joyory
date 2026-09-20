import React from "react";
import { businessAnalytics } from "../../data/analytics";
import { StatCard } from "../../components/common/StatCard";
import { LineChart, Sparkles, TrendingUp, CheckCircle2 } from "lucide-react";
import { Badge } from "../../components/common/Badge";

export const RecommendationAnalyticsPage = () => {
  const recData = businessAnalytics.recommendationAnalytics;

  return (
    <div className="space-y-8">
      {/* 48. HEADER */}
      <div className="border-b border-stone-200/80 dark:border-stone-800/80 pb-6">
        <span className="text-xs font-semibold uppercase tracking-wider text-[#C26D53]">
          Algorithm Performance
        </span>
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-stone-950 dark:text-stone-50 mt-1">
          Recommendation Analytics
        </h1>
        <p className="text-xs sm:text-sm text-stone-500 dark:text-stone-400 mt-1">
          Tracking engagement, click-through, comparison triggers, and revenue lift driven by the Beauty Preference Graph.
        </p>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        <StatCard
          label="Recommendation CTR"
          value={recData.clickThroughRate}
          change="+4.8%"
          trend="up"
          subtitle="Clicks on matched items"
        />
        <StatCard
          label="Comparison Rate"
          value={recData.comparisonRate}
          change="+6.2%"
          trend="up"
          subtitle="Sent to side-by-side compare"
        />
        <StatCard
          label="Wishlist Retention"
          value={recData.wishlistRate}
          change="+3.1%"
          trend="up"
          subtitle="Saved to personal drawer"
        />
        <StatCard
          label="Add to Bag Rate"
          value={recData.addToBagRate}
          change="+5.4%"
          trend="up"
          subtitle="Direct checkout intent"
        />
        <StatCard
          label="Conversion Lift"
          value={recData.conversionLift}
          change="+8.9%"
          trend="up"
          subtitle="Versus generic search"
        />
      </div>

      {/* Progression Flow Card */}
      <div className="rounded-xl border border-stone-200/80 dark:border-stone-800/80 bg-white dark:bg-stone-900 p-6 shadow-2xs space-y-4">
        <div className="flex items-center justify-between border-b border-stone-100 dark:border-stone-800 pb-3">
          <h3 className="text-sm font-semibold text-stone-900 dark:text-stone-100">
            Recommendation Interaction Progression
          </h3>
          <Badge variant="accent" size="sm">Linear Lift</Badge>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-5 gap-3 text-center text-xs">
          <div className="p-4 rounded-xl bg-stone-50 dark:bg-stone-950/40 border border-stone-100 dark:border-stone-800 space-y-1">
            <span className="text-stone-400 text-[10px] block uppercase">Impression</span>
            <span className="font-semibold text-stone-900 dark:text-stone-100 block">100% Recommendations</span>
            <span className="text-[11px] text-stone-500">28.6K served</span>
          </div>
          <div className="p-4 rounded-xl bg-stone-50 dark:bg-stone-950/40 border border-stone-100 dark:border-stone-800 space-y-1">
            <span className="text-stone-400 text-[10px] block uppercase">View Detail</span>
            <span className="font-semibold text-stone-900 dark:text-stone-100 block">31.8% Click-through</span>
            <span className="text-[11px] text-stone-500">9.1K views</span>
          </div>
          <div className="p-4 rounded-xl bg-stone-50 dark:bg-stone-950/40 border border-stone-100 dark:border-stone-800 space-y-1">
            <span className="text-stone-400 text-[10px] block uppercase">Compare</span>
            <span className="font-semibold text-stone-900 dark:text-stone-100 block">24.6% Compared</span>
            <span className="text-[11px] text-stone-500">2.2K side-by-side</span>
          </div>
          <div className="p-4 rounded-xl bg-stone-50 dark:bg-stone-950/40 border border-stone-100 dark:border-stone-800 space-y-1">
            <span className="text-stone-400 text-[10px] block uppercase">Wishlist</span>
            <span className="font-semibold text-stone-900 dark:text-stone-100 block">18.2% Saved</span>
            <span className="text-[11px] text-stone-500">1.6K consideration</span>
          </div>
          <div className="p-4 rounded-xl bg-stone-50 dark:bg-stone-950/40 border border-stone-100 dark:border-stone-800 space-y-1">
            <span className="text-stone-400 text-[10px] block uppercase">Add to Bag</span>
            <span className="font-semibold text-[#C26D53] block font-bold">14.8% Added to Bag</span>
            <span className="text-[11px] text-stone-500">1.3K conversions</span>
          </div>
        </div>
      </div>

      {/* Monthly Performance Table */}
      <div className="rounded-xl border border-stone-200/80 dark:border-stone-800/80 bg-white dark:bg-stone-900 p-6 shadow-2xs space-y-4">
        <h3 className="text-sm font-semibold text-stone-900 dark:text-stone-100">
          Monthly Recommendation Conversion Trajectory
        </h3>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-stone-100 dark:border-stone-800 text-stone-400">
                <th className="p-3">Month</th>
                <th className="p-3">Impressions Served</th>
                <th className="p-3">High-Confidence Clicks (&gt;90% match)</th>
                <th className="p-3">Resulting Orders</th>
                <th className="p-3">Efficiency Index</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100 dark:divide-stone-800 font-mono">
              {recData.monthlyPerformance?.map((row, i) => (
                <tr key={i} className="hover:bg-stone-50 dark:hover:bg-stone-800/30">
                  <td className="p-3 font-sans font-semibold">{row.month} 2026</td>
                  <td className="p-3">{row.views.toLocaleString()}</td>
                  <td className="p-3 text-[#C26D53]">{row.matchedClicks.toLocaleString()}</td>
                  <td className="p-3 font-bold text-stone-900 dark:text-stone-100">{row.orders.toLocaleString()}</td>
                  <td className="p-3 font-sans text-emerald-600">High Affinity (+{24 + i * 2}%)</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
