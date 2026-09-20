import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  GitBranch,
  BookmarkCheck,
  ShoppingBag,
  CheckCircle2,
  Package,
  Sparkles
} from "lucide-react";
import { useCustomer } from "../../context/CustomerContext";
import { productService } from "../../services/productService";
import { ProductCard } from "../../components/customer/ProductCard";
import { Button } from "../../components/common/Button";

export const CustomerDashboard = () => {
  const { profile, orders } = useCustomer();
  const [recommended, setRecommended] = useState([]);

  useEffect(() => {
    async function load() {
      try {
        const all = await productService.getProducts();
        setRecommended(all.slice(0, 4));
      } catch (e) {
        console.error("Failed to load recommendations:", e);
      }
    }
    load();
  }, []);

  const latestOrder = orders && orders.length > 0 ? orders[0] : {
    id: "JOY-ORD-8821",
    date: "Sep 18, 2026",
    status: "Delivered",
    items: [
      { name: "HydraGel Ultra-Light Moisturizer", brand: "Joyory Labs", price: 649, quantity: 1 }
    ],
    total: 649
  };

  const memoryTags = [
    { label: "Preferred Texture", value: "Lightweight Water-Gel" },
    { label: "Preferred Finish", value: "Natural / Matte" },
    { label: "Skin Focus", value: "Oily / Combination" },
    { label: "Budget Range", value: "Under ₹800" }
  ];

  return (
    <div className="space-y-6 max-w-6xl mx-auto py-2">
      {/* Page Title */}
      <div className="border-b border-stone-200/80 dark:border-stone-800/80 pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div>
          <span className="text-[11px] font-semibold uppercase tracking-wider text-[#C26D53]">
            Customer Portal
          </span>
          <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight text-stone-950 dark:text-stone-50 mt-0.5">
            Welcome back, {profile?.name ? profile.name.split(" ")[0] : "Aria"}
          </h1>
        </div>
        <Link to="/customer/discover">
          <Button variant="primary" size="sm" icon={ArrowRight}>
            Discover Products
          </Button>
        </Link>
      </div>

      {/* BENTO GRID UI: Customer Dashboard */}
      <div className="space-y-6">
        {/* Row 1: Welcome / Journey (Wide Bento Card) */}
        <section className="p-6 sm:p-7 rounded-2xl border border-stone-200/80 dark:border-stone-800/80 bg-white dark:bg-stone-900 shadow-2xs space-y-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-stone-100 dark:border-stone-800 pb-4">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-stone-100 dark:bg-stone-800 flex items-center justify-center text-[#C26D53]">
                <GitBranch className="w-4 h-4" />
              </div>
              <div>
                <h2 className="text-sm font-semibold text-stone-900 dark:text-stone-100">
                  Your Beauty Journey
                </h2>
                <p className="text-xs text-stone-500 dark:text-stone-400">
                  Continuous learning based on your real interactions
                </p>
              </div>
            </div>
            <Link
              to="/customer/journey"
              className="text-xs text-[#C26D53] hover:underline font-medium flex items-center gap-1"
            >
              View Full Journey <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* 4 Journey Points */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
            <div className="p-3.5 rounded-xl bg-stone-50 dark:bg-stone-800/40 border border-stone-100 dark:border-stone-800 space-y-1">
              <div className="flex items-center justify-between">
                <span className="font-semibold text-stone-900 dark:text-stone-100">1. Discover</span>
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
              </div>
              <p className="text-stone-500 text-[11px]">Filtered for lightweight & oil control</p>
            </div>

            <div className="p-3.5 rounded-xl bg-stone-50 dark:bg-stone-800/40 border border-stone-100 dark:border-stone-800 space-y-1">
              <div className="flex items-center justify-between">
                <span className="font-semibold text-stone-900 dark:text-stone-100">2. Choose</span>
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
              </div>
              <p className="text-stone-500 text-[11px]">Compared texture feel and finish</p>
            </div>

            <div className="p-3.5 rounded-xl bg-stone-50 dark:bg-stone-800/40 border border-stone-100 dark:border-stone-800 space-y-1">
              <div className="flex items-center justify-between">
                <span className="font-semibold text-stone-900 dark:text-stone-100">3. Experience</span>
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
              </div>
              <p className="text-stone-500 text-[11px]">HydraGel delivered & reviewed</p>
            </div>

            <div className="p-3.5 rounded-xl bg-stone-50 dark:bg-stone-800/40 border border-stone-100 dark:border-stone-800 space-y-1">
              <div className="flex items-center justify-between">
                <span className="font-semibold text-stone-900 dark:text-stone-100">4. Remember</span>
                <Sparkles className="w-3.5 h-3.5 text-[#C26D53]" />
              </div>
              <p className="text-stone-500 text-[11px]">Preferences saved in Beauty Memory</p>
            </div>
          </div>
        </section>

        {/* Row 2: Beauty Memory (Left) | Recent Order (Right) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Beauty Memory Bento Card */}
          <section className="p-6 rounded-2xl border border-stone-200/80 dark:border-stone-800/80 bg-white dark:bg-stone-900 shadow-2xs space-y-4 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b border-stone-100 dark:border-stone-800 pb-3">
                <div className="flex items-center gap-2">
                  <BookmarkCheck className="w-4 h-4 text-[#C26D53]" />
                  <h2 className="text-sm font-semibold text-stone-900 dark:text-stone-100">
                    Beauty Memory
                  </h2>
                </div>
                <Link
                  to="/customer/beauty-memory"
                  className="text-xs text-[#C26D53] hover:underline font-medium"
                >
                  View Details
                </Link>
              </div>

              <div className="grid grid-cols-2 gap-2.5">
                {memoryTags.map((tag, idx) => (
                  <div
                    key={idx}
                    className="p-3 rounded-xl bg-stone-50 dark:bg-stone-800/50 border border-stone-100 dark:border-stone-800 text-xs space-y-0.5"
                  >
                    <span className="text-[10px] text-stone-400 block font-medium">
                      {tag.label}
                    </span>
                    <span className="font-semibold text-stone-900 dark:text-stone-100 block">
                      {tag.value}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-3 border-t border-stone-100 dark:border-stone-800 flex items-center justify-between text-xs text-stone-500">
              <span>Status: Active & Learning</span>
              <Link to="/customer/beauty-memory" className="text-[#C26D53] hover:underline font-medium">
                Edit Preferences
              </Link>
            </div>
          </section>

          {/* Recent Order Bento Card */}
          <section className="p-6 rounded-2xl border border-stone-200/80 dark:border-stone-800/80 bg-white dark:bg-stone-900 shadow-2xs space-y-4 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b border-stone-100 dark:border-stone-800 pb-3">
                <div className="flex items-center gap-2">
                  <Package className="w-4 h-4 text-[#C26D53]" />
                  <h2 className="text-sm font-semibold text-stone-900 dark:text-stone-100">
                    Recent Order
                  </h2>
                </div>
                <Link
                  to="/customer/orders"
                  className="text-xs text-[#C26D53] hover:underline font-medium"
                >
                  View All Orders
                </Link>
              </div>

              {latestOrder ? (
                <div className="p-4 rounded-xl bg-stone-50 dark:bg-stone-800/50 border border-stone-100 dark:border-stone-800 space-y-2.5 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-stone-900 dark:text-stone-100">
                      {latestOrder.id}
                    </span>
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300">
                      {latestOrder.status || "Delivered"}
                    </span>
                  </div>

                  <div className="text-stone-600 dark:text-stone-300">
                    <p className="font-semibold text-stone-900 dark:text-stone-100 truncate">
                      {latestOrder.items?.[0]?.name || "HydraGel Ultra-Light Moisturizer"}
                    </p>
                    <p className="text-[11px] text-stone-400 mt-0.5">
                      {latestOrder.date || "Sep 18, 2026"} • ₹{latestOrder.total || 649}
                    </p>
                  </div>
                </div>
              ) : (
                <p className="text-xs text-stone-500">No recent orders yet.</p>
              )}
            </div>

            <div className="pt-3 border-t border-stone-100 dark:border-stone-800 flex items-center justify-between text-xs text-stone-500">
              <Link to="/customer/orders" className="text-stone-600 dark:text-stone-400 hover:underline">
                Order History
              </Link>
              <Link to="/products" className="text-[#C26D53] hover:underline font-medium">
                Reorder Item
              </Link>
            </div>
          </section>
        </div>

        {/* Row 3: Recommended Products */}
        <section className="space-y-4 pt-2">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-base font-semibold text-stone-950 dark:text-stone-50">
                Recommended for You
              </h2>
              <p className="text-xs text-stone-500 dark:text-stone-400">
                Formulations aligned with your lightweight texture and finish preferences
              </p>
            </div>
            <Link
              to="/products"
              className="text-xs text-[#C26D53] hover:underline font-medium flex items-center gap-1"
            >
              Explore Catalog <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {recommended.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};
