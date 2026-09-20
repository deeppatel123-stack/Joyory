import React from "react";
import { ProductCard } from "./ProductCard";
import { EmptyState } from "../common/EmptyState";
import { SkeletonLoader } from "../common/SkeletonLoader";

export const ProductGrid = ({
  products = [],
  loading = false,
  emptyTitle = "No matching products found",
  emptyDescription = "Try broadening your filters or testing another search term.",
  actionLabel,
  onAction
}) => {
  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
        <SkeletonLoader type="product" count={4} />
      </div>
    );
  }

  if (!products || products.length === 0) {
    return (
      <EmptyState
        title={emptyTitle}
        description={emptyDescription}
        actionLabel={actionLabel}
        onAction={onAction}
      />
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};
