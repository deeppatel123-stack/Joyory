import React from "react";

export const SkeletonLoader = ({ type = "product", count = 3, className = "" }) => {
  const renderItem = (index) => {
    if (type === "product") {
      return (
        <div
          key={index}
          className="rounded-xl border border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900 p-4 animate-pulse"
        >
          <div className="w-full h-44 bg-stone-100 dark:bg-stone-800 rounded-lg mb-3" />
          <div className="h-3 bg-stone-100 dark:bg-stone-800 rounded-sm w-1/3 mb-2" />
          <div className="h-4 bg-stone-100 dark:bg-stone-800 rounded-sm w-4/5 mb-3" />
          <div className="h-3 bg-stone-100 dark:bg-stone-800 rounded-sm w-1/4 mb-4" />
          <div className="flex justify-between items-center pt-2 border-t border-stone-100 dark:border-stone-800">
            <div className="h-4 bg-stone-100 dark:bg-stone-800 rounded-sm w-16" />
            <div className="h-7 bg-stone-100 dark:bg-stone-800 rounded-lg w-20" />
          </div>
        </div>
      );
    }

    if (type === "card") {
      return (
        <div
          key={index}
          className="rounded-xl border border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900 p-5 animate-pulse"
        >
          <div className="h-3 bg-stone-100 dark:bg-stone-800 rounded-sm w-1/4 mb-3" />
          <div className="h-6 bg-stone-100 dark:bg-stone-800 rounded-sm w-1/2 mb-2" />
          <div className="h-3 bg-stone-100 dark:bg-stone-800 rounded-sm w-3/4" />
        </div>
      );
    }

    if (type === "table") {
      return (
        <div key={index} className="h-10 bg-stone-50 dark:bg-stone-900/60 rounded-md animate-pulse my-1.5" />
      );
    }

    return (
      <div key={index} className="h-24 bg-stone-100 dark:bg-stone-800 rounded-lg animate-pulse" />
    );
  };

  return (
    <div className={className}>
      {Array.from({ length: count }).map((_, i) => renderItem(i))}
    </div>
  );
};
