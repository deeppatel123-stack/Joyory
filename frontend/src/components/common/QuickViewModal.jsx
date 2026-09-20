import React from "react";
import { Link } from "react-router-dom";
import { X, Star, ShoppingBag, Heart, ArrowRight, ShieldCheck, Check } from "lucide-react";
import { Button } from "./Button";
import { Badge } from "./Badge";
import { FallbackImage } from "./FallbackImage";
import { useCustomer } from "../../context/CustomerContext";

export const QuickViewModal = ({ product, isOpen, onClose }) => {
  if (!isOpen || !product) return null;

  const { addToBag, toggleWishlist, isWishlisted } = useCustomer();
  const wishlisted = isWishlisted(product.id);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/60 backdrop-blur-xs transition-opacity animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl bg-white dark:bg-stone-900 rounded-2xl border border-stone-200 dark:border-stone-800 shadow-xl overflow-hidden flex flex-col md:flex-row max-h-[90vh]">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-1.5 rounded-full bg-stone-100/80 dark:bg-stone-800/80 text-stone-500 hover:text-stone-900 dark:hover:text-stone-100 transition-colors"
          aria-label="Close"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Product Image */}
        <div className="w-full md:w-1/2 bg-stone-50 dark:bg-stone-950 p-6 flex items-center justify-center relative border-b md:border-b-0 md:border-r border-stone-200 dark:border-stone-800">
          <FallbackImage
            src={product.image || (product.images && product.images[0])}
            alt={product.name}
            className="w-full h-56 md:h-72 object-contain rounded-lg"
          />
          {product.discount > 0 && (
            <span className="absolute top-4 left-4 px-2 py-0.5 rounded-md text-[10px] font-bold bg-[#C26D53] text-white">
              {product.discount}% OFF
            </span>
          )}
        </div>

        {/* Product Info */}
        <div className="w-full md:w-1/2 p-6 flex flex-col justify-between overflow-y-auto space-y-4">
          <div className="space-y-3">
            <div>
              <span className="text-[11px] font-semibold uppercase tracking-wider text-[#C26D53]">
                {product.brand}
              </span>
              <h3 className="text-lg font-semibold text-stone-950 dark:text-stone-50 leading-snug">
                {product.name}
              </h3>
            </div>

            {/* Rating & reviews */}
            <div className="flex items-center gap-2 text-xs">
              <div className="flex items-center gap-1 text-amber-500 font-medium">
                <Star className="w-3.5 h-3.5 fill-current" />
                <span>{product.rating || 4.8}</span>
              </div>
              <span className="text-stone-300 dark:text-stone-700">•</span>
              <span className="text-stone-500 dark:text-stone-400">
                ({product.reviewsCount || product.reviewCount || 120} reviews)
              </span>
            </div>

            {/* Price */}
            <div className="flex items-baseline gap-2">
              <span className="text-xl font-bold text-stone-950 dark:text-stone-50">
                ₹{product.price}
              </span>
              {product.originalPrice && product.originalPrice > product.price && (
                <span className="text-xs line-through text-stone-400">
                  ₹{product.originalPrice}
                </span>
              )}
            </div>

            {/* Short Description */}
            <p className="text-xs text-stone-600 dark:text-stone-300 leading-relaxed">
              {product.shortDescription || product.description}
            </p>

            {/* Attributes */}
            <div className="space-y-1.5 pt-2 border-t border-stone-100 dark:border-stone-800 text-[11px]">
              <div className="flex justify-between">
                <span className="text-stone-500">Texture:</span>
                <span className="font-medium text-stone-800 dark:text-stone-200">{product.texture}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-stone-500">Finish:</span>
                <span className="font-medium text-stone-800 dark:text-stone-200">{product.finish}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-stone-500">Stock:</span>
                <span className={`font-medium ${product.stock > 0 ? "text-emerald-600" : "text-red-500"}`}>
                  {product.stock > 0 ? "In Stock" : "Out of Stock"}
                </span>
              </div>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="space-y-2 pt-2">
            <div className="flex gap-2">
              <Button
                variant="primary"
                className="flex-1 justify-center text-xs py-2.5"
                icon={ShoppingBag}
                disabled={product.stock <= 0}
                onClick={() => {
                  addToBag(product);
                  onClose();
                }}
              >
                Add to Bag
              </Button>
              <button
                onClick={() => toggleWishlist(product)}
                className={`p-2.5 rounded-lg border transition-colors ${
                  wishlisted
                    ? "border-[#C26D53] bg-rose-50 dark:bg-rose-950/40 text-[#C26D53]"
                    : "border-stone-200 dark:border-stone-800 text-stone-500 hover:text-stone-900 dark:hover:text-stone-100"
                }`}
                title={wishlisted ? "Remove from wishlist" : "Add to wishlist"}
              >
                <Heart className={`w-4 h-4 ${wishlisted ? "fill-current text-[#C26D53]" : ""}`} />
              </button>
            </div>

            <Link
              to={`/products/${product.id}`}
              onClick={onClose}
              className="block text-center text-xs text-[#C26D53] hover:underline font-medium pt-1"
            >
              View Full Product Specifications & Ingredients →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
