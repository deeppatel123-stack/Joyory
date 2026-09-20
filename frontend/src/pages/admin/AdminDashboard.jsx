import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Package,
  ShoppingBag,
  Users,
  TrendingUp,
  ArrowRight,
  Sparkles,
  Radar,
  Search,
  CheckCircle,
  Plus
} from "lucide-react";
import { apiClient } from "../../services/apiClient";
import { Button } from "../../components/common/Button";

export const AdminDashboard = () => {
  const [stats, setStats] = useState({
    totalRevenue: 124800,
    totalOrders: 32,
    totalCustomers: 120,
    totalProducts: 38
  });

  const topPreferences = [
    { label: "Lightweight Water-Gel Texture", share: "44% of customers" },
    { label: "Natural & Matte Finishes", share: "38% of customers" },
    { label: "Barrier Care (Centella & Ceramides)", share: "32% of customers" },
    { label: "Budget-conscious (₹500 - ₹800)", share: "62% of customers" }
  ];

  const bestProducts = [
    { name: "HydraGel Ultra-Light Moisturizer", brand: "Joyory Labs", rating: 4.8, sales: "142 orders" },
    { name: "Revitalift 1.5% Hyaluronic Acid Serum", brand: "L'Oréal Paris", rating: 4.8, sales: "128 orders" },
    { name: "Oat & Cica Calming Cleanser", brand: "Minimalist", rating: 4.7, sales: "96 orders" },
    { name: "Watermelon Cooling Glow Sunscreen", brand: "Dot & Key", rating: 4.8, sales: "88 orders" }
  ];

  const trendingSearches = [
    { query: "lightweight ceramide moisturizer", volume: "14.2k monthly searches", growth: "+42%" },
    { query: "hard water hair serum", volume: "11.8k monthly searches", growth: "+36%" },
    { query: "non-comedogenic concealer", volume: "8.9k monthly searches", growth: "+28%" },
    { query: "niacinamide oil control", volume: "7.4k monthly searches", growth: "+19%" }
  ];

  const needGaps = [
    {
      title: "Lightweight Ceramide Barrier Cream for Humid Climates",
      demand: "High",
      matchingProducts: 2,
      interest: "Growing (+42% YoY)",
      action: "Formulate Water-Burst Ceramide under ₹700"
    },
    {
      title: "Clarifying Scalp Treatment for Metro Hard Water",
      demand: "High",
      matchingProducts: 1,
      interest: "Growing (+36% YoY)",
      action: "Introduce ACV Scalp Detox under ₹500"
    }
  ];

  useEffect(() => {
    async function loadStats() {
      try {
        const res = await apiClient.get("/admin/dashboard");
        if (res && res.data) {
          setStats({
            totalRevenue: res.data.totalRevenue || 124800,
            totalOrders: res.data.totalOrders || 32,
            totalCustomers: res.data.totalCustomers || 120,
            totalProducts: res.data.totalProducts || 38
          });
        }
      } catch (err) {
        console.warn("Using default stats:", err.message);
      }
    }
    loadStats();
  }, []);

  return (
    <div className="space-y-8 max-w-7xl mx-auto pb-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-stone-200/80 dark:border-stone-800/80 pb-5">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight text-stone-950 dark:text-stone-50">
            Admin Overview
          </h1>
          <p className="text-xs text-stone-500 dark:text-stone-400 mt-0.5">
            Commercial metrics, customer demand trends, and innovation opportunities
          </p>
        </div>
        <div className="flex items-center gap-2.5">
          <Link to="/admin/products">
            <Button variant="primary" icon={Plus} size="sm">
              Add Product
            </Button>
          </Link>
        </div>
      </div>

      {/* 1. Overview KPIs */}
      <section className="space-y-3">
        <h2 className="text-xs font-semibold uppercase tracking-wider text-stone-400">
          Overview
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-5 rounded-xl border border-stone-200/80 dark:border-stone-800/80 bg-white dark:bg-stone-900 shadow-2xs space-y-2">
            <div className="flex items-center justify-between text-xs text-stone-500">
              <span>Total Products</span>
              <Package className="w-4 h-4 text-stone-400" />
            </div>
            <div className="text-2xl font-bold text-stone-950 dark:text-stone-50">
              {stats.totalProducts}
            </div>
            <p className="text-[11px] text-stone-400">In active store catalog</p>
          </div>

          <div className="p-5 rounded-xl border border-stone-200/80 dark:border-stone-800/80 bg-white dark:bg-stone-900 shadow-2xs space-y-2">
            <div className="flex items-center justify-between text-xs text-stone-500">
              <span>Total Customers</span>
              <Users className="w-4 h-4 text-stone-400" />
            </div>
            <div className="text-2xl font-bold text-stone-950 dark:text-stone-50">
              {stats.totalCustomers}
            </div>
            <p className="text-[11px] text-stone-400">Registered shopper profiles</p>
          </div>

          <div className="p-5 rounded-xl border border-stone-200/80 dark:border-stone-800/80 bg-white dark:bg-stone-900 shadow-2xs space-y-2">
            <div className="flex items-center justify-between text-xs text-stone-500">
              <span>Orders</span>
              <ShoppingBag className="w-4 h-4 text-[#C26D53]" />
            </div>
            <div className="text-2xl font-bold text-stone-950 dark:text-stone-50">
              {stats.totalOrders}
            </div>
            <p className="text-[11px] text-stone-400">Placed & fulfilled</p>
          </div>

          <div className="p-5 rounded-xl border border-stone-200/80 dark:border-stone-800/80 bg-white dark:bg-stone-900 shadow-2xs space-y-2">
            <div className="flex items-center justify-between text-xs text-stone-500">
              <span>Revenue</span>
              <TrendingUp className="w-4 h-4 text-emerald-600" />
            </div>
            <div className="text-2xl font-bold text-stone-950 dark:text-stone-50">
              ₹{stats.totalRevenue.toLocaleString()}
            </div>
            <p className="text-[11px] text-stone-400">Completed store checkout</p>
          </div>
        </div>
      </section>

      {/* 2 & 3: Customer Insights + Product Insights */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Customer Insights: Top Preferences */}
        <section className="p-5 rounded-xl border border-stone-200/80 dark:border-stone-800/80 bg-white dark:bg-stone-900 shadow-2xs space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-semibold text-stone-950 dark:text-stone-50 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#C26D53]" />
              Customer Insights — Top Preferences
            </h3>
            <span className="text-[11px] text-stone-400">From Beauty Memory</span>
          </div>

          <div className="space-y-2.5">
            {topPreferences.map((pref, i) => (
              <div
                key={i}
                className="flex items-center justify-between p-3 rounded-lg bg-stone-50 dark:bg-stone-800/50 text-xs"
              >
                <span className="font-medium text-stone-800 dark:text-stone-200">
                  {pref.label}
                </span>
                <span className="text-[#C26D53] font-semibold">{pref.share}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Product Insights: Best Performing Products */}
        <section className="p-5 rounded-xl border border-stone-200/80 dark:border-stone-800/80 bg-white dark:bg-stone-900 shadow-2xs space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-semibold text-stone-950 dark:text-stone-50 flex items-center gap-2">
              <Package className="w-4 h-4 text-[#C26D53]" />
              Product Insights — Best Performers
            </h3>
            <Link
              to="/admin/products"
              className="text-[11px] text-[#C26D53] hover:underline flex items-center gap-1"
            >
              View All <ArrowRight className="w-3 h-3" />
            </Link>
          </div>

          <div className="space-y-2.5">
            {bestProducts.map((prod, i) => (
              <div
                key={i}
                className="flex items-center justify-between p-3 rounded-lg bg-stone-50 dark:bg-stone-800/50 text-xs"
              >
                <div>
                  <p className="font-medium text-stone-900 dark:text-stone-100">{prod.name}</p>
                  <p className="text-[11px] text-stone-400">{prod.brand} • ★ {prod.rating}</p>
                </div>
                <span className="font-semibold text-stone-700 dark:text-stone-300">
                  {prod.sales}
                </span>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* 4. Demand Insights: Trending Searches */}
      <section className="p-5 rounded-xl border border-stone-200/80 dark:border-stone-800/80 bg-white dark:bg-stone-900 shadow-2xs space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-semibold text-stone-950 dark:text-stone-50 flex items-center gap-2">
            <Search className="w-4 h-4 text-[#C26D53]" />
            Demand Insights — Trending Searches
          </h3>
          <span className="text-[11px] text-stone-400">Live Customer Queries</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {trendingSearches.map((item, i) => (
            <div
              key={i}
              className="p-3.5 rounded-lg border border-stone-200/60 dark:border-stone-800 bg-stone-50/50 dark:bg-stone-800/40 space-y-1"
            >
              <div className="flex items-center justify-between text-[11px]">
                <span className="text-stone-400">{item.volume}</span>
                <span className="text-emerald-600 font-semibold">{item.growth}</span>
              </div>
              <p className="text-xs font-medium text-stone-900 dark:text-stone-100 truncate">
                "{item.query}"
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* 5. Opportunity: Need Gap Radar */}
      <section className="p-5 rounded-xl border border-stone-200/80 dark:border-stone-800/80 bg-white dark:bg-stone-900 shadow-2xs space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-semibold text-stone-950 dark:text-stone-50 flex items-center gap-2">
            <Radar className="w-4 h-4 text-[#C26D53]" />
            Opportunity — Customer Need Gap Radar
          </h3>
          <Link
            to="/admin/opportunities"
            className="text-[11px] text-[#C26D53] hover:underline flex items-center gap-1"
          >
            All Opportunities <ArrowRight className="w-3 h-3" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {needGaps.map((gap, i) => (
            <div
              key={i}
              className="p-4 rounded-lg border border-stone-200 dark:border-stone-800 bg-stone-50/50 dark:bg-stone-800/50 space-y-2.5"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-stone-900 dark:text-stone-100">
                  {gap.title}
                </span>
                <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-red-100 dark:bg-red-950 text-red-700 dark:text-red-300">
                  Demand: {gap.demand}
                </span>
              </div>

              <div className="flex items-center gap-4 text-[11px] text-stone-500">
                <span>Matching Products: <strong className="text-stone-700 dark:text-stone-300">{gap.matchingProducts}</strong></span>
                <span>Interest: <strong className="text-emerald-600">{gap.interest}</strong></span>
              </div>

              <div className="pt-2 border-t border-stone-200/60 dark:border-stone-700/60 flex items-center justify-between">
                <span className="text-[11px] text-stone-600 dark:text-stone-400">
                  {gap.action}
                </span>
                <Link to="/admin/opportunities">
                  <Button variant="outline" size="xs">
                    View Opportunity
                  </Button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
