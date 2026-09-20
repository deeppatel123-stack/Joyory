import React from "react";
import { useCustomer } from "../../context/CustomerContext";
import { PreferenceGraph } from "../../components/customer/PreferenceGraph";
import { Badge } from "../../components/common/Badge";
import { Sparkles, ArrowRight, ShieldCheck, CheckCircle2, History } from "lucide-react";

export const BeautyProfilePage = () => {
  const { profile } = useCustomer();

  const stated = profile?.statedPreferences || {};
  const learned = profile?.learnedPreferences || [];

  return (
    <div className="space-y-10">
      {/* Header */}
      <div className="border-b border-stone-200/80 dark:border-stone-800/80 pb-6">
        <span className="text-xs font-semibold uppercase tracking-wider text-[#C26D53]">
          Customer Identity & Graph State
        </span>
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-stone-950 dark:text-stone-50 mt-1">
          Your Beauty Profile
        </h1>
        <p className="text-xs sm:text-sm text-stone-500 dark:text-stone-400 mt-1">
          Compare your baseline declared preferences with your dynamically learned behavioral model.
        </p>
      </div>

      {/* 31. BEAUTY PREFERENCE GRAPH VISUALIZATION */}
      <section>
        <PreferenceGraph
          graphData={profile?.graphData}
          learnedPreferences={profile?.learnedPreferences}
        />
      </section>

      {/* 33. CONTINUOUS LEARNING TRANSITION CARD */}
      <section className="p-6 rounded-xl border border-stone-200/80 dark:border-stone-800/80 bg-white dark:bg-stone-900 shadow-2xs space-y-4">
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-[#C26D53]" />
          <h3 className="text-base font-semibold text-stone-900 dark:text-stone-100">
            Your profile is getting smarter.
          </h3>
        </div>
        <p className="text-xs text-stone-500 dark:text-stone-400 max-w-2xl leading-relaxed">
          Unlike static survey engines, Joyory tracks how your real usage experiences evolve. Here is how your profile adapted across your shopping journey:
        </p>

        {/* Before / After Transition Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
          {/* Card 1 */}
          <div className="p-4 rounded-xl border border-stone-100 dark:border-stone-800 bg-stone-50/60 dark:bg-stone-950/40 space-y-2 text-xs">
            <span className="text-[10px] uppercase font-semibold text-stone-400 block">Texture Need</span>
            <div className="flex items-center justify-between text-stone-400 line-through">
              <span>Before:</span>
              <span>Unknown / Unspecified</span>
            </div>
            <div className="flex items-center justify-between font-semibold text-stone-900 dark:text-stone-100 pt-1 border-t border-stone-200/40 dark:border-stone-800">
              <span className="text-[#C26D53]">After Feedback:</span>
              <span className="text-emerald-600 dark:text-emerald-400">Lightweight Water-Burst (94%)</span>
            </div>
          </div>

          {/* Card 2 */}
          <div className="p-4 rounded-xl border border-stone-100 dark:border-stone-800 bg-stone-50/60 dark:bg-stone-950/40 space-y-2 text-xs">
            <span className="text-[10px] uppercase font-semibold text-stone-400 block">Pricing Tolerance</span>
            <div className="flex items-center justify-between text-stone-400 line-through">
              <span>Before:</span>
              <span>Generic Mass Market</span>
            </div>
            <div className="flex items-center justify-between font-semibold text-stone-900 dark:text-stone-100 pt-1 border-t border-stone-200/40 dark:border-stone-800">
              <span className="text-[#C26D53]">After Purchases:</span>
              <span className="text-stone-900 dark:text-stone-100">Strictly &lt; ₹800 (Avg ₹674)</span>
            </div>
          </div>

          {/* Card 3 */}
          <div className="p-4 rounded-xl border border-stone-100 dark:border-stone-800 bg-stone-50/60 dark:bg-stone-950/40 space-y-2 text-xs">
            <span className="text-[10px] uppercase font-semibold text-stone-400 block">Sensory Profile</span>
            <div className="flex items-center justify-between text-stone-400 line-through">
              <span>Before:</span>
              <span>Standard Scent</span>
            </div>
            <div className="flex items-center justify-between font-semibold text-stone-900 dark:text-stone-100 pt-1 border-t border-stone-200/40 dark:border-stone-800">
              <span className="text-[#C26D53]">After Filter Logs:</span>
              <span className="text-stone-900 dark:text-stone-100">Zero Fragrance Preferred</span>
            </div>
          </div>
        </div>
      </section>

      {/* Stated vs Learned Preferences Dual View */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Stated Preferences */}
        <div className="lg:col-span-5 p-6 rounded-xl border border-stone-200/80 dark:border-stone-800/80 bg-white dark:bg-stone-900 space-y-4 shadow-2xs">
          <div className="flex items-center justify-between border-b border-stone-100 dark:border-stone-800 pb-3">
            <h3 className="text-sm font-semibold text-stone-900 dark:text-stone-100">
              Stated Baseline Preferences
            </h3>
            <Badge variant="neutral" size="sm">Self-Declared</Badge>
          </div>

          <div className="space-y-3 text-xs">
            <div className="flex justify-between py-1.5 border-b border-stone-50 dark:border-stone-800/50">
              <span className="text-stone-500">Skin Profile</span>
              <span className="font-semibold text-stone-900 dark:text-stone-100">{stated.skinType}</span>
            </div>
            <div className="flex justify-between py-1.5 border-b border-stone-50 dark:border-stone-800/50">
              <span className="text-stone-500">Primary Objective</span>
              <span className="font-semibold text-stone-900 dark:text-stone-100">{stated.primaryGoal}</span>
            </div>
            <div className="flex justify-between py-1.5 border-b border-stone-50 dark:border-stone-800/50">
              <span className="text-stone-500">Target Budget</span>
              <span className="font-semibold text-stone-900 dark:text-stone-100">{stated.budgetRange}</span>
            </div>
            <div className="flex justify-between py-1.5 border-b border-stone-50 dark:border-stone-800/50">
              <span className="text-stone-500">Fragrance</span>
              <span className="font-semibold text-stone-900 dark:text-stone-100">{stated.fragrance}</span>
            </div>
            <div className="flex justify-between py-1.5 border-b border-stone-50 dark:border-stone-800/50">
              <span className="text-stone-500">Routine Depth</span>
              <span className="font-semibold text-stone-900 dark:text-stone-100">{stated.routine}</span>
            </div>
            <div className="flex justify-between py-1.5">
              <span className="text-stone-500">Focus Categories</span>
              <span className="font-semibold text-stone-900 dark:text-stone-100">{stated.preferredCategories?.join(", ")}</span>
            </div>
          </div>
        </div>

        {/* Learned Preferences with Confidence Bars */}
        <div className="lg:col-span-7 p-6 rounded-xl border border-stone-200/80 dark:border-stone-800/80 bg-white dark:bg-stone-900 space-y-4 shadow-2xs">
          <div className="flex items-center justify-between border-b border-stone-100 dark:border-stone-800 pb-3">
            <h3 className="text-sm font-semibold text-stone-900 dark:text-stone-100">
              Learned Preferences & Statistical Confidence
            </h3>
            <Badge variant="accent" size="sm">Dynamic AI Engine</Badge>
          </div>

          <div className="space-y-4">
            {learned.map((pref) => (
              <div key={pref.id} className="space-y-1.5 p-3 rounded-lg bg-stone-50/70 dark:bg-stone-950/40 border border-stone-100 dark:border-stone-800/80">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-stone-900 dark:text-stone-100">
                    {pref.trait}
                  </span>
                  <div className="flex items-center gap-2">
                    <span className="text-stone-400 text-[11px]">{pref.level} confidence</span>
                    <span className="font-mono text-xs font-bold text-[#C26D53]">{pref.confidence}%</span>
                  </div>
                </div>

                <div className="h-1.5 w-full bg-stone-200 dark:bg-stone-800 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-[#C26D53] rounded-full transition-all duration-500"
                    style={{ width: `${pref.confidence}%` }}
                  />
                </div>

                <div className="flex items-center justify-between text-[11px] text-stone-500 dark:text-stone-400 pt-1">
                  <span>Sources: {pref.learnedFrom?.join(" • ")}</span>
                  <span>{pref.lastUpdated}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
