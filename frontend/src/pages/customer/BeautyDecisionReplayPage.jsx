import React, { useState, useEffect } from "react";
import { outcomeService } from "../../services/outcomeService";
import {
  Search,
  Eye,
  Scale,
  Heart,
  ShoppingBag,
  MessageSquare,
  Sparkles,
  Check,
  ArrowRight,
  Clock,
  ShieldCheck,
  Brain
} from "lucide-react";
import { Badge } from "../../components/common/Badge";
import { Button } from "../../components/common/Button";

export const BeautyDecisionReplayPage = () => {
  const [replays, setReplays] = useState([]);
  const [selectedId, setSelectedId] = useState("replay-1");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      setLoading(true);
      try {
        const data = await outcomeService.getDecisionReplays();
        setReplays(data);
        if (data.length > 0) setSelectedId(data[0].id);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  const activeReplay = replays.find(r => r.id === selectedId) || replays[0];

  const getStepIcon = (type) => {
    switch (type) {
      case "SEARCH": return <Search className="w-4 h-4 text-stone-600 dark:text-stone-300" />;
      case "VIEW": return <Eye className="w-4 h-4 text-stone-600 dark:text-stone-300" />;
      case "COMPARE": return <Scale className="w-4 h-4 text-stone-600 dark:text-stone-300" />;
      case "WISHLIST": return <Heart className="w-4 h-4 text-[#C26D53]" />;
      case "PURCHASE": return <ShoppingBag className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />;
      case "EXPERIENCE": return <MessageSquare className="w-4 h-4 text-amber-500" />;
      case "MEMORY": return <Brain className="w-4 h-4 text-[#C26D53]" />;
      default: return <Sparkles className="w-4 h-4 text-stone-400" />;
    }
  };

  if (loading || !activeReplay) {
    return <div className="p-8 text-center text-xs text-stone-400">Reconstructing decision trajectory...</div>;
  }

  return (
    <div className="space-y-8">
      {/* 6. HEADER */}
      <div className="border-b border-stone-200/80 dark:border-stone-800/80 pb-6">
        <div className="flex flex-wrap items-center gap-2 mb-1.5">
          <span className="text-xs font-semibold uppercase tracking-wider text-[#C26D53]">
            Explainable Purchase Trajectory
          </span>
          <Badge variant="accent" size="sm">
            Beauty Decision Replay
          </Badge>
          <span className="text-[11px] text-stone-400 italic">
            * This capability is not publicly listed/documented among Joyory's current visible product features.
          </span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-stone-950 dark:text-stone-50">
          Why did I choose this product?
        </h1>
        <p className="text-xs sm:text-sm text-stone-500 dark:text-stone-400 mt-1 max-w-2xl leading-relaxed">
          Instead of an opaque recommendation, Joyory reconstructs the exact inquiry sequence, comparison trade-offs, and Beauty Memory factors that led to your selection.
        </p>
      </div>

      {/* Replay Product Selector */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1">
        <span className="text-xs text-stone-400 shrink-0 mr-1">Replay Decision For:</span>
        {replays.map((rep) => (
          <button
            key={rep.id}
            onClick={() => setSelectedId(rep.id)}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-medium transition-colors shrink-0 cursor-pointer ${
              selectedId === rep.id
                ? "bg-stone-900 dark:bg-stone-100 text-white dark:text-stone-900 shadow-2xs font-semibold"
                : "bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-400 hover:bg-stone-200 dark:hover:bg-stone-700"
            }`}
          >
            {rep.productName} ({rep.orderId})
          </button>
        ))}
      </div>

      {/* Two Column Section: Left Replay Timeline, Right Explainable Matching Factors */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left: Decision Vertical Timeline */}
        <div className="lg:col-span-7 rounded-2xl border border-stone-200/80 dark:border-stone-800/80 bg-white dark:bg-stone-900 p-6 sm:p-8 shadow-2xs space-y-6">
          <div className="flex items-center justify-between border-b border-stone-100 dark:border-stone-800 pb-3">
            <div>
              <h3 className="text-base font-semibold text-stone-900 dark:text-stone-100">
                Reconstructed Decision Trajectory
              </h3>
              <p className="text-xs text-stone-400">
                Chronological actions leading to selection of {activeReplay.productName}
              </p>
            </div>
            <Badge variant="neutral" size="sm" className="font-mono">
              {activeReplay.orderDate}
            </Badge>
          </div>

          <div className="relative pl-6 space-y-7 before:absolute before:left-2 before:top-2 before:bottom-2 before:w-0.5 before:bg-stone-200 dark:before:bg-stone-800">
            {activeReplay.steps.map((step, idx) => (
              <div key={idx} className="relative group text-xs space-y-1.5">
                {/* Timeline node icon */}
                <div className="absolute -left-6 top-1 w-4 h-4 rounded-full bg-white dark:bg-stone-900 border-2 border-stone-400 dark:border-stone-600 flex items-center justify-center">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#C26D53]" />
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-stone-900 dark:text-stone-100">
                      {step.action}
                    </span>
                    <Badge variant="neutral" size="sm">{step.type}</Badge>
                  </div>
                  <span className="text-[11px] font-mono text-stone-400">{step.time}</span>
                </div>

                <p className="text-stone-600 dark:text-stone-300 leading-relaxed text-xs">
                  {step.detail}
                </p>

                {step.meta && (
                  <div className="p-2 rounded bg-stone-50 dark:bg-stone-950/40 border border-stone-100 dark:border-stone-800/80 text-[11px] text-stone-500 italic">
                    {step.meta}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Right: "Why This Product?" Explainable Factors */}
        <div className="lg:col-span-5 space-y-6">
          <div className="rounded-2xl border border-stone-200/80 dark:border-stone-800/80 bg-white dark:bg-stone-900 p-6 sm:p-7 shadow-2xs space-y-5">
            <div>
              <span className="text-[10px] uppercase tracking-wider text-stone-400 font-semibold block">
                Explainable Decision Drivers
              </span>
              <h3 className="text-lg font-bold text-stone-900 dark:text-stone-100 mt-0.5">
                Why this product matched you
              </h3>
              <p className="text-xs text-stone-500 mt-1">
                Not a generic black-box score. Based transparently on your Beauty Memory and shopping journey.
              </p>
            </div>

            {/* Match Score Display */}
            <div className="p-4 rounded-xl bg-stone-50 dark:bg-stone-950/40 border border-stone-100 dark:border-stone-800 flex items-baseline justify-between">
              <div>
                <span className="text-2xl font-extrabold text-stone-900 dark:text-stone-100">
                  {activeReplay.overallMatchScore}%
                </span>
                <span className="text-xs text-stone-500 ml-1">Preference Alignment</span>
              </div>
              <Badge variant="accent" size="sm">High Affinity</Badge>
            </div>

            {/* Factor list */}
            <div className="space-y-3">
              {activeReplay.matchFactors.map((factor, i) => (
                <div
                  key={i}
                  className="p-3 rounded-lg border border-stone-100 dark:border-stone-800 bg-white dark:bg-stone-900 text-xs flex items-start gap-2.5"
                >
                  <div className="w-4 h-4 rounded-full bg-emerald-50 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0 mt-0.5">
                    <Check className="w-3 h-3 stroke-[2.5]" />
                  </div>
                  <div className="space-y-0.5">
                    <strong className="text-stone-900 dark:text-stone-100 block">
                      {factor.title}
                    </strong>
                    <p className="text-stone-500 text-[11px] leading-relaxed">
                      {factor.detail}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-2 border-t border-stone-100 dark:border-stone-800 text-[11px] text-stone-400 italic">
              "Every decision replay helps Joyory prevent repeated mistakes and recommend with greater confidence."
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
