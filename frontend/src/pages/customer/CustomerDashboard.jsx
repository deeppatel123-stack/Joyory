import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Sparkles,
  GitBranch,
  ArrowRight,
  Compass,
  CheckCircle2,
  TrendingUp,
  MessageSquare
} from "lucide-react";
import { useCustomer } from "../../context/CustomerContext";
import { recommendationService } from "../../services/recommendationService";
import { ProductCard } from "../../components/customer/ProductCard";
import { Badge } from "../../components/common/Badge";
import { Button } from "../../components/common/Button";

export const CustomerDashboard = () => {
  const { profile } = useCustomer();
  const [topPicks, setTopPicks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const data = await recommendationService.getRecommendations();
        setTopPicks(data.topMatches?.slice(0, 3) || []);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [profile]);

  return (
    <div className="space-y-8">
      {/* Welcome Banner */}
      <div className="p-6 sm:p-8 rounded-2xl border border-stone-200/80 dark:border-stone-800/80 bg-white dark:bg-stone-900 shadow-2xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-1.5 text-xs text-stone-500 dark:text-stone-400 mb-1">
              <Sparkles className="w-3.5 h-3.5 text-[#C26D53]" />
              <span>Personalized Beauty Journey</span>
            </div>
            <h1 className="text-2xl font-bold tracking-tight text-stone-950 dark:text-stone-50">
              Welcome back, {profile?.name || "Aria"}
            </h1>
            <p className="text-xs sm:text-sm text-stone-500 dark:text-stone-400 mt-1">
              Your Beauty Preference Graph has analyzed 7 interactions to continuously personalize your catalog.
            </p>
          </div>

          <Link to="/customer/discover">
            <Button variant="primary" icon={Compass}>
              Start Smart Discovery
            </Button>
          </Link>
        </div>

        {/* Current Active Learned Trait Snapshot */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-4 border-t border-stone-100 dark:border-stone-800">
          <div className="p-3 rounded-lg bg-stone-50 dark:bg-stone-950/40 border border-stone-100 dark:border-stone-800">
            <span className="text-[10px] text-stone-400 uppercase tracking-wider font-medium block">
              Primary Learned Preference
            </span>
            <span className="text-xs font-semibold text-stone-900 dark:text-stone-100 block mt-0.5">
              Lightweight Gel Texture
            </span>
            <span className="text-[11px] text-[#C26D53] font-medium">94% Confidence</span>
          </div>

          <div className="p-3 rounded-lg bg-stone-50 dark:bg-stone-950/40 border border-stone-100 dark:border-stone-800">
            <span className="text-[10px] text-stone-400 uppercase tracking-wider font-medium block">
              Skin Barrier Objective
            </span>
            <span className="text-xs font-semibold text-stone-900 dark:text-stone-100 block mt-0.5">
              Hydration without shine
            </span>
            <span className="text-[11px] text-emerald-600 dark:text-emerald-400 font-medium">Oily / Combo Aligned</span>
          </div>

          <div className="p-3 rounded-lg bg-stone-50 dark:bg-stone-950/40 border border-stone-100 dark:border-stone-800">
            <span className="text-[10px] text-stone-400 uppercase tracking-wider font-medium block">
              Active Budget Ceiling
            </span>
            <span className="text-xs font-semibold text-stone-900 dark:text-stone-100 block mt-0.5">
              Under ₹800
            </span>
            <span className="text-[11px] text-stone-500">Average Cart: ₹674</span>
          </div>
        </div>
      </div>

      {/* Quick Access to Graph & Journey */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div className="p-6 rounded-xl border border-stone-200/80 dark:border-stone-800/80 bg-white dark:bg-stone-900 space-y-3 flex flex-col justify-between">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold uppercase tracking-wider text-stone-400">
                Visual Graph
              </span>
              <Badge variant="accent" size="sm">6 Signals Active</Badge>
            </div>
            <h3 className="text-base font-semibold text-stone-900 dark:text-stone-100">
              Inspect Your Beauty Preference Graph
            </h3>
            <p className="text-xs text-stone-500 dark:text-stone-400 leading-relaxed">
              Explore how your stated profile and continuous interaction signals create your personalized node network.
            </p>
          </div>
          <Link to="/customer/profile" className="pt-2">
            <Button size="sm" variant="secondary" className="w-full" icon={GitBranch}>
              View Graph & Learned Weights
            </Button>
          </Link>
        </div>

        <div className="p-6 rounded-xl border border-stone-200/80 dark:border-stone-800/80 bg-white dark:bg-stone-900 space-y-3 flex flex-col justify-between">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold uppercase tracking-wider text-stone-400">
                Continuous Story
              </span>
              <Badge variant="neutral" size="sm">7 Timeline Steps</Badge>
            </div>
            <h3 className="text-base font-semibold text-stone-900 dark:text-stone-100">
              Your Beauty Journey Timeline
            </h3>
            <p className="text-xs text-stone-500 dark:text-stone-400 leading-relaxed">
              Track how your recent review "Feels slightly heavy" immediately updated recommendations.
            </p>
          </div>
          <Link to="/customer/journey" className="pt-2">
            <Button size="sm" variant="secondary" className="w-full" icon={ArrowRight}>
              View Journey Events
            </Button>
          </Link>
        </div>
      </div>

      {/* Top Recommendations */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-stone-900 dark:text-stone-100">
              Top Matches for Your Skin Profile
            </h3>
            <p className="text-xs text-stone-500 dark:text-stone-400">
              Ranked with 90%+ match confidence based on your learned lightweight preference
            </p>
          </div>
          <Link to="/customer/recommendations" className="text-xs text-[#C26D53] hover:underline font-medium">
            View All Categories &rarr;
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          {topPicks.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </div>
    </div>
  );
};
