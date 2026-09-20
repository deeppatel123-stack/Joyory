import React from "react";
import { ThumbsUp, ThumbsDown, MessageSquareQuote, TrendingUp } from "lucide-react";
import { Badge } from "../common/Badge";

export const ThemeSentimentMatrix = ({ feedbackData }) => {
  const data = feedbackData || {
    overallSentiment: { positive: 78, neutral: 14, negative: 8 },
    positiveThemes: [],
    negativeThemes: [],
    recentFeedbackQuotes: []
  };

  return (
    <div className="space-y-6">
      {/* 2 Column Theme Breakdowns */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* Positive Themes Card */}
        <div className="rounded-xl border border-stone-200/80 dark:border-stone-800/80 bg-white dark:bg-stone-900 p-5 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="p-1.5 rounded-md bg-emerald-50 dark:bg-emerald-950/50 text-emerald-600">
                <ThumbsUp className="w-4 h-4" />
              </div>
              <h3 className="text-sm font-semibold text-stone-900 dark:text-stone-100">
                Customer Delight Drivers
              </h3>
            </div>
            <Badge variant="success" size="sm">
              78% Positive
            </Badge>
          </div>

          <div className="space-y-3">
            {data.positiveThemes?.map((item, i) => (
              <div key={i} className="p-3 rounded-lg bg-stone-50 dark:bg-stone-950/40 border border-stone-100 dark:border-stone-800 text-xs space-y-1">
                <div className="flex items-center justify-between font-semibold text-stone-900 dark:text-stone-100">
                  <span>{item.theme}</span>
                  <span className="text-emerald-600 dark:text-emerald-400">
                    {item.count} mentions ({item.percentage}%)
                  </span>
                </div>
                <p className="text-stone-500 italic text-[11px]">"{item.example}"</p>
              </div>
            ))}
          </div>
        </div>

        {/* Negative / Friction Themes Card */}
        <div className="rounded-xl border border-stone-200/80 dark:border-stone-800/80 bg-white dark:bg-stone-900 p-5 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="p-1.5 rounded-md bg-rose-50 dark:bg-rose-950/50 text-rose-600">
                <ThumbsDown className="w-4 h-4" />
              </div>
              <h3 className="text-sm font-semibold text-stone-900 dark:text-stone-100">
                Product Friction & Catalog Gaps
              </h3>
            </div>
            <Badge variant="danger" size="sm">
              Critical Feedback
            </Badge>
          </div>

          <div className="space-y-3">
            {data.negativeThemes?.map((item, i) => (
              <div key={i} className="p-3 rounded-lg bg-stone-50 dark:bg-stone-950/40 border border-stone-100 dark:border-stone-800 text-xs space-y-1">
                <div className="flex items-center justify-between font-semibold text-stone-900 dark:text-stone-100">
                  <span>{item.theme}</span>
                  <span className="text-rose-600 dark:text-rose-400">
                    {item.count} mentions ({item.percentage}%)
                  </span>
                </div>
                <p className="text-stone-500 italic text-[11px]">"{item.example}"</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Real Customer Voice Log */}
      <div className="rounded-xl border border-stone-200/80 dark:border-stone-800/80 bg-white dark:bg-stone-900 p-5 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <MessageSquareQuote className="w-4 h-4 text-[#C26D53]" />
            <h3 className="text-sm font-semibold text-stone-900 dark:text-stone-100">
              Live Customer Feedback Stream & Preference Adaptations
            </h3>
          </div>
          <span className="text-xs text-stone-400">
            Real-time Continuous Learning
          </span>
        </div>

        <div className="space-y-3">
          {data.recentFeedbackQuotes?.map((quote) => (
            <div
              key={quote.id}
              className="p-4 rounded-xl border border-stone-100 dark:border-stone-800 bg-stone-50/50 dark:bg-stone-950/30 space-y-2 text-xs"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-stone-900 dark:text-stone-100">
                    {quote.product}
                  </span>
                  <Badge variant="neutral" size="sm">
                    {quote.category}
                  </Badge>
                </div>
                <span className="text-stone-400 text-[11px]">{quote.date}</span>
              </div>

              <p className="text-stone-700 dark:text-stone-300 italic">
                "{quote.comment}"
              </p>

              <div className="pt-2 border-t border-stone-200/50 dark:border-stone-800 flex items-center gap-1.5 text-[11px] text-[#C26D53] font-medium">
                <TrendingUp className="w-3.5 h-3.5" />
                <span>Impact: {quote.impact}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
