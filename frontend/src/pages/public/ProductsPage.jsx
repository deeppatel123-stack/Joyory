import React, { useState, useEffect } from "react";
import { Search, Filter, SlidersHorizontal, ArrowUpDown } from "lucide-react";
import { PublicNavbar } from "../../components/layout/PublicNavbar";
import { Footer } from "../../components/layout/Footer";
import { ProductGrid } from "../../components/customer/ProductGrid";
import { productService } from "../../services/productService";
import { Input } from "../../components/common/Input";
import { Badge } from "../../components/common/Badge";

export const ProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState("All");
  const [texture, setTexture] = useState("All");
  const [maxPrice, setMaxPrice] = useState(1500);
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("recommended");

  const categories = ["All", "Moisturizer", "Sunscreen", "Serum", "Cleanser", "Toner", "Eye Cream"];
  const textures = ["All", "Gel", "Lightweight Fluid", "Water-gel", "Cream", "Milky Emulsion"];

  useEffect(() => {
    async function load() {
      setLoading(true);
      try {
        const data = await productService.getProducts({
          category,
          texture,
          maxPrice,
          searchQuery: search
        });

        // Client sorting
        let sorted = [...data];
        if (sortBy === "price-low") sorted.sort((a, b) => a.price - b.price);
        if (sortBy === "price-high") sorted.sort((a, b) => b.price - a.price);
        if (sortBy === "rating") sorted.sort((a, b) => b.rating - a.rating);

        setProducts(sorted);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [category, texture, maxPrice, search, sortBy]);

  return (
    <div className="min-h-screen bg-stone-50 dark:bg-stone-950 text-stone-900 dark:text-stone-100 transition-colors">
      <PublicNavbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Header */}
        <div className="border-b border-stone-200/80 dark:border-stone-800/80 pb-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <span className="text-xs font-semibold uppercase tracking-wider text-[#C26D53]">
                Formulation Catalog
              </span>
              <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight text-stone-900 dark:text-stone-100 mt-1">
                Beauty Formulations
              </h1>
              <p className="text-xs sm:text-sm text-stone-500 dark:text-stone-400 mt-1">
                Curated high-efficacy products engineered for specific skin barriers and textures.
              </p>
            </div>
            <div className="text-xs text-stone-500">
              Showing <strong className="text-stone-900 dark:text-stone-100">{products.length}</strong> formulations
            </div>
          </div>
        </div>

        {/* Filter Controls Bar */}
        <div className="p-4 rounded-xl border border-stone-200/80 dark:border-stone-800/80 bg-white dark:bg-stone-900 shadow-2xs space-y-4">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-3">
            {/* Search */}
            <div className="w-full lg:w-80">
              <Input
                placeholder="Search ingredients, brands, or names..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                icon={Search}
                className="text-xs"
              />
            </div>

            {/* Sort */}
            <div className="flex items-center gap-2 w-full lg:w-auto justify-between lg:justify-end">
              <span className="text-xs text-stone-400 flex items-center gap-1">
                <ArrowUpDown className="w-3.5 h-3.5" /> Sort:
              </span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="text-xs rounded-lg border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-900 px-3 py-1.5 text-stone-800 dark:text-stone-200 focus:outline-none cursor-pointer"
              >
                <option value="recommended">Best Match</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
              </select>
            </div>
          </div>

          {/* Categories Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
            <span className="text-xs text-stone-400 shrink-0 mr-1">Category:</span>
            {categories.map((c) => (
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

          {/* Secondary filter: Texture & Budget */}
          <div className="pt-2 border-t border-stone-100 dark:border-stone-800/80 flex flex-wrap items-center justify-between gap-4 text-xs">
            <div className="flex items-center gap-1.5 overflow-x-auto">
              <span className="text-stone-400 shrink-0 mr-1">Texture:</span>
              {textures.map((t) => (
                <button
                  key={t}
                  onClick={() => setTexture(t)}
                  className={`px-2.5 py-1 rounded-md text-[11px] transition-colors shrink-0 cursor-pointer ${
                    texture === t
                      ? "bg-[#C26D53]/15 text-[#C26D53] border border-[#C26D53]/30 font-medium"
                      : "bg-stone-50 dark:bg-stone-800 text-stone-600 dark:text-stone-400 border border-stone-200/50 dark:border-stone-700"
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-2 text-stone-500">
              <span>Max Price:</span>
              <span className="font-semibold text-stone-900 dark:text-stone-100">
                ₹{maxPrice}
              </span>
              <input
                type="range"
                min="400"
                max="1500"
                step="50"
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                className="w-24 accent-[#C26D53] cursor-pointer"
              />
            </div>
          </div>
        </div>

        {/* Product Grid */}
        <ProductGrid products={products} loading={loading} />
      </div>

      <Footer />
    </div>
  );
};
