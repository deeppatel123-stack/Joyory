import React from "react";
import { Check, Sparkles, X } from "lucide-react";
import { Badge } from "../common/Badge";
import { Button } from "../common/Button";

export const WhyRecommended = ({ product, isOpen, onClose }) => {
  if (!isOpen || !product) return null;

  const reasons = product.matchReasons || [
    { signal: "Lightweight texture", detail: "Formulated with a light, non-greasy texture that absorbs quickly.", aligned: true },
    { signal: "Budget friendly", detail: `Priced at ₹${product.price}, well within your everyday budget.`, aligned: true },
    { signal: "Skin type match", detail: `Formulated specifically for ${product.skinType?.join(" & ") || "all"} skin types.`, aligned: true },
    { signal: "Low fragrance", detail: "Clean formula with minimal to no added fragrance.", aligned: true }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-stone-900/40 dark:bg-stone-950/70 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      {/* Modal Card */}
      <div className="relative w-full max-w-md rounded-xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 shadow-2xl p-6 transition-all duration-200 animate-in fade-in zoom-in-95">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-md bg-[#C26D53]/15 text-[#C26D53]">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-semibold text-stone-900 dark:text-stone-100">
                Why this matches
              </h3>
              <p className="text-xs text-stone-500 dark:text-stone-400">
                Based on your Beauty Memory
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-md text-stone-400 hover:text-stone-600 dark:hover:text-stone-200"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Product mini header */}
        <div className="flex items-center gap-3 p-3 rounded-lg bg-stone-50 dark:bg-stone-800/60 border border-stone-100 dark:border-stone-800 mb-5">
          <img
            src={product.image}
            alt={product.name}
            className="w-12 h-12 rounded-md object-cover"
          />
          <div className="flex-1 min-w-0">
            <span className="text-[11px] text-stone-400 uppercase tracking-wider block">
              {product.brand}
            </span>
            <h4 className="text-xs font-semibold text-stone-900 dark:text-stone-100 truncate">
              {product.name}
            </h4>
            <div className="flex items-center gap-2 mt-0.5">
              <span className="text-xs font-medium text-stone-900 dark:text-stone-100">
                ₹{product.price}
              </span>
              <Badge variant="accent" size="sm">
                Good match for your preferences
              </Badge>
            </div>
          </div>
        </div>

        {/* Reasons list */}
        <div className="space-y-3 mb-6">
          <span className="text-xs font-medium text-stone-500 dark:text-stone-400 block uppercase tracking-wider text-[10px]">
            Key Highlights
          </span>
          {reasons.map((reason, idx) => (
            <div
              key={idx}
              className="flex items-start gap-3 p-3 rounded-lg border border-stone-100 dark:border-stone-800/80 bg-white dark:bg-stone-900/40"
            >
              <div className="w-5 h-5 rounded-full bg-emerald-50 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0 mt-0.5">
                <Check className="w-3 h-3 stroke-[2.5]" />
              </div>
              <div className="flex-1 text-xs">
                <p className="font-semibold text-stone-900 dark:text-stone-100 mb-0.5">
                  {reason.signal}
                </p>
                <p className="text-stone-500 dark:text-stone-400 leading-relaxed">
                  {reason.detail}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-end">
          <Button size="sm" variant="secondary" onClick={onClose}>
            Close
          </Button>
        </div>
      </div>
    </div>
  );
};
