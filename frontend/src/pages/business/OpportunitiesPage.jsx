import React, { useState, useEffect } from "react";
import { OpportunityCard } from "../../components/business/OpportunityCard";
import { opportunityService } from "../../services/opportunityService";
import { Flame, Sparkles, Filter, Info } from "lucide-react";
import { Badge } from "../../components/common/Badge";
import { SkeletonLoader } from "../../components/common/SkeletonLoader";

export const OpportunitiesPage = () => {
  const [opportunities, setOpportunities] = useState([]);
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      setLoading(true);
      try {
        const data = await opportunityService.getOpportunities(categoryFilter);
        setOpportunities(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [categoryFilter]);

  return (
    <div className="space-y-8">
      {/* 46. HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-stone-200/80 dark:border-stone-800/80 pb-6">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#C26D53]">
              Flagship Innovation
            </span>
            <Badge variant="accent" size="sm" className="font-semibold">
              ⭐ Unmet Need Detector
            </Badge>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-stone-950 dark:text-stone-50">
            Customer Need Opportunities
          </h1>
          <p className="text-xs sm:text-sm text-stone-500 dark:text-stone-400 mt-1">
            Algorithmically detects surging customer search clusters and feedback demands that lack adequate matching products in Joyory's catalog.
          </p>
        </div>

        <div className="flex items-center gap-2">
          {["All", "Moisturizer", "Sunscreen", "Serum"].map((cat) => (
            <button
              key={cat}
              onClick={() => setCategoryFilter(cat)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
                categoryFilter === cat
                  ? "bg-stone-900 dark:bg-stone-100 text-white dark:text-stone-900"
                  : "bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-400 hover:bg-stone-200 dark:hover:bg-stone-700"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Info notice about prototype analytics */}
      <div className="p-4 rounded-xl bg-stone-100/70 dark:bg-stone-900/60 border border-stone-200/80 dark:border-stone-800 text-xs flex items-start gap-3">
        <Info className="w-4 h-4 text-[#C26D53] shrink-0 mt-0.5" />
        <div className="text-stone-600 dark:text-stone-300 leading-relaxed">
          <strong>How it works:</strong> The Unmet Need Detector cross-references natural-language search query volume with catalog inventory matching scores. When search interest is high (&gt;10K/mo) but catalog coverage is low (&le;1 product), an opportunity signal is generated for Joyory's R&D and merchandising teams.
        </div>
      </div>

      {/* Opportunity Cards List */}
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <SkeletonLoader type="card" count={2} />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {opportunities.map((opp) => (
            <OpportunityCard key={opp.id} opportunity={opp} />
          ))}
        </div>
      )}
    </div>
  );
};
