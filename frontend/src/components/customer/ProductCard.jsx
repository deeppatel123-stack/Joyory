import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Heart, Star, Sparkles, Scale, ShoppingBag, Check, Eye } from "lucide-react";
import { Badge } from "../common/Badge";
import { Button } from "../common/Button";
import { FallbackImage } from "../common/FallbackImage";
import { QuickViewModal } from "../common/QuickViewModal";
import { WhyRecommended } from "./WhyRecommended";
import { useCustomer } from "../../context/CustomerContext";
import { useAuth } from "../../context/AuthContext";

export const ProductCard = ({ product }) => {
  const { isWishlisted, toggleWishlist, addToBag, addToCompare, isInCompare } = useCustomer();
  const { isAuthenticated, isCustomer } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [whyOpen, setWhyOpen] = useState(false);
  const [quickViewOpen, setQuickViewOpen] = useState(false);

  const inWishlist = isWishlisted(product.id);
  const inCompare = isInCompare(product.id);

  const handleWishlistClick = () => {
    if (!isAuthenticated) {
      navigate("/login", { state: { from: location, message: "Please sign in to manage your wishlist." } });
      return;
    }
    toggleWishlist(product);
  };

  const handleCompareClick = () => {
    if (!isAuthenticated) {
      navigate("/login", { state: { from: "/compare", message: "Please sign in to compare products." } });
      return;
    }
    addToCompare(product);
  };

  // Derive top 2 attributes
  const keyAttributes = [
    product.texture,
    product.finish,
    product.skinType?.[0]
  ].filter(Boolean).slice(0, 2);

  const discount = product.discount || (product.originalPrice && product.originalPrice > product.price
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0);

  return (
    <>
      <div className="group relative rounded-xl border border-stone-200/80 dark:border-stone-800/80 bg-white dark:bg-stone-900 overflow-hidden flex flex-col justify-between hover:border-stone-300 dark:hover:border-stone-700 transition-all duration-200 shadow-2xs hover:shadow-xs">
        {/* Card Top / Image Area */}
        <div className="relative aspect-square overflow-hidden bg-stone-50 dark:bg-stone-950 flex items-center justify-center p-3">
          <Link to={`/products/${product.id}`} className="block w-full h-full">
            <FallbackImage
              src={product.image || (product.images && product.images[0])}
              alt={product.name}
              className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
            />
          </Link>

          {/* Discount badge */}
          {discount > 0 && (
            <div className="absolute top-2.5 left-2.5">
              <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-[#C26D53] text-white">
                {discount}% OFF
              </span>
            </div>
          )}

          {/* Action buttons (Wishlist & Quick View) */}
          <div className="absolute top-2.5 right-2.5 flex flex-col gap-1.5 z-10">
            <button
              onClick={handleWishlistClick}
              className={`p-1.5 rounded-full backdrop-blur-xs transition-colors shadow-2xs cursor-pointer ${
                inWishlist
                  ? "bg-white dark:bg-stone-900 text-[#C26D53]"
                  : "bg-white/90 dark:bg-stone-900/90 text-stone-600 dark:text-stone-300 hover:text-stone-950 dark:hover:text-white"
              }`}
              aria-label={inWishlist ? "Remove from wishlist" : "Add to wishlist"}
              title="Wishlist"
            >
              <Heart className={`w-3.5 h-3.5 ${inWishlist ? "fill-[#C26D53]" : ""}`} />
            </button>

            <button
              onClick={() => setQuickViewOpen(true)}
              className="p-1.5 rounded-full bg-white/90 dark:bg-stone-900/90 text-stone-600 dark:text-stone-300 hover:text-stone-950 dark:hover:text-white shadow-2xs transition-colors cursor-pointer"
              aria-label="Quick View"
              title="Quick View"
            >
              <Eye className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Card Content Area */}
        <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
          <div>
            {/* Brand and Rating */}
            <div className="flex items-center justify-between text-xs text-stone-500 dark:text-stone-400 mb-1">
              <span className="uppercase tracking-wider text-[10px] font-semibold text-stone-400">
                {product.brand}
              </span>
              <div className="flex items-center gap-1">
                <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                <span className="font-medium text-stone-800 dark:text-stone-200 text-xs">
                  {product.rating || 4.8}
                </span>
                <span className="text-[10px] text-stone-400">
                  ({product.reviewsCount || product.reviewCount || 140})
                </span>
              </div>
            </div>

            {/* Product Title */}
            <Link to={`/products/${product.id}`} className="block">
              <h3 className="text-sm font-semibold text-stone-900 dark:text-stone-100 hover:text-[#C26D53] transition-colors line-clamp-1">
                {product.name}
              </h3>
            </Link>

            {/* Price & MRP */}
            <div className="flex items-baseline gap-2 mt-1.5">
              <span className="text-base font-bold text-stone-900 dark:text-stone-100">
                ₹{product.price}
              </span>
              {product.originalPrice && product.originalPrice > product.price && (
                <span className="text-xs text-stone-400 line-through">
                  ₹{product.originalPrice}
                </span>
              )}
            </div>

            {/* Attributes */}
            <div className="flex flex-wrap gap-1 mt-2">
              {keyAttributes.map((attr, idx) => (
                <span
                  key={idx}
                  className="px-2 py-0.5 rounded text-[10px] bg-stone-100 dark:bg-stone-800/80 text-stone-600 dark:text-stone-400 font-medium"
                >
                  {attr}
                </span>
              ))}
            </div>
          </div>

          {/* Why recommended link (Only for authenticated customer) */}
          {isAuthenticated && isCustomer && (
            <button
              onClick={() => setWhyOpen(true)}
              className="text-[11px] text-[#C26D53] hover:underline flex items-center gap-1 pt-0.5 font-medium cursor-pointer text-left"
            >
              <Sparkles className="w-3 h-3 text-[#C26D53]" />
              <span>Why this matches your journey</span>
            </button>
          )}

          {/* Action Row */}
          <div className="pt-2 border-t border-stone-100 dark:border-stone-800 flex items-center justify-between gap-2">
            <button
              onClick={handleCompareClick}
              className={`flex-1 flex items-center justify-center gap-1 py-1.5 px-2 rounded-lg text-xs font-medium border transition-colors cursor-pointer ${
                inCompare
                  ? "bg-stone-900 dark:bg-stone-100 text-white dark:text-stone-900 border-transparent"
                  : "border-stone-200 dark:border-stone-800 hover:bg-stone-100 dark:hover:bg-stone-800 text-stone-700 dark:text-stone-300"
              }`}
            >
              {inCompare ? (
                <>
                  <Check className="w-3 h-3" />
                  <span>Comparing</span>
                </>
              ) : (
                <>
                  <Scale className="w-3 h-3" />
                  <span>Compare</span>
                </>
              )}
            </button>

            <Button
              size="sm"
              variant="primary"
              className="flex-1 text-xs"
              onClick={() => addToBag(product)}
              icon={ShoppingBag}
            >
              Add to Bag
            </Button>
          </div>
        </div>
      </div>

      {/* Why Recommended modal */}
      <WhyRecommended
        product={product}
        isOpen={whyOpen}
        onClose={() => setWhyOpen(false)}
      />

      {/* Quick View modal */}
      <QuickViewModal
        product={product}
        isOpen={quickViewOpen}
        onClose={() => setQuickViewOpen(false)}
      />
    </>
  );
};
