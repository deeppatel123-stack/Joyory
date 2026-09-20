import React from "react";

export const Badge = ({
  children,
  variant = "neutral",
  size = "md",
  className = ""
}) => {
  const sizeStyles = {
    sm: "px-2 py-0.5 text-[11px]",
    md: "px-2.5 py-0.5 text-xs",
    lg: "px-3 py-1 text-sm"
  };

  const variantStyles = {
    neutral: "bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300 border border-stone-200/80 dark:border-stone-700/80",
    accent: "bg-gradient-to-r from-rose-500/15 to-orange-500/15 text-rose-600 dark:text-rose-400 border border-rose-500/30 font-semibold shadow-2xs",
    success: "bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border border-emerald-200/80 dark:border-emerald-800/80 font-medium",
    warning: "bg-amber-50 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300 border border-amber-200/80 dark:border-amber-800/80 font-medium",
    danger: "bg-rose-50 dark:bg-rose-950/60 text-rose-700 dark:text-rose-300 border border-rose-200/80 dark:border-rose-800/80 font-medium",
    outline: "bg-transparent border border-stone-300 dark:border-stone-700 text-stone-600 dark:text-stone-400"
  };

  return (
    <span
      className={`inline-flex items-center font-normal rounded-md ${sizeStyles[size]} ${variantStyles[variant]} ${className}`}
    >
      {children}
    </span>
  );
};
