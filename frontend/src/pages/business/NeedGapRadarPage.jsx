import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Radar, ArrowRight, TrendingUp, Sparkles, Package, Search } from "lucide-react";
import { Button } from "../../components/common/Button";
import { Modal } from "../../components/common/Modal";

export const NeedGapRadarPage = () => {
  const [selectedOpportunity, setSelectedOpportunity] = useState(null);

  const opportunities = [
    {
      id: "opp-1",
      need: "Lightweight moisturizer under ₹700",
      category: "Skincare",
      demand: "High",
      matchingProducts: 6,
      interest: "Growing (+42% YoY)",
      searchVolume: "14,200 / mo",
      customerInsight: "Shoppers consistently search for non-greasy barrier repair moisturizers for warm and humid seasons.",
      recommendedAction: "Expand Joyory Labs catalog with a 5-Ceramide Water Burst gel priced at ₹649."
    },
    {
      id: "opp-2",
      need: "Clarifying scalp treatment for metro hard water",
      category: "Hair",
      demand: "High",
      matchingProducts: 2,
      interest: "Growing (+36% YoY)",
      searchVolume: "11,800 / mo",
      customerInsight: "Shoppers in major metro cities frequently report mineral buildup and sticky roots within 24 hours.",
      recommendedAction: "Source an Apple Cider Vinegar + EDTA clarifying scalp detox serum target priced at ₹499."
    },
    {
      id: "opp-3",
      need: "Fragrance-free concealer for acne-prone skin",
      category: "Makeup",
      demand: "Medium",
      matchingProducts: 4,
      interest: "Growing (+28% YoY)",
      searchVolume: "8,900 / mo",
      customerInsight: "Customers with active breakouts need high coverage that doesn't trigger comedones or irritation.",
      recommendedAction: "Introduce non-comedogenic liquid concealers formulated with tea tree or salicylic acid."
    },
    {
      id: "opp-4",
      need: "Matte zinc sunscreen with zero white cast",
      category: "Skincare",
      demand: "High",
      matchingProducts: 3,
      interest: "Growing (+31% YoY)",
      searchVolume: "9,400 / mo",
      customerInsight: "Shoppers with sensitive or deeper skin tones desire 100% mineral protection that leaves zero white residue.",
      recommendedAction: "Develop tinted fluid mineral SPF 50 with ultra-micronized zinc."
    }
  ];

  return (
    <div className="space-y-8 max-w-5xl mx-auto py-4">
      {/* Header */}
      <div className="border-b border-stone-200/80 dark:border-stone-800/80 pb-5">
        <div className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-[#C26D53] mb-1">
          <Radar className="w-3.5 h-3.5" />
          <span>Need Gap Radar</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight text-stone-950 dark:text-stone-50">
          Customer Demand Opportunities
        </h1>
        <p className="text-xs sm:text-sm text-stone-500 dark:text-stone-400 mt-1">
          Detect unmet customer needs and high-intent searches to guide catalog expansion.
        </p>
      </div>

      {/* Opportunity Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {opportunities.map((opp) => (
          <div
            key={opp.id}
            className="p-6 rounded-2xl border border-stone-200/80 dark:border-stone-800/80 bg-white dark:bg-stone-900 shadow-2xs space-y-4 flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[10px] uppercase font-bold text-stone-400">
                  {opp.category}
                </span>
                <span className={`px-2 py-0.5 rounded text-[10px] font-semibold ${
                  opp.demand === "High"
                    ? "bg-rose-100 dark:bg-rose-950 text-rose-700 dark:text-rose-300"
                    : "bg-amber-100 dark:bg-amber-950 text-amber-700 dark:text-amber-300"
                }`}>
                  Demand: {opp.demand}
                </span>
              </div>

              <div>
                <span className="text-[11px] text-stone-400 block">Potential Customer Need</span>
                <h3 className="text-base font-semibold text-stone-900 dark:text-stone-100 mt-0.5">
                  "{opp.need}"
                </h3>
              </div>

              <div className="grid grid-cols-2 gap-3 pt-2 text-xs border-t border-stone-100 dark:border-stone-800">
                <div>
                  <span className="text-stone-400 block text-[11px]">Matching Products:</span>
                  <strong className="text-stone-800 dark:text-stone-200 font-semibold">{opp.matchingProducts}</strong>
                </div>
                <div>
                  <span className="text-stone-400 block text-[11px]">Interest:</span>
                  <strong className="text-emerald-600 font-semibold">{opp.interest}</strong>
                </div>
              </div>
            </div>

            <div className="pt-2">
              <Button
                variant="outline"
                size="sm"
                className="w-full justify-center"
                onClick={() => setSelectedOpportunity(opp)}
                icon={ArrowRight}
              >
                View Opportunity
              </Button>
            </div>
          </div>
        ))}
      </div>

      {/* Opportunity Modal Detail */}
      {selectedOpportunity && (
        <Modal
          isOpen={Boolean(selectedOpportunity)}
          onClose={() => setSelectedOpportunity(null)}
          title="Demand Opportunity Detail"
        >
          <div className="space-y-4 text-xs">
            <div>
              <span className="text-[11px] uppercase font-semibold text-[#C26D53]">
                Customer Need
              </span>
              <h2 className="text-base font-bold text-stone-900 dark:text-stone-100 mt-0.5">
                {selectedOpportunity.need}
              </h2>
            </div>

            <div className="p-3.5 rounded-xl bg-stone-50 dark:bg-stone-800 space-y-1">
              <span className="text-[11px] font-semibold text-stone-500">Customer Insight:</span>
              <p className="text-stone-700 dark:text-stone-300 leading-relaxed">
                {selectedOpportunity.customerInsight}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="p-3 rounded-lg border border-stone-200 dark:border-stone-700">
                <span className="text-stone-400 text-[11px] block">Search Volume:</span>
                <span className="font-semibold text-stone-900 dark:text-stone-100">{selectedOpportunity.searchVolume}</span>
              </div>
              <div className="p-3 rounded-lg border border-stone-200 dark:border-stone-700">
                <span className="text-stone-400 text-[11px] block">Current Catalog:</span>
                <span className="font-semibold text-stone-900 dark:text-stone-100">{selectedOpportunity.matchingProducts} products</span>
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-[#C26D53]/10 border border-[#C26D53]/20 space-y-1">
              <span className="text-[11px] font-semibold text-[#C26D53]">Action Item:</span>
              <p className="text-stone-800 dark:text-stone-200 font-medium">
                {selectedOpportunity.recommendedAction}
              </p>
            </div>

            <div className="pt-2 flex justify-end">
              <Button variant="primary" size="sm" onClick={() => setSelectedOpportunity(null)}>
                Close
              </Button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};
