import React, { useState, useEffect } from "react";
import { JourneyTimeline } from "../../components/customer/JourneyTimeline";
import { journeyService } from "../../services/journeyService";
import { useCustomer } from "../../context/CustomerContext";
import { GitBranch, RotateCcw, Sparkles } from "lucide-react";
import { Button } from "../../components/common/Button";

export const BeautyJourneyPage = () => {
  const { profile } = useCustomer();
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      setLoading(true);
      try {
        const data = await journeyService.getJourney();
        setEvents(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [profile]);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="border-b border-stone-200/80 dark:border-stone-800/80 pb-6">
        <span className="text-xs font-semibold uppercase tracking-wider text-[#C26D53]">
          Continuous Learning Progression
        </span>
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-stone-950 dark:text-stone-50 mt-1">
          Your Beauty Journey
        </h1>
        <p className="text-xs sm:text-sm text-stone-500 dark:text-stone-400 mt-1">
          Every search, side-by-side comparison, delivery, and post-purchase feedback signal tracked chronologically.
        </p>
      </div>

      {/* Journey Timeline */}
      <JourneyTimeline events={events} />
    </div>
  );
};
