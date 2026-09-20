import React, { useEffect } from "react";
import { X } from "lucide-react";

export const Drawer = ({
  isOpen,
  onClose,
  title,
  subtitle,
  children,
  position = "right",
  maxWidth = "max-w-md"
}) => {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-stone-900/40 dark:bg-stone-950/70 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      <div className={`fixed inset-y-0 ${position === "right" ? "right-0" : "left-0"} flex pl-10 max-w-full`}>
        <div className={`w-screen ${maxWidth} bg-white dark:bg-stone-900 border-l border-stone-200 dark:border-stone-800 shadow-2xl flex flex-col transition-transform duration-300 animate-in slide-in-from-right`}>
          {/* Header */}
          <div className="p-5 border-b border-stone-200/80 dark:border-stone-800 flex items-start justify-between">
            <div>
              {title && (
                <h3 className="text-base font-semibold text-stone-900 dark:text-stone-100">
                  {title}
                </h3>
              )}
              {subtitle && (
                <p className="text-xs text-stone-500 dark:text-stone-400 mt-0.5">
                  {subtitle}
                </p>
              )}
            </div>
            <button
              onClick={onClose}
              className="p-1 rounded-md text-stone-400 hover:text-stone-600 dark:hover:text-stone-200 hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors"
              aria-label="Close drawer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Body */}
          <div className="flex-1 overflow-y-auto p-5">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};
