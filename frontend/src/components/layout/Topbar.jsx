import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Sun, Moon, Heart, ShoppingBag, LogOut, Menu } from "lucide-react";
import { useTheme } from "../../context/ThemeContext";
import { useCustomer } from "../../context/CustomerContext";
import { useAuth } from "../../context/AuthContext";

export const Topbar = ({ mode = "customer", onMenuClick }) => {
  const { isDark, toggleTheme } = useTheme();
  const { profile, wishlist, bag } = useCustomer();
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const getPageTitle = () => {
    const parts = location.pathname.split("/").filter(Boolean);
    if (parts.length <= 1) return mode === "customer" ? "Discover" : "Admin";
    const last = parts[parts.length - 1];
    return last
      .split("-")
      .map(w => w.charAt(0).toUpperCase() + w.slice(1))
      .join(" ");
  };

  const customerName = user?.name || profile?.name || "Customer";
  const wishlistCount = wishlist?.length || 0;
  const bagCount = bag?.reduce((acc, item) => acc + (item.quantity || 1), 0) || 0;

  return (
    <header className="h-14 border-b border-stone-200/80 dark:border-stone-800/80 bg-white/80 dark:bg-stone-900/80 backdrop-blur-md px-4 sm:px-6 flex items-center justify-between sticky top-0 z-30 transition-colors">
      <div className="flex items-center gap-3">
        <button
          onClick={onMenuClick}
          className="lg:hidden p-1.5 rounded-lg text-stone-600 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800 cursor-pointer"
          aria-label="Open sidebar"
        >
          <Menu className="w-4 h-4" />
        </button>

        <h1 className="text-xs sm:text-sm font-semibold text-stone-900 dark:text-stone-100">
          {getPageTitle()}
        </h1>
      </div>

      <div className="flex items-center gap-2 sm:gap-3">
        {/* Theme Toggle */}
        <button
          onClick={toggleTheme}
          className="p-2 rounded-lg text-stone-500 hover:text-stone-800 dark:text-stone-400 dark:hover:text-stone-100 hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors cursor-pointer"
          aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
          title={isDark ? "Switch to light mode" : "Switch to dark mode"}
        >
          {isDark ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-stone-600" />}
        </button>

        {mode === "customer" && (
          <>
            {/* Wishlist */}
            <Link
              to="/customer/wishlist"
              className="relative p-2 rounded-lg text-stone-500 hover:text-stone-800 dark:text-stone-400 dark:hover:text-stone-100 hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors"
              title="Wishlist"
              aria-label="Wishlist"
            >
              <Heart className="w-4 h-4" />
              {wishlistCount > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 bg-[#C26D53] text-white text-[9px] font-bold rounded-full flex items-center justify-center">
                  {wishlistCount}
                </span>
              )}
            </Link>

            {/* Cart */}
            <Link
              to="/cart"
              className="relative p-2 rounded-lg text-stone-500 hover:text-stone-800 dark:text-stone-400 dark:hover:text-stone-100 hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors"
              title="Shopping Cart"
              aria-label="Cart"
            >
              <ShoppingBag className="w-4 h-4" />
              {bagCount > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 bg-stone-900 dark:bg-stone-100 text-white dark:text-stone-900 text-[9px] font-bold rounded-full flex items-center justify-center">
                  {bagCount}
                </span>
              )}
            </Link>

            {/* Customer Profile link */}
            <Link
              to="/customer/profile"
              className="flex items-center gap-2 pl-2 border-l border-stone-200 dark:border-stone-800 hover:opacity-80 transition-opacity"
              title="My Profile"
            >
              <div className="w-7 h-7 rounded-full bg-[#C26D53]/15 text-[#C26D53] text-xs font-bold flex items-center justify-center">
                {customerName.charAt(0)}
              </div>
              <span className="hidden md:block text-xs font-medium text-stone-800 dark:text-stone-200 max-w-[120px] truncate">
                {customerName}
              </span>
            </Link>

            {/* Logout button */}
            <button
              onClick={handleLogout}
              className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium text-stone-500 hover:text-stone-900 dark:text-stone-400 dark:hover:text-stone-100 hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors cursor-pointer ml-1"
              title="Log out"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Logout</span>
            </button>
          </>
        )}

        {mode !== "customer" && (
          <button
            onClick={handleLogout}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-stone-500 hover:text-stone-900 dark:text-stone-400 dark:hover:text-stone-100 hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors cursor-pointer"
            title="Log out"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Logout</span>
          </button>
        )}
      </div>
    </header>
  );
};
