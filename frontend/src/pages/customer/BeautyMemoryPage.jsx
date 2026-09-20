import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { outcomeService } from "../../services/outcomeService";
import { useCustomer } from "../../context/CustomerContext";
import {
  Brain,
  History,
  GitBranch,
  ThumbsUp,
  ThumbsDown,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Calendar,
  CheckCircle2
} from "lucide-react";
import { Badge } from "../../components/common/Badge";
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

  if (loading || !memory) {
    return (
      <div className="p-8 text-center text-xs text-stone-400">
        Loading Personal Beauty Passport...
      </div>
    );
  }

  return (
    <div className="space-y-10">
      {/* 5. PASSPORT HEADER */}
      <div className="p-6 sm:p-8 rounded-2xl border border-stone-200/80 dark:border-stone-800/80 bg-white dark:bg-stone-900 shadow-2xs space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 border-b border-stone-100 dark:border-stone-800 pb-5">
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-1.5">
              <span className="text-xs font-semibold uppercase tracking-wider text-[#C26D53]">
                Continuous Skin Identity & Memory
              </span>
              <Badge variant="accent" size="sm">
                Personal Beauty Passport
              </Badge>
              <span className="text-[11px] text-stone-400 italic">
                * This capability is not publicly listed/documented among Joyory's current visible product features.
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-stone-950 dark:text-stone-50">
              Your Beauty Memory
            </h1>
            <p className="text-xs sm:text-sm text-stone-500 dark:text-stone-400 mt-1 max-w-2xl leading-relaxed">
              A longitudinal customer profile that remembers how your formulation preferences, climate sensitivities, and sensory tolerances evolve over time.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-stone-50 dark:bg-stone-950/40 border border-stone-100 dark:border-stone-800 text-left sm:text-right shrink-0 text-xs">
            <span className="text-[10px] uppercase tracking-wider text-stone-400 font-mono block">
              Passport #{memory.passportId}
            </span>
            <span className="font-bold text-stone-900 dark:text-stone-100 block mt-0.5">
              {memory.holderName}
            </span>
            <span className="text-stone-500 text-[11px]">
              Active since {memory.memberSince} • {memory.totalInteractionsAnalyzed} signals analyzed
            </span>
          </div>
        </div>

        {/* 5. CURRENT PREFERENCE METERS */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-semibold text-stone-900 dark:text-stone-100">
              Current Preference Calibrations
            </h3>
            <span className="text-xs text-stone-400">Confidence Calibration</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {memory.currentPreferences?.map((pref, i) => (
              <div
                key={i}
                className="p-4 rounded-xl border border-stone-100 dark:border-stone-800 bg-stone-50/50 dark:bg-stone-950/30 space-y-2 text-xs"
              >
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-stone-900 dark:text-stone-100">
                    {pref.trait}
                  </span>
                  <span className="font-mono font-bold text-[#C26D53]">
                    {pref.score}%
                  </span>
                </div>

                <div className="h-1.5 w-full bg-stone-200 dark:bg-stone-800 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-[#C26D53] rounded-full transition-all duration-500"
                    style={{ width: `${pref.score}%` }}
                  />
                </div>

                <span className="text-[10px] text-stone-400 block truncate">
                  {pref.target}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 5. PREFERENCE EVOLUTION: 3 MONTHS AGO VS NOW */}
      <div className="p-6 sm:p-8 rounded-2xl border border-stone-200/80 dark:border-stone-800/80 bg-white dark:bg-stone-900 shadow-2xs space-y-5">
        <div className="flex items-center justify-between border-b border-stone-100 dark:border-stone-800 pb-3">
          <div>
            <h3 className="text-base font-semibold text-stone-900 dark:text-stone-100">
              Preference Evolution ({memory.preferenceEvolution.periodFrom} &rarr; {memory.preferenceEvolution.periodTo})
            </h3>
            <p className="text-xs text-stone-500 dark:text-stone-400">
              How repeated purchases and post-delivery outcome logs shifted your personal baseline
            </p>
          </div>
          <Badge variant="accent" size="sm">Longitudinal Shifts</Badge>
        </div>

        <div className="space-y-4">
          {memory.preferenceEvolution.shifts.map((shift, idx) => (
            <div
              key={idx}
              className="p-4 rounded-xl border border-stone-100 dark:border-stone-800 bg-stone-50/60 dark:bg-stone-950/40 text-xs space-y-3"
            >
              <div className="flex items-center justify-between">
                <span className="font-bold text-stone-900 dark:text-stone-100">
                  {shift.attribute}
                </span>
                <span className="text-[10px] text-stone-400 italic">
                  Trigger: {shift.trigger}
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 items-center">
                {/* Past State */}
                <div className="p-3 rounded-lg bg-white dark:bg-stone-900 border border-stone-200/70 dark:border-stone-800 text-stone-500 space-y-0.5">
                  <span className="text-[10px] uppercase font-semibold text-stone-400 block">
                    3 Months Ago
                  </span>
                  <span className="font-medium text-stone-700 dark:text-stone-300 block line-through">
                    {shift.pastState}
                  </span>
                  <span className="text-[11px] text-stone-400">{shift.pastContext}</span>
                </div>

                {/* Current State */}
                <div className="p-3 rounded-lg bg-white dark:bg-stone-900 border border-[#C26D53]/40 text-stone-800 dark:text-stone-200 space-y-0.5">
                  <span className="text-[10px] uppercase font-semibold text-[#C26D53] block">
                    Now (Learned)
                  </span>
                  <span className="font-bold text-stone-950 dark:text-stone-50 block text-[#C26D53]">
                    {shift.currentState}
                  </span>
                  <span className="text-[11px] text-stone-500 dark:text-stone-400">{shift.currentContext}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* WHAT WORKED VS WHAT DIDN'T WORK */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Liked Attributes */}
        <div className="p-6 rounded-xl border border-stone-200/80 dark:border-stone-800/80 bg-white dark:bg-stone-900 shadow-2xs space-y-4">
          <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400">
            <ThumbsUp className="w-4 h-4" />
            <h3 className="text-sm font-semibold text-stone-900 dark:text-stone-100">
              Formulation Elements That Worked
            </h3>
          </div>

          <div className="space-y-2.5 text-xs">
            {memory.likedAttributes.map((item, i) => (
              <div key={i} className="p-3 rounded-lg bg-emerald-50/40 dark:bg-emerald-950/20 border border-emerald-100 dark:border-emerald-900/40 space-y-0.5">
                <span className="font-semibold text-stone-900 dark:text-stone-100 block">
                  {item.name}
                </span>
                <div className="flex items-center justify-between text-[11px] text-stone-500 dark:text-stone-400">
                  <span>Learned via {item.source}</span>
                  <span>{item.date}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Disliked Attributes */}
        <div className="p-6 rounded-xl border border-stone-200/80 dark:border-stone-800/80 bg-white dark:bg-stone-900 shadow-2xs space-y-4">
          <div className="flex items-center gap-2 text-rose-600 dark:text-rose-400">
            <ThumbsDown className="w-4 h-4" />
            <h3 className="text-sm font-semibold text-stone-900 dark:text-stone-100">
              Sensory Frictions to Avoid
            </h3>
          </div>

          <div className="space-y-2.5 text-xs">
            {memory.dislikedAttributes.map((item, i) => (
              <div key={i} className="p-3 rounded-lg bg-rose-50/40 dark:bg-rose-950/20 border border-rose-100 dark:border-rose-900/40 space-y-0.5">
                <span className="font-semibold text-stone-900 dark:text-stone-100 block">
                  {item.name}
                </span>
                <div className="flex items-center justify-between text-[11px] text-stone-500 dark:text-stone-400">
                  <span>{item.reason}</span>
                  <span>{item.date}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 5. MEMORY TIMELINE */}
      <div className="p-6 sm:p-8 rounded-2xl border border-stone-200/80 dark:border-stone-800/80 bg-white dark:bg-stone-900 shadow-2xs space-y-5">
        <div className="flex items-center justify-between border-b border-stone-100 dark:border-stone-800 pb-3">
          <h3 className="text-base font-semibold text-stone-900 dark:text-stone-100">
            Longitudinal Memory Timeline
          </h3>
          <span className="text-xs text-stone-400">Chronological Milestones</span>
        </div>

        <div className="relative pl-6 space-y-6 before:absolute before:left-2 before:top-2 before:bottom-2 before:w-0.5 before:bg-stone-200 dark:before:bg-stone-800">
          {memory.memoryTimeline.map((item) => (
            <div key={item.id} className="relative group text-xs space-y-1">
              <div className="absolute -left-6 top-1 w-4 h-4 rounded-full bg-white dark:bg-stone-900 border-2 border-[#C26D53]" />
              <div className="flex items-center gap-2">
                <span className="font-semibold text-stone-900 dark:text-stone-100">
                  {item.headline}
                </span>
                <Badge variant="neutral" size="sm">{item.category}</Badge>
                <span className="text-stone-400 text-[11px] ml-auto">{item.date}</span>
              </div>
              <p className="text-stone-600 dark:text-stone-400 text-[11px]">
                {item.detail}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Connection to Beauty Preference Graph */}
      <div className="p-5 rounded-xl border border-stone-200 dark:border-stone-800 bg-stone-100/60 dark:bg-stone-950/40 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <h4 className="text-xs font-semibold text-stone-900 dark:text-stone-100">
            Connected to Beauty Preference Graph
          </h4>
          <p className="text-xs text-stone-500">
            Your Beauty Memory directly feeds the real-time node weights of your dynamic preference model.
          </p>
        </div>
        <Link to="/customer/profile">
          <Button size="sm" variant="secondary" icon={GitBranch}>
            Inspect Live Node Graph
          </Button>
        </Link>
      </div>
    </div>
  );
};
