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
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedSkinType, setSelectedSkinType] = useState("All");
  const [selectedPrice, setSelectedPrice] = useState("All");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);

  const categories = ["All", "Moisturizer", "Serum", "Sunscreen", "Face Wash", "Toner"];
  const skinTypes = ["All", "Oily", "Dry", "Combination", "Sensitive"];
  const priceOptions = [
    { label: "All Prices", value: "All" },
    { label: "Under ₹500", value: 500 },
    { label: "Under ₹800", value: 800 },
    { label: "Under ₹1,200", value: 1200 }
  ];

  const hasActiveFilters =
    currentQuery.trim() !== "" ||
    selectedCategory !== "All" ||
    selectedSkinType !== "All" ||
    selectedPrice !== "All";

  const loadProducts = async (queryText = currentQuery, cat = selectedCategory, st = selectedSkinType, price = selectedPrice) => {
    const trimmed = (queryText || "").trim();
    if (trimmed) recordSearch(trimmed);

    setLoading(true);
    try {
      const filters = {};
      if (trimmed) filters.searchQuery = trimmed;
      if (cat !== "All") filters.category = cat;
      if (st !== "All") filters.skinType = st;
      if (price !== "All") filters.maxPrice = Number(price);

      const items = await productService.getProducts(filters);

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
    loadProducts(currentQuery, selectedCategory, selectedSkinType, selectedPrice);
  }, [profile, selectedCategory, selectedSkinType, selectedPrice]);

  const handleSearch = (q) => {
    setCurrentQuery(q);
    loadProducts(q, selectedCategory, selectedSkinType, selectedPrice);
  };

  const handleClearFilters = () => {
    setCurrentQuery("");
    setSelectedCategory("All");
    setSelectedSkinType("All");
    setSelectedPrice("All");
    loadProducts("", "All", "All", "All");
  };

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="max-w-2xl space-y-2">
        <div className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-rose-600 dark:text-rose-400">
          <Compass className="w-3.5 h-3.5" />
          <span>Product Search & Discovery</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-stone-950 dark:text-stone-50">
          Discover Products
        </h1>
        <p className="text-xs sm:text-sm text-stone-500 dark:text-stone-400">
          Search for products by name, brand, skin type, or texture, and filter precisely.
        </p>
      </div>

      {/* Clean Search Box */}
      <div className="max-w-3xl">
        <SearchBar onSearch={handleSearch} initialQuery={currentQuery} />
      </div>

      {/* Filter Chips Toolbar */}
      <div className="flex flex-wrap items-center gap-4 p-4 rounded-xl bg-white dark:bg-stone-900 border border-stone-200/80 dark:border-stone-800/80 shadow-2xs">
        {/* Category Pills */}
        <div className="flex items-center gap-1.5 flex-wrap">
          <span className="text-[11px] uppercase font-semibold text-stone-400 dark:text-stone-500 mr-1">
            Category:
          </span>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1 rounded-full text-xs font-medium transition-colors cursor-pointer ${
                selectedCategory === cat
                  ? "bg-rose-600 text-white shadow-xs"
                  : "bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-300 hover:bg-stone-200 dark:hover:bg-stone-700"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="h-4 w-px bg-stone-200 dark:bg-stone-800 hidden sm:block" />

        {/* Skin Type Pills */}
        <div className="flex items-center gap-1.5 flex-wrap">
          <span className="text-[11px] uppercase font-semibold text-stone-400 dark:text-stone-500 mr-1">
            Skin:
          </span>
          {skinTypes.map((st) => (
            <button
              key={st}
              onClick={() => setSelectedSkinType(st)}
              className={`px-2.5 py-1 rounded-full text-xs font-medium transition-colors cursor-pointer ${
                selectedSkinType === st
                  ? "bg-rose-600 text-white shadow-xs"
                  : "bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-300 hover:bg-stone-200 dark:hover:bg-stone-700"
              }`}
            >
              {st}
            </button>
          ))}
        </div>

        <div className="h-4 w-px bg-stone-200 dark:bg-stone-800 hidden sm:block" />

        {/* Price Dropdown */}
        <div className="flex items-center gap-1.5">
          <span className="text-[11px] uppercase font-semibold text-stone-400 dark:text-stone-500">
            Price:
          </span>
          <select
            value={selectedPrice}
            onChange={(e) => setSelectedPrice(e.target.value)}
            className="text-xs px-2.5 py-1 rounded-lg bg-stone-100 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-stone-700 dark:text-stone-200 focus:outline-none cursor-pointer"
          >
            {priceOptions.map((opt) => (
              <option key={opt.label} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>

        {/* Clear Filters Button */}
        {hasActiveFilters && (
          <button
            onClick={handleClearFilters}
            className="ml-auto text-xs font-medium text-rose-600 dark:text-rose-400 hover:underline cursor-pointer"
          >
            Clear All Filters
          </button>
        )}
      </div>

      {/* Results Header */}
      <div className="pt-2 border-t border-stone-200/80 dark:border-stone-800/80 flex items-center justify-between">
        <div>
          <h2 className="text-base font-semibold text-stone-900 dark:text-stone-100">
            {hasActiveFilters ? `${results.length} products found` : "Recommended Products"}
          </h2>
          <p className="text-xs text-stone-500 dark:text-stone-400">
            {hasActiveFilters
              ? `Filtered by active criteria`
              : "Curated products tailored to your preferences"}
          </p>
        </div>
        {hasActiveFilters && (
          <button
            onClick={handleClearFilters}
            className="text-xs text-rose-600 dark:text-rose-400 hover:underline font-medium cursor-pointer"
          >
            Reset Filters
          </button>
        )}
      </div>

      {/* Product Grid */}
      <ProductGrid
        products={results}
        loading={loading}
        emptyTitle="No matching products found"
        emptyDescription="Try adjusting your search query, category, or price filter."
        actionLabel="Clear All Filters"
        onAction={handleClearFilters}
      />
    </div>
  );
};
