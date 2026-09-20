import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Sparkles, CheckCircle2, MessageSquare, Star, ArrowRight, RotateCcw } from "lucide-react";
import { useCustomer } from "../../context/CustomerContext";
import { products } from "../../data/products";
import { Button } from "../../components/common/Button";
import { Badge } from "../../components/common/Badge";

export const FeedbackPage = () => {
  const { submitFeedback, profile, resetAllDemoData } = useCustomer();

  const [selectedProduct, setSelectedProduct] = useState(products[0]);
  const [rating, setRating] = useState(4);
  const [texture, setTexture] = useState("Feels slightly heavy");
  const [fragrance, setFragrance] = useState("Unscented");
  const [application, setApplication] = useState("Fast absorbing");
  const [finish, setFinish] = useState("Slightly shiny");
  const [comment, setComment] = useState("Feels slightly heavy during humid afternoons. Good hydration, but I wish it was even lighter.");
  const [submitting, setSubmitting] = useState(false);
  const [result, setResult] = useState(null);

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
      const res = await submitFeedback({
        orderId: "JOY-DEMO-FEEDBACK",
        productId: selectedProduct.id,
        productName: selectedProduct.name,
        overallRating: rating,
        textureRating: texture,
        fragranceRating: fragrance,
        applicationRating: application,
        finishRating: finish,
        comments: comment
      });
      setResult(res);
    } catch (err) {
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto space-y-8">
      {/* Header */}
      <div className="border-b border-stone-200/80 dark:border-stone-800/80 pb-6">
        <span className="text-xs font-semibold uppercase tracking-wider text-[#C26D53]">
          Continuous Learning Engine
        </span>
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-stone-950 dark:text-stone-50 mt-1">
          Product Experience & Preference Tuning
        </h1>
        <p className="text-xs sm:text-sm text-stone-500 dark:text-stone-400 mt-1">
          Simulate how real-world customer usage feedback automatically refines the Beauty Preference Graph.
        </p>
      </div>

      {result ? (
        <div className="p-8 rounded-2xl border border-stone-200/80 dark:border-stone-800/80 bg-white dark:bg-stone-900 shadow-sm space-y-6 text-center animate-in fade-in duration-300">
          <div className="w-14 h-14 rounded-full bg-emerald-50 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400 mx-auto flex items-center justify-center">
            <CheckCircle2 className="w-8 h-8" />
          </div>

          <div className="space-y-1">
            <h2 className="text-xl font-bold text-stone-900 dark:text-stone-100">
              Preference Signal Processed
            </h2>
            <p className="text-xs text-stone-500 dark:text-stone-400">
              Your feedback was converted into an updated node weight on your Beauty Preference Graph.
            </p>
          </div>

          {/* Detailed signal result */}
          <div className="p-5 rounded-xl border border-stone-200 dark:border-stone-800 bg-stone-50 dark:bg-stone-950/40 text-left space-y-3 max-w-lg mx-auto text-xs">
            <div className="flex items-center justify-between">
              <span className="text-stone-500 font-medium">Feedback Target:</span>
              <span className="font-semibold text-stone-900 dark:text-stone-100">
                {selectedProduct.name}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-stone-500 font-medium">Signal Detected:</span>
              <Badge variant="warning" size="sm">
                {result.preferenceSignal}
              </Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-stone-500 font-medium">Preference Update:</span>
              <span className="font-semibold text-[#C26D53]">
                {result.preferenceUpdate}
              </span>
            </div>
            <div className="pt-2 border-t border-stone-200 dark:border-stone-800 text-[11px] text-stone-500 leading-relaxed">
              Future recommendations for moisturizers now rank lighter water-burst and gel textures at the very top.
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
            <Link to="/customer/profile">
              <Button variant="primary" icon={ArrowRight}>
                Inspect Updated Preference Graph
              </Button>
            </Link>
            <Link to="/customer/journey">
              <Button variant="secondary">
                View Journey Timeline
              </Button>
            </Link>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="p-6 sm:p-8 rounded-2xl border border-stone-200/80 dark:border-stone-800/80 bg-white dark:bg-stone-900 shadow-2xs space-y-6">
          {/* Target Product Selector */}
          <div>
            <label className="block text-xs font-semibold text-stone-700 dark:text-stone-300 mb-2">
              Select Formulation to Review
            </label>
            <select
              value={selectedProduct.id}
              onChange={(e) => setSelectedProduct(products.find(p => p.id === e.target.value) || products[0])}
              className="w-full rounded-lg border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-900 px-3 py-2 text-xs text-stone-900 dark:text-stone-100 focus:outline-none focus:border-stone-500 cursor-pointer"
            >
              {products.slice(0, 8).map((p) => (
                <option key={p.id} value={p.id}>
                  {p.brand} — {p.name} ({p.texture})
                </option>
              ))}
            </select>
          </div>

          {/* Overall Experience */}
          <div>
            <label className="block text-xs font-semibold text-stone-700 dark:text-stone-300 mb-2">
              Overall Experience Rating
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
              <span className="text-xs text-stone-500 ml-2">{rating} / 5</span>
            </div>
          </div>

          {/* Question 1: Texture */}
          <div>
            <label className="block text-xs font-semibold text-stone-700 dark:text-stone-300 mb-2">
              How was the texture?
            </label>
            <div className="grid grid-cols-2 gap-2">
              {textureOptions.map((opt) => (
                <button
                  key={opt}
                  type="button"
                  onClick={() => setTexture(opt)}
                  className={`px-3 py-2.5 rounded-lg text-xs border text-left transition-colors cursor-pointer ${
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
            <label className="block text-xs font-semibold text-stone-700 dark:text-stone-300 mb-2">
              How was the fragrance?
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              {fragranceOptions.map((opt) => (
                <button
                  key={opt}
                  type="button"
                  onClick={() => setFragrance(opt)}
                  className={`px-3 py-2.5 rounded-lg text-xs border text-left transition-colors cursor-pointer ${
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
            <label className="block text-xs font-semibold text-stone-700 dark:text-stone-300 mb-2">
              How was the application?
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              {applicationOptions.map((opt) => (
                <button
                  key={opt}
                  type="button"
                  onClick={() => setApplication(opt)}
                  className={`px-3 py-2.5 rounded-lg text-xs border text-left transition-colors cursor-pointer ${
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
            <label className="block text-xs font-semibold text-stone-700 dark:text-stone-300 mb-2">
              How was the finish?
            </label>
            <div className="grid grid-cols-2 gap-2">
              {finishOptions.map((opt) => (
                <button
                  key={opt}
                  type="button"
                  onClick={() => setFinish(opt)}
                  className={`px-3 py-2.5 rounded-lg text-xs border text-left transition-colors cursor-pointer ${
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

          {/* Observation text */}
          <div>
            <label className="block text-xs font-semibold text-stone-700 dark:text-stone-300 mb-1.5">
              Specific sensory observation:
            </label>
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              rows={3}
              className="w-full rounded-lg border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-900 px-3 py-2 text-xs text-stone-900 dark:text-stone-100 placeholder-stone-400 focus:outline-none focus:border-stone-500"
            />
          </div>

          <div className="flex items-center justify-between pt-4 border-t border-stone-100 dark:border-stone-800">
            <span className="text-[11px] text-stone-400">
              Updates your Beauty Preference Graph instantly
            </span>
            <Button
              type="submit"
              variant="primary"
              disabled={submitting}
              icon={Sparkles}
            >
              {submitting ? "Analyzing Signal..." : "Submit Experience Signal"}
            </Button>
          </div>
        </form>
      )}
    </div>
  );
};
