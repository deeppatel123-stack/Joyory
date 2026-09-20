import React from "react";
import { Link } from "react-router-dom";
import { Flame, ArrowRight, TrendingUp, AlertTriangle } from "lucide-react";
import { Badge } from "../common/Badge";
import { Button } from "../common/Button";

export const OpportunityCard = ({ opportunity }) => {
  const isCritical = opportunity.demandScore >= 90;

  return (
    <div className="rounded-xl border border-stone-200/80 dark:border-stone-800/80 bg-white dark:bg-stone-900 p-6 shadow-2xs hover:border-stone-300 dark:hover:border-stone-700 transition-all space-y-5">
      {/* Header */}
      <div className="flex items-start justify-between gap-3">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[10px] uppercase tracking-wider font-semibold text-[#C26D53]">
              {opportunity.category} Opportunity
            </span>
            <Badge variant={isCritical ? "danger" : "warning"} size="sm">
              {opportunity.opportunitySignal}
            </Badge>
          </div>
          <h3 className="text-base font-semibold text-stone-900 dark:text-stone-100">
            {opportunity.title}
          </h3>
        </div>

        {/* Demand Score Circle / Pill */}
        <div className="text-right shrink-0">
          <div className="flex items-baseline justify-end gap-1">
            <span className="text-2xl font-bold tracking-tight text-stone-900 dark:text-stone-100">
              {opportunity.demandScore}
            </span>
            <span className="text-xs text-stone-400">/ 100</span>
          </div>
          <span className="text-[10px] uppercase tracking-wider text-stone-400 font-medium block">
            Demand Signal
          </span>
        </div>
      </div>

      {/* Explanation */}
      <p className="text-xs text-stone-600 dark:text-stone-300 leading-relaxed">
        {opportunity.explanation}
      </p>

      {/* 4 Metrics Matrix */}
      <div className="grid grid-cols-3 gap-2.5 p-3 rounded-lg bg-stone-50 dark:bg-stone-950/40 border border-stone-100 dark:border-stone-800/80 text-xs">
        <div>
          <span className="text-[10px] uppercase tracking-wider text-stone-400 block mb-0.5">
            Search Interest
          </span>
          <span className="font-semibold text-stone-900 dark:text-stone-100">
            {opportunity.searchVolume}
          </span>
        </div>

        <div>
          <span className="text-[10px] uppercase tracking-wider text-stone-400 block mb-0.5">
            Catalog Coverage
          </span>
          <span className="font-semibold text-rose-600 dark:text-rose-400">
            {opportunity.catalogCoverage}
          </span>
        </div>

        <div>
          <span className="text-[10px] uppercase tracking-wider text-stone-400 block mb-0.5">
            Target Price
          </span>
          <span className="font-semibold text-stone-900 dark:text-stone-100">
            {opportunity.metrics?.avgTargetPrice || "₹620"}
          </span>
        </div>
      </div>

      {/* Requested attributes chips */}
      <div className="space-y-1.5">
        <span className="text-[11px] font-medium text-stone-400 uppercase tracking-wider block">
          Key Requested Attributes:
        </span>
        <div className="flex flex-wrap gap-1.5">
          {opportunity.requestedAttributes?.map((attr, i) => (
            <span
              key={i}
              className="px-2 py-0.5 rounded text-[11px] bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300 border border-stone-200/50 dark:border-stone-700/50"
            >
              {attr.preference} ({attr.demandRatio})
            </span>
          ))}
        </div>
      </div>

      {/* Action CTA */}
      <div className="pt-2 border-t border-stone-100 dark:border-stone-800/80 flex items-center justify-between">
        <span className="text-[11px] text-stone-400">
          Demand Signal Analytics
        </span>
        <Link to={`/business/opportunities/${opportunity.id}`}>
          <Button size="sm" variant="primary" icon={ArrowRight}>
            Explore Opportunity
          </Button>
        </Link>
      </div>
    </div>
  );
};
