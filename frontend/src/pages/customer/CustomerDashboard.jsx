import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  GitBranch,
  Brain,
  Search,
  CheckCircle2,
  Heart,
  ShoppingBag
} from "lucide-react";
import { useCustomer } from "../../context/CustomerContext";
import { productService } from "../../services/productService";
import { ProductCard } from "../../components/customer/ProductCard";
import { Button } from "../../components/common/Button";

export const CustomerDashboard = () => {
  const { profile } = useCustomer();
  const [recommended, setRecommended] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const all = await productService.getProducts();
        // Curate 3-4 gentle recommendations
        setRecommended(all.slice(0, 4));
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  const journeySteps = [
    { title: "Searched for moisturizer", time: "Recently", icon: Search },
    { title: "Viewed HydraGel Ultra-Light", time: "Recently", icon: ShoppingBag },
    { title: "Purchased HydraGel", time: "Delivered", icon: CheckCircle2 },
    { title: "Loved the lightweight texture", time: "Feedback saved", icon: Heart }
  ];

  const memoryTags = [
    { label: "Preferred Texture", value: "Lightweight Water-Gel" },
    { label: "Preferred Finish", value: "Natural / Matte" },
    { label: "Skin Focus", value: "Oily / Combination" },
    { label: "Budget Range", value: "₹500 – ₹1,000" }
  ];

  return (
    <div className="space-y-8 max-w-5xl mx-auto py-2">
      {/* 1. Welcome Header */}
      <div className="border-b border-stone-200/80 dark:border-stone-800/80 pb-5">
        <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight text-stone-950 dark:text-stone-50">
          Welcome back, {profile?.name ? profile.name.split(" ")[0] : "Aria"}
        </h1>
        <p className="text-xs sm:text-sm text-stone-500 dark:text-stone-400 mt-1">
          Find something that works for you.
        </p>
      </div>

      {/* 2. Recommended for you (3–4 products) */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-base font-semibold text-stone-950 dark:text-stone-50">
              Recommended for you
            </h2>
            <p className="text-xs text-stone-500 dark:text-stone-400">
              Formulations suited to your lightweight preferences
            </p>
          </div>
          <Link
            to="/products"
            className="text-xs text-[#C26D53] hover:underline font-medium flex items-center gap-1"
          >
            Explore all products <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {recommended.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* 3. Your Recent Journey & Your Beauty Memory */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Recent Journey */}
        <section className="p-6 rounded-2xl border border-stone-200/80 dark:border-stone-800/80 bg-white dark:bg-stone-900 shadow-2xs space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-semibold text-stone-950 dark:text-stone-50 flex items-center gap-2">
              <GitBranch className="w-4 h-4 text-[#C26D53]" />
              Your recent journey
            </h2>
            <Link
              to="/customer/journey"
              className="text-xs text-[#C26D53] hover:underline"
            >
              Full journey
            </Link>
          </div>

          <div className="space-y-3">
            {journeySteps.map((step, idx) => {
              const Icon = step.icon;
              return (
                <div key={idx} className="flex items-center gap-3 text-xs">
                  <div className="w-6 h-6 rounded-full bg-stone-100 dark:bg-stone-800 flex items-center justify-center text-[#C26D53] shrink-0">
                    <Icon className="w-3.5 h-3.5" />
                  </div>
                  <div className="flex-1 flex items-center justify-between">
                    <span className="font-medium text-stone-800 dark:text-stone-200">
                      {step.title}
                    </span>
                    <span className="text-[11px] text-stone-400">{step.time}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Beauty Memory */}
        <section className="p-6 rounded-2xl border border-stone-200/80 dark:border-stone-800/80 bg-white dark:bg-stone-900 shadow-2xs space-y-4 flex flex-col justify-between">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-semibold text-stone-950 dark:text-stone-50 flex items-center gap-2">
                <Brain className="w-4 h-4 text-[#C26D53]" />
                Your Beauty Memory
              </h2>
              <Link
                to="/customer/beauty-memory"
                className="text-xs text-[#C26D53] hover:underline"
              >
                View details
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
                  <span className="font-semibold text-stone-800 dark:text-stone-200 block">
                    {tag.value}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <Link to="/customer/beauty-memory" className="pt-2">
            <Button variant="outline" size="sm" className="w-full justify-center">
              Open Beauty Memory
            </Button>
          </Link>
        </section>
      </div>
    </div>
  );
};
