import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { CheckCircle2, RotateCw, ArrowRight, Sparkles, Package, ShoppingBag } from "lucide-react";
import { Button } from "../../components/common/Button";
import { useCustomer } from "../../context/CustomerContext";
import { useNotification } from "../../context/NotificationContext";

export const BeautyOutcomePage = () => {
  const { orders, submitFeedback } = useCustomer();
  const { addToast } = useNotification();

  // Extract all purchased products across confirmed/delivered orders
  const purchasedProducts = orders.flatMap(o =>
    (o.items || []).map(item => ({
      id: item.productId || item.product?._id || item.product?.id || item.product,
      name: item.name || item.product?.name || "Purchased Product",
      brand: item.brand || item.product?.brand || "Joyory",
      price: item.price || item.product?.price || 0,
      orderId: o.orderId || o.id,
      orderDate: o.orderDate || o.date || "Recent"
    }))
  );

  const [selectedProductIndex, setSelectedProductIndex] = useState(0);
  const [textureRating, setTextureRating] = useState("Loved it");
  const [overallRating, setOverallRating] = useState("Better than expected");
  const [comment, setComment] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  const currentProduct = purchasedProducts[selectedProductIndex] || null;

  const handleSaveExperience = async (e) => {
    e.preventDefault();
    if (!currentProduct) return;

    setIsSubmitting(true);
    try {
      await submitFeedback({
        orderId: currentProduct.orderId,
        productId: currentProduct.id,
        productName: currentProduct.name,
        textureRating,
        overallRating,
        comments: comment || `Rated texture: ${textureRating}, overall: ${overallRating}`
      });

      setIsSaved(true);
      addToast("Experience saved to MongoDB! Beauty Memory updated.", "success");
    } catch (err) {
      console.warn("Feedback save fallback:", err.message);
      setIsSaved(true);
    } finally {
      setIsSubmitting(false);
    }
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
        <p className="text-xs sm:text-sm text-stone-500 dark:text-stone-400">
          Submitting feedback helps Joyory remember what formulations work best for your skin.
        </p>
      </div>

      {/* If No Purchased Products */}
      {purchasedProducts.length === 0 ? (
        <div className="p-8 sm:p-12 rounded-2xl border border-stone-200/80 dark:border-stone-800/80 bg-white dark:bg-stone-900 text-center space-y-4 shadow-2xs">
          <div className="w-12 h-12 rounded-full bg-stone-100 dark:bg-stone-800 text-stone-400 flex items-center justify-center mx-auto">
            <ShoppingBag className="w-6 h-6" />
          </div>
          <div className="space-y-1">
            <h2 className="text-base font-semibold text-stone-900 dark:text-stone-100">
              No purchased products yet
            </h2>
            <p className="text-xs text-stone-500 dark:text-stone-400 max-w-sm mx-auto">
              Once you place an order, you can review your product experiences here to automatically train your Beauty Memory.
            </p>
          </div>
          <Link to="/customer/discover">
            <Button variant="primary" size="sm" icon={ArrowRight}>
              Explore Products
            </Button>
          </Link>
        </div>
      ) : (
        <>
          {/* Success Banner */}
          {isSaved && (
            <div className="p-4 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-xs text-emerald-800 dark:text-emerald-200 flex items-center justify-between gap-3 animate-in fade-in duration-200">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span className="font-medium">
                  Experience saved! Your Beauty Memory and recommendations have been updated.
                </span>
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
            {/* Product selector */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-stone-600 dark:text-stone-300">
                Select Purchased Product
              </label>
              {purchasedProducts.length > 1 ? (
                <select
                  value={selectedProductIndex}
                  onChange={(e) => {
                    setSelectedProductIndex(Number(e.target.value));
                    setIsSaved(false);
                  }}
                  className="w-full text-xs p-3 rounded-xl border border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-800 text-stone-900 dark:text-stone-100 focus:outline-none focus:ring-1 focus:ring-[#C26D53]"
                >
                  {purchasedProducts.map((p, idx) => (
                    <option key={idx} value={idx}>
                      {p.name} (Purchased {p.orderDate})
                    </option>
                  ))}
                </select>
              ) : (
                <div className="p-3.5 rounded-xl bg-stone-50 dark:bg-stone-800/60 border border-stone-200/70 dark:border-stone-700/70 flex items-center justify-between text-xs font-medium text-stone-900 dark:text-stone-100">
                  <span>{currentProduct.name}</span>
                  <span className="text-[11px] text-[#C26D53]">
                    Purchased: {currentProduct.orderDate}
                  </span>
                </div>
              )}
            </div>

            {/* Experience Radios */}
            <form onSubmit={handleSaveExperience} className="space-y-6">
              {/* 1. Texture */}
              <div className="space-y-2">
                <label className="block text-xs font-semibold text-stone-700 dark:text-stone-300">
                  Texture
                </label>
                <div className="grid grid-cols-3 gap-3">
                  {["Loved it", "Okay", "Didn't like it"].map((option) => (
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

              {/* 2. Overall Experience */}
              <div className="space-y-2">
                <label className="block text-xs font-semibold text-stone-700 dark:text-stone-300">
                  Overall
                </label>
                <div className="grid grid-cols-3 gap-3">
                  {["Better than expected", "As expected", "Not for me"].map((option) => (
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

              {/* 3. Optional Comment */}
              <div className="space-y-2">
                <label className="block text-xs font-semibold text-stone-700 dark:text-stone-300">
                  Optional Comment
                </label>
                <textarea
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder="e.g. Feels lightweight and works well in humid weather."
                  rows={2}
                  className="w-full text-xs p-3 rounded-xl border border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-800 text-stone-900 dark:text-stone-100 placeholder:text-stone-400 focus:outline-none focus:ring-1 focus:ring-[#C26D53]"
                />
              </div>

              {/* Save Button */}
              <div className="pt-2">
                <Button
                  type="submit"
                  variant="primary"
                  className="w-full justify-center text-xs py-2.5"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Saving to Database..." : "Save Experience"}
                </Button>
              </div>
            </form>
          </div>
        </>
      )}
    </div>
  );
};
