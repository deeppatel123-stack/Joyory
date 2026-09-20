import React from "react";
import { Sparkles } from "lucide-react";
import { Button } from "./Button";

export const EmptyState = ({
  icon: Icon = Sparkles,
  title = "No items found",
  description = "Try adjusting your filters or search terms.",
  actionLabel,
  onAction,
  className = ""
}) => {
  return (
    <div className={`text-center py-12 px-4 rounded-xl border border-dashed border-stone-200 dark:border-stone-800 bg-stone-50/50 dark:bg-stone-900/30 ${className}`}>
      <div className="w-10 h-10 rounded-full bg-stone-100 dark:bg-stone-800 text-stone-500 dark:text-stone-400 mx-auto flex items-center justify-center mb-3">
        <Icon className="w-5 h-5 text-stone-400 dark:text-stone-500" />
      </div>
      <h4 className="text-sm font-semibold text-stone-900 dark:text-stone-100 mb-1">
        {title}
      </h4>
      <p className="text-xs text-stone-500 dark:text-stone-400 max-w-sm mx-auto mb-4 leading-relaxed">
        {description}
      </p>
      {actionLabel && onAction && (
        <Button size="sm" variant="outline" onClick={onAction}>
          {actionLabel}
        </Button>
      )}
    </div>
  );
};
