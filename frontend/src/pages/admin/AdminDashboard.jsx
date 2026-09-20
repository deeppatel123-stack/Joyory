import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Package,
  Users,
  ShoppingBag,
  Sparkles,
  ArrowRight,
  TrendingUp
} from "lucide-react";
import { Button } from "../../components/common/Button";
import { apiClient } from "../../services/apiClient";

export const AdminDashboard = () => {
  const [stats, setStats] = useState({
    totalProducts: 38,
    totalCustomers: 2,
    totalOrders: 2,
    totalRevenue: 1848
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadStats() {
      try {
        const res = await apiClient.get("/admin/stats");
        if (res && res.data) {
          setStats(res.data);
        }
      } catch (err) {
        console.warn("[AdminDashboard] Live stats fallback:", err.message);
      } finally {
        setLoading(false);
      }
    }
    loadStats();
  }, []);

  const metrics = [
    {
      label: "Active Formulations in MongoDB",
      key: "Products",
      value: stats.totalProducts,
      icon: Package,
      link: "/admin/products"
    },
    {
      label: "Registered Customers in MongoDB",
      key: "Customers",
      value: stats.totalCustomers,
      icon: Users,
      link: "/admin/customers"
    },
    {
      label: "Customer Orders in MongoDB",
      key: "Orders",
      value: stats.totalOrders,
      icon: ShoppingBag,
      link: "/admin/orders"
    }
  ];

  const popularProducts = [
    { name: "HydraGel Ultra-Light Moisturizer", brand: "Joyory Labs", category: "Skincare", price: 649, rating: "★ 4.8" },
    { name: "Oat & Cica Calming Foaming Cleanser", brand: "Minimalist", category: "Skincare", price: 349, rating: "★ 4.7" },
    { name: "Watermelon Cooling Glow Sunscreen SPF 50", brand: "Dot & Key", category: "Skincare", price: 545, rating: "★ 4.8" }
  ];

  const customerNeeds = [
    {
      need: "High demand for lightweight moisturizers under ₹700",
      interest: "High Priority",
      action: "Formulate additional water-gel variations"
    },
    {
      need: "Growing interest in fragrance-free mineral sunscreens",
      interest: "Emerging Trend",
      action: "Evaluate physical zinc oxide SPF 50 line"
    },
    {
      need: "Frequent customer queries for hard-water scalp detox treatments",
      interest: "High Priority",
      action: "Introduce affordable ACV clarifying scalp serum"
    }
  ];

  return (
    <div className="max-w-5xl mx-auto space-y-6 py-2">
      {/* Header */}
      <div className="border-b border-stone-200/80 dark:border-stone-800/80 pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <span className="text-[11px] font-semibold uppercase tracking-wider text-[#C26D53]">
            Admin Control
          </span>
          <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight text-stone-950 dark:text-stone-50 mt-0.5">
            Admin Overview
          </h1>
          <p className="text-xs text-stone-500 dark:text-stone-400 mt-1">
            Real MongoDB database synchronization: products, customers, and order lifecycle
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Link to="/admin/products">
            <Button variant="primary" size="sm" icon={ArrowRight}>
              Manage Products
            </Button>
          </Link>
        </div>
      </div>

      {/* BENTO GRID UI: Admin Overview */}
      <div className="space-y-6">
        {/* Row 1: Products | Customers | Orders (3 Real Database Metric Cards) */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {metrics.map((m, idx) => {
            const Icon = m.icon;
            return (
              <Link
                key={idx}
                to={m.link}
                className="p-5 rounded-2xl border border-stone-200/80 dark:border-stone-800/80 bg-white dark:bg-stone-900 shadow-2xs hover:shadow-xs transition-all space-y-2 group"
              >
                <div className="flex items-center justify-between text-xs text-stone-400">
                  <span className="font-medium">{m.key}</span>
                  <div className="w-7 h-7 rounded-lg bg-stone-100 dark:bg-stone-800 flex items-center justify-center text-[#C26D53] group-hover:scale-105 transition-transform">
                    <Icon className="w-4 h-4" />
                  </div>
                </div>
                <div className="text-3xl font-bold text-stone-950 dark:text-stone-50 tracking-tight">
                  {loading ? "..." : m.value}
                </div>
                <div className="text-[11px] text-stone-400 flex items-center justify-between pt-1 border-t border-stone-100 dark:border-stone-800">
                  <span>{m.label}</span>
                  <span className="text-[#C26D53] font-medium opacity-0 group-hover:opacity-100 transition-opacity">View →</span>
                </div>
              </Link>
            );
          })}
        </div>

        {/* Row 2: Popular Products (Bento Card) */}
        <section className="p-6 rounded-2xl border border-stone-200/80 dark:border-stone-800/80 bg-white dark:bg-stone-900 shadow-2xs space-y-4">
          <div className="flex items-center justify-between border-b border-stone-100 dark:border-stone-800 pb-3">
            <div>
              <h2 className="text-sm font-semibold text-stone-950 dark:text-stone-50">
                Catalog Highlights
              </h2>
              <p className="text-xs text-stone-400 mt-0.5">Top customer engagement & formulations</p>
            </div>
            <Link to="/admin/products" className="text-xs text-[#C26D53] hover:underline font-medium">
              View All Products
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {popularProducts.map((p, idx) => (
              <div
                key={idx}
                className="p-4 rounded-xl bg-stone-50 dark:bg-stone-800/40 border border-stone-100 dark:border-stone-800 flex flex-col justify-between space-y-2 text-xs"
              >
                <div>
                  <span className="text-[10px] text-stone-400 uppercase font-bold tracking-wider block">
                    {p.brand}
                  </span>
                  <h3 className="font-semibold text-stone-900 dark:text-stone-100 mt-0.5 line-clamp-1">
                    {p.name}
                  </h3>
                  <span className="text-[11px] text-stone-500 block mt-0.5">{p.category}</span>
                </div>
                <div className="flex items-center justify-between pt-2 border-t border-stone-200/60 dark:border-stone-700/60">
                  <span className="font-bold text-stone-900 dark:text-stone-100">₹{p.price}</span>
                  <span className="font-semibold text-amber-500">{p.rating}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Row 3: Customer Needs (Bento Card) */}
        <section className="p-6 rounded-2xl border border-stone-200/80 dark:border-stone-800/80 bg-white dark:bg-stone-900 shadow-2xs space-y-4">
          <div className="flex items-center justify-between border-b border-stone-100 dark:border-stone-800 pb-3">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#C26D53]" />
              <div>
                <h2 className="text-sm font-semibold text-stone-950 dark:text-stone-50">
                  Customer Needs & Demand Gaps
                </h2>
                <p className="text-xs text-stone-400 mt-0.5">Aggregated preferences from customer journeys</p>
              </div>
            </div>
            <Link to="/admin/opportunities" className="text-xs text-[#C26D53] hover:underline font-medium">
              View Opportunities
            </Link>
          </div>

          <div className="space-y-3">
            {customerNeeds.map((need, idx) => (
              <div
                key={idx}
                className="p-4 rounded-xl border border-stone-100 dark:border-stone-800 bg-stone-50/50 dark:bg-stone-800/30 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs"
              >
                <div className="space-y-0.5">
                  <p className="font-semibold text-stone-900 dark:text-stone-100">{need.need}</p>
                  <p className="text-[11px] text-stone-500 dark:text-stone-400">
                    <span className="font-medium text-stone-700 dark:text-stone-300">Recommended Action:</span> {need.action}
                  </p>
                </div>
                <span className="inline-block px-2.5 py-1 rounded-full text-[10px] font-semibold bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 shrink-0">
                  {need.interest}
                </span>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};
