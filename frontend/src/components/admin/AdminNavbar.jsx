import React from "react";
import { useNavigate } from "react-router-dom";
import { Moon, Sun, LogOut } from "lucide-react";
import { useTheme } from "../../context/ThemeContext";
import { useAuth } from "../../context/AuthContext";
import { useNotification } from "../../context/NotificationContext";

export const AdminNavbar = () => {
  const { isDark, toggleTheme } = useTheme();
  const { user, logout } = useAuth();
  const { addToast } = useNotification();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    addToast("Logged out from admin portal.", "info");
    navigate("/login");
  };

  const adminName = user?.name || "Joyory Admin";
  const adminEmail = user?.email || "admin@joyory.com";

  return (
    <header className="h-16 border-b border-stone-200/80 dark:border-stone-800/80 bg-white dark:bg-stone-900 px-4 sm:px-6 flex items-center justify-between shrink-0 transition-colors">
      <div className="flex items-center gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold tracking-tight text-stone-900 dark:text-stone-100">
              JOYORY
            </span>
            <span className="text-[10px] uppercase tracking-wider font-semibold text-[#C26D53]">
              ADMIN CONTROL
            </span>
          </div>
          <div className="flex items-center gap-1.5 text-[11px] text-stone-500 mt-0.5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            <span>System Operational</span>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-3">
        {/* Theme toggle */}
        <button
          onClick={toggleTheme}
          className="p-2 rounded-lg text-stone-500 hover:text-stone-800 dark:text-stone-400 dark:hover:text-stone-100 hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors cursor-pointer"
          aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
          title={isDark ? "Switch to light mode" : "Switch to dark mode"}
        >
          {isDark ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-stone-600" />}
        </button>

        {/* Admin profile */}
        <div className="flex items-center gap-2.5 pl-3 border-l border-stone-200 dark:border-stone-800">
          <div className="w-8 h-8 rounded-full bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300 flex items-center justify-center font-bold text-xs">
            {adminName.charAt(0).toUpperCase()}
          </div>
          <div className="hidden sm:block text-left text-xs">
            <div className="font-semibold text-stone-900 dark:text-stone-100">
              {adminName}
            </div>
            <div className="text-[10px] text-stone-400">{adminEmail}</div>
          </div>

          <button
            onClick={handleLogout}
            className="flex items-center gap-1 p-2 rounded-lg text-stone-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950/40 transition-colors ml-1 cursor-pointer text-xs"
            title="Logout"
            aria-label="Logout"
          >
            <LogOut className="w-4 h-4" />
            <span className="hidden sm:inline">Logout</span>
          </button>
        </div>
      </div>
    </header>
  );
};
