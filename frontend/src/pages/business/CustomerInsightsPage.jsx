import React from "react";
import { businessAnalytics } from "../../data/analytics";
import { Users, TrendingUp, ShieldCheck, Sparkles } from "lucide-react";
import { Badge } from "../../components/common/Badge";

export const CustomerInsightsPage = () => {
  const textures = [
    { label: "Water-Burst Gel", share: 38, growth: "+34%" },
    { label: "Lightweight Shake Fluid", share: 29, growth: "+21%" },
    { label: "Barrier Cream", share: 19, growth: "+12%" },
    { label: "Milky Emulsion", share: 14, growth: "+18%" }
  ];

  const priceBands = [
    { band: "Under ₹600", share: 32, label: "Entry Value Tier" },
    { band: "₹600 – ₹850", share: 48, label: "Core Demand Sweet Spot" },
    { band: "₹850 – ₹1,200", share: 14, label: "Targeted Active Actives" },
    { band: "Above ₹1,200", share: 6, label: "Premium Specialty" }
  ];

  const growingPreferences = [
    { name: "Cica / Centella Asiatica", growth: "+46%", intent: "Post-sun inflammation soothing" },
    { name: "Zero White Cast Verification", growth: "+38%", intent: "Non-ashy chemical/mineral hybrid SPF" },
    { name: "Hygienic Pump Packaging", growth: "+31%", intent: "Replacing open jar moisturizers" },
    { name: "Fragrance-Free Verification", growth: "+27%", intent: "Barrier sensitization avoidance" }
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-stone-200/80 dark:border-stone-800/80 pb-6">
        <div>
          <span className="text-xs font-semibold uppercase tracking-wider text-[#C26D53]">
            Aggregated Behavioral Demands
          </span>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-stone-950 dark:text-stone-50 mt-1">
            Customer Preference Insights
          </h1>
          <p className="text-xs sm:text-sm text-stone-500 dark:text-stone-400 mt-1">
            Structural insights derived from anonymized search, comparison, and feedback signals across 12.4K shoppers.
          </p>
        </div>

        <div className="flex items-center gap-1.5 text-xs text-stone-500 bg-stone-100 dark:bg-stone-800 px-3 py-1.5 rounded-lg border border-stone-200/60 dark:border-stone-700">
          <ShieldCheck className="w-4 h-4 text-emerald-600" />
          <span>Privacy Protected (Zero PII exposed)</span>
        </div>
      </div>

      {/* 4 Top Preference Blocks */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {businessAnalytics.topPreferences.map((pref, idx) => (
          <div
            key={idx}
            className="p-5 rounded-xl border border-stone-200/80 dark:border-stone-800/80 bg-white dark:bg-stone-900 space-y-2 shadow-2xs"
          >
            <span className="text-[10px] uppercase tracking-wider text-stone-400 font-semibold block">
              Preference Tier 0{idx + 1}
            </span>
            <h3 className="text-sm font-semibold text-stone-900 dark:text-stone-100">
              {pref.label}
            </h3>
            <div className="flex items-baseline gap-2 pt-1">
              <span className="text-3xl font-bold text-stone-950 dark:text-stone-50">
                {pref.percentage}%
              </span>
              <span className="text-xs text-stone-500">of active profiles</span>
            </div>
            <p className="text-[11px] text-stone-400 pt-1 border-t border-stone-100 dark:border-stone-800">
              {pref.count}
            </p>
          </div>
        ))}
      </div>

      {/* Two Column Grid: Popular Textures & Price Bands */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Popular Textures */}
        <div className="p-6 rounded-xl border border-stone-200/80 dark:border-stone-800/80 bg-white dark:bg-stone-900 space-y-4 shadow-2xs">
          <div className="flex items-center justify-between border-b border-stone-100 dark:border-stone-800 pb-3">
            <h3 className="text-sm font-semibold text-stone-900 dark:text-stone-100">
              Customer Formulation Texture Demand
            </h3>
            <Badge variant="accent" size="sm">Sensory Shift</Badge>
          </div>

          <div className="space-y-4 text-xs">
            {textures.map((t, i) => (
              <div key={i} className="space-y-1">
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-stone-800 dark:text-stone-200">{t.label}</span>
                  <div className="flex items-center gap-2">
                    <span className="text-emerald-600 dark:text-emerald-400 font-medium">{t.growth}</span>
                    <span className="font-bold text-stone-900 dark:text-stone-100">{t.share}%</span>
                  </div>
                </div>
                <div className="h-2 w-full bg-stone-100 dark:bg-stone-800 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-[#C26D53] rounded-full"
                    style={{ width: `${t.share * 2}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Popular Price Ranges */}
        <div className="p-6 rounded-xl border border-stone-200/80 dark:border-stone-800/80 bg-white dark:bg-stone-900 space-y-4 shadow-2xs">
          <div className="flex items-center justify-between border-b border-stone-100 dark:border-stone-800 pb-3">
            <h3 className="text-sm font-semibold text-stone-900 dark:text-stone-100">
              Shopper Price Tolerance Distribution
            </h3>
            <Badge variant="neutral" size="sm">Budget Elasticity</Badge>
          </div>

          <div className="space-y-4 text-xs">
            {priceBands.map((pb, i) => (
              <div key={i} className="space-y-1">
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-stone-800 dark:text-stone-200">{pb.band}</span>
                  <span className="font-bold text-stone-900 dark:text-stone-100">{pb.share}%</span>
                </div>
                <div className="h-2 w-full bg-stone-100 dark:bg-stone-800 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-stone-700 dark:bg-stone-300 rounded-full"
                    style={{ width: `${pb.share * 2}%` }}
                  />
                </div>
                <span className="text-[10px] text-stone-400">{pb.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Fastest Growing Preferences */}
      <div className="p-6 rounded-xl border border-stone-200/80 dark:border-stone-800/80 bg-white dark:bg-stone-900 space-y-4 shadow-2xs">
        <div className="flex items-center justify-between border-b border-stone-100 dark:border-stone-800 pb-3">
          <h3 className="text-sm font-semibold text-stone-900 dark:text-stone-100">
            Fastest Rising Customer Preference Signals (Last 60 Days)
          </h3>
          <span className="text-xs text-stone-400">Emerging Inquiries</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {growingPreferences.map((gp, i) => (
            <div key={i} className="p-4 rounded-lg bg-stone-50 dark:bg-stone-950/40 border border-stone-100 dark:border-stone-800 space-y-2 text-xs">
              <div className="flex items-center justify-between font-semibold text-stone-900 dark:text-stone-100">
                <span>{gp.name}</span>
                <span className="text-emerald-600 dark:text-emerald-400">{gp.growth}</span>
              </div>
              <p className="text-stone-500 text-[11px] leading-relaxed">
                Primary intent: {gp.intent}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
