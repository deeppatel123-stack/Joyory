import React, { useState } from "react";
import { Link } from "react-router-dom";
import { CheckCircle2, RotateCw, ArrowRight, Sparkles } from "lucide-react";
import { Button } from "../../components/common/Button";
import { useNotification } from "../../context/NotificationContext";

export const BeautyOutcomePage = () => {
  const { addToast } = useNotification();

  const [selectedProduct, setSelectedProduct] = useState("HydraGel Ultra-Light Moisturizer");
  const [textureRating, setTextureRating] = useState("Loved it");
  const [absorptionRating, setAbsorptionRating] = useState("Loved it");
  const [overallRating, setOverallRating] = useState("Loved it");
  const [isSaved, setIsSaved] = useState(false);

  const handleSaveExperience = (e) => {
    e.preventDefault();
    setIsSaved(true);
    addToast("Your Beauty Memory has been updated.", "success");
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6 py-6">
      {/* Header */}
      <div className="border-b border-stone-200/80 dark:border-stone-800/80 pb-4 space-y-1">
        <div className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-[#C26D53]">
          <RotateCw className="w-3.5 h-3.5" />
          <span>Beauty Outcome</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight text-stone-950 dark:text-stone-50">
          How did your product work for you?
        </h1>
        <p className="text-xs text-stone-500 dark:text-stone-400">
          Real product experiences help refine future recommendations.
        </p>
      </div>

      {/* Success Banner */}
      {isSaved && (
        <div className="p-4 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-xs text-emerald-800 dark:text-emerald-200 flex items-center justify-between gap-3 animate-in fade-in duration-200">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span className="font-medium">Your Beauty Memory has been updated.</span>
          </div>
          <Link
            to="/customer/beauty-memory"
            className="text-[#C26D53] hover:underline font-semibold text-xs shrink-0 flex items-center gap-1"
          >
            View Beauty Memory <ArrowRight className="w-3 h-3" />
          </Link>
        </div>
      )}

      {/* Experience Form Card */}
      <div className="p-6 sm:p-8 rounded-2xl border border-stone-200/80 dark:border-stone-800/80 bg-white dark:bg-stone-900 shadow-2xs space-y-6">
        {/* Product selector/display */}
        <div className="space-y-1">
          <label className="text-xs font-semibold text-stone-500 uppercase tracking-wider">
            Product
          </label>
          <div className="p-3.5 rounded-xl bg-stone-50 dark:bg-stone-800/60 border border-stone-200/70 dark:border-stone-700/70 flex items-center justify-between text-xs font-medium text-stone-900 dark:text-stone-100">
            <span>{selectedProduct}</span>
            <span className="text-[11px] text-[#C26D53]">Delivered & Active</span>
          </div>
        </div>

        {/* Experience Radios */}
        <form onSubmit={handleSaveExperience} className="space-y-6">
          {/* 1. Texture */}
          <div className="space-y-2">
            <label className="block text-xs font-semibold text-stone-700 dark:text-stone-300">
              Texture
            </label>
            <div className="grid grid-cols-3 gap-3">
              {["Poor", "Okay", "Loved it"].map((option) => (
                <label
                  key={option}
                  className={`flex items-center justify-center gap-2 p-3 rounded-xl border text-xs font-medium cursor-pointer transition-colors ${
                    textureRating === option
                      ? "border-[#C26D53] bg-[#C26D53]/10 text-[#C26D53]"
                      : "border-stone-200 dark:border-stone-700 bg-stone-50/50 dark:bg-stone-800/40 text-stone-700 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800"
                  }`}
                >
                  <input
                    type="radio"
                    name="texture"
                    value={option}
                    checked={textureRating === option}
                    onChange={(e) => setTextureRating(e.target.value)}
                    className="accent-[#C26D53]"
                  />
                  <span>{option}</span>
                </label>
              ))}
            </div>
          </div>

          {/* 2. Absorption */}
          <div className="space-y-2">
            <label className="block text-xs font-semibold text-stone-700 dark:text-stone-300">
              Absorption
            </label>
            <div className="grid grid-cols-3 gap-3">
              {["Poor", "Okay", "Loved it"].map((option) => (
                <label
                  key={option}
                  className={`flex items-center justify-center gap-2 p-3 rounded-xl border text-xs font-medium cursor-pointer transition-colors ${
                    absorptionRating === option
                      ? "border-[#C26D53] bg-[#C26D53]/10 text-[#C26D53]"
                      : "border-stone-200 dark:border-stone-700 bg-stone-50/50 dark:bg-stone-800/40 text-stone-700 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800"
                  }`}
                >
                  <input
                    type="radio"
                    name="absorption"
                    value={option}
                    checked={absorptionRating === option}
                    onChange={(e) => setAbsorptionRating(e.target.value)}
                    className="accent-[#C26D53]"
                  />
                  <span>{option}</span>
                </label>
              ))}
            </div>
          </div>

          {/* 3. Overall */}
          <div className="space-y-2">
            <label className="block text-xs font-semibold text-stone-700 dark:text-stone-300">
              Overall
            </label>
            <div className="grid grid-cols-3 gap-3">
              {["Not for me", "Good", "Loved it"].map((option) => (
                <label
                  key={option}
                  className={`flex items-center justify-center gap-2 p-3 rounded-xl border text-xs font-medium cursor-pointer transition-colors ${
                    overallRating === option
                      ? "border-[#C26D53] bg-[#C26D53]/10 text-[#C26D53]"
                      : "border-stone-200 dark:border-stone-700 bg-stone-50/50 dark:bg-stone-800/40 text-stone-700 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800"
                  }`}
                >
                  <input
                    type="radio"
                    name="overall"
                    value={option}
                    checked={overallRating === option}
                    onChange={(e) => setOverallRating(e.target.value)}
                    className="accent-[#C26D53]"
                  />
                  <span>{option}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Save Button */}
          <div className="pt-3">
            <Button type="submit" variant="primary" className="w-full justify-center text-xs py-2.5">
              Save Experience
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};
