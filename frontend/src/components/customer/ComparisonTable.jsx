import React from "react";
import { Link } from "react-router-dom";
import { X, Check, ShoppingBag, Star, Sparkles } from "lucide-react";
import { Button } from "../common/Button";
import { Badge } from "../common/Badge";
import { useCustomer } from "../../context/CustomerContext";

export const ComparisonTable = ({ products = [] }) => {
  const { removeFromCompare, addToBag } = useCustomer();

  if (!products || products.length === 0) {
    return (
      <div className="p-8 text-center rounded-xl border border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900">
        <p className="text-sm text-stone-500">No products selected for comparison. Browse products and tap "Compare".</p>
      </div>
    );
  }

  const rows = [
    {
      label: "Preference Match",
      render: (p) => (
        <Badge variant="accent" size="sm" className="font-semibold">
          {p.matchScore || 92}% Match
        </Badge>
      )
    },
    {
      label: "Price & Size",
      render: (p) => (
        <div>
          <span className="font-semibold text-stone-900 dark:text-stone-100">
            ₹{p.price}
          </span>
          <span className="text-stone-400 text-xs ml-1">/ {p.size}</span>
        </div>
      )
    },
    {
      label: "Rating",
      render: (p) => (
        <div className="flex items-center gap-1">
          <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
          <span className="font-medium text-stone-900 dark:text-stone-100">{p.rating}</span>
          <span className="text-stone-400 text-xs">({p.reviewsCount})</span>
        </div>
      )
    },
    {
      label: "Texture",
      render: (p) => (
        <span className="font-medium text-stone-800 dark:text-stone-200">
          {p.texture}
        </span>
      ),
      highlightBest: true
    },
    {
      label: "Finish",
      render: (p) => (
        <span className="text-stone-700 dark:text-stone-300">{p.finish}</span>
      )
    },
    {
      label: "Skin Suitability",
      render: (p) => (
        <span className="text-stone-600 dark:text-stone-400 text-xs">
          {p.skinType?.join(", ")}
        </span>
      )
    },
    {
      label: "Key Actives",
      render: (p) => (
        <div className="flex flex-wrap gap-1">
          {p.keyIngredients?.slice(0, 3).map((ing, i) => (
            <span key={i} className="text-[10px] px-1.5 py-0.5 rounded bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-400">
              {ing}
            </span>
          ))}
        </div>
      )
    },
    {
      label: "Customer Sentiment",
      render: (p) => (
        <div className="flex items-center gap-1.5 text-xs text-emerald-600 dark:text-emerald-400">
          <Check className="w-3.5 h-3.5 stroke-[2.5]" />
          <span>{p.reviewSummary?.sentimentLabel || "Highly Positive"}</span>
        </div>
      )
    }
  ];

  return (
    <div className="rounded-xl border border-stone-200/80 dark:border-stone-800/80 bg-white dark:bg-stone-900 overflow-x-auto shadow-2xs">
      <div className="p-4 bg-stone-50/70 dark:bg-stone-950/40 border-b border-stone-200/80 dark:border-stone-800/80 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-[#C26D53]" />
          <h3 className="text-xs font-semibold uppercase tracking-wider text-stone-700 dark:text-stone-300">
            Based on your preferences — Side by side comparison
          </h3>
        </div>
        <span className="text-xs text-stone-400">
          Comparing {products.length} {products.length === 1 ? "product" : "products"}
        </span>
      </div>

      <table className="w-full text-left text-xs border-collapse">
        <thead>
          <tr className="border-b border-stone-200/80 dark:border-stone-800/80">
            <th className="p-4 w-44 bg-stone-50/40 dark:bg-stone-950/20 text-stone-500 dark:text-stone-400 font-medium">
              Product
            </th>
            {products.map((p) => (
              <th key={p.id} className="p-4 min-w-[220px] align-top">
                <div className="relative">
                  <button
                    onClick={() => removeFromCompare(p.id)}
                    className="absolute -top-1 -right-1 p-1 rounded-full text-stone-400 hover:text-stone-700 dark:hover:text-stone-200 hover:bg-stone-100 dark:hover:bg-stone-800"
                    title="Remove from comparison"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>

                  <img
                    src={p.image}
                    alt={p.name}
                    className="w-16 h-16 rounded-lg object-cover mb-2"
                  />
                  <span className="text-[10px] text-stone-400 uppercase tracking-wider block">
                    {p.brand}
                  </span>
                  <Link
                    to={`/products/${p.id}`}
                    className="font-semibold text-stone-900 dark:text-stone-100 hover:text-[#C26D53] text-xs line-clamp-2"
                  >
                    {p.name}
                  </Link>
                  <div className="mt-2.5">
                    <Button
                      size="sm"
                      variant="primary"
                      className="w-full text-xs"
                      onClick={() => addToBag(p)}
                      icon={ShoppingBag}
                    >
                      Add to Bag
                    </Button>
                  </div>
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-stone-100 dark:divide-stone-800/80">
          {rows.map((row, idx) => (
            <tr key={idx} className="hover:bg-stone-50/50 dark:hover:bg-stone-800/20">
              <td className="p-4 font-medium text-stone-500 dark:text-stone-400 bg-stone-50/30 dark:bg-stone-950/10">
                {row.label}
              </td>
              {products.map((p) => (
                <td key={p.id} className="p-4 text-stone-800 dark:text-stone-200">
                  {row.render(p)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
