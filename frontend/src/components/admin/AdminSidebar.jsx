import React from "react";
import { Link, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  Package,
  ShoppingBag,
  Users,
  Star,
  Radar,
  TrendingUp,
  Settings,
  ArrowLeft,
  Sparkles
} from "lucide-react";

export const AdminSidebar = () => {
  const location = useLocation();

  const links = [
    { label: "Overview", path: "/admin", icon: LayoutDashboard },
    { label: "Products", path: "/admin/products", icon: Package },
    { label: "Orders", path: "/admin/orders", icon: ShoppingBag },
    { label: "Customers", path: "/admin/customers", icon: Users },
    { label: "Insights", path: "/admin/insights", icon: TrendingUp },
    { label: "Opportunities", path: "/admin/opportunities", icon: Sparkles },
    { label: "Settings", path: "/admin/settings", icon: Settings }
  ];

  const isActive = (path) => {
    if (path === "/admin") return location.pathname === "/admin";
    return location.pathname.startsWith(path);
  };

  return (
    <aside className="w-64 border-r border-stone-200/80 dark:border-stone-800/80 bg-white dark:bg-stone-900 flex flex-col justify-between p-4 shrink-0 transition-colors">
      <div className="space-y-6">
        {/* Brand */}
        <div className="px-3 pt-2">
          <Link to="/admin" className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-lg bg-stone-900 dark:bg-stone-100 flex items-center justify-center text-white dark:text-stone-900 font-bold text-xs">
              J
            </div>
            <div>
              <span className="text-sm font-semibold tracking-tight text-stone-900 dark:text-stone-100 block">
                JOYORY
              </span>
              <span className="text-[10px] uppercase tracking-wider text-[#C26D53] font-bold block">
                Admin Control
              </span>
            </div>
          </Link>
        </div>

        {/* Navigation */}
        <nav className="space-y-1">
          {links.map((link) => {
            const Icon = link.icon;
            const active = isActive(link.path);
            return (
              <Link
                key={link.path}
                to={link.path}
                className={`flex items-center gap-3 px-3 py-2 rounded-lg text-xs font-medium transition-colors ${
                  active
                    ? "bg-stone-100 dark:bg-stone-800 text-stone-950 dark:text-stone-50 font-semibold"
                    : "text-stone-600 dark:text-stone-400 hover:bg-stone-50 dark:hover:bg-stone-800/50 hover:text-stone-900 dark:hover:text-stone-100"
                }`}
              >
                <Icon className={`w-4 h-4 ${active ? "text-[#C26D53]" : "text-stone-400"}`} />
                <span>{link.label}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Switch to customer view link */}
      <div className="pt-4 border-t border-stone-100 dark:border-stone-800">
        <Link
          to="/"
          className="flex items-center gap-2 px-3 py-2 rounded-lg text-xs text-stone-500 hover:text-stone-900 dark:hover:text-stone-100 hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>View Public Storefront</span>
        </Link>
      </div>
    </aside>
  );
};
