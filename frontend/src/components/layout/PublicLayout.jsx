import React from "react";
import { Outlet } from "react-router-dom";
import { PublicNavbar } from "./PublicNavbar";
import { Footer } from "./Footer";

export const PublicLayout = ({ children }) => {
  return (
    <div className="min-h-screen bg-stone-50 dark:bg-stone-950 text-stone-900 dark:text-stone-100 flex flex-col transition-colors">
      <PublicNavbar />
      <main className="flex-1">
        {children || <Outlet />}
      </main>
      <Footer />
    </div>
  );
};
