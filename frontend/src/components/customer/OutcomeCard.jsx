import React from "react";
import { Link } from "react-router-dom";
import { Check, Clock, Sparkles, RefreshCw, Star, ArrowRight } from "lucide-react";
import { Badge } from "../common/Badge";
import { Button } from "../common/Button";

export const OutcomeCard = ({ outcome, onLogFeedback }) => {
  const getStatusBadge = (status) => {
    switch (status) {
      case "Preference Updated":
        return <Badge variant="accent" size="sm" className="font-semibold">Preference Updated</Badge>;
      case "Experience Logged":
        return <Badge variant="success" size="sm">Experience Logged</Badge>;
      case "Trying":
        return <Badge variant="warning" size="sm">Trying (Active Usage)</Badge>;
      default:
        return <Badge variant="neutral" size="sm">{status}</Badge>;
    }
  };

  return (
    <div className="rounded-xl border border-stone-200/80 dark:border-stone-800/80 bg-white dark:bg-stone-900 p-6 shadow-2xs hover:border-stone-300 dark:hover:border-stone-700 transition-all space-y-4">
      {/* Top row: Status and Purchase Date */}
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-stone-100 dark:border-stone-800 pb-3 text-xs">
        <div className="flex items-center gap-2">
          {getStatusBadge(outcome.status)}
          <span className="text-stone-400">•</span>
          <span className="text-stone-500">Purchased: {outcome.purchaseDate}</span>
        </div>
        <span className="text-stone-400 text-[11px]">
          {outcome.daysInUse} days in regimen
        </span>
      </div>

      {/* Product Information */}
      <div className="flex items-start gap-4">
        <img
          src={outcome.image}
          alt={outcome.productName}
          className="w-16 h-16 rounded-lg object-cover shrink-0"
        />
        <div className="flex-1 min-w-0">
          <span className="text-[10px] text-stone-400 uppercase tracking-wider block">
            {outcome.brand}
          </span>
          <Link
            to={`/products/${outcome.productId}`}
            className="font-semibold text-sm text-stone-900 dark:text-stone-100 hover:text-[#C26D53] truncate block"
          >
            {outcome.productName}
          </Link>
          <div className="flex items-center gap-2 mt-1 text-xs text-stone-500">
            <span className="font-semibold text-stone-900 dark:text-stone-100">
              ₹{outcome.price}
            </span>
            {outcome.structuredFeedback?.rating && (
              <div className="flex items-center gap-1 text-amber-500 ml-2">
                <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                <span className="font-medium text-stone-800 dark:text-stone-200">
                  {outcome.structuredFeedback.rating} / 5
                </span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Structured Experience Observations or Prompt */}
      {outcome.structuredFeedback ? (
        <div className="space-y-3 pt-2">
          <div className="p-3.5 rounded-lg bg-stone-50 dark:bg-stone-950/40 border border-stone-100 dark:border-stone-800 space-y-2 text-xs">
            <span className="text-[10px] uppercase tracking-wider text-stone-400 font-semibold block">
              Logged Experience Signals:
            </span>
            <div className="grid grid-cols-2 gap-2 text-[11px]">
              <div>
                <span className="text-stone-400 block">Texture Feel</span>
                <span className="font-semibold text-stone-900 dark:text-stone-100">
                  {outcome.structuredFeedback.texture}
                </span>
              </div>
              <div>
                <span className="text-stone-400 block">Absorption Rate</span>
                <span className="font-semibold text-stone-900 dark:text-stone-100">
                  {outcome.structuredFeedback.absorption}
                </span>
              </div>
              <div>
                <span className="text-stone-400 block">Fragrance</span>
                <span className="font-semibold text-stone-900 dark:text-stone-100">
                  {outcome.structuredFeedback.fragrance}
                </span>
              </div>
              <div>
                <span className="text-stone-400 block">Result vs Expectation</span>
                <span className="font-semibold text-stone-900 dark:text-stone-100">
                  {outcome.structuredFeedback.result}
                </span>
              </div>
            </div>
          </div>

          {/* Learned Insights */}
          {outcome.learnedInsights?.length > 0 && (
            <div className="p-3 rounded-lg border border-[#C26D53]/20 bg-[#C26D53]/5 text-xs space-y-1">
              <span className="text-[10px] uppercase tracking-wider text-[#C26D53] font-semibold flex items-center gap-1">
                <Sparkles className="w-3 h-3" />
                What Joyory Learned:
              </span>
              <ul className="text-[11px] text-stone-700 dark:text-stone-300 space-y-0.5">
                {outcome.learnedInsights.map((insight, i) => (
                  <li key={i} className="flex items-center gap-1.5">
                    <span className="w-1 h-1 rounded-full bg-[#C26D53]" />
                    <span>{insight}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      ) : (
        <div className="p-4 rounded-lg bg-stone-50/80 dark:bg-stone-950/30 border border-stone-100 dark:border-stone-800 text-xs text-stone-500 space-y-1">
          <p className="font-medium text-stone-800 dark:text-stone-200">
            Currently in active trial
          </p>
          <p className="text-[11px]">
            Record how this product feels in humidity, absorbs into your skin, and fits your routine to refine your Beauty Memory.
          </p>
        </div>
      )}

      {/* Action CTA */}
      <div className="pt-2 border-t border-stone-100 dark:border-stone-800 flex items-center justify-between">
        <Link
          to="/customer/decision-replay"
          className="text-[11px] text-stone-400 hover:text-stone-700 dark:hover:text-stone-200 flex items-center gap-1"
        >
          <span>Replay Decision</span>
          <ArrowRight className="w-3 h-3" />
        </Link>

        <Button
          size="sm"
          variant={outcome.structuredFeedback ? "outline" : "primary"}
          onClick={() => onLogFeedback(outcome)}
          icon={outcome.structuredFeedback ? RefreshCw : Sparkles}
        >
          {outcome.structuredFeedback ? "Update Experience" : "Log Experience"}
        </Button>
      </div>
    </div>
  );
};
