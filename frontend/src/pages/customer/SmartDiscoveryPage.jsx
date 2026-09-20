import React, { useState, useEffect } from "react";
import { SearchBar } from "../../components/customer/SearchBar";
import { ProductGrid } from "../../components/customer/ProductGrid";
import { productService } from "../../services/productService";
import { recommendationService } from "../../services/recommendationService";
import { useCustomer } from "../../context/CustomerContext";
import { Sparkles, SlidersHorizontal } from "lucide-react";
import { Badge } from "../../components/common/Badge";

export const SmartDiscoveryPage = () => {
  const { recordSearch, profile } = useCustomer();
  const [currentQuery, setCurrentQuery] = useState("lightweight moisturizer for oily skin under ₹800");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);

  const handleSearch = async (queryText, tokens) => {
    setCurrentQuery(queryText);
    if (queryText) recordSearch(queryText);

    setLoading(true);
    try {
      // Filter logic based on extracted tokens or text
      let categoryFilter = null;
      let maxPriceFilter = null;

      if (tokens) {
        const catToken = tokens.find(t => t.category === "Category");
        if (catToken) categoryFilter = catToken.label;

        const budgetToken = tokens.find(t => t.category === "Budget");
        if (budgetToken) {
          const num = budgetToken.label.match(/\d+/);
          if (num) maxPriceFilter = Number(num[0]);
        }
      }

      const all = await productService.getProducts({
        category: categoryFilter,
        maxPrice: maxPriceFilter,
        searchQuery: queryText
      });

      // Score against customer profile
      const scored = await Promise.all(
        all.map(async (p) => {
          const match = await recommendationService.getProductMatch(p);
          return { ...p, ...match };
        })
      );

      scored.sort((a, b) => b.matchScore - a.matchScore);
      setResults(scored);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Initial search load with the hackathon demo query
  useEffect(() => {
    handleSearch("lightweight moisturizer for oily skin under ₹800", [
      { label: "Oily skin", category: "Skin Type" },
      { label: "Moisturizer", category: "Category" },
      { label: "Lightweight texture", category: "Preference" },
      { label: "Under ₹800", category: "Budget" }
    ]);
  }, [profile]);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="max-w-3xl space-y-3">
        <span className="text-xs font-semibold uppercase tracking-wider text-[#C26D53]">
          Natural Query Search
        </span>
        <h1 className="text-3xl font-bold tracking-tight text-stone-950 dark:text-stone-50">
          What are you looking for today?
        </h1>
        <p className="text-xs sm:text-sm text-stone-500 dark:text-stone-400">
          Describe your skin state, texture need, and budget in everyday language. Joyory translates your intent against your personal preference graph.
        </p>
      </div>

      {/* Large Clean Search Box */}
      <div className="max-w-3xl">
        <SearchBar onSearch={handleSearch} initialQuery={currentQuery} />
      </div>

      {/* Results Header */}
      <div className="pt-4 border-t border-stone-200/80 dark:border-stone-800/80 flex items-center justify-between">
        <div>
          <h2 className="text-base font-semibold text-stone-900 dark:text-stone-100">
            Formulations Matched to Your Intent
          </h2>
          <p className="text-xs text-stone-500 dark:text-stone-400">
            Ranked according to your learned lightweight preference and budget
          </p>
        </div>
        <span className="text-xs text-stone-400">
          {results.length} Formulations
        </span>
      </div>

      {/* Product Grid */}
      <ProductGrid
        products={results}
        loading={loading}
        emptyTitle="No exact matches found"
        emptyDescription="Try searching for another texture like 'water gel' or adjusting the budget limit."
      />
    </div>
  );
};
