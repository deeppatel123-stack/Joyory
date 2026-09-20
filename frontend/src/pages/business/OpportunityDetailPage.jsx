import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { opportunityService } from "../../services/opportunityService";
import {
  Flame,
  ArrowLeft,
  TrendingUp,
  Search,
  Users,
  Package,
  Layers,
  CheckCircle2,
  AlertTriangle,
  Info
} from "lucide-react";
import { Badge } from "../../components/common/Badge";
import { Button } from "../../components/common/Button";

export const OpportunityDetailPage = () => {
  const { id } = useParams();
  const [opportunity, setOpportunity] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      setLoading(true);
      try {
        const data = await opportunityService.getOpportunityById(id);
        setOpportunity(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    load();
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [id]);

  if (loading) {
    return <div className="p-8 text-center text-xs text-stone-400">Loading opportunity analysis...</div>;
  }

  if (!opportunity) {
    return (
      <div className="p-8 text-center space-y-3">
        <p className="text-sm font-semibold">Opportunity not found</p>
        <Link to="/business/opportunities">
          <Button size="sm" variant="outline">Back to Opportunities</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-8 pb-12">
      {/* Back button */}
      <Link
        to="/business/opportunities"
        className="inline-flex items-center gap-1.5 text-xs text-stone-500 hover:text-stone-900 dark:hover:text-stone-200 transition-colors"
      >
        <ArrowLeft className="w-3.5 h-3.5" />
        <span>Back to Unmet Needs List</span>
      </Link>

      {/* HEADER & DISCLAIMER */}
      <div className="p-6 sm:p-8 rounded-2xl border border-stone-200/80 dark:border-stone-800/80 bg-white dark:bg-stone-900 shadow-2xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="text-xs font-semibold uppercase tracking-wider text-[#C26D53]">
                {opportunity.category} Opportunity Deep Dive
              </span>
              <Badge variant="danger" size="sm">
                {opportunity.opportunitySignal}
              </Badge>
              <Badge variant="neutral" size="sm" className="font-mono">
                Demand Intelligence Model
              </Badge>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-stone-950 dark:text-stone-50">
              {opportunity.title}
            </h1>
            <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-300 mt-2 max-w-3xl leading-relaxed">
              {opportunity.summary}
            </p>
          </div>

          <div className="p-4 rounded-xl bg-stone-50 dark:bg-stone-950/40 border border-stone-100 dark:border-stone-800 text-right shrink-0">
            <span className="text-[10px] uppercase tracking-wider text-stone-400 font-semibold block">
              Demand Signal Index
            </span>
            <div className="text-3xl font-extrabold text-[#C26D53]">
              {opportunity.demandScore}
              <span className="text-xs text-stone-400 font-normal"> / 100</span>
            </div>
            <span className="text-[11px] text-emerald-600 font-medium">
              {opportunity.metrics?.searchGrowth} Growth
            </span>
          </div>
        </div>

        <div className="pt-3 border-t border-stone-100 dark:border-stone-800 flex items-center gap-2 text-xs text-stone-400 italic">
          <Info className="w-3.5 h-3.5 shrink-0" />
          <span>Notice: This is an automated analytical intelligence forecast. It does not claim to represent Joyory audited financial records.</span>
        </div>
      </div>

      {/* 47. DESIRED PRODUCT ATTRIBUTES (Frequently requested attributes) */}
      <div className="rounded-xl border border-stone-200/80 dark:border-stone-800/80 bg-white dark:bg-stone-900 p-6 shadow-2xs space-y-4">
        <div className="flex items-center justify-between border-b border-stone-100 dark:border-stone-800 pb-3">
          <h3 className="text-sm font-semibold text-stone-900 dark:text-stone-100">
            Frequently Requested Product Attributes (Formulation Target)
          </h3>
          <span className="text-xs text-stone-400">Target Product Spec</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {opportunity.requestedAttributes?.map((attr, idx) => (
            <div
              key={idx}
              className="p-4 rounded-xl border border-stone-100 dark:border-stone-800 bg-stone-50/60 dark:bg-stone-950/40 space-y-1 text-xs"
            >
              <div className="flex items-center justify-between text-stone-400 text-[11px]">
                <span>{attr.name}</span>
                <span className="font-semibold text-[#C26D53]">{attr.demandRatio} of searches</span>
              </div>
              <p className="font-semibold text-sm text-stone-900 dark:text-stone-100 pt-0.5">
                {attr.preference}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Two Column Grid: Search Terms & Demand Trend */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Top Search Terms */}
        <div className="lg:col-span-6 rounded-xl border border-stone-200/80 dark:border-stone-800/80 bg-white dark:bg-stone-900 p-6 shadow-2xs space-y-4">
          <div className="flex items-center justify-between border-b border-stone-100 dark:border-stone-800 pb-3">
            <h3 className="text-sm font-semibold text-stone-900 dark:text-stone-100">
              Unsatisfied Search Queries
            </h3>
            <span className="text-xs text-stone-400">Zero-Checkout Inquiries</span>
          </div>

          <div className="space-y-3">
            {opportunity.topSearchQueries?.map((sq, i) => (
              <div
                key={i}
                className="p-3 rounded-lg border border-stone-100 dark:border-stone-800 bg-stone-50/50 dark:bg-stone-950/30 text-xs space-y-1"
              >
                <div className="flex items-center justify-between font-semibold text-stone-900 dark:text-stone-100">
                  <span>"{sq.query}"</span>
                  <span className="text-emerald-600 dark:text-emerald-400">{sq.growth}</span>
                </div>
                <div className="flex justify-between text-stone-400 text-[11px]">
                  <span>Monthly volume: {sq.count}</span>
                  <span className="text-rose-500">Zero direct catalog checkout</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Demand Trend Table */}
        <div className="lg:col-span-6 rounded-xl border border-stone-200/80 dark:border-stone-800/80 bg-white dark:bg-stone-900 p-6 shadow-2xs space-y-4">
          <div className="flex items-center justify-between border-b border-stone-100 dark:border-stone-800 pb-3">
            <h3 className="text-sm font-semibold text-stone-900 dark:text-stone-100">
              Demand Surge vs Catalog Coverage Gap
            </h3>
            <Badge variant="accent" size="sm">Widening Gap</Badge>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-stone-100 dark:border-stone-800 text-stone-400">
                  <th className="p-2.5">Month</th>
                  <th className="p-2.5">Demand Index</th>
                  <th className="p-2.5">Catalog Supply</th>
                  <th className="p-2.5">Gap Deficit</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100 dark:divide-stone-800 font-mono">
                {opportunity.demandTrend?.map((row, i) => (
                  <tr key={i}>
                    <td className="p-2.5 font-sans font-semibold">{row.month} 2026</td>
                    <td className="p-2.5 text-[#C26D53] font-bold">{row.demand}</td>
                    <td className="p-2.5 text-stone-400">{row.coverage}</td>
                    <td className="p-2.5 text-rose-600 font-semibold">-{row.demand - row.coverage} deficit</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="pt-2 text-[11px] text-stone-500 leading-relaxed border-t border-stone-100 dark:border-stone-800">
            <strong>Merchandising Recommendation:</strong> Formulating an oil-free, water-burst 75ml pump moisturizer in the ₹550–₹680 price band would directly capture 14,800 monthly inquiries with minimal cannibalization.
          </div>
        </div>
      </div>

      {/* Existing Catalog Coverage */}
      <div className="rounded-xl border border-stone-200/80 dark:border-stone-800/80 bg-white dark:bg-stone-900 p-6 shadow-2xs space-y-4">
        <h3 className="text-sm font-semibold text-stone-900 dark:text-stone-100">
          Existing Catalog Products in Similar Category
        </h3>
        {opportunity.existingCatalogCoverage?.length === 0 ? (
          <p className="text-xs text-stone-400">Zero direct products currently exist in catalog.</p>
        ) : (
          <div className="space-y-2">
            {opportunity.existingCatalogCoverage.map((prod) => (
              <div key={prod.id} className="p-4 rounded-xl border border-stone-100 dark:border-stone-800 bg-stone-50 dark:bg-stone-950/40 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                <div>
                  <h4 className="font-semibold text-stone-900 dark:text-stone-100">{prod.name}</h4>
                  <p className="text-stone-500 mt-0.5">{prod.gapNote}</p>
                </div>
                <div className="flex items-center gap-3 shrink-0">
                  <span className="font-bold text-stone-900 dark:text-stone-100">₹{prod.price}</span>
                  <Link to={`/products/${prod.id}`}>
                    <Button size="sm" variant="outline">Inspect Formula</Button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
