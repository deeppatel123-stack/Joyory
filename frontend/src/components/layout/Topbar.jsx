import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Sun, Moon, Sparkles, ArrowRight, Menu } from "lucide-react";
import { useTheme } from "../../context/ThemeContext";
import { useCustomer } from "../../context/CustomerContext";

export const Topbar = ({ mode = "customer", onMenuClick }) => {
  const { isDark, toggleTheme } = useTheme();
  const { profile } = useCustomer();
  const location = useLocation();

  // Simple title generator from path
  const getPageTitle = () => {
    const parts = location.pathname.split("/").filter(Boolean);
    if (parts.length <= 1) return mode === "customer" ? "Customer Experience" : "Business Intelligence";
    const last = parts[parts.length - 1];
    return last
      .split("-")
      .map(w => w.charAt(0).toUpperCase() + w.slice(1))
      .join(" ");
  };

  return (
    <header className="h-14 border-b border-stone-200/80 dark:border-stone-800/80 bg-white/70 dark:bg-stone-900/70 backdrop-blur-md px-4 sm:px-6 flex items-center justify-between sticky top-0 z-30 transition-colors">
      <div className="flex items-center gap-3">
        <button
          onClick={onMenuClick}
          className="lg:hidden p-1.5 rounded-lg text-stone-600 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800"
          aria-label="Open sidebar"
        >
          <Menu className="w-4 h-4" />
        </button>

        <div>
          <h1 className="text-xs sm:text-sm font-semibold text-stone-900 dark:text-stone-100">
            {getPageTitle()}
          </h1>
        </div>
      </div>

      <div className="flex items-center gap-3">
        {/* Mode status badge */}
        <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-stone-100 dark:bg-stone-800 border border-stone-200/60 dark:border-stone-700/60 text-[11px] text-stone-600 dark:text-stone-300">
          <Sparkles className="w-3 h-3 text-[#C26D53]" />
          <span>{mode === "customer" ? "Continuous Learning Active" : "Aggregated Analytics"}</span>
        </div>

        {/* Theme Toggle */}
        <button
          onClick={toggleTheme}
          className="p-1.5 rounded-lg text-stone-500 hover:text-stone-800 dark:text-stone-400 dark:hover:text-stone-100 hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors"
          aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
          title={isDark ? "Switch to light mode" : "Switch to dark mode"}
        >
          {isDark ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-stone-600" />}
        </button>

        {/* Mode switcher button */}
        {mode === "customer" ? (
          <Link
            to="/business/overview"
            className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-stone-900 dark:bg-stone-100 text-stone-50 dark:text-stone-900 hover:bg-stone-800 dark:hover:bg-stone-200 transition-colors"
          >
            <span>Joyory Business</span>
            <ArrowRight className="w-3 h-3" />
          </Link>
        ) : (
          <Link
            to="/customer/discover"
            className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium border border-stone-300 dark:border-stone-700 hover:bg-stone-100 dark:hover:bg-stone-800 text-stone-800 dark:text-stone-200 transition-colors"
          >
            <span>Customer View</span>
            <ArrowRight className="w-3 h-3" />
          </Link>
        )}

        {/* User avatar / pill */}
        <div className="flex items-center gap-2 pl-2 border-l border-stone-200 dark:border-stone-800">
          <div className="w-7 h-7 rounded-full bg-stone-200 dark:bg-stone-800 text-stone-700 dark:text-stone-300 text-xs font-medium flex items-center justify-center overflow-hidden">
            {mode === "customer" && profile?.avatar ? (
              <img src={profile.avatar} alt={profile.name} className="w-full h-full object-cover" />
            ) : (
              <span>{mode === "customer" ? "AC" : "JB"}</span>
            )}
          </div>
          <span className="hidden md:block text-xs font-medium text-stone-800 dark:text-stone-200">
            {mode === "customer" ? profile?.name || "Aria Chen" : "Joyory Intelligence"}
          </span>
        </div>
      </div>
    </header>
  );
};
