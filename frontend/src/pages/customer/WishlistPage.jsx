import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Heart, Trash2, Scale, ShoppingBag, ArrowRight } from "lucide-react";
import { useCustomer } from "../../context/CustomerContext";
import { productService } from "../../services/productService";
import { products } from "../../data/products";
import { Button } from "../../components/common/Button";
import { Badge } from "../../components/common/Badge";
import { EmptyState } from "../../components/common/EmptyState";

export const WishlistPage = () => {
  const { wishlist, toggleWishlist, addToBag, addToCompare, isInCompare } = useCustomer();
  const [allProducts, setAllProducts] = useState(products);

  useEffect(() => {
    async function load() {
      try {
        const prods = await productService.getProducts();
        if (prods && prods.length > 0) setAllProducts(prods);
      } catch (e) {
        console.error(e);
      }
    }
    load();
  }, []);

  const savedProducts = allProducts.filter(p => wishlist.includes(p.id));

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-stone-200/80 dark:border-stone-800/80 pb-6">
        <div>
          <span className="text-xs font-semibold uppercase tracking-wider text-[#C26D53]">
            Saved Formulations
          </span>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-stone-950 dark:text-stone-50 mt-1">
            Your Wishlist
          </h1>
          <p className="text-xs sm:text-sm text-stone-500 dark:text-stone-400 mt-1">
            Formulations under your personal consideration.
          </p>
        </div>
        <span className="text-xs text-stone-400">
          {savedProducts.length} Saved Items
        </span>
      </div>

      {savedProducts.length === 0 ? (
        <EmptyState
          icon={Heart}
          title="Your wishlist is waiting for its first discovery."
          description="Save formulations while exploring the catalog or discovering matches through smart search."
          actionLabel="Explore Formulations"
          onAction={() => window.location.href = "/customer/discover"}
        />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {savedProducts.map((p) => {
            const inCompare = isInCompare(p.id);

            return (
              <div
                key={p.id}
                className="rounded-xl border border-stone-200/80 dark:border-stone-800/80 bg-white dark:bg-stone-900 overflow-hidden flex flex-col justify-between p-4 space-y-4"
              >
                <div className="flex gap-3">
                  <img
                    src={p.image}
                    alt={p.name}
                    className="w-20 h-20 rounded-lg object-cover shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <span className="text-[10px] text-stone-400 uppercase tracking-wider block">
                      {p.brand}
                    </span>
                    <Link
                      to={`/products/${p.id}`}
                      className="font-semibold text-xs text-stone-900 dark:text-stone-100 hover:text-[#C26D53] line-clamp-2"
                    >
                      {p.name}
                    </Link>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-xs font-semibold text-stone-900 dark:text-stone-100">
                        ₹{p.price}
                      </span>
                      <span className="text-[10px] text-stone-400">/ {p.size}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 pt-2 border-t border-stone-100 dark:border-stone-800">
                  <Button
                    size="sm"
                    variant="primary"
                    className="flex-1 text-xs"
                    onClick={() => addToBag(p)}
                    icon={ShoppingBag}
                  >
                    Add to Bag
                  </Button>

                  <button
                    onClick={() => addToCompare(p)}
                    className={`p-2 rounded-lg border text-xs transition-colors cursor-pointer ${
                      inCompare
                        ? "bg-stone-900 dark:bg-stone-100 text-white dark:text-stone-900 border-transparent"
                        : "border-stone-200 dark:border-stone-800 text-stone-700 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800"
                    }`}
                    title={inCompare ? "In comparison" : "Compare"}
                  >
                    <Scale className="w-3.5 h-3.5" />
                  </button>

                  <button
                    onClick={() => toggleWishlist(p)}
                    className="p-2 rounded-lg border border-stone-200 dark:border-stone-800 text-stone-400 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/30 transition-colors cursor-pointer"
                    title="Remove"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
