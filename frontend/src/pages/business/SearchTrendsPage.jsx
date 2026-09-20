import React from "react";
import { searchTrendsData } from "../../data/searchTrends";
import { TrendingUp, Sparkles, Layers, Search } from "lucide-react";
import { Badge } from "../../components/common/Badge";

export const SearchTrendsPage = () => {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="border-b border-stone-200/80 dark:border-stone-800/80 pb-6">
        <span className="text-xs font-semibold uppercase tracking-wider text-[#C26D53]">
          Inquiry Intelligence
        </span>
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-stone-950 dark:text-stone-50 mt-1">
          What customers are looking for
        </h1>
        <p className="text-xs sm:text-sm text-stone-500 dark:text-stone-400 mt-1">
          Natural query intent volume, rising keywords, and high-affinity product attribute combinations.
        </p>
      </div>

      {/* 41. TRENDING SEARCHES GRID */}
      <div className="space-y-4">
        <h2 className="text-base font-semibold text-stone-900 dark:text-stone-100">
          Fastest Growing Search Queries
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {searchTrendsData.trendingSearches.map((item, idx) => (
            <div
              key={idx}
              className="p-5 rounded-xl border border-stone-200/80 dark:border-stone-800/80 bg-white dark:bg-stone-900 shadow-2xs space-y-3"
            >
              <div className="flex items-center justify-between">
                <span className="text-[10px] uppercase font-semibold text-stone-400">
                  {item.category}
                </span>
                <Badge variant="accent" size="sm" className="font-semibold">
                  {item.growth}
                </Badge>
              </div>

              <h3 className="text-sm font-semibold text-stone-900 dark:text-stone-100">
                "{item.query}"
              </h3>

              <div className="pt-2 border-t border-stone-100 dark:border-stone-800 flex items-center justify-between text-xs text-stone-500">
                <span>Monthly Volume: <strong>{item.volume}</strong></span>
                <span className="text-[11px] text-stone-400">{item.sentiment}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 41. EMERGING COMBINATIONS MATRIX */}
      <div className="space-y-4 pt-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-base font-semibold text-stone-900 dark:text-stone-100">
              Emerging Attribute Combinations
            </h2>
            <p className="text-xs text-stone-500 dark:text-stone-400">
              Multi-dimensional criteria clusters where customer search intent overlaps
            </p>
          </div>
          <Badge variant="neutral" size="sm">NLP Clustered</Badge>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {searchTrendsData.emergingCombinations.map((combo, idx) => (
            <div
              key={idx}
              className="p-6 rounded-xl border border-stone-200/80 dark:border-stone-800/80 bg-white dark:bg-stone-900 space-y-3 shadow-2xs"
            >
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold text-stone-900 dark:text-stone-100">
                  {combo.combination}
                </h3>
                <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 px-2 py-0.5 rounded">
                  {combo.growth} MoM
                </span>
              </div>

              <p className="text-xs text-stone-600 dark:text-stone-300 leading-relaxed">
                {combo.insight}
              </p>

              <div className="pt-2 border-t border-stone-100 dark:border-stone-800 flex items-center justify-between text-[11px] text-stone-400">
                <span>Relevance Score: {combo.relevanceScore}/100</span>
                <span className="text-[#C26D53] font-medium">Unsatisfied Demand Signal</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Weekly Query Volume Trajectory Table */}
      <div className="rounded-xl border border-stone-200/80 dark:border-stone-800/80 bg-white dark:bg-stone-900 p-6 shadow-2xs space-y-4">
        <div className="flex items-center justify-between border-b border-stone-100 dark:border-stone-800 pb-3">
          <h3 className="text-sm font-semibold text-stone-900 dark:text-stone-100">
            Weekly Search Inquiry Trajectory
          </h3>
          <span className="text-xs text-stone-400">Aug – Sep 2026</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-stone-100 dark:border-stone-800 text-stone-400">
                <th className="p-3">Period</th>
                <th className="p-3">Lightweight & Gel Queries</th>
                <th className="p-3">Barrier & Ceramide Queries</th>
                <th className="p-3">Invisible SPF Queries</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100 dark:divide-stone-800 text-stone-800 dark:text-stone-200 font-mono">
              {searchTrendsData.queryVolumeHistory.map((row, i) => (
                <tr key={i} className="hover:bg-stone-50 dark:hover:bg-stone-800/30">
                  <td className="p-3 font-sans font-medium text-stone-600 dark:text-stone-400">{row.week}</td>
                  <td className="p-3 font-semibold text-[#C26D53]">{row.lightweight.toLocaleString()}</td>
                  <td className="p-3">{row.barrier.toLocaleString()}</td>
                  <td className="p-3">{row.sunscreen.toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
