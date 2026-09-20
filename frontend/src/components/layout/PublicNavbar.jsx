import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  Sun,
  Moon,
  Heart,
  ShoppingBag,
  Menu,
  X,
  LogOut,
  ChevronDown,
  ShieldCheck
} from "lucide-react";
import { useTheme } from "../../context/ThemeContext";
import { useCustomer } from "../../context/CustomerContext";
import { useAuth } from "../../context/AuthContext";
import { Button } from "../common/Button";

export const PublicNavbar = () => {
  const { isDark, toggleTheme } = useTheme();
  const { wishlist, cartCount } = useCustomer();
  const { user, isAuthenticated, isAdmin, isCustomer, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);

  const isActive = (path) => location.pathname === path;

  const handleLogout = () => {
    logout();
    setUserDropdownOpen(false);
    setMobileMenuOpen(false);
    navigate("/login");
  };

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
          <Link
            to="/products"
            className={`px-3 py-1.5 rounded-md transition-colors ${
              isActive("/products")
                ? "text-stone-900 dark:text-stone-100 bg-stone-200/60 dark:bg-stone-800 font-semibold"
                : "hover:text-stone-900 dark:hover:text-stone-100 hover:bg-stone-100 dark:hover:bg-stone-800/60"
            }`}
          >
            Products
          </Link>

          <Link
            to="/compare"
            className={`px-3 py-1.5 rounded-md transition-colors ${
              isActive("/compare")
                ? "text-stone-900 dark:text-stone-100 bg-stone-200/60 dark:bg-stone-800 font-semibold"
                : "hover:text-stone-900 dark:hover:text-stone-100 hover:bg-stone-100 dark:hover:bg-stone-800/60"
            }`}
          >
            Compare
          </Link>

          <Link
            to="/about"
            className={`px-3 py-1.5 rounded-md transition-colors ${
              isActive("/about")
                ? "text-stone-900 dark:text-stone-100 bg-stone-200/60 dark:bg-stone-800 font-semibold"
                : "hover:text-stone-900 dark:hover:text-stone-100 hover:bg-stone-100 dark:hover:bg-stone-800/60"
            }`}
          >
            About
          </Link>

          {/* Customer only link */}
          {isAuthenticated && isCustomer && (
            <Link
              to="/customer/discover"
              className={`px-3 py-1.5 rounded-md transition-colors ${
                isActive("/customer/discover")
                  ? "text-stone-900 dark:text-stone-100 bg-stone-200/60 dark:bg-stone-800 font-semibold"
                  : "hover:text-stone-900 dark:hover:text-stone-100 hover:bg-stone-100 dark:hover:bg-stone-800/60 text-[#C26D53]"
              }`}
            >
              Discover
            </Link>
          )}

          {/* Admin only link */}
          {isAuthenticated && isAdmin && (
            <Link
              to="/admin"
              className={`px-3 py-1.5 rounded-md transition-colors ${
                isActive("/admin")
                  ? "text-stone-900 dark:text-stone-100 bg-stone-200/60 dark:bg-stone-800 font-semibold"
                  : "hover:text-stone-900 dark:hover:text-stone-100 hover:bg-stone-100 dark:hover:bg-stone-800/60 text-[#C26D53] font-semibold"
              }`}
            >
              Admin Portal
            </Link>
          )}
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-2">
          {/* Theme toggle */}
          <button
            onClick={toggleTheme}
            className="p-2 rounded-lg text-stone-500 hover:text-stone-800 dark:text-stone-400 dark:hover:text-stone-100 hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors cursor-pointer"
            aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
            title={isDark ? "Switch to light mode" : "Switch to dark mode"}
          >
            {isDark ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-stone-600" />}
          </button>

          {/* 1. PUBLIC (UNAUTHENTICATED) ACTIONS */}
          {!isAuthenticated && (
            <div className="hidden sm:flex items-center gap-2">
              <Link
                to="/login"
                className="px-3 py-1.5 text-xs font-medium text-stone-600 dark:text-stone-300 hover:text-stone-950 dark:hover:text-stone-100 transition-colors"
              >
                Sign In
              </Link>
              <Link to="/signup">
                <Button size="sm" variant="primary">
                  Join Joyory
                </Button>
              </Link>
            </div>
          )}

          {/* 2. CUSTOMER AUTHENTICATED ACTIONS */}
          {isAuthenticated && isCustomer && (
            <>
              {/* Wishlist */}
              <Link
                to="/customer/wishlist"
                className="p-2 rounded-lg text-stone-500 hover:text-stone-800 dark:text-stone-400 dark:hover:text-stone-100 hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors relative"
                title="Wishlist"
                aria-label="Wishlist"
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
                aria-label="Shopping Bag"
              >
                <ShoppingBag className="w-4 h-4" />
                {cartCount > 0 && (
                  <span className="absolute top-1 right-1 px-1.5 py-0.2 rounded-full text-[9px] bg-[#C26D53] text-white font-medium">
                    {cartCount}
                  </span>
                )}
              </Link>

              {/* Customer Profile Dropdown */}
              <div className="relative pl-1">
                <button
                  onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                  className="flex items-center gap-2 p-1.5 pr-2.5 rounded-lg border border-stone-200 dark:border-stone-800 hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors text-xs font-medium text-stone-800 dark:text-stone-200 cursor-pointer"
                >
                  <div className="w-6 h-6 rounded-md bg-[#C26D53] text-white flex items-center justify-center text-[10px] font-bold">
                    {user?.name?.charAt(0)?.toUpperCase() || "C"}
                  </div>
                  <span className="max-w-[90px] truncate hidden sm:inline">{user?.name?.split(" ")[0]}</span>
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
                      </div>

                      <Link
                        to="/customer/discover"
                        onClick={() => setUserDropdownOpen(false)}
                        className="flex items-center gap-2 px-3 py-2 hover:bg-stone-100 dark:hover:bg-stone-800 text-stone-700 dark:text-stone-200"
                      >
                        Discover
                      </Link>
                      <Link
                        to="/customer/journey"
                        onClick={() => setUserDropdownOpen(false)}
                        className="flex items-center gap-2 px-3 py-2 hover:bg-stone-100 dark:hover:bg-stone-800 text-stone-700 dark:text-stone-200"
                      >
                        My Journey
                      </Link>
                      <Link
                        to="/customer/beauty-memory"
                        onClick={() => setUserDropdownOpen(false)}
                        className="flex items-center gap-2 px-3 py-2 hover:bg-stone-100 dark:hover:bg-stone-800 text-stone-700 dark:text-stone-200"
                      >
                        Beauty Memory
                      </Link>
                      <Link
                        to="/customer/wishlist"
                        onClick={() => setUserDropdownOpen(false)}
                        className="flex items-center gap-2 px-3 py-2 hover:bg-stone-100 dark:hover:bg-stone-800 text-stone-700 dark:text-stone-200"
                      >
                        Wishlist
                      </Link>
                      <Link
                        to="/customer/orders"
                        onClick={() => setUserDropdownOpen(false)}
                        className="flex items-center gap-2 px-3 py-2 hover:bg-stone-100 dark:hover:bg-stone-800 text-stone-700 dark:text-stone-200"
                      >
                        Orders
                      </Link>
                      <Link
                        to="/customer/profile"
                        onClick={() => setUserDropdownOpen(false)}
                        className="flex items-center gap-2 px-3 py-2 hover:bg-stone-100 dark:hover:bg-stone-800 text-stone-700 dark:text-stone-200"
                      >
                        Profile
                      </Link>

                      <div className="pt-1 mt-1 border-t border-stone-100 dark:border-stone-800">
                        <button
                          onClick={handleLogout}
                          className="w-full flex items-center gap-2 px-3 py-2 text-stone-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950/40 text-left transition-colors cursor-pointer"
                        >
                          <LogOut className="w-3.5 h-3.5" />
                          <span>Logout</span>
                        </button>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </>
          )}

          {/* 3. ADMIN AUTHENTICATED ACTIONS */}
          {isAuthenticated && isAdmin && (
            <div className="flex items-center gap-2 pl-2 border-l border-stone-200 dark:border-stone-800">
              <Link
                to="/admin"
                className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-stone-100 dark:bg-stone-800 text-xs font-semibold text-stone-800 dark:text-stone-200 hover:bg-stone-200 dark:hover:bg-stone-700 transition-colors"
              >
                <ShieldCheck className="w-3.5 h-3.5 text-[#C26D53]" />
                <span className="hidden sm:inline">Admin</span>
              </Link>
              <button
                onClick={handleLogout}
                className="p-1.5 rounded-lg text-stone-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950/40 transition-colors cursor-pointer"
                title="Logout"
                aria-label="Logout"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          )}

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg text-stone-600 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800 cursor-pointer"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-stone-200 dark:border-stone-800 bg-stone-50 dark:bg-stone-950 px-4 py-4 space-y-3">
          <nav className="flex flex-col space-y-1">
            <Link
              to="/products"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-lg text-xs font-medium text-stone-800 dark:text-stone-200 hover:bg-stone-100 dark:hover:bg-stone-800"
            >
              Products
            </Link>
            <Link
              to="/compare"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-lg text-xs font-medium text-stone-800 dark:text-stone-200 hover:bg-stone-100 dark:hover:bg-stone-800"
            >
              Compare
            </Link>
            <Link
              to="/about"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-lg text-xs font-medium text-stone-800 dark:text-stone-200 hover:bg-stone-100 dark:hover:bg-stone-800"
            >
              About
            </Link>

            {/* Customer mobile links */}
            {isAuthenticated && isCustomer && (
              <>
                <Link
                  to="/customer/discover"
                  onClick={() => setMobileMenuOpen(false)}
                  className="px-3 py-2 rounded-lg text-xs font-medium text-stone-800 dark:text-stone-200 hover:bg-stone-100 dark:hover:bg-stone-800"
                >
                  Discover
                </Link>
                <Link
                  to="/customer/journey"
                  onClick={() => setMobileMenuOpen(false)}
                  className="px-3 py-2 rounded-lg text-xs font-medium text-stone-800 dark:text-stone-200 hover:bg-stone-100 dark:hover:bg-stone-800"
                >
                  My Journey
                </Link>
                <Link
                  to="/customer/beauty-memory"
                  onClick={() => setMobileMenuOpen(false)}
                  className="px-3 py-2 rounded-lg text-xs font-medium text-stone-800 dark:text-stone-200 hover:bg-stone-100 dark:hover:bg-stone-800"
                >
                  Beauty Memory
                </Link>
                <Link
                  to="/customer/wishlist"
                  onClick={() => setMobileMenuOpen(false)}
                  className="px-3 py-2 rounded-lg text-xs font-medium text-stone-800 dark:text-stone-200 hover:bg-stone-100 dark:hover:bg-stone-800"
                >
                  Wishlist ({wishlist?.length || 0})
                </Link>
                <Link
                  to="/customer/orders"
                  onClick={() => setMobileMenuOpen(false)}
                  className="px-3 py-2 rounded-lg text-xs font-medium text-stone-800 dark:text-stone-200 hover:bg-stone-100 dark:hover:bg-stone-800"
                >
                  Orders
                </Link>
                <Link
                  to="/customer/profile"
                  onClick={() => setMobileMenuOpen(false)}
                  className="px-3 py-2 rounded-lg text-xs font-medium text-stone-800 dark:text-stone-200 hover:bg-stone-100 dark:hover:bg-stone-800"
                >
                  Profile
                </Link>
                <Link
                  to="/cart"
                  onClick={() => setMobileMenuOpen(false)}
                  className="px-3 py-2 rounded-lg text-xs font-medium text-stone-800 dark:text-stone-200 hover:bg-stone-100 dark:hover:bg-stone-800"
                >
                  Shopping Bag ({cartCount})
                </Link>
              </>
            )}

            {/* Admin mobile links */}
            {isAuthenticated && isAdmin && (
              <Link
                to="/admin"
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 rounded-lg text-xs font-medium text-[#C26D53] hover:bg-stone-100 dark:hover:bg-stone-800 font-semibold"
              >
                Admin Portal
              </Link>
            )}
          </nav>

          <div className="pt-3 border-t border-stone-200 dark:border-stone-800">
            {isAuthenticated ? (
              <button
                onClick={handleLogout}
                className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-lg text-xs font-medium text-red-600 bg-red-50 dark:bg-red-950/40"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>Logout</span>
              </button>
            ) : (
              <div className="grid grid-cols-2 gap-2">
                <Link
                  to="/login"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-center px-3 py-2 rounded-lg text-xs font-medium border border-stone-200 dark:border-stone-800 text-stone-800 dark:text-stone-200"
                >
                  Sign In
                </Link>
                <Link
                  to="/signup"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-center px-3 py-2 rounded-lg text-xs font-medium bg-[#C26D53] text-white"
                >
                  Join Joyory
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
};
