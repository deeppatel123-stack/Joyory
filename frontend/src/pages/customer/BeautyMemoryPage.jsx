import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Brain,
  Layers,
  Sparkle,
  Wallet,
  Feather,
  Droplets,
  ArrowRight,
  Sparkles,
  CheckCircle2,
  FileText,
  Search,
  Scale,
  ShoppingBag,
  MessageSquare
} from "lucide-react";
import { Button } from "../../components/common/Button";
import { customerService } from "../../services/customerService";
import { useCustomer } from "../../context/CustomerContext";

export const BeautyMemoryPage = () => {
  const { profile: contextProfile, orders } = useCustomer();
  const [profile, setProfile] = useState(contextProfile);

  useEffect(() => {
    async function load() {
      try {
        const p = await customerService.getProfile();
        setProfile(p);
      } catch (err) {
        console.error("Failed to load profile for Beauty Memory:", err);
      }
    }
    load();
  }, [contextProfile]);

  const texturePref = profile?.learnedPreferences?.find(p => p.category === "Texture");
  const textureValue = texturePref?.trait || "Lightweight";
  const textureDesc = texturePref?.evolution || "Water-burst and gel textures that absorb quickly without greasy residue.";

  const hasRecentFeedback = orders.some(o => o.hasFeedback || o.status === "Delivered");

  const preferences = [
    {
      label: "Preferred Texture",
      value: textureValue,
      desc: textureDesc,
      icon: Layers
    },
    {
      label: "Skin Type",
      value: profile?.statedPreferences?.skinType || "Oily / Combination",
      desc: "Prone to midday T-zone shine; thrives with oil-free hydration.",
      icon: Droplets
    },
    {
      label: "Budget",
      value: profile?.statedPreferences?.budgetRange || "₹500–₹800",
      desc: "Accessible, high-efficacy daily beauty essentials.",
      icon: Wallet
    },
    {
      label: "Preferred Finish",
      value: "Natural",
      desc: "Soft natural look with minimal gloss or artificial shine.",
      icon: Sparkle
    },
    {
      label: "Fragrance Preference",
      value: profile?.statedPreferences?.fragrance || "Low fragrance",
      desc: "Unscented or subtle botanical notes to prevent skin reactivity.",
      icon: Feather
    }
  ];

  const formationSources = [
    {
      source: "Profile",
      icon: FileText,
      detail: "Initial preferences set during registration and account settings"
    },
    {
      source: "Searches",
      icon: Search,
      detail: "Queries for lightweight water-burst gels and oil-control essentials"
    },
    {
      source: "Comparisons",
      icon: Scale,
      detail: "Side-by-side formulation, texture, and price point inspections"
    },
    {
      source: "Purchases",
      icon: ShoppingBag,
      detail: `${orders.length} order(s) placed and verified in database`
    },
    {
      source: "Experience Feedback",
      icon: MessageSquare,
      detail: hasRecentFeedback
        ? "Verified post-purchase feedback reinforcing lightweight gel affinity"
        : "Pending product usage feedback to further calibrate memory"
    }
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-8 py-4">
      {/* Header */}
      <div className="border-b border-stone-200/80 dark:border-stone-800/80 pb-5 space-y-1">
        <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#C26D53]">
          <Brain className="w-4 h-4" />
          <span>Beauty Memory</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight text-stone-950 dark:text-stone-50">
          Beauty Memory
        </h1>
        <p className="text-xs sm:text-sm text-stone-500 dark:text-stone-400">
          What Joyory has learned about your skin, preferred textures, and shopping preferences.
        </p>
      </div>

      {/* Recent Learning Callout */}
      <div className="p-5 rounded-2xl border border-[#C26D53]/20 bg-[#C26D53]/5 dark:bg-[#C26D53]/10 flex items-start gap-3.5">
        <div className="w-8 h-8 rounded-xl bg-[#C26D53]/15 text-[#C26D53] flex items-center justify-center shrink-0 mt-0.5">
          <Sparkles className="w-4 h-4" />
        </div>
        <div className="space-y-1">
          <h3 className="text-xs font-semibold text-stone-900 dark:text-stone-100 uppercase tracking-wider">
            Recent Learning
          </h3>
          <p className="text-sm font-medium text-stone-800 dark:text-stone-200 leading-relaxed">
            "Your preference for lightweight products became stronger after your recent feedback."
          </p>
        </div>
      </div>

      {/* Preference Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {preferences.map((item, idx) => {
          const Icon = item.icon;
          return (
            <div
              key={idx}
              className="p-5 rounded-2xl border border-stone-200/80 dark:border-stone-800/80 bg-white dark:bg-stone-900 shadow-2xs space-y-2"
            >
              <div className="flex items-center justify-between text-xs text-stone-400">
                <span>{item.label}</span>
                <Icon className="w-4 h-4 text-[#C26D53]" />
              </div>
              <div className="text-lg font-semibold text-stone-900 dark:text-stone-100">
                {item.value}
              </div>
              <p className="text-xs text-stone-500 dark:text-stone-400 leading-relaxed">
                {item.desc}
              </p>
            </div>
          );
        })}
      </div>

      {/* How your preferences were formed */}
      <div className="p-6 sm:p-8 rounded-2xl border border-stone-200/80 dark:border-stone-800/80 bg-white dark:bg-stone-900 shadow-2xs space-y-4">
        <div>
          <h2 className="text-base font-semibold text-stone-900 dark:text-stone-100">
            How your preferences were formed
          </h2>
          <p className="text-xs text-stone-500 dark:text-stone-400">
            Joyory builds your profile continuously through your real shopping actions.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {formationSources.map((s, idx) => {
            const Icon = s.icon;
            return (
              <div
                key={idx}
                className="p-4 rounded-xl border border-stone-100 dark:border-stone-800 bg-stone-50/60 dark:bg-stone-800/40 space-y-1.5"
              >
                <div className="flex items-center gap-2 text-xs font-semibold text-stone-900 dark:text-stone-100">
                  <Icon className="w-3.5 h-3.5 text-[#C26D53]" />
                  <span>{s.source}</span>
                </div>
                <p className="text-[12px] text-stone-500 dark:text-stone-400 leading-normal">
                  {s.detail}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Link to Journey */}
      <div className="p-6 rounded-2xl border border-stone-200/60 dark:border-stone-800/60 bg-stone-100/60 dark:bg-stone-900/40 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="space-y-1 text-center sm:text-left">
          <h3 className="text-sm font-semibold text-stone-900 dark:text-stone-100">
            Explore your complete timeline
          </h3>
          <p className="text-xs text-stone-500 dark:text-stone-400">
            View every search, comparison, purchase, and outcome step in your beauty journey.
          </p>
        </div>
        <Link to="/customer/journey">
          <Button variant="primary" size="sm" icon={ArrowRight}>
            View My Journey
          </Button>
        </Link>
      </div>
    </div>
  );
};
