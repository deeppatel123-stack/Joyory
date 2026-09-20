import React, { useState } from "react";
import { ShieldCheck, Lock, Bell, User, Palette, Database, Check } from "lucide-react";
import { Button } from "../../components/common/Button";
import { Badge } from "../../components/common/Badge";
import { useTheme } from "../../context/ThemeContext";
import { useNotification } from "../../context/NotificationContext";

export const BusinessSettingsPage = () => {
  const { theme, toggleTheme } = useTheme();
  const { addToast } = useNotification();

  const [activeTab, setActiveTab] = useState("privacy");
  const [emailAlerts, setEmailAlerts] = useState(true);
  const [gapThreshold, setGapThreshold] = useState("85");

  const handleSave = (e) => {
    e.preventDefault();
    addToast("Settings preferences saved successfully", "success");
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Header */}
      <div className="border-b border-stone-200/80 dark:border-stone-800/80 pb-6">
        <span className="text-xs font-semibold uppercase tracking-wider text-[#C26D53]">
          Workspace Configuration
        </span>
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-stone-950 dark:text-stone-50 mt-1">
          Business Settings & Privacy
        </h1>
        <p className="text-xs sm:text-sm text-stone-500 dark:text-stone-400 mt-1">
          Manage analytics workspace preferences, automated threshold alerts, and customer privacy compliance.
        </p>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-stone-200/80 dark:border-stone-800 gap-6 text-xs font-semibold">
        {[
          { id: "privacy", label: "Privacy & Data Policy", icon: ShieldCheck },
          { id: "workspace", label: "Workspace & Team", icon: User },
          { id: "alerts", label: "Unmet Need Alerts", icon: Bell },
          { id: "data", label: "Data Storage & Sync", icon: Database }
        ].map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 pb-3 transition-colors cursor-pointer relative ${
                activeTab === tab.id
                  ? "text-stone-950 dark:text-stone-50 border-b-2 border-[#C26D53]"
                  : "text-stone-400 hover:text-stone-700 dark:hover:text-stone-300"
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* 64. PRIVACY TAB */}
      {activeTab === "privacy" && (
        <div className="p-6 sm:p-8 rounded-xl border border-stone-200/80 dark:border-stone-800/80 bg-white dark:bg-stone-900 shadow-2xs space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-emerald-600" />
              <h2 className="text-base font-semibold text-stone-900 dark:text-stone-100">
                Customer Data Privacy Architecture
              </h2>
            </div>
            <Badge variant="success" size="sm">
              Strict Aggregation Compliance
            </Badge>
          </div>

          <p className="text-xs text-stone-600 dark:text-stone-300 leading-relaxed">
            Joyory's business intelligence platform operates exclusively on mathematically anonymized, aggregated behavioral clusters. In accordance with zero-PII architectural standards:
          </p>

          <div className="space-y-3 pt-2 text-xs">
            <div className="p-3.5 rounded-lg bg-stone-50 dark:bg-stone-950/40 border border-stone-100 dark:border-stone-800 flex items-start gap-3">
              <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <div>
                <strong className="text-stone-900 dark:text-stone-100 block">No Individual Private Customer Data</strong>
                <p className="text-stone-500 mt-0.5">
                  Business managers and merchandisers can never inspect individual identity, personal phone numbers, or delivery addresses.
                </p>
              </div>
            </div>

            <div className="p-3.5 rounded-lg bg-stone-50 dark:bg-stone-950/40 border border-stone-100 dark:border-stone-800 flex items-start gap-3">
              <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <div>
                <strong className="text-stone-900 dark:text-stone-100 block">Differential Cluster Privacy</strong>
                <p className="text-stone-500 mt-0.5">
                  Preference distributions and search queries are only aggregated when a minimum cluster threshold of &ge; 50 unique shopper sessions is reached.
                </p>
              </div>
            </div>

            <div className="p-3.5 rounded-lg bg-stone-50 dark:bg-stone-950/40 border border-stone-100 dark:border-stone-800 flex items-start gap-3">
              <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <div>
                <strong className="text-stone-900 dark:text-stone-100 block">Transparent Usage</strong>
                <p className="text-stone-500 mt-0.5">
                  Insights directly inform product development to solve unmet catalog needs (e.g. lightweight textures in hot climates).
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* WORKSPACE TAB */}
      {activeTab === "workspace" && (
        <form onSubmit={handleSave} className="p-6 sm:p-8 rounded-xl border border-stone-200/80 dark:border-stone-800/80 bg-white dark:bg-stone-900 shadow-2xs space-y-5 text-xs">
          <h2 className="text-base font-semibold text-stone-900 dark:text-stone-100">
            Workspace Profile
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-stone-500 mb-1">Organization Name</label>
              <input
                type="text"
                defaultValue="Joyory Consumer Products Inc."
                className="w-full rounded-lg border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-900 px-3 py-2 text-stone-800 dark:text-stone-200"
              />
            </div>
            <div>
              <label className="block text-stone-500 mb-1">Assigned Role</label>
              <input
                type="text"
                disabled
                defaultValue="Lead Product & Merchandising Analyst"
                className="w-full rounded-lg border border-stone-200 dark:border-stone-800 bg-stone-100 dark:bg-stone-800/50 px-3 py-2 text-stone-500 cursor-not-allowed"
              />
            </div>
          </div>

          <div className="pt-4 border-t border-stone-100 dark:border-stone-800 flex justify-end">
            <Button type="submit" variant="primary" size="sm">Save Changes</Button>
          </div>
        </form>
      )}

      {/* ALERTS TAB */}
      {activeTab === "alerts" && (
        <form onSubmit={handleSave} className="p-6 sm:p-8 rounded-xl border border-stone-200/80 dark:border-stone-800/80 bg-white dark:bg-stone-900 shadow-2xs space-y-5 text-xs">
          <h2 className="text-base font-semibold text-stone-900 dark:text-stone-100">
            Automated Unmet Need Detection Thresholds
          </h2>

          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 rounded-lg border border-stone-100 dark:border-stone-800 bg-stone-50 dark:bg-stone-950/40">
              <div>
                <span className="font-semibold block text-stone-900 dark:text-stone-100">Critical Demand Score Alert</span>
                <span className="text-stone-400 text-[11px]">Notify when an opportunity score exceeds 90/100</span>
              </div>
              <input
                type="checkbox"
                checked={emailAlerts}
                onChange={(e) => setEmailAlerts(e.target.checked)}
                className="accent-[#C26D53] w-4 h-4 cursor-pointer"
              />
            </div>

            <div>
              <label className="block text-stone-500 mb-1">Catalog Coverage Alert Threshold</label>
              <select
                value={gapThreshold}
                onChange={(e) => setGapThreshold(e.target.value)}
                className="w-full rounded-lg border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-900 px-3 py-2 text-stone-800 dark:text-stone-200 cursor-pointer"
              >
                <option value="85">Flag when catalog coverage is under 20% (Default)</option>
                <option value="90">Flag when catalog coverage is under 10% (Strict)</option>
                <option value="80">Flag when catalog coverage is under 30% (Permissive)</option>
              </select>
            </div>
          </div>

          <div className="pt-4 border-t border-stone-100 dark:border-stone-800 flex justify-end">
            <Button type="submit" variant="primary" size="sm">Update Alert Rules</Button>
          </div>
        </form>
      )}

      {/* DATA STORAGE & SYNC TAB */}
      {activeTab === "data" && (
        <div className="p-6 sm:p-8 rounded-xl border border-stone-200/80 dark:border-stone-800/80 bg-white dark:bg-stone-900 shadow-2xs space-y-4 text-xs">
          <h2 className="text-base font-semibold text-stone-900 dark:text-stone-100">
            Client Persistence & Cache Storage
          </h2>
          <p className="text-stone-500 leading-relaxed">
            All customer preferences, wishlist items, cart contents, and journey events are synchronized with the backend and cached in client storage for optimal offline resilience.
          </p>

          <div className="p-4 rounded-lg bg-stone-50 dark:bg-stone-950/40 border border-stone-100 dark:border-stone-800 space-y-2">
            <span className="font-semibold text-stone-900 dark:text-stone-100 block">Stored Local Keys:</span>
            <ul className="space-y-1 font-mono text-[11px] text-stone-600 dark:text-stone-400">
              <li>• joyory_customer_profile (Graph & Learned Preferences)</li>
              <li>• joyory_customer_journey (Timeline Events)</li>
              <li>• joyory_wishlist (Saved items)</li>
              <li>• joyory_cart (Bag items)</li>
              <li>• joyory_orders (Delivered order states)</li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};
