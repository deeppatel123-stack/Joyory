import React, { useState } from "react";
import { Link } from "react-router-dom";
import { PublicNavbar } from "../../components/layout/PublicNavbar";
import { Footer } from "../../components/layout/Footer";
import { ComparisonTable } from "../../components/customer/ComparisonTable";
import { useCustomer } from "../../context/CustomerContext";
import { Button } from "../../components/common/Button";
import { EmptyState } from "../../components/common/EmptyState";
import { products } from "../../data/products";
import { Plus, Trash2, ArrowRight } from "lucide-react";

export const ComparePage = () => {
  const { compareList, addToCompare, clearCompare } = useCustomer();
  const [addModalOpen, setAddModalOpen] = useState(false);

  const availableToAdd = products.filter(p => !compareList.some(cp => cp.id === p.id));

  return (
    <div className="min-h-screen bg-stone-50 dark:bg-stone-950 text-stone-900 dark:text-stone-100 transition-colors pb-16">
      <PublicNavbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-stone-200/80 dark:border-stone-800/80 pb-6">
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-[#C26D53]">
              Side-by-Side
            </span>
            <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight text-stone-900 dark:text-stone-100 mt-1">
              Compare Products
            </h1>
            <p className="text-xs sm:text-sm text-stone-500 dark:text-stone-400 mt-1">
              Compare 2 to 4 products side by side to choose what works best for you.
            </p>
          </div>

          <div className="flex items-center gap-2">
            {compareList.length > 0 && (
              <Button size="sm" variant="ghost" onClick={clearCompare} icon={Trash2}>
                Clear All
              </Button>
            )}
            {compareList.length < 4 && (
              <Button size="sm" variant="secondary" onClick={() => setAddModalOpen(true)} icon={Plus}>
                Add Product ({compareList.length}/4)
              </Button>
            )}
          </div>
        </div>

        {compareList.length === 0 ? (
          <EmptyState
            title="Your comparison list is empty"
            description="Select 2 to 4 products from the catalog to compare texture, pricing, and suitability."
            actionLabel="Browse Products"
            onAction={() => window.location.href = "/products"}
          />
        ) : (
          <ComparisonTable products={compareList} />
        )}

        {/* Modal to pick products to compare */}
        {addModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div
              className="fixed inset-0 bg-stone-900/40 dark:bg-stone-950/70 backdrop-blur-xs"
              onClick={() => setAddModalOpen(false)}
            />
            <div className="relative w-full max-w-lg rounded-xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 shadow-2xl p-6 max-h-[80vh] flex flex-col">
              <div className="flex items-center justify-between pb-3 border-b border-stone-100 dark:border-stone-800">
                <h3 className="text-sm font-semibold text-stone-900 dark:text-stone-100">
                  Select a product to compare
                </h3>
                <button
                  onClick={() => setAddModalOpen(false)}
                  className="text-xs text-stone-400 hover:text-stone-600"
                >
                  Close
                </button>
              </div>

              <div className="flex-1 overflow-y-auto py-3 space-y-2">
                {availableToAdd.map((p) => (
                  <div
                    key={p.id}
                    className="flex items-center justify-between p-3 rounded-lg border border-stone-100 dark:border-stone-800 hover:bg-stone-50 dark:hover:bg-stone-800/50 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <img src={p.image} alt={p.name} className="w-10 h-10 rounded-md object-cover" />
                      <div>
                        <span className="text-[10px] text-stone-400 uppercase tracking-wider block">{p.brand}</span>
                        <h4 className="text-xs font-semibold text-stone-900 dark:text-stone-100">{p.name}</h4>
                        <span className="text-xs text-stone-500 font-medium">₹{p.price} • {p.texture}</span>
                      </div>
                    </div>
                    <Button
                      size="sm"
                      variant="primary"
                      onClick={() => {
                        addToCompare(p);
                        setAddModalOpen(false);
                      }}
                    >
                      Compare
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
};
