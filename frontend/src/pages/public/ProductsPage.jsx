import React, { useState, useEffect, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { Search, RotateCcw, ArrowUpDown, Filter, X, SlidersHorizontal } from "lucide-react";
import { PublicNavbar } from "../../components/layout/PublicNavbar";
import { Footer } from "../../components/layout/Footer";
import { ProductGrid } from "../../components/customer/ProductGrid";
import { productService } from "../../services/productService";
import { Input } from "../../components/common/Input";
import { Button } from "../../components/common/Button";
import { brandsList, skinTypesList, subcategoriesList, textures } from "../../data/products";

export const ProductsPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Filter States
  const [search, setSearch] = useState(searchParams.get("q") || "");
  const [category, setCategory] = useState(searchParams.get("category") || "All");
  const [brand, setBrand] = useState(searchParams.get("brand") || "All");
  const [skinType, setSkinType] = useState(searchParams.get("skinType") || "All");
  const [concern, setConcern] = useState(searchParams.get("concern") || "All");
  const [texture, setTexture] = useState(searchParams.get("texture") || "All");
  const [rating, setRating] = useState("All");
  const [maxPrice, setMaxPrice] = useState(1500);
  const [sortBy, setSortBy] = useState("recommended");
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  // Quick categories
  const popularCategories = [
    "All",
    "Moisturizer",
    "Serum",
    "Sunscreen",
    "Face Wash",
    "Toner",
    "Lipstick",
    "Shampoo",
    "Body Lotion"
  ];

  const concernsList = [
    "All",
    "Dry Skin",
    "Excess Oil",
    "Redness",
    "Dark Spots",
    "Pores",
    "Sun Damage",
    "Fine Lines",
    "Sensitivity"
  ];

  const isFiltered = useMemo(() => {
    return (
      search.trim() !== "" ||
      category !== "All" ||
      brand !== "All" ||
      skinType !== "All" ||
      concern !== "All" ||
      texture !== "All" ||
      rating !== "All" ||
      maxPrice < 1500
    );
  }, [search, category, brand, skinType, concern, texture, rating, maxPrice]);

  const handleClearFilters = () => {
    setSearch("");
    setCategory("All");
    setBrand("All");
    setSkinType("All");
    setConcern("All");
    setTexture("All");
    setRating("All");
    setMaxPrice(1500);
    setSortBy("recommended");
    setSearchParams({});
  };

  useEffect(() => {
    let isCancelled = false;

    async function load() {
      setLoading(true);
      try {
        const data = await productService.getProducts({
          category: category !== "All" ? category : undefined,
          brand: brand !== "All" ? brand : undefined,
          skinType: skinType !== "All" ? skinType : undefined,
          concern: concern !== "All" ? concern : undefined,
          texture: texture !== "All" ? texture : undefined,
          rating: rating !== "All" ? rating : undefined,
          maxPrice: maxPrice < 1500 ? maxPrice : undefined,
          searchQuery: search.trim() || undefined
        });

        if (isCancelled) return;

        // Client sort
        let sorted = [...data];
        if (sortBy === "price-low") sorted.sort((a, b) => a.price - b.price);
        if (sortBy === "price-high") sorted.sort((a, b) => b.price - a.price);
        if (sortBy === "rating") sorted.sort((a, b) => (b.rating || 0) - (a.rating || 0));

        setProducts(sorted);
      } catch (err) {
        console.error("Error loading products:", err);
      } finally {
        if (!isCancelled) setLoading(false);
      }
    }

    load();
    return () => {
      isCancelled = true;
    };
  }, [category, brand, skinType, concern, texture, rating, maxPrice, search, sortBy]);

  return (
    <div className="min-h-screen bg-stone-50 dark:bg-stone-950 text-stone-900 dark:text-stone-100 transition-colors flex flex-col">
      <PublicNavbar />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
        {/* Header */}
        <div className="border-b border-stone-200/80 dark:border-stone-800/80 pb-5">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3">
            <div>
              <span className="text-xs font-semibold uppercase tracking-wider text-[#C26D53]">
                Curated Beauty Catalog
              </span>
              <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight text-stone-900 dark:text-stone-100 mt-1">
                Beauty Products
              </h1>
              <p className="text-xs sm:text-sm text-stone-500 dark:text-stone-400 mt-1">
                Discover products selected for your beauty needs.
              </p>
            </div>
            <div className="text-xs text-stone-500 dark:text-stone-400">
              <strong className="text-stone-900 dark:text-stone-100 font-semibold">{products.length}</strong>{" "}
              {products.length === 1 ? "product found" : "products found"}
            </div>
          </div>
        </div>

        {/* Search & Top Controls */}
        <div className="bg-white dark:bg-stone-900 p-4 rounded-xl border border-stone-200/80 dark:border-stone-800/80 shadow-2xs space-y-4">
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            {/* Search Input */}
            <div className="relative flex-1">
              <Input
                placeholder="Search products, brands, ingredients, or textures..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                icon={Search}
                className="text-xs w-full pl-9 pr-8"
              />
              {search && (
                <button
                  onClick={() => setSearch("")}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600 dark:hover:text-stone-200 p-1"
                  aria-label="Clear search"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* Sort Dropdown */}
            <div className="flex items-center gap-2 shrink-0">
              <span className="text-xs text-stone-400 hidden md:flex items-center gap-1">
                <ArrowUpDown className="w-3 h-3" /> Sort:
              </span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="text-xs rounded-lg border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-900 px-3 py-2 text-stone-800 dark:text-stone-200 focus:outline-none cursor-pointer"
              >
                <option value="recommended">Recommended</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Rating: High to Low</option>
              </select>

              {/* Mobile filter toggle */}
              <button
                onClick={() => setShowMobileFilters(!showMobileFilters)}
                className="lg:hidden px-3 py-2 rounded-lg border border-stone-300 dark:border-stone-700 text-xs font-medium text-stone-700 dark:text-stone-300 flex items-center gap-1.5"
              >
                <SlidersHorizontal className="w-3.5 h-3.5" />
                Filters
              </button>
            </div>
          </div>

          {/* Quick Category Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
            <span className="text-xs text-stone-400 shrink-0 mr-1">Category:</span>
            {popularCategories.map((c) => (
              <button
                key={c}
                onClick={() => setCategory(c)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors shrink-0 cursor-pointer ${
                  category === c
                    ? "bg-stone-900 dark:bg-stone-100 text-white dark:text-stone-900"
                    : "bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-400 hover:bg-stone-200 dark:hover:bg-stone-700"
                }`}
              >
                {c}
              </button>
            ))}
          </div>

          {/* Detailed Filters (Desktop or expanded mobile) */}
          {/* Simple Filters: Brand, Skin Type, Price */}
          <div
            className={`pt-3 border-t border-stone-100 dark:border-stone-800 grid grid-cols-1 sm:grid-cols-3 gap-4 ${
              showMobileFilters ? "block" : "hidden sm:grid"
            }`}
          >
            {/* Brand Filter */}
            <div>
              <label className="block text-[11px] font-medium text-stone-500 dark:text-stone-400 mb-1">
                Brand
              </label>
              <select
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
                className="w-full text-xs rounded-md border border-stone-200 dark:border-stone-700 bg-stone-50/50 dark:bg-stone-800/50 p-2 text-stone-800 dark:text-stone-200"
              >
                {brandsList.map((b) => (
                  <option key={b} value={b}>
                    {b}
                  </option>
                ))}
              </select>
            </div>

            {/* Skin Type Filter */}
            <div>
              <label className="block text-[11px] font-medium text-stone-500 dark:text-stone-400 mb-1">
                Skin Type
              </label>
              <select
                value={skinType}
                onChange={(e) => setSkinType(e.target.value)}
                className="w-full text-xs rounded-md border border-stone-200 dark:border-stone-700 bg-stone-50/50 dark:bg-stone-800/50 p-2 text-stone-800 dark:text-stone-200"
              >
                {skinTypesList.map((st) => (
                  <option key={st} value={st}>
                    {st}
                  </option>
                ))}
              </select>
            </div>

            {/* Price Range */}
            <div>
              <div className="flex items-center justify-between text-[11px] font-medium text-stone-500 dark:text-stone-400 mb-1">
                <span>Max Price</span>
                <span className="text-stone-900 dark:text-stone-100 font-semibold">
                  {maxPrice < 1500 ? `₹${maxPrice}` : "Any Price"}
                </span>
              </div>
              <input
                type="range"
                min="350"
                max="1500"
                step="50"
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                className="w-full accent-[#C26D53] cursor-pointer mt-2"
              />
            </div>
          </div>

          {/* Active Filter Indicators & Clear button */}
          {isFiltered && (
            <div className="pt-2 border-t border-stone-100 dark:border-stone-800/80 flex flex-wrap items-center justify-between gap-2">
              <div className="flex flex-wrap items-center gap-1.5 text-[11px] text-stone-600 dark:text-stone-400">
                <span className="font-medium text-stone-500">Active Filters:</span>
                {search && (
                  <span className="px-2 py-0.5 rounded-md bg-stone-100 dark:bg-stone-800 text-stone-800 dark:text-stone-200">
                    Query: "{search}"
                  </span>
                )}
                {category !== "All" && (
                  <span className="px-2 py-0.5 rounded-md bg-stone-100 dark:bg-stone-800 text-stone-800 dark:text-stone-200">
                    {category}
                  </span>
                )}
                {brand !== "All" && (
                  <span className="px-2 py-0.5 rounded-md bg-stone-100 dark:bg-stone-800 text-stone-800 dark:text-stone-200">
                    {brand}
                  </span>
                )}
                {skinType !== "All" && (
                  <span className="px-2 py-0.5 rounded-md bg-stone-100 dark:bg-stone-800 text-stone-800 dark:text-stone-200">
                    Skin: {skinType}
                  </span>
                )}
                {concern !== "All" && (
                  <span className="px-2 py-0.5 rounded-md bg-stone-100 dark:bg-stone-800 text-stone-800 dark:text-stone-200">
                    {concern}
                  </span>
                )}
                {texture !== "All" && (
                  <span className="px-2 py-0.5 rounded-md bg-stone-100 dark:bg-stone-800 text-stone-800 dark:text-stone-200">
                    {texture}
                  </span>
                )}
                {rating !== "All" && (
                  <span className="px-2 py-0.5 rounded-md bg-stone-100 dark:bg-stone-800 text-stone-800 dark:text-stone-200">
                    {rating}★+
                  </span>
                )}
                {maxPrice < 1500 && (
                  <span className="px-2 py-0.5 rounded-md bg-stone-100 dark:bg-stone-800 text-stone-800 dark:text-stone-200">
                    ≤ ₹{maxPrice}
                  </span>
                )}
              </div>

              <button
                onClick={handleClearFilters}
                className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-medium text-[#C26D53] hover:bg-[#C26D53]/10 transition-colors cursor-pointer"
              >
                <RotateCcw className="w-3 h-3" />
                Clear Filters
              </button>
            </div>
          )}
        </div>

        {/* Product Grid or No-Results State */}
        {products.length > 0 ? (
          <ProductGrid products={products} loading={loading} />
        ) : !loading ? (
          <div className="py-16 text-center space-y-4 bg-white dark:bg-stone-900 rounded-2xl border border-stone-200 dark:border-stone-800 p-8">
            <div className="w-12 h-12 rounded-full bg-stone-100 dark:bg-stone-800 text-stone-400 flex items-center justify-center mx-auto">
              <Search className="w-5 h-5" />
            </div>
            <div className="space-y-1">
              <h3 className="text-base font-semibold text-stone-900 dark:text-stone-100">
                No products found
              </h3>
              <p className="text-xs text-stone-500 dark:text-stone-400 max-w-sm mx-auto">
                No beauty formulations matched all your combined filters and search criteria.
              </p>
            </div>
            <Button variant="primary" onClick={handleClearFilters} icon={RotateCcw}>
              Clear Filters
            </Button>
          </div>
        ) : (
          <ProductGrid products={[]} loading={true} />
        )}
      </main>

      <Footer />
    </div>
  );
};
