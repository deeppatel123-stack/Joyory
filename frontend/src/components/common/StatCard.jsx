import React from "react";
import { ArrowUpRight, ArrowDownRight } from "lucide-react";

export const StatCard = ({
  label,
  value,
  change,
  trend = "up",
  subtitle,
  icon: Icon,
  className = ""
}) => {
  return (
    <div className={`p-5 rounded-xl bg-white dark:bg-stone-900 border border-stone-200/80 dark:border-stone-800/90 shadow-xs hover:border-stone-300 dark:hover:border-stone-700 transition-colors ${className}`}>
      <div className="flex items-center justify-between text-xs text-stone-500 dark:text-stone-400 mb-2">
        <span>{label}</span>
        {Icon && <Icon className="w-4 h-4 text-stone-400 dark:text-stone-500" />}
      </div>

      <div className="flex items-baseline gap-2 mb-1">
        <span className="text-2xl font-semibold tracking-tight text-stone-900 dark:text-stone-100">
          {value}
        </span>
        {change && (
          <span className={`inline-flex items-center text-xs font-medium ${trend === "up" ? "text-emerald-600 dark:text-emerald-400" : "text-rose-600 dark:text-rose-400"}`}>
            {trend === "up" ? (
              <ArrowUpRight className="w-3.5 h-3.5 mr-0.5" />
            ) : (
              <ArrowDownRight className="w-3.5 h-3.5 mr-0.5" />
            )}
            {change}
          </span>
        )}
      </div>

      {subtitle && (
        <p className="text-[11px] text-stone-400 dark:text-stone-500">
          {subtitle}
        </p>
      )}
    </div>
  );
};
