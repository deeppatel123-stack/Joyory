import React, { useState, useEffect } from "react";
import { SearchBar } from "../../components/customer/SearchBar";
import { ProductGrid } from "../../components/customer/ProductGrid";
import { productService } from "../../services/productService";
import { recommendationService } from "../../services/recommendationService";
import { useCustomer } from "../../context/CustomerContext";
import { Compass } from "lucide-react";

export const SmartDiscoveryPage = () => {
  const { recordSearch, profile } = useCustomer();
  const [currentQuery, setCurrentQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadProducts = async (queryText = "") => {
    const trimmed = (queryText || "").trim();
    setCurrentQuery(trimmed);
    if (trimmed) recordSearch(trimmed);

    setLoading(true);
    try {
      let items = [];
      if (trimmed) {
        // Search by query text across name, brand, category, subcategory, texture, tags, etc.
        items = await productService.getProducts({ searchQuery: trimmed });
      } else {
        // Default curated/recommended view: top 8 products
        const all = await productService.getProducts();
        items = (all || []).slice(0, 8);
      }

      // Merge customer match data safely
      const enriched = await Promise.all(
        (items || []).map(async (p) => {
          try {
            const match = await recommendationService.getProductMatch(p);
            return { ...p, ...match };
          } catch {
            return p;
          }
        })
      );

      setResults(enriched);
    } catch (err) {
      console.error("[SmartDiscoveryPage] Error loading products:", err);
      setResults([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProducts("");
  }, [profile]);

  const handleClearSearch = () => {
    loadProducts("");
  };

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
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

      {/* Clean Search Box with Popular Presets */}
      <div className="max-w-3xl">
        <SearchBar onSearch={(q) => loadProducts(q)} initialQuery={currentQuery} />
      </div>

      {/* Results Header */}
      <div className="pt-2 border-t border-stone-200/80 dark:border-stone-800/80 flex items-center justify-between">
        <div>
          <h2 className="text-base font-semibold text-stone-900 dark:text-stone-100">
            {currentQuery ? `${results.length} products found` : "Recommended Products"}
          </h2>
          <p className="text-xs text-stone-500 dark:text-stone-400">
            {currentQuery ? `Showing results for "${currentQuery}"` : "Curated products tailored to your preferences"}
          </p>
        </div>
        {currentQuery && (
          <button
            onClick={handleClearSearch}
            className="text-xs text-[#C26D53] hover:underline font-medium cursor-pointer"
          >
            Clear Search
          </button>
        )}
      </div>

      {/* Product Grid with clear search empty state */}
      <ProductGrid
        products={results}
        loading={loading}
        emptyTitle="No products found"
        emptyDescription="Try another product, brand or category."
        actionLabel="Clear Search"
        onAction={handleClearSearch}
      />
    </div>
  );
};
