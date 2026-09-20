import React from "react";
import { ThemeSentimentMatrix } from "../../components/business/ThemeSentimentMatrix";
import { feedbackIntelligence } from "../../data/feedback";
import { MessageSquareQuote, ShieldCheck, Sparkles } from "lucide-react";
import { Badge } from "../../components/common/Badge";

export const FeedbackIntelligencePage = () => {
  return (
    <div className="space-y-8">
      {/* 45. HEADER */}
      <div className="border-b border-stone-200/80 dark:border-stone-800/80 pb-6">
        <span className="text-xs font-semibold uppercase tracking-wider text-[#C26D53]">
          Customer Voice & Sensory Insights
        </span>
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-stone-950 dark:text-stone-50 mt-1">
          Customer Voice
        </h1>
        <p className="text-xs sm:text-sm text-stone-500 dark:text-stone-400 mt-1">
          Aggregated sentiment extraction, positive praise themes, packaging frictions, and preference adaptation signals.
        </p>
      </div>

      {/* Theme and Sentiment Matrix Component */}
      <ThemeSentimentMatrix feedbackData={feedbackIntelligence} />

      {/* Monthly Sentiment Trend Table */}
      <div className="p-6 rounded-xl border border-stone-200/80 dark:border-stone-800/80 bg-white dark:bg-stone-900 shadow-2xs space-y-4">
        <div className="flex items-center justify-between border-b border-stone-100 dark:border-stone-800 pb-3">
          <h3 className="text-sm font-semibold text-stone-900 dark:text-stone-100">
            Monthly Sentiment Evolution (May – Sep 2026)
          </h3>
          <Badge variant="success" size="sm">
            Positive Sentiment Rising (+8% MoM)
          </Badge>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-stone-100 dark:border-stone-800 text-stone-400">
                <th className="p-3">Month</th>
                <th className="p-3">Positive Feedback</th>
                <th className="p-3">Neutral Feedback</th>
                <th className="p-3">Friction / Negative</th>
                <th className="p-3">Primary Friction Driver</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100 dark:divide-stone-800 text-stone-800 dark:text-stone-200">
              {feedbackIntelligence.sentimentTrends.map((st, i) => (
                <tr key={i} className="hover:bg-stone-50 dark:hover:bg-stone-800/30">
                  <td className="p-3 font-semibold">{st.month} 2026</td>
                  <td className="p-3 font-mono text-emerald-600 font-bold">{st.positive}%</td>
                  <td className="p-3 font-mono text-stone-500">{st.neutral}%</td>
                  <td className="p-3 font-mono text-rose-500">{st.negative}%</td>
                  <td className="p-3 text-stone-500 font-sans">
                    {i < 2 ? "Synthetic fragrance sensitivity" : "Open jar packaging requests for pumps"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
