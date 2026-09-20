import React from "react";
import { ArrowDown } from "lucide-react";

export const FunnelVisualizer = ({ steps = [] }) => {
  return (
    <div className="rounded-xl border border-stone-200/80 dark:border-stone-800/80 bg-white dark:bg-stone-900 p-6 shadow-2xs space-y-6">
      <div className="border-b border-stone-100 dark:border-stone-800 pb-4">
        <h3 className="text-base font-semibold text-stone-900 dark:text-stone-100">
          Complete Shopping Journey Funnel
        </h3>
        <p className="text-xs text-stone-500 dark:text-stone-400">
          Conversion and retention through the continuous learning cycle
        </p>
      </div>

      <div className="max-w-2xl mx-auto space-y-3 py-2">
        {steps.map((step, idx) => {
          const widthPercent = Math.max(16, step.percentage);

          return (
            <div key={step.step} className="space-y-1">
              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold text-stone-900 dark:text-stone-100">
                  {idx + 1}. {step.step}
                </span>
                <div className="flex items-center gap-2">
                  <span className="text-stone-500 font-medium">
                    {step.count.toLocaleString()} sessions
                  </span>
                  <span className="px-1.5 py-0.2 rounded text-[11px] bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300 font-semibold">
                    {step.percentage}%
                  </span>
                </div>
              </div>

              {/* Minimal bar */}
              <div className="h-6 w-full bg-stone-100 dark:bg-stone-800 rounded-md overflow-hidden flex items-center px-3 relative">
                <div
                  className="absolute inset-y-0 left-0 bg-[#C26D53]/70 dark:bg-[#C26D53]/60 rounded-md transition-all duration-500"
                  style={{ width: `${widthPercent}%` }}
                />
                <span className="relative z-10 text-[11px] text-white font-medium truncate drop-shadow-xs">
                  {step.description}
                </span>
              </div>

              {/* Drop-off rate indicator */}
              {idx < steps.length - 1 && step.dropRate > 0 && (
                <div className="flex items-center justify-center gap-1 text-[11px] text-stone-400 py-0.5">
                  <ArrowDown className="w-3 h-3" />
                  <span>{step.dropRate}% drop-off to next stage</span>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
