import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export const AdminRoute = ({ children }) => {
  const { isAuthenticated, role, isAdmin, isLoading } = useAuth();
  const location = useLocation();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-stone-50 dark:bg-stone-950">
        <div className="w-8 h-8 rounded-full border-2 border-[#C26D53] border-t-transparent animate-spin" />
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location, message: "Please sign in to continue." }} replace />;
  }

  if (role !== "admin" || !isAdmin) {
    return <Navigate to="/customer/discover" replace />;
  }

  return children;
};
