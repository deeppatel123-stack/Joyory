import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Sparkles,
  Moon,
  Sun,
  Heart,
  ShoppingBag,
  ArrowRight,
  Menu,
  X,
  User,
  LogIn,
  LogOut,
  ShieldCheck,
  ChevronDown
} from "lucide-react";
import { useTheme } from "../../context/ThemeContext";
import { useCustomer } from "../../context/CustomerContext";
import { useAuth } from "../../context/AuthContext";

export const PublicNavbar = () => {
  const { isDark, toggleTheme } = useTheme();
  const { wishlist, cartCount, compareList } = useCustomer();
  const { user, isAuthenticated, isAdmin, logout } = useAuth();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);

  const navLinks = [
    { label: "Discover", path: "/discover" },
    { label: "Products", path: "/products" },
    { label: "Compare", path: "/compare", count: compareList?.length || 0 },
    { label: "About", path: "/about" }
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <header className="sticky top-0 z-40 w-full border-b border-stone-200/80 dark:border-stone-800/80 bg-stone-50/90 dark:bg-stone-950/90 backdrop-blur-md transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand */}
        <Link to="/" className="flex items-center gap-2.5 group">
          <div className="w-8 h-8 rounded-lg bg-stone-900 dark:bg-stone-100 flex items-center justify-center text-white dark:text-stone-900 font-semibold text-sm transition-transform group-hover:scale-95 shadow-xs">
            J
          </div>
          <div>
            <span className="text-sm font-semibold tracking-tight text-stone-900 dark:text-stone-100 block">
              JOYORY
            </span>
            <span className="text-[10px] uppercase tracking-wider text-stone-500 dark:text-stone-400 -mt-0.5 block font-medium">
              Beauty Journey Intelligence
            </span>
          </div>
        </Link>

        {/* Desktop Nav Links */}
        <nav className="hidden md:flex items-center gap-1 text-xs font-medium text-stone-600 dark:text-stone-300">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`px-3 py-1.5 rounded-md transition-colors relative ${
                isActive(link.path)
                  ? "text-stone-900 dark:text-stone-100 bg-stone-200/60 dark:bg-stone-800"
                  : "hover:text-stone-900 dark:hover:text-stone-100 hover:bg-stone-100 dark:hover:bg-stone-800/60"
              }`}
            >
              {link.label}
              {link.count > 0 && (
                <span className="ml-1.5 px-1.5 py-0.2 rounded-full text-[10px] bg-stone-200 dark:bg-stone-700 text-stone-800 dark:text-stone-200 font-normal">
                  {link.count}
                </span>
              )}
            </Link>
          ))}
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-2">
          {/* Theme toggle */}
          <button
            onClick={toggleTheme}
            className="p-2 rounded-lg text-stone-500 hover:text-stone-800 dark:text-stone-400 dark:hover:text-stone-100 hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors"
            aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
            title={isDark ? "Switch to light mode" : "Switch to dark mode"}
          >
            {isDark ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-stone-600" />}
          </button>

          {/* Wishlist */}
          <Link
            to="/customer/wishlist"
            className="p-2 rounded-lg text-stone-500 hover:text-stone-800 dark:text-stone-400 dark:hover:text-stone-100 hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors relative"
            title="Wishlist"
          >
            <Heart className="w-4 h-4" />
            {wishlist?.length > 0 && (
              <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-[#C26D53]" />
            )}
          </Link>

          {/* Bag / Cart */}
          <Link
            to="/cart"
            className="p-2 rounded-lg text-stone-500 hover:text-stone-800 dark:text-stone-400 dark:hover:text-stone-100 hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors relative"
            title="Shopping Bag"
          >
            <ShoppingBag className="w-4 h-4" />
            {cartCount > 0 && (
              <span className="absolute top-1 right-1 px-1.5 py-0.2 rounded-full text-[9px] bg-[#C26D53] text-white font-medium">
                {cartCount}
              </span>
            )}
          </Link>

          {/* User Auth / Profile Dropdown */}
          {isAuthenticated ? (
            <div className="relative pl-1">
              <button
                onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                className="flex items-center gap-2 p-1.5 pr-2.5 rounded-lg border border-stone-200 dark:border-stone-800 hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors text-xs font-medium text-stone-800 dark:text-stone-200"
              >
                <div className="w-6 h-6 rounded-md bg-[#C26D53] text-white flex items-center justify-center text-[10px] font-bold">
                  {user?.name?.charAt(0)?.toUpperCase() || "U"}
                </div>
                <span className="max-w-[80px] truncate hidden sm:inline">{user?.name?.split(" ")[0]}</span>
                <ChevronDown className="w-3 h-3 text-stone-400" />
              </button>

              {userDropdownOpen && (
                <>
                  <div
                    className="fixed inset-0 z-40"
                    onClick={() => setUserDropdownOpen(false)}
                  />
                  <div className="absolute right-0 mt-2 w-52 bg-white dark:bg-stone-900 rounded-xl shadow-lg border border-stone-200 dark:border-stone-800 py-1.5 z-50 text-xs text-stone-700 dark:text-stone-200 animate-in fade-in zoom-in-95 duration-100">
                    <div className="px-3 py-2 border-b border-stone-100 dark:border-stone-800">
                      <p className="font-semibold text-stone-900 dark:text-stone-100 truncate">{user?.name}</p>
                      <p className="text-[11px] text-stone-400 truncate">{user?.email}</p>
                      <span className="inline-block mt-1 px-1.5 py-0.5 rounded text-[10px] bg-stone-100 dark:bg-stone-800 font-medium capitalize text-stone-600 dark:text-stone-300">
                        {user?.role}
                      </span>
                    </div>

                    {isAdmin && (
                      <Link
                        to="/admin"
                        onClick={() => setUserDropdownOpen(false)}
                        className="flex items-center gap-2 px-3 py-2 hover:bg-stone-100 dark:hover:bg-stone-800 font-medium text-amber-700 dark:text-amber-400"
                      >
                        <ShieldCheck className="w-3.5 h-3.5" />
                        Admin Management Suite
                      </Link>
                    )}

                    <Link
                      to="/customer/profile"
                      onClick={() => setUserDropdownOpen(false)}
                      className="flex items-center gap-2 px-3 py-2 hover:bg-stone-100 dark:hover:bg-stone-800"
                    >
                      <User className="w-3.5 h-3.5 text-stone-400" />
                      Beauty Profile & Passport
                    </Link>

                    <Link
                      to="/customer/orders"
                      onClick={() => setUserDropdownOpen(false)}
                      className="flex items-center gap-2 px-3 py-2 hover:bg-stone-100 dark:hover:bg-stone-800"
                    >
                      <ShoppingBag className="w-3.5 h-3.5 text-stone-400" />
                      My Orders & Bag
                    </Link>

                    <div className="border-t border-stone-100 dark:border-stone-800 my-1" />

                    <button
                      onClick={() => {
                        setUserDropdownOpen(false);
                        logout();
                      }}
                      className="w-full flex items-center gap-2 px-3 py-2 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/30 text-left"
                    >
                      <LogOut className="w-3.5 h-3.5" />
                      Sign Out
                    </button>
                  </div>
                </>
              )}
            </div>
          ) : (
            <div className="hidden sm:flex items-center gap-1.5 pl-1">
              <Link
                to="/login"
                className="px-2.5 py-1.5 rounded-lg text-xs font-medium text-stone-700 dark:text-stone-300 hover:text-stone-900 dark:hover:text-stone-100 hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors"
              >
                Sign In
              </Link>
              <Link
                to="/signup"
                className="px-3 py-1.5 rounded-lg text-xs font-medium bg-[#C26D53] text-white hover:bg-[#B05B42] transition-colors shadow-xs"
              >
                Join Joyory
              </Link>
            </div>
          )}

          {/* Portal Switchers */}
          <div className="hidden lg:flex items-center gap-2 pl-2 border-l border-stone-200 dark:border-stone-800">
            <Link
              to="/customer/discover"
              className="px-3 py-1.5 rounded-lg text-xs font-medium text-stone-700 dark:text-stone-300 hover:text-stone-900 dark:hover:text-stone-100 hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors"
            >
              Customer App
            </Link>
            <Link
              to="/business/overview"
              className="px-3 py-1.5 rounded-lg text-xs font-medium bg-stone-900 dark:bg-stone-100 text-stone-50 dark:text-stone-900 hover:bg-stone-800 dark:hover:bg-stone-200 transition-colors inline-flex items-center gap-1.5"
            >
              Business Portal
              <ArrowRight className="w-3 h-3" />
            </Link>
          </div>

          {/* Mobile menu trigger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg text-stone-600 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900 px-4 py-4 space-y-2">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-lg text-sm text-stone-700 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800"
            >
              {link.label} {link.count > 0 ? `(${link.count})` : ""}
            </Link>
          ))}

          <Link
            to="/cart"
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center justify-between px-3 py-2 rounded-lg text-sm text-stone-700 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800"
          >
            <span className="flex items-center gap-2">
              <ShoppingBag className="w-4 h-4" />
              Shopping Bag
            </span>
            {cartCount > 0 && (
              <span className="px-2 py-0.5 rounded-full text-xs bg-[#C26D53] text-white">
                {cartCount}
              </span>
            )}
          </Link>

          {/* Mobile Auth options */}
          <div className="pt-2 pb-1 border-t border-stone-100 dark:border-stone-800">
            {isAuthenticated ? (
              <div className="space-y-1">
                <div className="px-3 py-1.5 text-xs text-stone-400">
                  Signed in as <span className="font-semibold text-stone-800 dark:text-stone-200">{user?.name}</span>
                </div>
                {isAdmin && (
                  <Link
                    to="/admin"
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-amber-700 dark:text-amber-400 font-medium hover:bg-stone-100 dark:hover:bg-stone-800"
                  >
                    <ShieldCheck className="w-4 h-4" />
                    Admin Suite
                  </Link>
                )}
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    logout();
                  }}
                  className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-red-600 dark:text-red-400 hover:bg-stone-100 dark:hover:bg-stone-800 text-left"
                >
                  <LogOut className="w-4 h-4" />
                  Sign Out
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-2 pt-1">
                <Link
                  to="/login"
                  onClick={() => setMobileMenuOpen(false)}
                  className="px-3 py-2 rounded-lg text-sm text-center font-medium border border-stone-200 dark:border-stone-700 text-stone-800 dark:text-stone-200"
                >
                  Sign In
                </Link>
                <Link
                  to="/signup"
                  onClick={() => setMobileMenuOpen(false)}
                  className="px-3 py-2 rounded-lg text-sm text-center font-medium bg-[#C26D53] text-white"
                >
                  Join Joyory
                </Link>
              </div>
            )}
          </div>

          <div className="pt-2 border-t border-stone-100 dark:border-stone-800 flex flex-col gap-2">
            <Link
              to="/customer/discover"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-lg text-sm text-stone-700 dark:text-stone-300 bg-stone-100 dark:bg-stone-800 text-center font-medium"
            >
              Enter Customer Experience
            </Link>
            <Link
              to="/business/overview"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-lg text-sm bg-stone-900 dark:bg-stone-100 text-white dark:text-stone-900 text-center font-medium"
            >
              Enter Joyory Business Intelligence
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};
