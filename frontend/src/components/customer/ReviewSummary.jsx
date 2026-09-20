import React from "react";
import { ThumbsUp, AlertCircle, MessageSquare } from "lucide-react";
import { Badge } from "../common/Badge";

export const ReviewSummary = ({ reviewSummary, totalReviews = 384 }) => {
  const summary = reviewSummary || {
    positiveThemes: ["Ultra lightweight texture", "Instant absorption", "Controls shine all day"],
    concerns: ["Jar packaging could use a spatula", "Runs out quickly with daily use"],
    sentimentScore: 0.94,
    sentimentLabel: "Overwhelmingly Positive"
  };

  const sentimentPercent = Math.round((summary.sentimentScore || 0.9) * 100);

  return (
    <div className="rounded-xl border border-stone-200/80 dark:border-stone-800/80 bg-white dark:bg-stone-900 p-6 shadow-2xs space-y-5">
      <div className="flex items-start justify-between">
        <div>
          <div className="flex items-center gap-1.5 text-xs text-stone-500 dark:text-stone-400 mb-1">
            <MessageSquare className="w-3.5 h-3.5 text-[#C26D53]" />
            <span className="uppercase tracking-wider text-[10px] font-medium">
              AI Review Intelligence
            </span>
          </div>
          <h3 className="text-base font-semibold text-stone-900 dark:text-stone-100">
            What customers are saying
          </h3>
        </div>
        <Badge variant="accent" size="sm">
          {summary.sentimentLabel || "Highly Positive"}
        </Badge>
      </div>

      {/* Horizontal sentiment breakdown visualization */}
      <div className="space-y-1.5">
        <div className="flex justify-between text-xs text-stone-500 dark:text-stone-400">
          <span>Overall Sentiment</span>
          <span className="font-semibold text-stone-900 dark:text-stone-100">
            {sentimentPercent}% Positive ({totalReviews} verified reviews)
          </span>
        </div>
        <div className="h-2 w-full bg-stone-100 dark:bg-stone-800 rounded-full overflow-hidden flex">
          <div
            className="h-full bg-emerald-500 rounded-full transition-all duration-500"
            style={{ width: `${sentimentPercent}%` }}
          />
          <div
            className="h-full bg-amber-400"
            style={{ width: `${Math.max(0, 100 - sentimentPercent - 4)}%` }}
          />
          <div className="h-full bg-rose-400" style={{ width: "4%" }} />
        </div>
      </div>

      {/* Two columns: Positive themes & Common concerns */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
        {/* Positive Themes */}
        <div className="p-4 rounded-lg bg-stone-50 dark:bg-stone-950/40 border border-stone-100 dark:border-stone-800/80 space-y-2">
          <div className="flex items-center gap-1.5 text-xs font-semibold text-emerald-700 dark:text-emerald-400">
            <ThumbsUp className="w-3.5 h-3.5" />
            <span>Positive Themes</span>
          </div>
          <ul className="space-y-1.5 text-xs text-stone-600 dark:text-stone-300">
            {summary.positiveThemes?.map((theme, i) => (
              <li key={i} className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0" />
                <span>{theme}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Common Concerns */}
        <div className="p-4 rounded-lg bg-stone-50 dark:bg-stone-950/40 border border-stone-100 dark:border-stone-800/80 space-y-2">
          <div className="flex items-center gap-1.5 text-xs font-semibold text-stone-700 dark:text-stone-400">
            <AlertCircle className="w-3.5 h-3.5" />
            <span>Common Observations & Friction</span>
          </div>
          <ul className="space-y-1.5 text-xs text-stone-600 dark:text-stone-300">
            {summary.concerns?.map((concern, i) => (
              <li key={i} className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-stone-400 shrink-0" />
                <span>{concern}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};
