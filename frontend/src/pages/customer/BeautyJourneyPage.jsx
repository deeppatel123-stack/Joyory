import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  GitBranch,
  Search,
  Eye,
  Scale,
  ShoppingBag,
  Heart,
  CheckCircle2,
  Sparkles,
  ArrowRight
} from "lucide-react";
import { Button } from "../../components/common/Button";

export const BeautyJourneyPage = () => {
  // Outcome Loop State
  const [textureFeedback, setTextureFeedback] = useState("Loved it");
  const [overallFeedback, setOverallFeedback] = useState("Loved it");
  const [experienceSaved, setExperienceSaved] = useState(false);

  // 5 simple events as specified
  const journeyEvents = [
    {
      title: "Searched for moisturizer",
      desc: 'Looking for lightweight hydration for daily use',
      icon: Search
    },
    {
      title: "Viewed HydraGel Moisturizer",
      desc: "Checked ingredients, texture details, and reviews",
      icon: Eye
    },
    {
      title: "Compared 2 products",
      desc: "Evaluated HydraGel against Oat & Cica Calming Cream",
      icon: Scale
    },
    {
      title: "Purchased HydraGel",
      desc: "Ordered HydraGel Ultra-Light Moisturizer (₹649)",
      icon: ShoppingBag
    },
    {
      title: "Loved the lightweight texture",
      desc: "Feedback recorded in your Beauty Memory",
      icon: Heart
    }
  ];

  const handleSaveOutcome = (e) => {
    e.preventDefault();
    setExperienceSaved(true);
  };

  return (
    <div className="max-w-3xl mx-auto space-y-10 py-4">
      {/* Header */}
      <div className="border-b border-stone-200/80 dark:border-stone-800/80 pb-5 space-y-1">
        <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#C26D53]">
          <GitBranch className="w-4 h-4" />
          <span>My Journey</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight text-stone-950 dark:text-stone-50">
          My Beauty Journey
        </h1>
        <p className="text-xs sm:text-sm text-stone-500 dark:text-stone-400">
          See your shopping steps, why you chose your products, and share your experience.
        </p>
      </div>

      {/* 1. SIMPLE JOURNEY TIMELINE */}
      <section className="p-6 sm:p-8 rounded-2xl border border-stone-200/80 dark:border-stone-800/80 bg-white dark:bg-stone-900 shadow-2xs space-y-6">
        <h2 className="text-base font-semibold text-stone-900 dark:text-stone-100">
          Recent Steps
        </h2>

        <div className="space-y-6">
          {journeyEvents.map((event, idx) => {
            const Icon = event.icon;
            const isLast = idx === journeyEvents.length - 1;

            return (
              <div key={idx} className="relative flex items-start gap-4">
                {!isLast && (
                  <div className="absolute left-4 top-8 -bottom-6 w-0.5 bg-stone-200 dark:bg-stone-800" />
                )}

                <div className="w-8 h-8 rounded-full bg-stone-100 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 flex items-center justify-center shrink-0 z-10 text-[#C26D53]">
                  <Icon className="w-4 h-4" />
                </div>

                <div className="pt-0.5 space-y-0.5">
                  <h3 className="text-sm font-semibold text-stone-900 dark:text-stone-100">
                    {event.title}
                  </h3>
                  <p className="text-xs text-stone-500 dark:text-stone-400">
                    {event.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 2. DECISION REPLAY — "Why you chose this" */}
      <section className="p-6 sm:p-8 rounded-2xl border border-stone-200/80 dark:border-stone-800/80 bg-white dark:bg-stone-900 shadow-2xs space-y-4">
        <div>
          <span className="text-[10px] uppercase font-bold text-[#C26D53]">Decision Replay</span>
          <h2 className="text-base font-semibold text-stone-900 dark:text-stone-100">
            Why you chose this
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
          <div className="p-3.5 rounded-xl bg-stone-50 dark:bg-stone-800/50 border border-stone-100 dark:border-stone-800 space-y-1">
            <span className="text-stone-400 block text-[11px]">You searched for:</span>
            <span className="font-semibold text-stone-900 dark:text-stone-100">
              "Lightweight moisturizer"
            </span>
          </div>

          <div className="p-3.5 rounded-xl bg-stone-50 dark:bg-stone-800/50 border border-stone-100 dark:border-stone-800 space-y-1">
            <span className="text-stone-400 block text-[11px]">You compared:</span>
            <span className="font-semibold text-stone-900 dark:text-stone-100">
              3 products
            </span>
          </div>

          <div className="p-3.5 rounded-xl bg-stone-50 dark:bg-stone-800/50 border border-stone-100 dark:border-stone-800 space-y-1">
            <span className="text-stone-400 block text-[11px]">You preferred:</span>
            <span className="font-semibold text-stone-900 dark:text-stone-100">
              Lightweight texture
            </span>
          </div>

          <div className="p-3.5 rounded-xl bg-stone-50 dark:bg-stone-800/50 border border-stone-100 dark:border-stone-800 space-y-1">
            <span className="text-stone-400 block text-[11px]">You selected:</span>
            <span className="font-semibold text-[#C26D53]">
              HydraGel Moisturizer
            </span>
          </div>
        </div>
      </section>

      {/* 3. OUTCOME LOOP — "How did it work for you?" */}
      <section className="p-6 sm:p-8 rounded-2xl border border-stone-200/80 dark:border-stone-800/80 bg-white dark:bg-stone-900 shadow-2xs space-y-5">
        <div>
          <span className="text-[10px] uppercase font-bold text-[#C26D53]">Outcome Loop</span>
          <h2 className="text-base font-semibold text-stone-900 dark:text-stone-100">
            How did it work for you?
          </h2>
          <p className="text-xs text-stone-500 dark:text-stone-400 mt-0.5">
            Product: <strong>HydraGel Moisturizer</strong>
          </p>
        </div>

        {experienceSaved ? (
          <div className="p-4 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-xs text-emerald-800 dark:text-emerald-200 flex items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span className="font-medium">Thanks! Your Beauty Memory has been updated.</span>
            </div>
            <Link
              to="/customer/beauty-memory"
              className="text-[#C26D53] hover:underline font-semibold shrink-0"
            >
              View Memory
            </Link>
          </div>
        ) : (
          <form onSubmit={handleSaveOutcome} className="space-y-5">
            {/* Texture Rating */}
            <div className="space-y-2 text-xs">
              <label className="block font-semibold text-stone-700 dark:text-stone-300">
                Texture:
              </label>
              <div className="grid grid-cols-3 gap-3">
                {["Didn't like", "Okay", "Loved it"].map((opt) => (
                  <label
                    key={opt}
                    className={`flex items-center justify-center gap-2 p-2.5 rounded-xl border text-xs cursor-pointer transition-colors ${
                      textureFeedback === opt
                        ? "border-[#C26D53] bg-[#C26D53]/10 text-[#C26D53] font-semibold"
                        : "border-stone-200 dark:border-stone-700 text-stone-700 dark:text-stone-300"
                    }`}
                  >
                    <input
                      type="radio"
                      name="texture"
                      value={opt}
                      checked={textureFeedback === opt}
                      onChange={(e) => setTextureFeedback(e.target.value)}
                      className="accent-[#C26D53]"
                    />
                    <span>{opt}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Overall Rating */}
            <div className="space-y-2 text-xs">
              <label className="block font-semibold text-stone-700 dark:text-stone-300">
                Overall:
              </label>
              <div className="grid grid-cols-3 gap-3">
                {["Not for me", "Good", "Loved it"].map((opt) => (
                  <label
                    key={opt}
                    className={`flex items-center justify-center gap-2 p-2.5 rounded-xl border text-xs cursor-pointer transition-colors ${
                      overallFeedback === opt
                        ? "border-[#C26D53] bg-[#C26D53]/10 text-[#C26D53] font-semibold"
                        : "border-stone-200 dark:border-stone-700 text-stone-700 dark:text-stone-300"
                    }`}
                  >
                    <input
                      type="radio"
                      name="overall"
                      value={opt}
                      checked={overallFeedback === opt}
                      onChange={(e) => setOverallFeedback(e.target.value)}
                      className="accent-[#C26D53]"
                    />
                    <span>{opt}</span>
                  </label>
                ))}
              </div>
            </div>

            <Button type="submit" variant="primary" size="sm">
              Save Experience
            </Button>
          </form>
        )}
      </section>
    </div>
  );
};
