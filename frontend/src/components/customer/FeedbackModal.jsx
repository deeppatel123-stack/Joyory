import React, { useState } from "react";
import { Star, Sparkles, CheckCircle2, X, ArrowRight } from "lucide-react";
import { Button } from "../common/Button";
import { Badge } from "../common/Badge";
import { useCustomer } from "../../context/CustomerContext";

export const FeedbackModal = ({
  isOpen,
  onClose,
  order = null,
  product = null
}) => {
  const { submitFeedback } = useCustomer();

  const [rating, setRating] = useState(4);
  const [texture, setTexture] = useState("Feels slightly heavy");
  const [fragrance, setFragrance] = useState("Unscented");
  const [application, setApplication] = useState("Fast absorbing");
  const [finish, setFinish] = useState("Slightly shiny");
  const [comment, setComment] = useState("Feels slightly heavy during peak afternoon heat. Good hydration, but I wish it was even lighter.");
  const [submitting, setSubmitting] = useState(false);
  const [result, setResult] = useState(null);

  if (!isOpen) return null;

  const targetProduct = product || order?.product || {
    name: "HydraGel Ultra-Light Moisturizer",
    brand: "Joyory Labs",
    id: "prod-1",
    price: 649,
    image: "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=600&auto=format&fit=crop&q=80"
  };

  const textureOptions = [
    "Ultra light / Water-like",
    "Balanced gel",
    "Feels slightly heavy",
    "Too rich / Greasy"
  ];

  const fragranceOptions = [
    "Unscented / Zero scent",
    "Mild & pleasant",
    "Too strong / Perfumed"
  ];

  const applicationOptions = [
    "Fast absorbing",
    "Needs extra blending",
    "Pills under sunscreen"
  ];

  const finishOptions = [
    "Soft matte",
    "Natural skin finish",
    "Slightly shiny",
    "Dewy glow"
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const response = await submitFeedback({
        orderId: order?.id || "JOY-DEMO",
        productId: targetProduct.id,
        productName: targetProduct.name,
        overallRating: rating,
        textureRating: texture,
        fragranceRating: fragrance,
        applicationRating: application,
        finishRating: finish,
        comments: comment
      });
      setResult(response);
    } catch (err) {
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  };

  const handleFinish = () => {
    setResult(null);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-stone-900/40 dark:bg-stone-950/70 backdrop-blur-xs transition-opacity"
        onClick={handleFinish}
      />

      {/* Modal Dialog */}
      <div className="relative w-full max-w-lg rounded-xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 shadow-2xl p-6 transition-all animate-in fade-in zoom-in-95 max-h-[90vh] overflow-y-auto">
        <div className="flex items-start justify-between mb-4">
          <div>
            <div className="flex items-center gap-1.5 text-xs text-stone-500 dark:text-stone-400 mb-0.5">
              <Sparkles className="w-3.5 h-3.5 text-[#C26D53]" />
              <span>Continuous Learning Feedback</span>
            </div>
            <h3 className="text-base font-semibold text-stone-900 dark:text-stone-100">
              Share Your Product Experience
            </h3>
          </div>
          <button
            onClick={handleFinish}
            className="p-1 rounded-md text-stone-400 hover:text-stone-600 dark:hover:text-stone-200"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Product mini bar */}
        <div className="flex items-center gap-3 p-3 rounded-lg bg-stone-50 dark:bg-stone-800/60 border border-stone-100 dark:border-stone-800 mb-5">
          <img
            src={targetProduct.image}
            alt={targetProduct.name}
            className="w-10 h-10 rounded-md object-cover"
          />
          <div className="flex-1 min-w-0 text-xs">
            <span className="text-[10px] text-stone-400 uppercase tracking-wider block">
              {targetProduct.brand}
            </span>
            <p className="font-semibold text-stone-900 dark:text-stone-100 truncate">
              {targetProduct.name}
            </p>
          </div>
        </div>

        {/* Post-submission result state */}
        {result ? (
          <div className="py-6 space-y-5 text-center animate-in fade-in duration-300">
            <div className="w-12 h-12 rounded-full bg-emerald-50 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400 mx-auto flex items-center justify-center">
              <CheckCircle2 className="w-6 h-6" />
            </div>

            <div>
              <h4 className="text-base font-semibold text-stone-900 dark:text-stone-100 mb-1">
                Thank you! Your experience refined your profile.
              </h4>
              <p className="text-xs text-stone-500 dark:text-stone-400 max-w-sm mx-auto">
                Joyory's continuous learning engine processed your feedback into a structural preference update.
              </p>
            </div>

            {/* Simulated Signal Detection Card */}
            <div className="p-4 rounded-xl border border-stone-200/80 dark:border-stone-800 bg-stone-50 dark:bg-stone-950/40 text-left space-y-3">
              <span className="text-[10px] uppercase tracking-wider text-stone-400 font-semibold block">
                Graph Learning Adaptation
              </span>

              <div className="flex items-center justify-between text-xs">
                <span className="text-stone-500">Preference Signal Detected:</span>
                <Badge variant="warning" size="sm">
                  {result.preferenceSignal}
                </Badge>
              </div>

              <div className="flex items-center justify-between text-xs">
                <span className="text-stone-500">Preference Update:</span>
                <span className="font-semibold text-[#C26D53]">
                  {result.preferenceUpdate}
                </span>
              </div>

              <div className="pt-2 border-t border-stone-200/60 dark:border-stone-800 text-[11px] text-stone-500 leading-relaxed">
                Your future recommendations now prioritize weightless water-burst formulations over standard creams.
              </div>
            </div>

            <Button variant="primary" className="w-full" onClick={handleFinish}>
              View Updated Beauty Profile
            </Button>
          </div>
        ) : (
          /* Form state */
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Overall Rating */}
            <div>
              <label className="block text-xs font-medium text-stone-700 dark:text-stone-300 mb-2">
                Overall Experience
              </label>
              <div className="flex items-center gap-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setRating(star)}
                    className="p-1 text-stone-300 hover:text-amber-400 dark:text-stone-600 transition-colors cursor-pointer"
                  >
                    <Star
                      className={`w-6 h-6 ${
                        star <= rating ? "fill-amber-400 text-amber-400" : ""
                      }`}
                    />
                  </button>
                ))}
                <span className="text-xs text-stone-500 ml-2">{rating} of 5 stars</span>
              </div>
            </div>

            {/* Question 1: Texture */}
            <div>
              <label className="block text-xs font-medium text-stone-700 dark:text-stone-300 mb-2">
                How was the texture?
              </label>
              <div className="grid grid-cols-2 gap-2">
                {textureOptions.map((opt) => (
                  <button
                    key={opt}
                    type="button"
                    onClick={() => setTexture(opt)}
                    className={`px-3 py-2 rounded-lg text-xs border text-left transition-colors cursor-pointer ${
                      texture === opt
                        ? "border-[#C26D53] bg-[#C26D53]/10 text-[#C26D53] font-medium"
                        : "border-stone-200 dark:border-stone-800 text-stone-600 dark:text-stone-400 hover:bg-stone-50 dark:hover:bg-stone-800/40"
                    }`}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </div>

            {/* Question 2: Fragrance */}
            <div>
              <label className="block text-xs font-medium text-stone-700 dark:text-stone-300 mb-2">
                How was the fragrance?
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                {fragranceOptions.map((opt) => (
                  <button
                    key={opt}
                    type="button"
                    onClick={() => setFragrance(opt)}
                    className={`px-3 py-2 rounded-lg text-xs border text-left transition-colors cursor-pointer ${
                      fragrance === opt
                        ? "border-[#C26D53] bg-[#C26D53]/10 text-[#C26D53] font-medium"
                        : "border-stone-200 dark:border-stone-800 text-stone-600 dark:text-stone-400 hover:bg-stone-50 dark:hover:bg-stone-800/40"
                    }`}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </div>

            {/* Question 3: Application */}
            <div>
              <label className="block text-xs font-medium text-stone-700 dark:text-stone-300 mb-2">
                How was the application?
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                {applicationOptions.map((opt) => (
                  <button
                    key={opt}
                    type="button"
                    onClick={() => setApplication(opt)}
                    className={`px-3 py-2 rounded-lg text-xs border text-left transition-colors cursor-pointer ${
                      application === opt
                        ? "border-[#C26D53] bg-[#C26D53]/10 text-[#C26D53] font-medium"
                        : "border-stone-200 dark:border-stone-800 text-stone-600 dark:text-stone-400 hover:bg-stone-50 dark:hover:bg-stone-800/40"
                    }`}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </div>

            {/* Question 4: Finish */}
            <div>
              <label className="block text-xs font-medium text-stone-700 dark:text-stone-300 mb-2">
                How was the finish?
              </label>
              <div className="grid grid-cols-2 gap-2">
                {finishOptions.map((opt) => (
                  <button
                    key={opt}
                    type="button"
                    onClick={() => setFinish(opt)}
                    className={`px-3 py-2 rounded-lg text-xs border text-left transition-colors cursor-pointer ${
                      finish === opt
                        ? "border-[#C26D53] bg-[#C26D53]/10 text-[#C26D53] font-medium"
                        : "border-stone-200 dark:border-stone-800 text-stone-600 dark:text-stone-400 hover:bg-stone-50 dark:hover:bg-stone-800/40"
                    }`}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </div>

            {/* Text review */}
            <div>
              <label className="block text-xs font-medium text-stone-700 dark:text-stone-300 mb-1.5">
                Detailed Observation
              </label>
              <textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                rows={3}
                className="w-full rounded-lg border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-900 px-3 py-2 text-xs text-stone-900 dark:text-stone-100 placeholder-stone-400 focus:border-stone-500 focus:outline-none"
                placeholder="Share your experience (e.g., feels slightly heavy, absorbed quickly, etc.)"
              />
            </div>

            <div className="flex items-center justify-end gap-2 pt-2 border-t border-stone-100 dark:border-stone-800">
              <Button type="button" variant="ghost" size="sm" onClick={handleFinish}>
                Cancel
              </Button>
              <Button
                type="submit"
                variant="primary"
                size="sm"
                disabled={submitting}
                icon={Sparkles}
              >
                {submitting ? "Processing Signal..." : "Submit Experience & Refine Profile"}
              </Button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
