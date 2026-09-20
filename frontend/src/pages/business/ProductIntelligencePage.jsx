import React, { useState } from "react";
import { Link } from "react-router-dom";
import { DataTable } from "../../components/business/DataTable";
import { products } from "../../data/products";
import { Badge } from "../../components/common/Badge";
import { Star, ArrowUpRight, TrendingUp } from "lucide-react";

export const ProductIntelligencePage = () => {
  const [dateRange, setDateRange] = useState("Last 30 Days");

  // Enrich products with simulated analytics metrics
  const enrichedProducts = products.map((p, idx) => {
    const baseViews = 1800 + (20 - idx) * 190;
    const comparisons = Math.round(baseViews * 0.42);
    const wishlistCount = Math.round(baseViews * 0.28);
    const addToBagCount = Math.round(baseViews * 0.19);
    const purchases = Math.round(baseViews * 0.11);
    const feedbackCount = Math.round(purchases * 0.48);

    return {
      ...p,
      views: baseViews,
      comparisons,
      wishlistCount,
      addToBagCount,
      purchases,
      feedbackCount,
      sentimentLabel: p.reviewSummary?.sentimentLabel || "Highly Positive"
    };
  });

  const columns = [
    {
      header: "Formulation",
      key: "name",
      sortable: true,
      render: (row) => (
        <div className="flex items-center gap-3">
          <img src={row.image} alt={row.name} className="w-9 h-9 rounded-md object-cover" />
          <div className="min-w-0 max-w-[200px]">
            <span className="text-[10px] text-stone-400 uppercase tracking-wider block truncate">
              {row.brand}
            </span>
            <Link to={`/products/${row.id}`} className="font-semibold text-stone-900 dark:text-stone-100 hover:text-[#C26D53] truncate block">
              {row.name}
            </Link>
          </div>
        </div>
      )
    },
    {
      header: "Category",
      key: "category",
      sortable: true,
      render: (row) => <Badge variant="neutral" size="sm">{row.category}</Badge>
    },
    {
      header: "Views",
      key: "views",
      sortable: true,
      render: (row) => <span className="font-mono">{row.views.toLocaleString()}</span>
    },
    {
      header: "Compares",
      key: "comparisons",
      sortable: true,
      render: (row) => <span className="font-mono text-stone-700 dark:text-stone-300">{row.comparisons.toLocaleString()}</span>
    },
    {
      header: "Wishlist",
      key: "wishlistCount",
      sortable: true,
      render: (row) => <span className="font-mono text-stone-700 dark:text-stone-300">{row.wishlistCount.toLocaleString()}</span>
    },
    {
      header: "Bag Add",
      key: "addToBagCount",
      sortable: true,
      render: (row) => <span className="font-mono text-stone-700 dark:text-stone-300">{row.addToBagCount.toLocaleString()}</span>
    },
    {
      header: "Orders",
      key: "purchases",
      sortable: true,
      render: (row) => <span className="font-mono font-semibold text-stone-900 dark:text-stone-100">{row.purchases.toLocaleString()}</span>
    },
    {
      header: "Feedback",
      key: "feedbackCount",
      sortable: true,
      render: (row) => <span className="font-mono text-[#C26D53]">{row.feedbackCount} signals</span>
    },
    {
      header: "Sentiment",
      key: "sentimentLabel",
      sortable: true,
      render: (row) => (
        <Badge variant={row.sentimentLabel.includes("Overwhelmingly") ? "success" : "accent"} size="sm">
          {row.sentimentLabel}
        </Badge>
      )
    }
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-stone-200/80 dark:border-stone-800/80 pb-6">
        <div>
          <span className="text-xs font-semibold uppercase tracking-wider text-[#C26D53]">
            Catalog Performance Metrics
          </span>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-stone-950 dark:text-stone-50 mt-1">
            Product Intelligence
          </h1>
          <p className="text-xs sm:text-sm text-stone-500 dark:text-stone-400 mt-1">
            End-to-end customer interaction metrics across catalog formulations.
          </p>
        </div>

        {/* Date filter */}
        <div className="flex items-center gap-2">
          <span className="text-xs text-stone-400">Date Range:</span>
          <select
            value={dateRange}
            onChange={(e) => setDateRange(e.target.value)}
            className="text-xs rounded-lg border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-900 px-3 py-1.5 text-stone-800 dark:text-stone-200 focus:outline-none cursor-pointer"
          >
            <option>Last 7 Days</option>
            <option>Last 30 Days</option>
            <option>Last Quarter (Q3 2026)</option>
            <option>All Time</option>
          </select>
        </div>
      </div>

      {/* Responsive Interactive DataTable */}
      <DataTable
        columns={columns}
        data={enrichedProducts}
        searchPlaceholder="Filter formulation name, brand, or active ingredient..."
        filters={["Moisturizer", "Sunscreen", "Serum", "Cleanser", "Toner"]}
      />
    </div>
  );
};
