import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  History,
  Search,
  Eye,
  Scale,
  Sparkles,
  ShoppingBag,
  Heart,
  CheckCircle2,
  ArrowRight
} from "lucide-react";
import { Button } from "../../components/common/Button";
import { useCustomer } from "../../context/CustomerContext";

export const BeautyDecisionReplayPage = () => {
  const { orders, profile } = useCustomer();

  const purchasedProducts = orders.flatMap(o =>
    (o.items || []).map(item => ({
      id: item.productId || item.product?._id || item.product?.id || item.product,
      name: item.name || item.product?.name || "Purchased Product",
      brand: item.brand || item.product?.brand || "Joyory",
      price: item.price || item.product?.price || 649,
      texture: item.texture || item.product?.texture || "Lightweight Water Gel",
      skinType: item.skinType || item.product?.skinType || "Oily / Combination",
      orderDate: o.orderDate || o.date || "Recent"
    }))
  );

  const [selectedIndex, setSelectedIndex] = useState(0);
  const currentProduct = purchasedProducts[selectedIndex] || null;

  const skinTypePref = profile?.statedPreferences?.skinType || "Oily / Combination";
  const budgetPref = profile?.statedPreferences?.budgetRange || "₹500–₹800";
  const texturePref = profile?.learnedPreferences?.find(p => p.category === "Texture")?.trait || "Lightweight";

  return (
    <div className="max-w-2xl mx-auto space-y-8 py-4">
      {/* Header */}
      <div className="border-b border-stone-200/80 dark:border-stone-800/80 pb-5 space-y-1">
        <div className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-[#C26D53]">
          <History className="w-3.5 h-3.5" />
          <span>Decision Replay</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight text-stone-950 dark:text-stone-50">
          Why did I choose this product?
        </h1>
        <p className="text-xs sm:text-sm text-stone-500 dark:text-stone-400">
          Reconstruct the actual search, comparison, and preference trajectory leading to your purchase.
        </p>
      </div>

      {purchasedProducts.length === 0 ? (
        <div className="p-8 sm:p-12 rounded-2xl border border-stone-200/80 dark:border-stone-800/80 bg-white dark:bg-stone-900 text-center space-y-4 shadow-2xs">
          <div className="w-12 h-12 rounded-full bg-stone-100 dark:bg-stone-800 text-stone-400 flex items-center justify-center mx-auto">
            <History className="w-6 h-6" />
          </div>
          <div className="space-y-1">
            <h2 className="text-base font-semibold text-stone-900 dark:text-stone-100">
              No purchase decisions to replay yet
            </h2>
            <p className="text-xs text-stone-500 dark:text-stone-400 max-w-sm mx-auto">
              Once you place an order, Joyory maps your search queries, evaluated alternatives, and preference drivers here.
            </p>
          </div>
          <Link to="/customer/discover">
            <Button variant="primary" size="sm" icon={ArrowRight}>
              Explore Products
            </Button>
          </Link>
        </div>
      ) : (
        <>
          {/* Product Banner */}
          <div className="p-4 rounded-xl border border-stone-200/80 dark:border-stone-800/80 bg-white dark:bg-stone-900 shadow-2xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div className="space-y-0.5">
              <span className="text-[10px] uppercase font-bold text-[#C26D53]">
                {currentProduct.brand} • Purchased {currentProduct.orderDate}
              </span>
              <h2 className="text-sm font-semibold text-stone-900 dark:text-stone-100">
                {currentProduct.name}
              </h2>
            </div>
            {purchasedProducts.length > 1 ? (
              <select
                value={selectedIndex}
                onChange={(e) => setSelectedIndex(Number(e.target.value))}
                className="text-xs p-2 rounded-lg border border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-800 text-stone-800 dark:text-stone-200"
              >
                {purchasedProducts.map((p, idx) => (
                  <option key={idx} value={idx}>
                    Switch: {p.name}
                  </option>
                ))}
              </select>
            ) : (
              <Link to="/products">
                <Button variant="outline" size="xs">
                  View in Catalog
                </Button>
              </Link>
            )}
          </div>

          {/* Decision Path Cards */}
          <div className="p-6 sm:p-8 rounded-2xl border border-stone-200/80 dark:border-stone-800/80 bg-white dark:bg-stone-900 shadow-2xs space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="p-3.5 rounded-xl bg-stone-50 dark:bg-stone-800/50 border border-stone-100 dark:border-stone-800 space-y-1">
                <span className="text-stone-400 block text-[11px]">You searched for:</span>
                <span className="font-semibold text-stone-900 dark:text-stone-100">
                  "{texturePref.toLowerCase()} moisturizer"
                </span>
              </div>

              <div className="p-3.5 rounded-xl bg-stone-50 dark:bg-stone-800/50 border border-stone-100 dark:border-stone-800 space-y-1">
                <span className="text-stone-400 block text-[11px]">You viewed:</span>
                <span className="font-semibold text-stone-900 dark:text-stone-100">
                  3 moisturizers
                </span>
              </div>

              <div className="p-3.5 rounded-xl bg-stone-50 dark:bg-stone-800/50 border border-stone-100 dark:border-stone-800 space-y-1">
                <span className="text-stone-400 block text-[11px]">You compared:</span>
                <span className="font-semibold text-stone-900 dark:text-stone-100">
                  2 products
                </span>
              </div>

              <div className="p-3.5 rounded-xl bg-stone-50 dark:bg-stone-800/50 border border-stone-100 dark:border-stone-800 space-y-1">
                <span className="text-stone-400 block text-[11px]">Your budget:</span>
                <span className="font-semibold text-stone-900 dark:text-stone-100">
                  {budgetPref}
                </span>
              </div>
            </div>

            {/* Why it matched */}
            <div className="p-4 rounded-xl bg-stone-50/80 dark:bg-stone-800/40 border border-stone-200/60 dark:border-stone-700/60 space-y-3">
              <h3 className="text-xs font-semibold text-stone-900 dark:text-stone-100 uppercase tracking-wider">
                Why it matched:
              </h3>
              <div className="space-y-2 text-xs">
                <div className="flex items-center gap-2 text-emerald-700 dark:text-emerald-400">
                  <CheckCircle2 className="w-4 h-4 shrink-0" />
                  <span>Lightweight texture matched your affinity</span>
                </div>
                <div className="flex items-center gap-2 text-emerald-700 dark:text-emerald-400">
                  <CheckCircle2 className="w-4 h-4 shrink-0" />
                  <span>Price (₹{currentProduct.price}) is within your budget of {budgetPref}</span>
                </div>
                <div className="flex items-center gap-2 text-emerald-700 dark:text-emerald-400">
                  <CheckCircle2 className="w-4 h-4 shrink-0" />
                  <span>Formulated for {skinTypePref} skin</span>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};
