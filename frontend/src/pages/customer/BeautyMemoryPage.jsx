import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Brain,
  Layers,
  Sparkle,
  Wallet,
  Feather,
  Droplets,
  ArrowRight
} from "lucide-react";
import { Button } from "../../components/common/Button";
import { customerService } from "../../services/customerService";

export const BeautyMemoryPage = () => {
  const [profile, setProfile] = useState(null);

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
  }, []);

  const texturePref = profile?.learnedPreferences?.find(p => p.category === "Texture");
  const textureValue = texturePref?.trait || "Lightweight";
  const textureDesc = texturePref?.evolution || "Water-burst and gel textures that absorb quickly without greasy residue.";

  const preferences = [
    {
      label: "Preferred Texture",
      value: textureValue,
      desc: textureDesc,
      icon: Layers
    },
    {
      label: "Skin Type",
      value: profile?.statedPreferences?.skinType || "Oily",
      desc: "Prone to midday T-zone shine; thrives with oil-free hydration.",
      icon: Droplets
    },
    {
      label: "Budget",
      value: profile?.statedPreferences?.budgetRange || "₹500–₹1,000",
      desc: "Accessible, high-efficacy daily skincare essentials.",
      icon: Wallet
    },
    {
      label: "Preferred Finish",
      value: "Natural",
      desc: "Soft natural look with minimal gloss or artificial shine.",
      icon: Sparkle
    },
    {
      label: "Fragrance",
      value: profile?.statedPreferences?.fragrance || "Low",
      desc: "Unscented or subtle botanical scents to prevent skin reactivity.",
      icon: Feather
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
          Your preferences, learned from your shopping experience.
        </p>
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
              <div className="text-xl font-semibold text-stone-900 dark:text-stone-100">
                {item.value}
              </div>
              <p className="text-xs text-stone-500 dark:text-stone-400 leading-relaxed">
                {item.desc}
              </p>
            </div>
          );
        })}
      </div>

      {/* Simple Link to Journey */}
      <div className="p-6 rounded-2xl border border-stone-200/60 dark:border-stone-800/60 bg-stone-100/60 dark:bg-stone-900/40 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="space-y-1 text-center sm:text-left">
          <h3 className="text-sm font-semibold text-stone-900 dark:text-stone-100">
            See how your preferences were formed
          </h3>
          <p className="text-xs text-stone-500 dark:text-stone-400">
            View the steps in your shopping timeline and share feedback.
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
