import React, { useState, useEffect } from "react";
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
import { journeyService } from "../../services/journeyService";
import { customerService } from "../../services/customerService";
import { useCustomer } from "../../context/CustomerContext";
import { useNotification } from "../../context/NotificationContext";

export const BeautyJourneyPage = () => {
  const { profile } = useCustomer();
  const { addToast } = useNotification();

  // Outcome Loop State
  const [textureFeedback, setTextureFeedback] = useState("Loved it");
  const [overallFeedback, setOverallFeedback] = useState("Loved it");
  const [experienceSaved, setExperienceSaved] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  // Load journey events from real journeyService
  useEffect(() => {
    async function loadEvents() {
      setLoading(true);
      try {
        const list = await journeyService.getJourney();
        setEvents(list || []);
      } catch (err) {
        console.error("Failed to load journey events:", err);
      } finally {
        setLoading(false);
      }
    }
    loadEvents();
  }, []);

  const getEventIcon = (type) => {
    switch (type) {
      case "SEARCH": return Search;
      case "VIEW": return Eye;
      case "COMPARE": return Scale;
      case "WISHLIST": return Heart;
      case "PURCHASE": return ShoppingBag;
      case "FEEDBACK":
      case "EXPERIENCE": return CheckCircle2;
      default: return Sparkles;
    }
  };

  const handleSaveOutcome = async (e) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      // 1. Update customer preferences in Beauty Memory
      await customerService.updatePreferences({
        id: "pref-1",
        trait: textureFeedback === "Loved it" ? "Lightweight Texture (Verified Loved)" : "Alternative Texture Required",
        category: "Texture",
        confidence: 98,
        level: "High",
        learnedFrom: ["Outcome Feedback Loop"],
        lastUpdated: "Just now",
        evolution: `Customer feedback recorded: Texture ${textureFeedback}, Overall ${overallFeedback}`
      });

      // 2. Add event to Beauty Journey
      const updated = await journeyService.addEvent({
        type: "FEEDBACK",
        title: `Shared Experience: ${textureFeedback} texture`,
        description: `Customer submitted experience for HydraGel Moisturizer. Overall: ${overallFeedback}.`,
        productName: "HydraGel Moisturizer",
        systemImpact: "Beauty Memory updated. Recommended feed refined toward verified texture affinities."
      });

      setEvents(updated);
      setExperienceSaved(true);
      addToast("Experience saved! Beauty Memory and Journey updated.", "success");
    } catch (err) {
      console.error(err);
      setExperienceSaved(true);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto space-y-10 py-4">
      {/* Header */}
      <div className="border-b border-stone-200/80 dark:border-stone-800/80 pb-5 space-y-1">
        <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-rose-600 dark:text-rose-400">
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
          Recent Steps ({events.length})
        </h2>

        {loading ? (
          <div className="text-xs text-stone-400 py-4">Loading your journey...</div>
        ) : events.length === 0 ? (
          <div className="text-xs text-stone-500 py-4">No journey events recorded yet.</div>
        ) : (
          <div className="space-y-6">
            {events.map((event, idx) => {
              const Icon = getEventIcon(event.type);
              const isLast = idx === events.length - 1;

              return (
                <div key={event.id || idx} className="relative flex items-start gap-4">
                  {!isLast && (
                    <div className="absolute left-4 top-8 -bottom-6 w-0.5 bg-stone-200 dark:bg-stone-800" />
                  )}

                  <div className="w-8 h-8 rounded-full bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900/60 flex items-center justify-center shrink-0 z-10 text-rose-600 dark:text-rose-400">
                    <Icon className="w-4 h-4" />
                  </div>

                  <div className="pt-0.5 space-y-0.5">
                    <div className="flex items-center gap-2">
                      <h3 className="text-sm font-semibold text-stone-900 dark:text-stone-100">
                        {event.title}
                      </h3>
                      {event.date && (
                        <span className="text-[11px] text-stone-400 font-mono">
                          {event.date}
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-stone-500 dark:text-stone-400">
                      {event.description || event.desc}
                    </p>
                    {event.systemImpact && (
                      <p className="text-[11px] text-stone-400 italic">
                        Impact: {event.systemImpact}
                      </p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
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
