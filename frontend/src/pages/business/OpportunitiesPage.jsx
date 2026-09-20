import React, { useState } from "react";
import { Sparkles, ArrowRight, Check } from "lucide-react";
import { Button } from "../../components/common/Button";
import { Modal } from "../../components/common/Modal";

export const OpportunitiesPage = () => {
  const [selectedOpportunity, setSelectedOpportunity] = useState(null);

  const needsList = [
    {
      id: "need-1",
      title: "Lightweight Gel Moisturizer",
      need: "Lightweight moisturizer under ₹700",
      interest: "High",
      availableProducts: "Few (2 products)",
      why: "Many customers are looking for lightweight moisturizers for warm weather. Current catalog has limited options under ₹700.",
      opportunity: "Add more lightweight gel moisturizer options in the catalog."
    },
    {
      id: "need-2",
      title: "Fragrance-Free Sunscreen",
      need: "Fragrance-free matte sunscreen",
      interest: "Growing",
      availableProducts: "Few (1 product)",
      why: "Shoppers with sensitive and acne-prone skin frequently request fragrance-free formulas that don't sting.",
      opportunity: "Expand fragrance-free mineral and fluid sunscreen options."
    },
    {
      id: "need-3",
      title: "Clarifying Scalp Serum",
      need: "Hard water hair & scalp detox",
      interest: "High",
      availableProducts: "Few (1 product)",
      why: "Customers living in metro cities report high mineral buildup from hard tap water.",
      opportunity: "Introduce an affordable chelating scalp detox serum."
    },
    {
      id: "need-4",
      title: "Non-Comedogenic Concealer",
      need: "Acne-safe breathable concealer",
      interest: "Growing",
      availableProducts: "Few (2 products)",
      why: "Shoppers with active blemishes want natural coverage that won't clog pores.",
      opportunity: "Source treatment-infused concealers containing tea tree or salicylic acid."
    }
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-8 py-4">
      {/* Header */}
      <div className="border-b border-stone-200/80 dark:border-stone-800/80 pb-5">
        <div className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-[#C26D53] mb-1">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Customer Needs</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight text-stone-950 dark:text-stone-50">
          Opportunities
        </h1>
        <p className="text-xs sm:text-sm text-stone-500 dark:text-stone-400 mt-1">
          Shows Joyory what customers are looking for but may not find easily.
        </p>
      </div>

      {/* Simple Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {needsList.map((item) => (
          <div
            key={item.id}
            className="p-6 rounded-2xl border border-stone-200/80 dark:border-stone-800/80 bg-white dark:bg-stone-900 shadow-2xs space-y-4 flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-stone-400 uppercase tracking-wider">
                  Potential Opportunity
                </span>
                <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-semibold ${
                  item.interest === "High"
                    ? "bg-rose-100 dark:bg-rose-950 text-rose-700 dark:text-rose-300"
                    : "bg-amber-100 dark:bg-amber-950 text-amber-700 dark:text-amber-300"
                }`}>
                  Interest: {item.interest}
                </span>
              </div>

              <h2 className="text-base font-semibold text-stone-900 dark:text-stone-100">
                {item.title}
              </h2>

              <div className="space-y-1 text-xs">
                <p className="text-stone-500 dark:text-stone-400 font-medium">
                  Why?
                </p>
                <p className="text-stone-600 dark:text-stone-300 leading-relaxed">
                  {item.why}
                </p>
              </div>

              <div className="pt-2 border-t border-stone-100 dark:border-stone-800 text-xs">
                <span className="text-stone-400">Available products: </span>
                <strong className="text-stone-800 dark:text-stone-200">{item.availableProducts}</strong>
              </div>
            </div>

            <div className="pt-2">
              <Button
                variant="outline"
                size="sm"
                className="w-full justify-center"
                onClick={() => setSelectedOpportunity(item)}
                icon={ArrowRight}
              >
                View Opportunity
              </Button>
            </div>
          </div>
        ))}
      </div>

      {/* Simple Detail Modal */}
      {selectedOpportunity && (
        <Modal
          isOpen={Boolean(selectedOpportunity)}
          onClose={() => setSelectedOpportunity(null)}
          title="Customer Need Opportunity"
        >
          <div className="space-y-4 text-xs">
            <div>
              <span className="text-[11px] uppercase font-semibold text-[#C26D53]">
                Customer Need
              </span>
              <h3 className="text-base font-bold text-stone-900 dark:text-stone-100 mt-0.5">
                {selectedOpportunity.need}
              </h3>
            </div>

            <div className="p-3.5 rounded-xl bg-stone-50 dark:bg-stone-800/60 space-y-1">
              <span className="text-[11px] font-semibold text-stone-500">Why this opportunity exists:</span>
              <p className="text-stone-700 dark:text-stone-300 leading-relaxed">
                {selectedOpportunity.why}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="p-3 rounded-lg border border-stone-200 dark:border-stone-700">
                <span className="text-stone-400 text-[11px] block">Customer Interest:</span>
                <span className="font-semibold text-stone-900 dark:text-stone-100">{selectedOpportunity.interest}</span>
              </div>
              <div className="p-3 rounded-lg border border-stone-200 dark:border-stone-700">
                <span className="text-stone-400 text-[11px] block">Current Products:</span>
                <span className="font-semibold text-stone-900 dark:text-stone-100">{selectedOpportunity.availableProducts}</span>
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/60 space-y-1">
              <span className="text-[11px] font-semibold text-emerald-700 dark:text-emerald-300">
                Recommended Action:
              </span>
              <p className="text-stone-800 dark:text-stone-200 font-medium">
                {selectedOpportunity.opportunity}
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
