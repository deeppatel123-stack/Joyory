import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Users,
  Compass,
  Sparkles,
  MessageSquareQuote,
  Flame,
  LineChart,
  ArrowRight,
  TrendingUp,
  AlertCircle
} from "lucide-react";
import { StatCard } from "../../components/common/StatCard";
import { Badge } from "../../components/common/Badge";
import { Button } from "../../components/common/Button";
import { OpportunityCard } from "../../components/business/OpportunityCard";
import { analyticsService } from "../../services/analyticsService";
import { opportunityService } from "../../services/opportunityService";

export const BusinessOverviewPage = () => {
  const [analytics, setAnalytics] = useState(null);
  const [topOpportunity, setTopOpportunity] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const data = await analyticsService.getOverviewAnalytics();
        setAnalytics(data);

        const opps = await opportunityService.getOpportunities();
        if (opps.length > 0) setTopOpportunity(opps[0]);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  return (
    <div className="space-y-8">
      {/* HEADER & OVERVIEW BANNER */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-stone-200/80 dark:border-stone-800/80 pb-6">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#C26D53]">
              Enterprise Beauty Intelligence
            </span>
            <Badge variant="neutral" size="sm" className="font-mono">
              Live Analytics Stream
            </Badge>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-stone-950 dark:text-stone-50">
            Joyory Intelligence
          </h1>
          <p className="text-xs sm:text-sm text-stone-500 dark:text-stone-400 mt-1">
            Understand what customers are discovering, choosing and asking for next.
          </p>
        </div>

        <Link to="/business/opportunities">
          <Button variant="primary" size="sm" icon={Flame}>
            View Unmet Needs ({analytics?.kpis?.find(k => k.id === "kpi-6")?.value || 7})
          </Button>
        </Link>
      </div>

      {/* 39. MACRO KPIS (6 Cards) */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
        {analytics?.kpis?.map((kpi) => (
          <StatCard
            key={kpi.id}
            label={kpi.label}
            value={kpi.value}
            change={kpi.change}
            trend={kpi.trend}
            subtitle={kpi.subtitle}
          />
        ))}
      </div>

      {/* Flagship Highlight: ⭐ Top Unmet Need Alert */}
      {topOpportunity && (
        <div className="p-6 rounded-2xl border border-stone-200/80 dark:border-stone-800/80 bg-stone-100/50 dark:bg-stone-900/40 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#C26D53] animate-pulse" />
              <h3 className="text-sm font-semibold uppercase tracking-wider text-stone-900 dark:text-stone-100">
                ⭐ Critical Catalog Gap Detected
              </h3>
            </div>
            <Badge variant="accent" size="sm">
              Demand Score: {topOpportunity.demandScore}/100
            </Badge>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            <div className="lg:col-span-8 space-y-2">
              <h4 className="text-lg font-bold text-stone-900 dark:text-stone-100">
                {topOpportunity.title}
              </h4>
              <p className="text-xs text-stone-600 dark:text-stone-300 leading-relaxed">
                {topOpportunity.summary}
              </p>
              <div className="flex flex-wrap gap-2 pt-1 text-xs text-stone-500">
                <span>Monthly Searches: <strong>{topOpportunity.searchVolume}</strong></span>
                <span>•</span>
                <span>Existing Catalog Coverage: <strong className="text-rose-600 dark:text-rose-400">{topOpportunity.catalogCoverage}</strong></span>
                <span>•</span>
                <span>Optimal Price: <strong>{topOpportunity.metrics?.avgTargetPrice}</strong></span>
              </div>
            </div>

            <div className="lg:col-span-4 flex justify-start lg:justify-end">
              <Link to={`/business/opportunities/${topOpportunity.id}`}>
                <Button variant="primary" icon={ArrowRight}>
                  Explore Full Gap Analysis
                </Button>
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* Two Column Section: Top Preferences & Category Share */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Top Aggregated Preferences */}
        <div className="lg:col-span-6 p-6 rounded-xl border border-stone-200/80 dark:border-stone-800/80 bg-white dark:bg-stone-900 space-y-4 shadow-2xs">
          <div className="flex items-center justify-between border-b border-stone-100 dark:border-stone-800 pb-3">
            <h3 className="text-sm font-semibold text-stone-900 dark:text-stone-100">
              Top Customer Preference Demands
            </h3>
            <Link to="/business/customer-insights" className="text-xs text-[#C26D53] hover:underline font-medium">
              View Insights &rarr;
            </Link>
          </div>

          <div className="space-y-4">
            {analytics?.topPreferences?.map((pref, i) => (
              <div key={i} className="space-y-1 text-xs">
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-stone-800 dark:text-stone-200">{pref.label}</span>
                  <span className="font-mono text-stone-900 dark:text-stone-100 font-bold">{pref.percentage}%</span>
                </div>
                <div className="h-2 w-full bg-stone-100 dark:bg-stone-800 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-[#C26D53] rounded-full"
                    style={{ width: `${pref.percentage * 2}%` }}
                  />
                </div>
                <span className="text-[10px] text-stone-400">{pref.count}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Popular Categories */}
        <div className="lg:col-span-6 p-6 rounded-xl border border-stone-200/80 dark:border-stone-800/80 bg-white dark:bg-stone-900 space-y-4 shadow-2xs">
          <div className="flex items-center justify-between border-b border-stone-100 dark:border-stone-800 pb-3">
            <h3 className="text-sm font-semibold text-stone-900 dark:text-stone-100">
              Demand Distribution Across Categories
            </h3>
            <Link to="/business/search-trends" className="text-xs text-[#C26D53] hover:underline font-medium">
              Search Trends &rarr;
            </Link>
          </div>

          <div className="space-y-4">
            {analytics?.popularCategories?.map((cat, i) => (
              <div key={i} className="space-y-1 text-xs">
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-stone-800 dark:text-stone-200">{cat.name}</span>
                  <span className="text-emerald-600 dark:text-emerald-400 font-medium">{cat.growth} growth</span>
                </div>
                <div className="h-2 w-full bg-stone-100 dark:bg-stone-800 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-stone-700 dark:bg-stone-300 rounded-full"
                    style={{ width: `${cat.share * 2}%` }}
                  />
                </div>
                <span className="text-[10px] text-stone-400">{cat.share}% of total discovery inquiries</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
