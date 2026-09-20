import React from "react";
import { Link } from "react-router-dom";
import {
  History,
  Search,
  Eye,
  Scale,
  Sparkles,
  ShoppingBag,
  Heart,
  ArrowDown,
  ArrowRight
} from "lucide-react";
import { Button } from "../../components/common/Button";

export const BeautyDecisionReplayPage = () => {
  const steps = [
    {
      title: "Search",
      detail: 'Searched for "lightweight oil-free moisturizer for humid weather"',
      icon: Search
    },
    {
      title: "Viewed 4 products",
      detail: "Browsed lightweight gel options across Joyory Labs, Minimalist, Plum & Dot & Key",
      icon: Eye
    },
    {
      title: "Compared 2 products",
      detail: "Evaluated HydraGel Ultra-Light against Oat & Cica Calming Cream",
      icon: Scale
    },
    {
      title: "Selected lightweight texture",
      detail: "Chosen for 48H water-burst hydration and zero greasy finish",
      icon: Sparkles
    },
    {
      title: "Purchased HydraGel",
      detail: "Placed order for HydraGel Ultra-Light Moisturizer (₹649)",
      icon: ShoppingBag
    },
    {
      title: "Loved the lightweight finish",
      detail: "Logged 5-star experience: loved the non-comedogenic matte drydown",
      icon: Heart
    }
  ];

  return (
    <div className="max-w-2xl mx-auto space-y-8 py-4">
      {/* Header */}
      <div className="border-b border-stone-200/80 dark:border-stone-800/80 pb-5 space-y-1">
        <div className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-[#C26D53]">
          <History className="w-3.5 h-3.5" />
          <span>Decision Replay</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight text-stone-950 dark:text-stone-50">
          Why you chose this
        </h1>
        <p className="text-xs sm:text-sm text-stone-500 dark:text-stone-400">
          Reconstruct the inquiry steps and preferences behind your HydraGel purchase.
        </p>
      </div>

      {/* Product Banner */}
      <div className="p-4 rounded-xl border border-stone-200/80 dark:border-stone-800/80 bg-white dark:bg-stone-900 shadow-2xs flex items-center justify-between">
        <div>
          <span className="text-[10px] uppercase font-bold text-[#C26D53]">Joyory Labs</span>
          <h2 className="text-sm font-semibold text-stone-900 dark:text-stone-100">
            HydraGel Ultra-Light Moisturizer
          </h2>
        </div>
        <Link to="/products/JOY-SKN-001">
          <Button variant="outline" size="xs">
            View Product
          </Button>
        </Link>
      </div>

      {/* Simple Vertical Timeline */}
      <div className="p-6 sm:p-8 rounded-2xl border border-stone-200/80 dark:border-stone-800/80 bg-white dark:bg-stone-900 shadow-2xs">
        <div className="space-y-6">
          {steps.map((step, idx) => {
            const Icon = step.icon;
            const isLast = idx === steps.length - 1;

            return (
              <div key={idx} className="relative flex items-start gap-4">
                {/* Timeline vertical bar */}
                {!isLast && (
                  <div className="absolute left-4 top-8 -bottom-6 w-0.5 bg-stone-200 dark:bg-stone-800" />
                )}

                {/* Step Circle Icon */}
                <div className="w-8 h-8 rounded-full bg-stone-100 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 flex items-center justify-center shrink-0 z-10 text-[#C26D53]">
                  <Icon className="w-4 h-4" />
                </div>

                {/* Step Details */}
                <div className="space-y-0.5 pt-1">
                  <h3 className="text-sm font-semibold text-stone-900 dark:text-stone-100">
                    {step.title}
                  </h3>
                  <p className="text-xs text-stone-500 dark:text-stone-400 leading-relaxed">
                    {step.detail}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Call to action */}
      <div className="text-center pt-2">
        <Link to="/products">
          <Button variant="primary" icon={ArrowRight}>
            Explore More Formulations
          </Button>
        </Link>
      </div>
    </div>
  );
};
