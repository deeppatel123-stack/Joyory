import React from "react";
import { Link } from "react-router-dom";
import { Sparkles, ShieldCheck, Heart, ArrowRight } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="border-t border-stone-200/80 dark:border-stone-800/80 bg-stone-100/50 dark:bg-stone-900/40 text-stone-600 dark:text-stone-400 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 lg:gap-12">
          {/* Brand Col */}
          <div className="col-span-2 space-y-4">
            <Link to="/" className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-stone-900 dark:bg-stone-100 flex items-center justify-center text-white dark:text-stone-900 font-bold text-sm shadow-xs">
                J
              </div>
              <div>
                <span className="text-sm font-semibold tracking-tight text-stone-950 dark:text-stone-50 block">
                  JOYORY
                </span>
                <span className="text-[10px] uppercase tracking-wider text-stone-500 dark:text-stone-400 -mt-0.5 block font-medium">
                  Beauty Journey Intelligence
                </span>
              </div>
            </Link>

            <p className="text-xs text-stone-500 dark:text-stone-400 max-w-sm leading-relaxed">
              A smarter beauty shopping experience that continuously learns from what you discover, choose and experience.
            </p>

            <div className="pt-1 flex items-center gap-4 text-xs text-stone-500 dark:text-stone-400">
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                <span>Verified Clean Actives</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-[#C26D53]" />
                <span>Adaptive Profiling</span>
              </div>
            </div>
          </div>

          {/* Discover */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-stone-900 dark:text-stone-100">
              Discover
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link to="/products" className="hover:text-stone-900 dark:hover:text-stone-100 transition-colors">
                  All Formulations
                </Link>
              </li>
              <li>
                <Link to="/products?category=Skincare" className="hover:text-stone-900 dark:hover:text-stone-100 transition-colors">
                  Skincare
                </Link>
              </li>
              <li>
                <Link to="/products?category=Makeup" className="hover:text-stone-900 dark:hover:text-stone-100 transition-colors">
                  Makeup
                </Link>
              </li>
              <li>
                <Link to="/products?category=Hair" className="hover:text-stone-900 dark:hover:text-stone-100 transition-colors">
                  Hair Care
                </Link>
              </li>
              <li>
                <Link to="/products?category=Body" className="hover:text-stone-900 dark:hover:text-stone-100 transition-colors">
                  Body Care
                </Link>
              </li>
              <li>
                <Link to="/compare" className="hover:text-stone-900 dark:hover:text-stone-100 transition-colors">
                  Side-by-Side Compare
                </Link>
              </li>
            </ul>
          </div>

          {/* Beauty Journey */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-stone-900 dark:text-stone-100">
              Beauty Journey
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link to="/customer/discover" className="hover:text-stone-900 dark:hover:text-stone-100 transition-colors">
                  Smart Discovery
                </Link>
              </li>
              <li>
                <Link to="/customer/beauty-memory" className="hover:text-stone-900 dark:hover:text-stone-100 transition-colors">
                  Personal Beauty Passport
                </Link>
              </li>
              <li>
                <Link to="/customer/beauty-outcome" className="hover:text-stone-900 dark:hover:text-stone-100 transition-colors">
                  Beauty Outcome Loop
                </Link>
              </li>
              <li>
                <Link to="/customer/decision-replay" className="hover:text-stone-900 dark:hover:text-stone-100 transition-colors">
                  Decision Replay
                </Link>
              </li>
              <li>
                <Link to="/customer/profile" className="hover:text-stone-900 dark:hover:text-stone-100 transition-colors">
                  Preference Profile
                </Link>
              </li>
            </ul>
          </div>

          {/* Company & Support */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-stone-900 dark:text-stone-100">
              About & Care
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link to="/about" className="hover:text-stone-900 dark:hover:text-stone-100 transition-colors">
                  About Joyory
                </Link>
              </li>
              <li>
                <Link to="/customer/orders" className="hover:text-stone-900 dark:hover:text-stone-100 transition-colors">
                  Track Orders
                </Link>
              </li>
              <li>
                <Link to="/customer/wishlist" className="hover:text-stone-900 dark:hover:text-stone-100 transition-colors">
                  Saved Wishlist
                </Link>
              </li>
              <li>
                <span className="hover:text-stone-900 dark:hover:text-stone-100 transition-colors cursor-pointer">
                  Privacy Policy
                </span>
              </li>
              <li>
                <span className="hover:text-stone-900 dark:hover:text-stone-100 transition-colors cursor-pointer">
                  Terms of Service
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-8 border-t border-stone-200/80 dark:border-stone-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-500 dark:text-stone-400">
          <p>© 2026 JOYORY. All rights reserved. A smarter beauty shopping experience.</p>
          <div className="flex items-center gap-6">
            <span className="hover:text-stone-900 dark:hover:text-stone-100 transition-colors cursor-pointer">Privacy</span>
            <span className="hover:text-stone-900 dark:hover:text-stone-100 transition-colors cursor-pointer">Terms</span>
            <span className="hover:text-stone-900 dark:hover:text-stone-100 transition-colors cursor-pointer">Security</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
