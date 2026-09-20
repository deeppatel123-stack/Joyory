import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useCustomer } from "../../context/CustomerContext";
import { User, Mail, MapPin, Sparkles, Shield, Heart, ArrowRight } from "lucide-react";
import { Badge } from "../../components/common/Badge";

export const BeautyProfilePage = () => {
  const { user } = useAuth();
  const { profile } = useCustomer();

  const stated = profile?.statedPreferences || {
    skinType: "Oily / Combination",
    primaryGoal: "Hydration & Oil Control",
    budgetRange: "₹500 - ₹1,000",
    fragrance: "Low / None",
    routine: "Minimal (3 steps)"
  };

  const displayName = user?.name || "Aria Chen";
  const displayEmail = user?.email || "aria.chen@joyory.com";

  return (
    <div className="max-w-4xl mx-auto space-y-8 py-4">
      {/* Header */}
      <div className="border-b border-stone-200/80 dark:border-stone-800/80 pb-6">
        <div className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-[#C26D53]">
          <User className="w-3.5 h-3.5" />
          <span>My Account</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-stone-950 dark:text-stone-50 mt-1">
          Profile & Preferences
        </h1>
        <p className="text-xs sm:text-sm text-stone-500 dark:text-stone-400 mt-1">
          Manage your account information and saved beauty preferences.
        </p>
      </div>

      {/* Profile Overview Card */}
      <div className="p-6 rounded-2xl border border-stone-200/80 dark:border-stone-800/80 bg-white dark:bg-stone-900 shadow-2xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-full bg-[#C26D53]/15 text-[#C26D53] flex items-center justify-center font-bold text-xl">
            {displayName.charAt(0)}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-lg font-semibold text-stone-900 dark:text-stone-100">
                {displayName}
              </h2>
              <Badge variant="accent" size="sm">Customer</Badge>
            </div>
            <p className="text-xs text-stone-500 dark:text-stone-400 flex items-center gap-1.5 mt-0.5">
              <Mail className="w-3 h-3 text-stone-400" />
              {displayEmail}
            </p>
          </div>
        </div>

        <Link
          to="/customer/beauty-memory"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-medium border border-stone-200 dark:border-stone-800 hover:bg-stone-50 dark:hover:bg-stone-800/60 text-stone-800 dark:text-stone-200 transition-colors"
        >
          <Sparkles className="w-3.5 h-3.5 text-[#C26D53]" />
          <span>View Beauty Memory</span>
          <ArrowRight className="w-3 h-3 text-stone-400" />
        </Link>
      </div>

      {/* Two column grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Saved Beauty Preferences */}
        <div className="p-6 rounded-2xl border border-stone-200/80 dark:border-stone-800/80 bg-white dark:bg-stone-900 shadow-2xs space-y-4">
          <div className="flex items-center justify-between border-b border-stone-100 dark:border-stone-800 pb-3">
            <div className="flex items-center gap-2">
              <Heart className="w-4 h-4 text-[#C26D53]" />
              <h3 className="text-sm font-semibold text-stone-900 dark:text-stone-100">
                Beauty Preferences
              </h3>
            </div>
            <span className="text-[11px] text-stone-400">Learned from orders</span>
          </div>

          <div className="space-y-3 text-xs">
            <div className="flex justify-between py-2 border-b border-stone-100 dark:border-stone-800/50">
              <span className="text-stone-500">Skin Type</span>
              <span className="font-semibold text-stone-900 dark:text-stone-100">{stated.skinType}</span>
            </div>
            <div className="flex justify-between py-2 border-b border-stone-100 dark:border-stone-800/50">
              <span className="text-stone-500">Primary Goal</span>
              <span className="font-semibold text-stone-900 dark:text-stone-100">{stated.primaryGoal}</span>
            </div>
            <div className="flex justify-between py-2 border-b border-stone-100 dark:border-stone-800/50">
              <span className="text-stone-500">Budget Range</span>
              <span className="font-semibold text-stone-900 dark:text-stone-100">{stated.budgetRange}</span>
            </div>
            <div className="flex justify-between py-2 border-b border-stone-100 dark:border-stone-800/50">
              <span className="text-stone-500">Preferred Fragrance</span>
              <span className="font-semibold text-stone-900 dark:text-stone-100">{stated.fragrance}</span>
            </div>
            <div className="flex justify-between py-2">
              <span className="text-stone-500">Daily Routine</span>
              <span className="font-semibold text-stone-900 dark:text-stone-100">{stated.routine}</span>
            </div>
          </div>
        </div>

        {/* Shipping & Account Security */}
        <div className="p-6 rounded-2xl border border-stone-200/80 dark:border-stone-800/80 bg-white dark:bg-stone-900 shadow-2xs space-y-4">
          <div className="flex items-center justify-between border-b border-stone-100 dark:border-stone-800 pb-3">
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-[#C26D53]" />
              <h3 className="text-sm font-semibold text-stone-900 dark:text-stone-100">
                Default Delivery Address
              </h3>
            </div>
            <Badge variant="neutral" size="sm">Primary</Badge>
          </div>

          <div className="space-y-2 text-xs text-stone-600 dark:text-stone-300 leading-relaxed">
            <p className="font-semibold text-stone-900 dark:text-stone-100">{displayName}</p>
            <p>Flat 402, Palm Grove Heights</p>
            <p>Turner Road, Bandra West</p>
            <p>Mumbai, Maharashtra — 400050</p>
            <p className="text-stone-400 pt-1">Phone: +91 98765 43210</p>
          </div>

          <div className="pt-4 border-t border-stone-100 dark:border-stone-800 flex items-center justify-between">
            <div className="flex items-center gap-1.5 text-xs text-stone-500">
              <Shield className="w-3.5 h-3.5 text-emerald-600" />
              <span>Verified Customer Account</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
