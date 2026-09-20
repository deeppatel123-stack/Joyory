import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { outcomeService } from "../../services/outcomeService";
import { useCustomer } from "../../context/CustomerContext";
import {
  Brain,
  Sparkles,
  ArrowRight,
  Layers,
  Sparkle,
  Wallet,
  Clock,
  RotateCcw
} from "lucide-react";
import { Button } from "../../components/common/Button";

export const BeautyMemoryPage = () => {
  const { profile } = useCustomer();
  const [memory, setMemory] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      setLoading(true);
      try {
        const data = await outcomeService.getBeautyMemory();
        setMemory(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [profile]);

  return (
    <div className="max-w-4xl mx-auto space-y-8 py-4">
      {/* Header */}
      <div className="border-b border-stone-200/80 dark:border-stone-800/80 pb-5 space-y-1">
        <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#C26D53]">
          <Brain className="w-4 h-4" />
          <span>Beauty Memory</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight text-stone-950 dark:text-stone-50">
          Your preferences, learned over time.
        </h1>
        <p className="text-xs sm:text-sm text-stone-500 dark:text-stone-400">
          Joyory remembers what feels good on your skin so you never have to start from scratch.
        </p>
      </div>

      {/* 4 Clean Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        {/* Card 1: Preferred Texture */}
        <div className="p-6 rounded-2xl border border-stone-200/80 dark:border-stone-800/80 bg-white dark:bg-stone-900 shadow-2xs space-y-2">
          <div className="flex items-center justify-between text-xs text-stone-400">
            <span>Preferred Texture</span>
            <Layers className="w-4 h-4 text-[#C26D53]" />
          </div>
          <div className="text-2xl font-semibold text-stone-900 dark:text-stone-100">
            Lightweight Water-Gel
          </div>
          <p className="text-xs text-stone-500 dark:text-stone-400">
            Fast-absorbing, non-sticky formulas that leave zero residue.
          </p>
        </div>

        {/* Card 2: Preferred Finish */}
        <div className="p-6 rounded-2xl border border-stone-200/80 dark:border-stone-800/80 bg-white dark:bg-stone-900 shadow-2xs space-y-2">
          <div className="flex items-center justify-between text-xs text-stone-400">
            <span>Preferred Finish</span>
            <Sparkle className="w-4 h-4 text-[#C26D53]" />
          </div>
          <div className="text-2xl font-semibold text-stone-900 dark:text-stone-100">
            Natural / Soft Matte
          </div>
          <p className="text-xs text-stone-500 dark:text-stone-400">
            Controls shine on T-zones while preserving a healthy moisture balance.
          </p>
        </div>

        {/* Card 3: Budget Band */}
        <div className="p-6 rounded-2xl border border-stone-200/80 dark:border-stone-800/80 bg-white dark:bg-stone-900 shadow-2xs space-y-2">
          <div className="flex items-center justify-between text-xs text-stone-400">
            <span>Budget</span>
            <Wallet className="w-4 h-4 text-[#C26D53]" />
          </div>
          <div className="text-2xl font-semibold text-stone-900 dark:text-stone-100">
            ₹500 – ₹1,200
          </div>
          <p className="text-xs text-stone-500 dark:text-stone-400">
            High-efficacy, research-backed everyday formulations.
          </p>
        </div>

        {/* Card 4: Recently Learned */}
        <div className="p-6 rounded-2xl border border-stone-200/80 dark:border-stone-800/80 bg-white dark:bg-stone-900 shadow-2xs space-y-2">
          <div className="flex items-center justify-between text-xs text-stone-400">
            <span>Recently Learned</span>
            <Clock className="w-4 h-4 text-[#C26D53]" />
          </div>
          <div className="text-2xl font-semibold text-stone-900 dark:text-stone-100">
            Prefers Lightweight Hydration
          </div>
          <p className="text-xs text-stone-500 dark:text-stone-400">
            Updated from your positive experience with HydraGel Moisturizer.
          </p>
        </div>
      </div>

      {/* Simple Connection Card */}
      <div className="p-6 rounded-2xl border border-stone-200/60 dark:border-stone-800/60 bg-stone-100/60 dark:bg-stone-900/40 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="space-y-1 text-center sm:text-left">
          <h3 className="text-sm font-semibold text-stone-900 dark:text-stone-100">
            Have a new product to share feedback on?
          </h3>
          <p className="text-xs text-stone-500 dark:text-stone-400">
            Log your product experience to keep your memory accurate.
          </p>
        </div>
        <Link to="/customer/beauty-outcome">
          <Button variant="primary" size="sm" icon={ArrowRight}>
            Log Product Experience
          </Button>
        </Link>
      </div>
    </div>
  );
};
