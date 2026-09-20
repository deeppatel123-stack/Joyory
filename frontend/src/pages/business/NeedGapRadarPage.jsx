import React, { useState, useEffect } from "react";
import { outcomeService } from "../../services/outcomeService";
import { StatCard } from "../../components/common/StatCard";
import { Badge } from "../../components/common/Badge";
import { Button } from "../../components/common/Button";
import { Modal } from "../../components/common/Modal";
import {
  Radar,
  ArrowUpRight,
  TrendingUp,
  AlertTriangle,
  Flame,
  Search,
  Users,
  Package,
  CheckCircle2,
  X,
  Info
} from "lucide-react";

export const NeedGapRadarPage = () => {
  const [kpis, setKpis] = useState([]);
  const [gaps, setGaps] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedGap, setSelectedGap] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    async function load() {
      setLoading(true);
      try {
        const kpiData = await outcomeService.getNeedGapRadarKPIs();
        const gapsData = await outcomeService.getNeedGaps();
        setKpis(kpiData);
        setGaps(gapsData);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  const handleInspect = (gap) => {
    setSelectedGap(gap);
    setModalOpen(true);
  };

  return (
    <div className="space-y-8 pb-12">
      {/* 8. HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-stone-200/80 dark:border-stone-800/80 pb-6">
        <div>
          <div className="flex flex-wrap items-center gap-2 mb-1.5">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#C26D53]">
              Merchandising Demand Intelligence
            </span>
            <Badge variant="accent" size="sm" className="font-semibold">
              ⭐ Need Gap Radar
            </Badge>
            <span className="text-[11px] text-stone-400 italic">
              * This capability is not publicly listed/documented among Joyory's current visible product features.
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-stone-950 dark:text-stone-50">
            Customer Need Gap Radar
          </h1>
          <p className="text-xs sm:text-sm text-stone-500 dark:text-stone-400 mt-1 max-w-2xl leading-relaxed">
            Discover customer needs that are growing faster than catalog coverage. Cross-references natural queries, comparisons, and friction feedback against inventory availability.
          </p>
        </div>
      </div>

      {/* 8. KPI CARDS (4 Cards) */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {kpis.map((kpi) => (
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

      {/* 9. NEED GAP TABLE */}
      <div className="rounded-xl border border-stone-200/80 dark:border-stone-800/80 bg-white dark:bg-stone-900 shadow-2xs overflow-hidden space-y-3">
        <div className="p-4 border-b border-stone-100 dark:border-stone-800 flex items-center justify-between">
          <div>
            <h2 className="text-sm font-semibold text-stone-900 dark:text-stone-100">
              Active Catalog Demand-Coverage Disparities
            </h2>
            <p className="text-xs text-stone-500">
              Prioritized by search intent volume and catalogue deficit ratio
            </p>
          </div>
          <span className="text-xs text-stone-400 font-mono">
            {gaps.length} Need Gaps Identified
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-stone-100 dark:border-stone-800 text-stone-400 bg-stone-50/50 dark:bg-stone-950/30">
                <th className="p-3.5 font-medium">Customer Need</th>
                <th className="p-3.5 font-medium">Inquiry Demand</th>
                <th className="p-3.5 font-medium">Catalog Coverage</th>
                <th className="p-3.5 font-medium">Gap Severity</th>
                <th className="p-3.5 font-medium">Search Trend</th>
                <th className="p-3.5 font-medium text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100 dark:divide-stone-800 text-stone-800 dark:text-stone-200">
              {gaps.map((gap) => (
                <tr
                  key={gap.id}
                  className="hover:bg-stone-50/70 dark:hover:bg-stone-800/30 transition-colors"
                >
                  <td className="p-3.5">
                    <span className="font-semibold text-stone-900 dark:text-stone-100 block">
                      {gap.customerNeed}
                    </span>
                    <span className="text-[10px] text-stone-400 uppercase tracking-wider block mt-0.5">
                      {gap.category}
                    </span>
                  </td>
                  <td className="p-3.5 font-mono font-bold text-stone-900 dark:text-stone-100">
                    {gap.demand.toLocaleString()} inquiries
                  </td>
                  <td className="p-3.5 font-mono">
                    <span className={`px-2 py-0.5 rounded text-[11px] font-semibold ${
                      gap.catalogCoverage <= 4
                        ? "bg-rose-50 dark:bg-rose-950/40 text-rose-600 dark:text-rose-400 border border-rose-200/50 dark:border-rose-900/50"
                        : "bg-amber-50 dark:bg-amber-950/40 text-amber-700 dark:text-amber-400 border border-amber-200/50 dark:border-amber-900/50"
                    }`}>
                      {gap.catalogCoverage} matching SKUs
                    </span>
                  </td>
                  <td className="p-3.5">
                    <Badge variant={gap.gapLevel === "High" ? "danger" : "warning"} size="sm">
                      {gap.gapLevel} Gap
                    </Badge>
                  </td>
                  <td className="p-3.5">
                    <span className="text-emerald-600 dark:text-emerald-400 font-semibold inline-flex items-center gap-0.5">
                      {gap.trend === "up" ? "↑ Rising" : "→ Stable"}
                    </span>
                  </td>
                  <td className="p-3.5 text-right">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleInspect(gap)}
                    >
                      Inspect Gap
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* 10. NEED GAP DETAIL MODAL */}
      {selectedGap && (
        <Modal
          isOpen={modalOpen}
          onClose={() => setModalOpen(false)}
          title={`Need Gap: ${selectedGap.customerNeed}`}
          subtitle="Detailed Demand vs Coverage Analysis"
          maxWidth="max-w-2xl"
        >
          <div className="space-y-6 pt-2 text-xs">
            {/* Summary */}
            <p className="text-stone-600 dark:text-stone-300 leading-relaxed">
              {selectedGap.summary}
            </p>

            {/* 10. Customer Demand Metrics (4 metrics) */}
            <div className="space-y-2">
              <span className="text-[10px] uppercase tracking-wider font-semibold text-stone-400 block">
                Aggregated Customer Demand Metrics
              </span>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="p-3 rounded-lg bg-stone-50 dark:bg-stone-950/40 border border-stone-100 dark:border-stone-800">
                  <span className="text-stone-400 text-[10px] block uppercase">Searches</span>
                  <span className="font-mono font-bold text-sm text-stone-900 dark:text-stone-100">
                    {selectedGap.demand.toLocaleString()}
                  </span>
                </div>
                <div className="p-3 rounded-lg bg-stone-50 dark:bg-stone-950/40 border border-stone-100 dark:border-stone-800">
                  <span className="text-stone-400 text-[10px] block uppercase">Product Views</span>
                  <span className="font-mono font-bold text-sm text-stone-900 dark:text-stone-100">
                    {selectedGap.searchVolume.toLocaleString()}
                  </span>
                </div>
                <div className="p-3 rounded-lg bg-stone-50 dark:bg-stone-950/40 border border-stone-100 dark:border-stone-800">
                  <span className="text-stone-400 text-[10px] block uppercase">Wishlists</span>
                  <span className="font-mono font-bold text-sm text-stone-900 dark:text-stone-100">
                    {selectedGap.wishlists.toLocaleString()}
                  </span>
                </div>
                <div className="p-3 rounded-lg bg-stone-50 dark:bg-stone-950/40 border border-stone-100 dark:border-stone-800">
                  <span className="text-stone-400 text-[10px] block uppercase">Purchases</span>
                  <span className="font-mono font-bold text-sm text-stone-900 dark:text-stone-100">
                    {selectedGap.purchases.toLocaleString()}
                  </span>
                </div>
              </div>
            </div>

            {/* 10. Customer Signals Quotes */}
            <div className="space-y-2">
              <span className="text-[10px] uppercase tracking-wider font-semibold text-stone-400 block">
                Representative Customer Signals & Feedback Quotes
              </span>
              <div className="space-y-1.5">
                {selectedGap.signals.map((sig, i) => (
                  <div
                    key={i}
                    className="p-2.5 rounded-lg bg-stone-50/70 dark:bg-stone-950/30 border border-stone-100 dark:border-stone-800/80 italic text-stone-700 dark:text-stone-300 text-[11px]"
                  >
                    "{sig}"
                  </div>
                ))}
              </div>
            </div>

            {/* 10. Catalog Coverage & Target Price Disparity */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 p-4 rounded-xl border border-stone-200 dark:border-stone-800 bg-stone-50/50 dark:bg-stone-950/40">
              <div>
                <span className="text-[10px] uppercase text-stone-400 block">Matching Products</span>
                <span className="font-bold text-sm text-stone-900 dark:text-stone-100">
                  {selectedGap.catalogCoverage} SKUs
                </span>
              </div>
              <div>
                <span className="text-[10px] uppercase text-stone-400 block">Avg Catalog Price</span>
                <span className="font-bold text-sm text-stone-900 dark:text-stone-100">
                  ₹{selectedGap.avgCatalogPrice}
                </span>
              </div>
              <div>
                <span className="text-[10px] uppercase text-[#C26D53] font-semibold block">Customer Target Band</span>
                <span className="font-bold text-sm text-[#C26D53]">
                  {selectedGap.customerTargetPrice}
                </span>
              </div>
            </div>

            {/* 10. Opportunity Signal Box */}
            <div className="p-4 rounded-xl border border-[#C26D53]/30 bg-[#C26D53]/5 space-y-1.5">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#C26D53] block">
                Opportunity Signal Formula:
              </span>
              <div className="flex flex-wrap items-center gap-1.5 text-[11px] font-semibold text-stone-800 dark:text-stone-200">
                <span>High Demand ({selectedGap.demand})</span>
                <span>+</span>
                <span>Low Catalog Coverage ({selectedGap.catalogCoverage} SKUs)</span>
                <span>+</span>
                <span>Repeated Customer Need</span>
                <span>=</span>
                <span className="text-[#C26D53] font-bold">Potential Product Opportunity</span>
              </div>
              <p className="text-[11px] text-stone-500 pt-1">
                {selectedGap.opportunityConclusion}
              </p>
            </div>

            <div className="flex justify-end pt-2">
              <Button size="sm" variant="secondary" onClick={() => setModalOpen(false)}>
                Close Gap Radar Insight
              </Button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};
