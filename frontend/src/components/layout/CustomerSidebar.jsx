import React from "react";
import { NavLink, Link } from "react-router-dom";
import {
  Compass,
  Sparkles,
  User,
  GitBranch,
  Heart,
  Package,
  MessageSquare,
  ArrowUpRight,
  RotateCcw,
  RotateCw,
  Brain,
  History
} from "lucide-react";
import { useCustomer } from "../../context/CustomerContext";

export const CustomerSidebar = ({ onClose }) => {
  const { wishlist, orders, resetAllDemoData } = useCustomer();

  const navItems = [
    { label: "Discover", path: "/customer/discover", icon: Compass },
    { label: "Recommendations", path: "/customer/recommendations", icon: Sparkles },
    { label: "My Journey", path: "/customer/journey", icon: GitBranch },
    { label: "Beauty Memory", path: "/customer/beauty-memory", icon: Brain },
    { label: "Outcome Loop", path: "/customer/beauty-outcome", icon: RotateCw },
    { label: "Decision Replay", path: "/customer/decision-replay", icon: History },
    { label: "Wishlist", path: "/customer/wishlist", icon: Heart, count: wishlist?.length || 0 },
    { label: "Orders", path: "/customer/orders", icon: Package, count: orders?.length || 0 },
    { label: "Profile", path: "/customer/profile", icon: User }
  ];

  return (
    <aside className="w-64 h-screen border-r border-stone-200/80 dark:border-stone-800/80 bg-stone-50/60 dark:bg-stone-950/60 flex flex-col justify-between p-4 shrink-0">
      <div>
        {/* Brand & Mode */}
        <div className="mb-6 px-2 pt-1 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-md bg-stone-900 dark:bg-stone-100 text-white dark:text-stone-900 font-semibold text-xs flex items-center justify-center">
              J
            </div>
            <div>
              <span className="text-xs font-semibold tracking-tight text-stone-900 dark:text-stone-100 block">
                JOYORY
              </span>
              <span className="text-[10px] text-stone-400 dark:text-stone-500 block">
                Customer Experience
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
                  }`
                }
              >
                <div className="flex items-center gap-2.5">
                  <Icon className="w-4 h-4 shrink-0" />
                  <span>{item.label}</span>
                </div>
                {item.count !== undefined && item.count > 0 && (
                  <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-stone-200 dark:bg-stone-800 text-stone-700 dark:text-stone-300">
                    {item.count}
                  </span>
                )}
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

      {/* Bottom Switcher & Reset */}
      <div className="pt-4 border-t border-stone-200/80 dark:border-stone-800/80 space-y-2">
        <Link
          to="/business/overview"
          className="flex items-center justify-between w-full px-3 py-2 rounded-lg bg-stone-100 dark:bg-stone-900 hover:bg-stone-200/70 dark:hover:bg-stone-800 text-xs font-medium text-stone-700 dark:text-stone-300 transition-colors"
        >
          <span>Joyory Business</span>
          <ArrowUpRight className="w-3.5 h-3.5 text-stone-400" />
        </Link>

        <button
          onClick={resetAllDemoData}
          className="w-full flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-lg text-[11px] text-stone-500 dark:text-stone-400 hover:text-stone-800 dark:hover:text-stone-200 hover:bg-stone-100 dark:hover:bg-stone-900 transition-colors cursor-pointer"
          title="Recalibrate learned preferences and reset graph weights"
        >
          <RotateCcw className="w-3 h-3" />
          <span>Recalibrate Preferences</span>
        </button>
      </div>
    </aside>
  );
};
