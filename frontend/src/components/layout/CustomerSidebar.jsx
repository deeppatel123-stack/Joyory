import React from "react";
import { NavLink, Link, useNavigate } from "react-router-dom";
import {
  Compass,
  GitBranch,
  BookmarkCheck,
  Heart,
  ShoppingBag,
  User,
  RotateCcw,
  LogOut
} from "lucide-react";
import { useCustomer } from "../../context/CustomerContext";
import { useAuth } from "../../context/AuthContext";
import { useNotification } from "../../context/NotificationContext";

export const CustomerSidebar = ({ onClose }) => {
  const { wishlist, orders, resetAllDemoData } = useCustomer();
  const { logout } = useAuth();
  const { addToast } = useNotification();
  const navigate = useNavigate();

  const navItems = [
    { label: "Discover", path: "/customer/discover", icon: Compass },
    { label: "My Journey", path: "/customer/journey", icon: GitBranch },
    { label: "Beauty Memory", path: "/customer/beauty-memory", icon: BookmarkCheck },
    { label: "Wishlist", path: "/customer/wishlist", icon: Heart, count: wishlist?.length || 0 },
    { label: "Orders", path: "/customer/orders", icon: ShoppingBag, count: orders?.length || 0 },
    { label: "Profile", path: "/customer/profile", icon: User }
  ];

  const handleLogout = () => {
    logout();
    addToast("Logged out successfully.", "info");
    if (onClose) onClose();
    navigate("/login");
  };

  return (
    <aside className="w-64 h-screen border-r border-stone-200/80 dark:border-stone-800/80 bg-stone-50/60 dark:bg-stone-950/60 flex flex-col justify-between p-4 shrink-0 transition-colors">
      <div>
        {/* Brand */}
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
                Beauty Commerce
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
              </NavLink>
            );
          })}
        </nav>
      </div>

      {/* Bottom Actions */}
      <div className="pt-3 border-t border-stone-200/80 dark:border-stone-800/80 space-y-1.5">
        <button
          onClick={resetAllDemoData}
          className="w-full flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-lg text-[11px] text-stone-500 dark:text-stone-400 hover:text-stone-800 dark:hover:text-stone-200 hover:bg-stone-100 dark:hover:bg-stone-900 transition-colors cursor-pointer border border-dashed border-stone-200 dark:border-stone-800"
          title="Reset preferences to default baseline"
        >
          <RotateCcw className="w-3 h-3" />
          <span>Reset Preferences</span>
        </button>

        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-xs text-stone-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950/40 transition-colors cursor-pointer"
        >
          <LogOut className="w-3.5 h-3.5" />
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
};
