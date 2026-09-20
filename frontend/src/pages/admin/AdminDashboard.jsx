import React from "react";
import { Link } from "react-router-dom";
import {
  Package,
  Users,
  ShoppingBag,
  Star,
  Sparkles,
  ArrowRight
} from "lucide-react";
import { Button } from "../../components/common/Button";

export const AdminDashboard = () => {
  const metrics = [
    { label: "Products", value: 38, icon: Package },
    { label: "Customers", value: 128, icon: Users },
    { label: "Orders", value: 76, icon: ShoppingBag }
  ];

  const popularProducts = [
    { name: "HydraGel Ultra-Light Moisturizer", brand: "Joyory Labs", rating: "★★★★★ 4.8" },
    { name: "Revitalift 1.5% Hyaluronic Acid Serum", brand: "L'Oréal Paris", rating: "★★★★★ 4.8" },
    { name: "Watermelon Cooling Glow Sunscreen SPF 50", brand: "Dot & Key", rating: "★★★★★ 4.8" }
  ];

  const customerNeeds = [
    {
      need: "Lightweight moisturizers under ₹700 are frequently searched.",
      interest: "High Interest",
      opportunity: "Add more lightweight gel options."
    },
    {
      need: "Fragrance-free sunscreen is getting more interest.",
      interest: "Growing Interest",
      opportunity: "Expand fragrance-free mineral sunscreen selection."
    },
    {
      need: "Clarifying hard water scalp treatments have growing queries.",
      interest: "High Interest",
      opportunity: "Introduce an affordable ACV scalp detox formulation."
    }
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-8 py-4">
      {/* Header */}
      <div className="border-b border-stone-200/80 dark:border-stone-800/80 pb-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight text-stone-950 dark:text-stone-50">
            Admin Overview
          </h1>
          <p className="text-xs sm:text-sm text-stone-500 dark:text-stone-400 mt-0.5">
            Quick store snapshot, popular products, and emerging customer needs.
          </p>
        </div>
        <Link to="/admin/products">
          <Button variant="primary" size="sm">
            View All Products
          </Button>
        </Link>
      </div>

      {/* 1. Three Simple KPIs: Products, Customers, Orders */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {metrics.map((m, idx) => {
          const Icon = m.icon;
          return (
            <div
              key={idx}
              className="p-5 rounded-2xl border border-stone-200/80 dark:border-stone-800/80 bg-white dark:bg-stone-900 shadow-2xs space-y-2"
            >
              <div className="flex items-center justify-between text-xs text-stone-400">
                <span>Total {m.label}</span>
                <Icon className="w-4 h-4 text-[#C26D53]" />
              </div>
              <div className="text-3xl font-bold text-stone-950 dark:text-stone-50">
                {m.value}
              </div>
            </div>
          );
        })}
      </div>

      {/* 2. Popular Products */}
      <section className="p-6 rounded-2xl border border-stone-200/80 dark:border-stone-800/80 bg-white dark:bg-stone-900 shadow-2xs space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-base font-semibold text-stone-950 dark:text-stone-50">
            Popular Products
          </h2>
          <Link to="/admin/products" className="text-xs text-[#C26D53] hover:underline">
            Manage products
          </Link>
        </div>

        <div className="space-y-3">
          {popularProducts.map((p, idx) => (
            <div
              key={idx}
              className="flex items-center justify-between p-3.5 rounded-xl bg-stone-50 dark:bg-stone-800/50 text-xs"
            >
              <div>
                <p className="font-semibold text-stone-900 dark:text-stone-100">{p.name}</p>
                <p className="text-[11px] text-stone-400">{p.brand}</p>
              </div>
              <span className="text-amber-500 font-medium">{p.rating}</span>
            </div>
          ))}
        </div>
      </section>

      {/* 3. Customer Needs */}
      <section className="p-6 rounded-2xl border border-stone-200/80 dark:border-stone-800/80 bg-white dark:bg-stone-900 shadow-2xs space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-base font-semibold text-stone-950 dark:text-stone-50 flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-[#C26D53]" />
            Customer Needs
          </h2>
          <Link to="/admin/opportunities" className="text-xs text-[#C26D53] hover:underline">
            View opportunities
          </Link>
        </div>

        <div className="space-y-3">
          {customerNeeds.map((need, idx) => (
            <div
              key={idx}
              className="p-4 rounded-xl border border-stone-100 dark:border-stone-800 bg-stone-50/50 dark:bg-stone-800/30 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs"
            >
              <div className="space-y-0.5">
                <p className="font-medium text-stone-900 dark:text-stone-100">{need.need}</p>
                <p className="text-[11px] text-stone-400">Action: {need.opportunity}</p>
              </div>
              <span className="inline-block px-2.5 py-1 rounded-full text-[10px] font-semibold bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 shrink-0">
                {need.interest}
              </span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
