import React from "react";
import {
  Search,
  Eye,
  Scale,
  ShoppingBag,
  Sparkles,
  MessageSquare,
  RefreshCw,
  Heart
} from "lucide-react";
import { Badge } from "../common/Badge";

export const JourneyTimeline = ({ events = [] }) => {
  const getEventIcon = (type) => {
    switch (type) {
      case "SEARCH":
        return <Search className="w-4 h-4 text-stone-600 dark:text-stone-300" />;
      case "VIEW":
        return <Eye className="w-4 h-4 text-stone-600 dark:text-stone-300" />;
      case "COMPARE":
        return <Scale className="w-4 h-4 text-stone-600 dark:text-stone-300" />;
      case "PURCHASE":
        return <ShoppingBag className="w-4 h-4 text-stone-600 dark:text-stone-300" />;
      case "WISHLIST":
        return <Heart className="w-4 h-4 text-[#C26D53]" />;
      case "EXPERIENCE":
        return <Sparkles className="w-4 h-4 text-amber-500" />;
      case "FEEDBACK":
        return <MessageSquare className="w-4 h-4 text-rose-500" />;
      case "PREFERENCE_UPDATE":
        return <RefreshCw className="w-4 h-4 text-[#C26D53]" />;
      default:
        return <Sparkles className="w-4 h-4 text-stone-500" />;
    }
  };

  const getEventBadge = (type) => {
    if (type === "PREFERENCE_UPDATE") return <Badge variant="accent" size="sm">Learned</Badge>;
    if (type === "FEEDBACK") return <Badge variant="warning" size="sm">Signal</Badge>;
    if (type === "PURCHASE") return <Badge variant="success" size="sm">Order</Badge>;
    return <Badge variant="neutral" size="sm">{type}</Badge>;
  };

  return (
    <div className="rounded-xl border border-stone-200/80 dark:border-stone-800/80 bg-white dark:bg-stone-900 p-6 shadow-2xs space-y-6">
      <div className="flex items-center justify-between border-b border-stone-100 dark:border-stone-800 pb-4">
        <div>
          <h3 className="text-base font-semibold text-stone-900 dark:text-stone-100">
            Beauty Journey Timeline
          </h3>
          <p className="text-xs text-stone-500 dark:text-stone-400">
            Complete sequence of searches, views, comparisons, purchases, feedback and graph updates
          </p>
        </div>
        <span className="text-xs text-stone-400">
          {events.length} Recorded Events
        </span>
      </div>

      {/* Timeline list */}
      <div className="relative pl-6 space-y-8 before:absolute before:left-2.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-stone-200 dark:before:bg-stone-800">
        {events.map((event, index) => {
          const isKeyUpdate = event.type === "PREFERENCE_UPDATE" || event.type === "FEEDBACK";

          return (
            <div key={event.id || index} className="relative group">
              {/* Event node dot */}
              <div className={`absolute -left-6 top-1 w-5 h-5 rounded-full flex items-center justify-center bg-white dark:bg-stone-900 border-2 transition-all ${
                isKeyUpdate
                  ? "border-[#C26D53] ring-4 ring-[#C26D53]/10"
                  : "border-stone-300 dark:border-stone-700"
              }`}>
                <div className={`w-1.5 h-1.5 rounded-full ${isKeyUpdate ? "bg-[#C26D53]" : "bg-stone-400 dark:bg-stone-500"}`} />
              </div>

              {/* Event content box */}
              <div className={`p-4 rounded-xl border transition-all ${
                isKeyUpdate
                  ? "bg-stone-50/70 dark:bg-stone-950/40 border-stone-300 dark:border-stone-700/80"
                  : "bg-white dark:bg-stone-900/60 border-stone-100 dark:border-stone-800"
              }`}>
                <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                  <div className="flex items-center gap-2">
                    <div className="p-1 rounded-md bg-stone-100 dark:bg-stone-800">
                      {getEventIcon(event.type)}
                    </div>
                    <span className="text-xs font-semibold text-stone-900 dark:text-stone-100">
                      {event.title}
                    </span>
                    {getEventBadge(event.type)}
                  </div>
                  <span className="text-[11px] text-stone-400 font-medium">
                    {event.date}
                  </span>
                </div>

                <p className="text-xs text-stone-600 dark:text-stone-300 mb-2 leading-relaxed">
                  {event.description}
                </p>

                {/* System Impact & Learning Note */}
                {event.systemImpact && (
                  <div className="pt-2 border-t border-stone-100 dark:border-stone-800/80 flex items-start gap-1.5 text-[11px]">
                    <span className="font-semibold text-[#C26D53] shrink-0">System:</span>
                    <span className="text-stone-600 dark:text-stone-400 italic">
                      {event.systemImpact}
                    </span>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
