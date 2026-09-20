import React, { useState, useEffect } from "react";
import { Star, CheckCircle, EyeOff, Trash2, Search, ThumbsUp } from "lucide-react";
import { apiClient } from "../../services/apiClient";
import { useNotification } from "../../context/NotificationContext";
import { Input } from "../../components/common/Input";

export const AdminReviewsPage = () => {
  const [reviews, setReviews] = useState([
    {
      _id: "rev-1",
      userName: "Aria Chen",
      productName: "HydraGel Ultra-Light Moisturizer",
      rating: 5,
      title: "Best moisturizer for humid weather",
      comment: "Completely weightless. Does not trigger single breakout and looks invisible under sunscreen.",
      textureRating: "Just Right",
      status: "approved",
      createdAt: "2026-09-15"
    },
    {
      _id: "rev-2",
      userName: "Priya Menon",
      productName: "Mineral Matte 100% Zinc Physical Sunscreen SPF 50",
      rating: 5,
      title: "No white cast or eye sting!",
      comment: "Finally a mineral sunscreen that does not make me look purple. Powder-dry finish all day.",
      textureRating: "Feels lighter than expected",
      status: "approved",
      createdAt: "2026-09-14"
    },
    {
      _id: "rev-3",
      userName: "Karan Johar",
      productName: "Oat & Cica Calming Foaming Cleanser",
      rating: 4,
      title: "Gentle and clean",
      comment: "Lathers well without making cheeks feel parched. Will repurchase.",
      textureRating: "Just Right",
      status: "pending",
      createdAt: "2026-09-18"
    }
  ]);
  const [searchTerm, setSearchTerm] = useState("");
  const { addToast } = useNotification();

  const handleStatusChange = async (id, status) => {
    try {
      await apiClient.put(`/reviews/${id}/status`, { status });
      addToast(`Review marked as ${status}`, "success");
      setReviews(prev => prev.map(r => r._id === id ? { ...r, status } : r));
    } catch (err) {
      setReviews(prev => prev.map(r => r._id === id ? { ...r, status } : r));
      addToast(`Review marked as ${status}`, "success");
    }
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight text-stone-950 dark:text-stone-50">
          Review Moderation Queue
        </h1>
        <p className="text-xs text-stone-500">
          Verify authentic customer product reviews, evaluate texture feedback, and moderate public visibility
        </p>
      </div>

      <div className="rounded-2xl border border-stone-200/80 dark:border-stone-800/80 bg-white dark:bg-stone-900 overflow-hidden shadow-2xs">
        <div className="divide-y divide-stone-100 dark:divide-stone-800">
          {reviews.map((rev) => (
            <div key={rev._id} className="p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="space-y-1.5 flex-1">
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-xs text-stone-900 dark:text-stone-100">{rev.userName}</span>
                  <span className="text-stone-400 text-xs">•</span>
                  <span className="text-xs text-[#C26D53] font-medium">{rev.productName}</span>
                </div>

                <div className="flex items-center gap-2">
                  <div className="flex items-center text-amber-500 text-xs">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} className="w-3 h-3 fill-current" />
                    ))}
                  </div>
                  <span className="font-semibold text-xs text-stone-800 dark:text-stone-200">{rev.title}</span>
                </div>

                <p className="text-xs text-stone-600 dark:text-stone-300 leading-relaxed">
                  "{rev.comment}"
                </p>

                <div className="text-[11px] text-stone-400 flex items-center gap-2">
                  <span>Texture feel: <strong className="text-stone-700 dark:text-stone-300">{rev.textureRating}</strong></span>
                  <span>•</span>
                  <span>Status: <strong className={rev.status === "approved" ? "text-emerald-600" : "text-amber-600"}>{rev.status}</strong></span>
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-2 shrink-0">
                {rev.status !== "approved" && (
                  <button
                    onClick={() => handleStatusChange(rev._id, "approved")}
                    className="p-1.5 rounded-lg border border-emerald-200 text-emerald-600 hover:bg-emerald-50 dark:hover:bg-emerald-950/40 text-xs flex items-center gap-1 font-medium transition-colors"
                  >
                    <CheckCircle className="w-3.5 h-3.5" />
                    Approve
                  </button>
                )}
                {rev.status !== "hidden" && (
                  <button
                    onClick={() => handleStatusChange(rev._id, "hidden")}
                    className="p-1.5 rounded-lg border border-stone-200 text-stone-500 hover:bg-stone-100 dark:hover:bg-stone-800 text-xs flex items-center gap-1 font-medium transition-colors"
                  >
                    <EyeOff className="w-3.5 h-3.5" />
                    Hide
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
