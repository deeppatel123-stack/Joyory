import React, { useState } from "react";
import { Search, X, ArrowRight } from "lucide-react";

export const SearchBar = ({ onSearch, initialQuery = "" }) => {
  const [query, setQuery] = useState(initialQuery);

  React.useEffect(() => {
    setQuery(initialQuery);
  }, [initialQuery]);

  const presets = [
    "Moisturizer",
    "Sunscreen",
    "Serum",
    "Cleanser"
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSearch) onSearch(query);
  };

  const handleSelectPreset = (presetText) => {
    setQuery(presetText);
    if (onSearch) onSearch(presetText);
  };

  const clearQuery = () => {
    setQuery("");
    if (onSearch) onSearch("");
  };

  return (
    <div className="w-full space-y-3">
      {/* Search Input Box */}
      <form onSubmit={handleSubmit} className="relative flex items-center">
        <div className="absolute left-4 text-stone-400 pointer-events-none">
          <Search className="w-5 h-5" />
        </div>

        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search products, brands, or benefits..."
          className="w-full pl-12 pr-28 py-3 rounded-xl border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-900 text-stone-900 dark:text-stone-100 placeholder-stone-400 dark:placeholder-stone-500 text-sm focus:border-stone-500 dark:focus:border-stone-400 focus:outline-none focus:ring-1 focus:ring-stone-500 shadow-xs transition-all"
        />

        <div className="absolute right-2.5 flex items-center gap-1">
          {query && (
            <button
              type="button"
              onClick={clearQuery}
              className="p-1.5 rounded-md text-stone-400 hover:text-stone-600 dark:hover:text-stone-200 cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <button
            type="submit"
            className="px-3.5 py-1.5 rounded-lg bg-[#C26D53] hover:bg-[#b05f47] text-white text-xs font-medium inline-flex items-center gap-1 transition-colors cursor-pointer"
          >
            <span>Search</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </form>

      {/* Preset Suggestions */}
      <div className="flex items-center gap-1.5 text-xs text-stone-500 dark:text-stone-400 overflow-x-auto pb-1">
        <span className="shrink-0 text-[11px] uppercase tracking-wider text-stone-400 dark:text-stone-500">
          Popular:
        </span>
        {presets.map((preset, i) => (
          <button
            key={i}
            type="button"
            onClick={() => handleSelectPreset(preset)}
            className="shrink-0 px-2.5 py-1 rounded-md text-[11px] bg-stone-100 dark:bg-stone-900 hover:bg-stone-200 dark:hover:bg-stone-800 text-stone-600 dark:text-stone-300 border border-stone-200/60 dark:border-stone-800 transition-colors cursor-pointer"
          >
            {preset}
          </button>
        ))}
      </div>
    </div>
  );
};
