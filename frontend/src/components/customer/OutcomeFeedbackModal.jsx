import React, { useState } from "react";
import { Star, Sparkles, CheckCircle2, X, ArrowRight, Check } from "lucide-react";
import { Button } from "../common/Button";
import { Badge } from "../common/Badge";

export const OutcomeFeedbackModal = ({
  isOpen,
  onClose,
  outcome,
  onSubmitFeedback
}) => {
  const [texture, setTexture] = useState("Lightweight");
  const [absorption, setAbsorption] = useState("Fast");
  const [fragrance, setFragrance] = useState("None");
  const [overallExperience, setOverallExperience] = useState("Very Good");
  const [rating, setRating] = useState(5);
  const [result, setResult] = useState("Better than expected");
  const [wouldBuyAgain, setWouldBuyAgain] = useState("Yes");
  const [submitting, setSubmitting] = useState(false);
  const [learnedResult, setLearnedResult] = useState(null);

  if (!isOpen || !outcome) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const res = await onSubmitFeedback(outcome.id, {
        texture,
        absorption,
        fragrance,
        overallExperience,
        rating,
        result,
        wouldBuyAgain
      });
      setLearnedResult(res);
    } catch (err) {
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  };

  const handleClose = () => {
    setLearnedResult(null);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-stone-900/40 dark:bg-stone-950/70 backdrop-blur-xs transition-opacity"
        onClick={handleClose}
      />

      {/* Modal Dialog */}
      <div className="relative w-full max-w-lg rounded-2xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 shadow-2xl p-6 sm:p-8 transition-all animate-in fade-in zoom-in-95 max-h-[90vh] overflow-y-auto">
        <div className="flex items-start justify-between mb-4">
          <div>
            <div className="flex items-center gap-1.5 text-xs text-stone-500 dark:text-stone-400 mb-1">
              <Sparkles className="w-3.5 h-3.5 text-[#C26D53]" />
              <span className="font-semibold uppercase tracking-wider text-[10px]">
                Beauty Outcome Loop
              </span>
            </div>
            <h3 className="text-lg font-bold text-stone-900 dark:text-stone-100">
              Log Your Product Outcome
            </h3>
          </div>
          <button
            onClick={handleClose}
            className="p-1 rounded-md text-stone-400 hover:text-stone-600 dark:hover:text-stone-200 cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Product preview bar */}
        <div className="flex items-center gap-3 p-3 rounded-xl bg-stone-50 dark:bg-stone-800/60 border border-stone-100 dark:border-stone-800 mb-6">
          <img
            src={outcome.image}
            alt={outcome.productName}
            className="w-11 h-11 rounded-lg object-cover"
          />
          <div className="flex-1 min-w-0 text-xs">
            <span className="text-[10px] text-stone-400 uppercase tracking-wider block">
              {outcome.brand}
            </span>
            <p className="font-semibold text-stone-900 dark:text-stone-100 truncate">
              {outcome.productName}
            </p>
            <span className="text-[11px] text-stone-500">
              Purchased {outcome.purchaseDate} • {outcome.daysInUse} days in use
            </span>
          </div>
        </div>

        {/* Post-submission "What We Learned" state */}
        {learnedResult ? (
          <div className="space-y-6 text-center animate-in fade-in duration-300 py-4">
            <div className="w-12 h-12 rounded-full bg-emerald-50 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400 mx-auto flex items-center justify-center">
              <CheckCircle2 className="w-6 h-6" />
            </div>

            <div>
              <h4 className="text-base font-bold text-stone-900 dark:text-stone-100 mb-1">
                Outcome Captured & Profile Calibrated
              </h4>
              <p className="text-xs text-stone-500 dark:text-stone-400 max-w-sm mx-auto">
                Joyory translated your real product experience into persistent memory weights.
              </p>
            </div>

            {/* What We Learned Box */}
            <div className="p-5 rounded-xl border border-[#C26D53]/30 bg-[#C26D53]/5 text-left space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-[#C26D53]">
                  What We Learned About You
                </span>
                <Badge variant="accent" size="sm">Memory Updated</Badge>
              </div>

              <div className="space-y-1.5 text-xs text-stone-800 dark:text-stone-200">
                <p className="text-stone-500 text-[11px] mb-1">You tend to prefer:</p>
                {learnedResult.learnedPreferences?.map((pref, i) => (
                  <div key={i} className="flex items-center gap-2 font-medium">
                    <Check className="w-3.5 h-3.5 text-[#C26D53]" />
                    <span>{pref}</span>
                  </div>
                ))}
              </div>

              <p className="pt-2 border-t border-[#C26D53]/20 text-[11px] text-stone-500 italic">
                "We will use these preferences in your future Beauty Journey and recommendation rankings."
              </p>
            </div>

            <Button variant="primary" className="w-full" onClick={handleClose}>
              Done & View Beauty Memory
            </Button>
          </div>
        ) : (
          /* Form state */
          <form onSubmit={handleSubmit} className="space-y-5 text-xs">
            {/* Texture */}
            <div>
              <label className="block font-semibold text-stone-700 dark:text-stone-300 mb-1.5">
                Texture
              </label>
              <div className="grid grid-cols-3 gap-2">
                {["Lightweight", "Medium", "Heavy"].map((t) => (
                  <button
                    key={t}
                    type="button"
                    onClick={() => setTexture(t)}
                    className={`py-2 px-3 rounded-lg border text-center transition-colors cursor-pointer ${
                      texture === t
                        ? "border-[#C26D53] bg-[#C26D53]/10 text-[#C26D53] font-semibold"
                        : "border-stone-200 dark:border-stone-800 text-stone-600 dark:text-stone-400 hover:bg-stone-50 dark:hover:bg-stone-800/40"
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>

            {/* Absorption */}
            <div>
              <label className="block font-semibold text-stone-700 dark:text-stone-300 mb-1.5">
                Absorption
              </label>
              <div className="grid grid-cols-3 gap-2">
                {["Fast", "Normal", "Slow"].map((a) => (
                  <button
                    key={a}
                    type="button"
                    onClick={() => setAbsorption(a)}
                    className={`py-2 px-3 rounded-lg border text-center transition-colors cursor-pointer ${
                      absorption === a
                        ? "border-[#C26D53] bg-[#C26D53]/10 text-[#C26D53] font-semibold"
                        : "border-stone-200 dark:border-stone-800 text-stone-600 dark:text-stone-400 hover:bg-stone-50 dark:hover:bg-stone-800/40"
                    }`}
                  >
                    {a}
                  </button>
                ))}
              </div>
            </div>

            {/* Fragrance */}
            <div>
              <label className="block font-semibold text-stone-700 dark:text-stone-300 mb-1.5">
                Fragrance
              </label>
              <div className="grid grid-cols-3 gap-2">
                {["None", "Mild", "Strong"].map((f) => (
                  <button
                    key={f}
                    type="button"
                    onClick={() => setFragrance(f)}
                    className={`py-2 px-3 rounded-lg border text-center transition-colors cursor-pointer ${
                      fragrance === f
                        ? "border-[#C26D53] bg-[#C26D53]/10 text-[#C26D53] font-semibold"
                        : "border-stone-200 dark:border-stone-800 text-stone-600 dark:text-stone-400 hover:bg-stone-50 dark:hover:bg-stone-800/40"
                    }`}
                  >
                    {f}
                  </button>
                ))}
              </div>
            </div>

            {/* Overall Experience */}
            <div>
              <label className="block font-semibold text-stone-700 dark:text-stone-300 mb-1.5">
                Overall Experience
              </label>
              <div className="grid grid-cols-4 gap-2">
                {["Very Good", "Good", "Neutral", "Poor"].map((exp) => (
                  <button
                    key={exp}
                    type="button"
                    onClick={() => setOverallExperience(exp)}
                    className={`py-2 px-2 rounded-lg border text-center text-[11px] transition-colors cursor-pointer ${
                      overallExperience === exp
                        ? "border-[#C26D53] bg-[#C26D53]/10 text-[#C26D53] font-semibold"
                        : "border-stone-200 dark:border-stone-800 text-stone-600 dark:text-stone-400 hover:bg-stone-50 dark:hover:bg-stone-800/40"
                    }`}
                  >
                    {exp}
                  </button>
                ))}
              </div>
            </div>

            {/* Result vs Expectation */}
            <div>
              <label className="block font-semibold text-stone-700 dark:text-stone-300 mb-1.5">
                Result vs Expectation
              </label>
              <div className="grid grid-cols-3 gap-2">
                {["Better than expected", "As expected", "Worse than expected"].map((res) => (
                  <button
                    key={res}
                    type="button"
                    onClick={() => setResult(res)}
                    className={`py-2 px-2 rounded-lg border text-center text-[11px] transition-colors cursor-pointer ${
                      result === res
                        ? "border-[#C26D53] bg-[#C26D53]/10 text-[#C26D53] font-semibold"
                        : "border-stone-200 dark:border-stone-800 text-stone-600 dark:text-stone-400 hover:bg-stone-50 dark:hover:bg-stone-800/40"
                    }`}
                  >
                    {res}
                  </button>
                ))}
              </div>
            </div>

            {/* Would buy again */}
            <div>
              <label className="block font-semibold text-stone-700 dark:text-stone-300 mb-1.5">
                Would you buy again?
              </label>
              <div className="grid grid-cols-3 gap-2">
                {["Yes", "Maybe", "No"].map((wba) => (
                  <button
                    key={wba}
                    type="button"
                    onClick={() => setWouldBuyAgain(wba)}
                    className={`py-2 px-3 rounded-lg border text-center transition-colors cursor-pointer ${
                      wouldBuyAgain === wba
                        ? "border-[#C26D53] bg-[#C26D53]/10 text-[#C26D53] font-semibold"
                        : "border-stone-200 dark:border-stone-800 text-stone-600 dark:text-stone-400 hover:bg-stone-50 dark:hover:bg-stone-800/40"
                    }`}
                  >
                    {wba}
                  </button>
                ))}
              </div>
            </div>

            {/* Star rating */}
            <div className="pt-1">
              <label className="block font-semibold text-stone-700 dark:text-stone-300 mb-1">
                Rating
              </label>
              <div className="flex items-center gap-1.5">
                {[1, 2, 3, 4, 5].map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => setRating(s)}
                    className="p-1 cursor-pointer text-stone-300 dark:text-stone-600 hover:text-amber-400"
                  >
                    <Star className={`w-5 h-5 ${s <= rating ? "fill-amber-400 text-amber-400" : ""}`} />
                  </button>
                ))}
                <span className="ml-2 text-stone-400">{rating} of 5 stars</span>
              </div>
            </div>

            {/* Submit buttons */}
            <div className="flex items-center justify-end gap-2 pt-4 border-t border-stone-100 dark:border-stone-800">
              <Button type="button" variant="ghost" size="sm" onClick={handleClose}>
                Cancel
              </Button>
              <Button
                type="submit"
                variant="primary"
                size="sm"
                disabled={submitting}
                icon={Sparkles}
              >
                {submitting ? "Analyzing..." : "Complete Outcome Loop"}
              </Button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
