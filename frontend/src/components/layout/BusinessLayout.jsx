import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import { BusinessSidebar } from "./BusinessSidebar";
import { Topbar } from "./Topbar";
import { X } from "lucide-react";

export const BusinessLayout = () => {
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-stone-50 dark:bg-stone-950 text-stone-900 dark:text-stone-100 flex transition-colors">
      {/* Desktop Sidebar */}
      <div className="hidden lg:block sticky top-0 h-screen">
        <BusinessSidebar />
      </div>

      {/* Mobile Sidebar */}
      {mobileSidebarOpen && (
        <div className="lg:hidden fixed inset-0 z-50 flex">
          <div
            className="fixed inset-0 bg-stone-900/40 dark:bg-stone-950/70 backdrop-blur-xs"
            onClick={() => setMobileSidebarOpen(false)}
          />
          <div className="relative w-64 bg-stone-50 dark:bg-stone-950 h-full shadow-2xl flex flex-col z-10">
            <button
              onClick={() => setMobileSidebarOpen(false)}
              className="absolute top-4 right-4 p-1 rounded-md text-stone-500 hover:text-stone-800 dark:hover:text-stone-200"
              aria-label="Close sidebar"
            >
              <X className="w-4 h-4" />
            </button>
            <BusinessSidebar onClose={() => setMobileSidebarOpen(false)} />
          </div>
        </div>
      )}

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        <Topbar mode="business" onMenuClick={() => setMobileSidebarOpen(true)} />
        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};
