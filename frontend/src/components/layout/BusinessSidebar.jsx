import React from "react";
import { NavLink, Link } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  TrendingUp,
  PackageSearch,
  PieChart,
  Filter,
  MessageSquareQuote,
  Flame,
  LineChart,
  Settings,
  ArrowUpRight,
  Radar
} from "lucide-react";

export const BusinessSidebar = ({ onClose }) => {
  const navItems = [
    { label: "Overview", path: "/business/overview", icon: LayoutDashboard },
    { label: "Need Gap Radar", path: "/business/need-gaps", icon: Radar, badge: "Radar", highlight: true },
    { label: "Unmet Need Detector", path: "/business/opportunities", icon: Flame, badge: "Core" },
    { label: "Customer Insights", path: "/business/customer-insights", icon: Users },
    { label: "Search Trends", path: "/business/search-trends", icon: TrendingUp },
    { label: "Product Intelligence", path: "/business/product-intelligence", icon: PackageSearch },
    { label: "Customer Segments", path: "/business/customer-segments", icon: PieChart },
    { label: "Shopping Funnel", path: "/business/funnel", icon: Filter },
    { label: "Feedback Intelligence", path: "/business/feedback-intelligence", icon: MessageSquareQuote },
    { label: "Recommendation Analytics", path: "/business/recommendation-analytics", icon: LineChart },
    { label: "Settings & Privacy", path: "/business/settings", icon: Settings }
  ];

  return (
    <aside className="w-64 h-screen border-r border-stone-200/80 dark:border-stone-800/80 bg-stone-50/70 dark:bg-stone-950/70 flex flex-col justify-between p-4 shrink-0">
      <div>
        {/* Brand & Suite */}
        <div className="mb-6 px-2 pt-1">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-md bg-[#C26D53] text-white font-semibold text-xs flex items-center justify-center">
              J
            </div>
            <div>
              <span className="text-xs font-semibold tracking-tight text-stone-900 dark:text-stone-100 block">
                JOYORY
              </span>
              <span className="text-[10px] text-stone-400 dark:text-stone-500 block uppercase tracking-wider font-medium">
                Business Intelligence
              </span>
            </div>
          </Link>
        </div>

        {/* Navigation list */}
        <nav className="space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={onClose}
                className={({ isActive }) =>
                  `flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium transition-colors ${
                    isActive
                      ? "bg-stone-200/70 dark:bg-stone-800/90 text-stone-950 dark:text-stone-50 font-semibold shadow-2xs"
                      : "text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-200 hover:bg-stone-100 dark:hover:bg-stone-900/60"
                  } ${item.highlight ? "border-l-2 border-[#C26D53] pl-2.5" : ""}`
                }
              >
                <div className="flex items-center gap-2.5">
                  <Icon className={`w-4 h-4 shrink-0 ${item.highlight ? "text-[#C26D53]" : ""}`} />
                  <span>{item.label}</span>
                </div>
                {item.badge && (
                  <span className="text-[9px] px-1.5 py-0.2 rounded-sm bg-[#C26D53]/15 text-[#C26D53] font-medium uppercase tracking-wider">
                    {item.badge}
                  </span>
                )}
              </NavLink>
            );
          })}
        </nav>
      </div>

      {/* Logout */}
      <div className="pt-4 border-t border-stone-200/80 dark:border-stone-800/80">
        <Link
          to="/login"
          className="flex items-center justify-between w-full px-3 py-2 rounded-lg bg-stone-100 dark:bg-stone-900 hover:bg-stone-200/70 dark:hover:bg-stone-800 text-xs font-medium text-stone-700 dark:text-stone-300 transition-colors"
        >
          <span>Logout</span>
        </Link>
      </div>
    </aside>
  );
};
