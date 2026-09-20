import React from "react";

export const Input = ({
  label,
  error,
  icon: Icon,
  className = "",
  id,
  ...props
}) => {
  const inputId = id || (label ? label.toLowerCase().replace(/\s+/g, "-") : undefined);

  return (
    <div className="w-full">
      {label && (
        <label
          htmlFor={inputId}
          className="block text-xs font-medium text-stone-700 dark:text-stone-300 mb-1.5"
        >
          {label}
        </label>
      )}
      <div className="relative flex items-center">
        {Icon && (
          <div className="absolute left-3 pointer-events-none text-stone-400 dark:text-stone-500">
            <Icon className="w-4 h-4" />
          </div>
        )}
        <input
          id={inputId}
          className={`w-full rounded-lg border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-900 px-3.5 py-2 text-sm text-stone-900 dark:text-stone-100 placeholder-stone-400 dark:placeholder-stone-500 transition-colors focus:border-stone-500 dark:focus:border-stone-400 focus:outline-none focus:ring-1 focus:ring-stone-500 ${
            Icon ? "pl-9" : ""
          } ${error ? "border-rose-500 focus:border-rose-500 focus:ring-rose-500" : ""} ${className}`}
          {...props}
        />
      </div>
      {error && <p className="mt-1 text-xs text-rose-500">{error}</p>}
    </div>
  );
};
