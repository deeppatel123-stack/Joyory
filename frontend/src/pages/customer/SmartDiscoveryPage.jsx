import React, { useState, useEffect } from "react";
import { SearchBar } from "../../components/customer/SearchBar";
import { ProductGrid } from "../../components/customer/ProductGrid";
import { productService } from "../../services/productService";
import { recommendationService } from "../../services/recommendationService";
import { useCustomer } from "../../context/CustomerContext";
import { Compass } from "lucide-react";

export const SmartDiscoveryPage = () => {
  const { recordSearch, profile } = useCustomer();
  const [currentQuery, setCurrentQuery] = useState("moisturizer");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);

  const handleSearch = async (queryText, tokens) => {
    setCurrentQuery(queryText);
    if (queryText) recordSearch(queryText);

    setLoading(true);
    try {
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

      scored.sort((a, b) => (b.matchScore || 0) - (a.matchScore || 0));
      setResults(scored);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    handleSearch("moisturizer");
  }, [profile]);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="max-w-2xl space-y-2">
        <div className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-[#C26D53]">
          <Compass className="w-3.5 h-3.5" />
          <span>Product Search</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-stone-950 dark:text-stone-50">
          Discover Products
        </h1>
        <p className="text-xs sm:text-sm text-stone-500 dark:text-stone-400">
          Search for products by name, brand, skin type, or texture.
        </p>
      </div>

      {/* Clean Search Box */}
      <div className="max-w-3xl">
        <SearchBar onSearch={handleSearch} initialQuery={currentQuery} />
      </div>

      {/* Results Header */}
      <div className="pt-2 border-t border-stone-200/80 dark:border-stone-800/80 flex items-center justify-between">
        <div>
          <h2 className="text-base font-semibold text-stone-900 dark:text-stone-100">
            Matching Products
          </h2>
          <p className="text-xs text-stone-500 dark:text-stone-400">
            Filtered based on your search
          </p>
        </div>
        <span className="text-xs text-stone-400">
          {results.length} products found
        </span>
      </div>

      {/* Product Grid */}
      <ProductGrid
        products={results}
        loading={loading}
        emptyTitle="No matching products found"
        emptyDescription="Try searching for another keyword like 'serum' or 'sunscreen'."
      />
    </div>
  );
};
