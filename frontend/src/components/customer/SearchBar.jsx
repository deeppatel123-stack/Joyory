import React, { useState } from "react";
import { Search, Sparkles, X, ArrowRight } from "lucide-react";
import { Badge } from "../common/Badge";

export const SearchBar = ({ onSearch, initialQuery = "" }) => {
  const [query, setQuery] = useState(initialQuery);
  const [extractedTokens, setExtractedTokens] = useState(() => parseIntent(initialQuery));

  // Popular natural language intent queries
  const presets = [
    "lightweight moisturizer for oily skin under ₹800",
    "sunscreen for oily skin zero white cast",
    "fragrance-free barrier repair cream",
    "gentle foaming cleanser for sensitive skin under ₹500"
  ];

  // Natural Language Intent Parser
  function parseIntent(text) {
    if (!text || text.trim() === "") return null;
    const lower = text.toLowerCase();
    const tokens = [];

    // Skin type intent
    if (lower.includes("oily")) tokens.push({ label: "Oily skin", category: "Skin Type" });
    else if (lower.includes("dry")) tokens.push({ label: "Dry skin", category: "Skin Type" });
    else if (lower.includes("sensitive")) tokens.push({ label: "Sensitive skin", category: "Skin Type" });

    // Category intent
    if (lower.includes("moisturizer")) tokens.push({ label: "Moisturizer", category: "Category" });
    else if (lower.includes("sunscreen") || lower.includes("spf")) tokens.push({ label: "Sunscreen", category: "Category" });
    else if (lower.includes("serum")) tokens.push({ label: "Serum", category: "Category" });
    else if (lower.includes("cleanser")) tokens.push({ label: "Cleanser", category: "Category" });

    // Texture / formulation intent
    if (lower.includes("lightweight")) tokens.push({ label: "Lightweight texture", category: "Preference" });
    if (lower.includes("gel")) tokens.push({ label: "Gel formulation", category: "Texture" });
    if (lower.includes("fragrance-free") || lower.includes("unscented")) tokens.push({ label: "Fragrance-free", category: "Sensory" });
    if (lower.includes("white cast")) tokens.push({ label: "Zero white cast", category: "Benefit" });

    // Price intent
    const priceMatch = lower.match(/(?:under|below|<|₹)\s*(\d{3,4})/);
    if (priceMatch) {
      tokens.push({ label: `Under ₹${priceMatch[1]}`, category: "Budget" });
    } else if (lower.includes("800")) {
      tokens.push({ label: "Under ₹800", category: "Budget" });
    } else if (lower.includes("500")) {
      tokens.push({ label: "Under ₹500", category: "Budget" });
    }

    return tokens.length > 0 ? tokens : null;
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const tokens = parseIntent(query);
    setExtractedTokens(tokens);
    if (onSearch) onSearch(query, tokens);
  };

  const handleSelectPreset = (presetText) => {
    setQuery(presetText);
    const tokens = parseIntent(presetText);
    setExtractedTokens(tokens);
    if (onSearch) onSearch(presetText, tokens);
  };

  const clearQuery = () => {
    setQuery("");
    setExtractedTokens(null);
    if (onSearch) onSearch("", null);
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
          onChange={(e) => {
            setQuery(e.target.value);
            setExtractedTokens(parseIntent(e.target.value));
          }}
          placeholder="Try: lightweight moisturizer for oily skin under ₹800"
          className="w-full pl-12 pr-28 py-3.5 rounded-xl border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-900 text-stone-900 dark:text-stone-100 placeholder-stone-400 dark:placeholder-stone-500 text-sm sm:text-base focus:border-stone-500 dark:focus:border-stone-400 focus:outline-none focus:ring-1 focus:ring-stone-500 shadow-xs transition-all"
        />

        <div className="absolute right-2.5 flex items-center gap-1">
          {query && (
            <button
              type="button"
              onClick={clearQuery}
              className="p-1.5 rounded-md text-stone-400 hover:text-stone-600 dark:hover:text-stone-200"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <button
            type="submit"
            className="px-3 py-1.5 rounded-lg bg-[#C26D53] hover:bg-[#b05f47] text-white text-xs font-medium inline-flex items-center gap-1 transition-colors cursor-pointer"
          >
            <span>Search</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </form>

      {/* Understood Intent Extraction Tags */}
      {extractedTokens && extractedTokens.length > 0 && (
        <div className="p-3 rounded-lg bg-stone-100/80 dark:bg-stone-900/80 border border-stone-200/80 dark:border-stone-800 text-xs flex flex-wrap items-center gap-2 animate-in fade-in duration-200">
          <div className="flex items-center gap-1 text-stone-500 dark:text-stone-400 font-medium mr-1">
            <Sparkles className="w-3.5 h-3.5 text-[#C26D53]" />
            <span>We understood:</span>
          </div>
          {extractedTokens.map((token, i) => (
            <Badge key={i} variant="neutral" size="sm" className="bg-white dark:bg-stone-800">
              <span className="text-stone-400 dark:text-stone-500 mr-1">{token.category}:</span>
              <strong className="font-medium text-stone-800 dark:text-stone-200">{token.label}</strong>
            </Badge>
          ))}
        </div>
      )}

      {/* Preset Suggestions */}
      <div className="flex items-center gap-1.5 text-xs text-stone-500 dark:text-stone-400 overflow-x-auto pb-1">
        <span className="shrink-0 text-[11px] uppercase tracking-wider text-stone-400 dark:text-stone-500">
          Try:
        </span>
        {presets.map((preset, i) => (
          <button
            key={i}
            type="button"
            onClick={() => handleSelectPreset(preset)}
            className="shrink-0 px-2.5 py-1 rounded-md text-[11px] bg-stone-100 dark:bg-stone-900 hover:bg-stone-200 dark:hover:bg-stone-800 text-stone-600 dark:text-stone-300 border border-stone-200/60 dark:border-stone-800 transition-colors"
          >
            {preset}
          </button>
        ))}
      </div>
    </div>
  );
};
