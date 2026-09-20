import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import {
  Heart,
  Star,
  ShoppingBag,
  Scale,
  Sparkles,
  ArrowLeft,
  Check,
  ShieldAlert,
  Droplets,
  Wind
} from "lucide-react";
import { PublicNavbar } from "../../components/layout/PublicNavbar";
import { Footer } from "../../components/layout/Footer";
import { productService } from "../../services/productService";
import { recommendationService } from "../../services/recommendationService";
import { ReviewSummary } from "../../components/customer/ReviewSummary";
import { WhyRecommended } from "../../components/customer/WhyRecommended";
import { ProductCard } from "../../components/customer/ProductCard";
import { Button } from "../../components/common/Button";
import { Badge } from "../../components/common/Badge";
import { useCustomer } from "../../context/CustomerContext";

export const ProductDetailPage = () => {
  const { id } = useParams();
  const { isWishlisted, toggleWishlist, addToBag, addToCompare, isInCompare, recordView } = useCustomer();

  const [product, setProduct] = useState(null);
  const [similar, setSimilar] = useState([]);
  const [loading, setLoading] = useState(true);
  const [whyModalOpen, setWhyModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("overview");

  useEffect(() => {
    async function fetchDetail() {
      setLoading(true);
      try {
        const prod = await productService.getProductById(id);
        const matchData = await recommendationService.getProductMatch(prod);
        const merged = { ...prod, ...matchData };
        setProduct(merged);

        const sim = await productService.getSimilarProducts(id);
        setSimilar(sim);

        // Record continuous learning view signal
        recordView(merged);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    fetchDetail();
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-stone-50 dark:bg-stone-950 text-stone-900 dark:text-stone-100">
        <PublicNavbar />
        <div className="max-w-5xl mx-auto px-4 py-16 text-center text-xs text-stone-400">
          Loading product details...
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-stone-50 dark:bg-stone-950 text-stone-900 dark:text-stone-100">
        <PublicNavbar />
        <div className="max-w-md mx-auto px-4 py-20 text-center space-y-4">
          <p className="text-sm font-semibold">Product not found</p>
          <Link to="/products">
            <Button size="sm" variant="outline">
              Back to Catalog
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  const inWishlist = isWishlisted(product.id);
  const inCompare = isInCompare(product.id);

  return (
    <div className="min-h-screen bg-stone-50 dark:bg-stone-950 text-stone-900 dark:text-stone-100 transition-colors pb-16">
      <PublicNavbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-10">
        {/* Back Link */}
        <Link
          to="/products"
          className="inline-flex items-center gap-1.5 text-xs text-stone-500 hover:text-stone-900 dark:hover:text-stone-200 transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Catalog</span>
        </Link>

        {/* Top Product Section: Left Gallery, Right Information */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Left: Gallery */}
          <div className="lg:col-span-6 space-y-3">
            <div className="relative aspect-4/3 sm:aspect-square rounded-2xl overflow-hidden border border-stone-200/80 dark:border-stone-800/80 bg-white dark:bg-stone-900 shadow-xs">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover object-center"
              />
              <Badge
                variant="accent"
                size="md"
                className="absolute top-4 left-4 bg-white/95 dark:bg-stone-900/95 backdrop-blur-xs font-semibold shadow-xs"
              >
                Good match for your preferences
              </Badge>
            </div>
          </div>

          {/* Right: Information */}
          <div className="lg:col-span-6 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div>
                <span className="text-xs font-medium uppercase tracking-wider text-stone-400 block mb-1">
                  {product.brand}
                </span>
                <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight text-stone-950 dark:text-stone-50">
                  {product.name}
                </h1>
              </div>

              {/* Rating & reviews */}
              <div className="flex items-center gap-3 text-xs">
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                  <span className="font-semibold text-stone-900 dark:text-stone-100">
                    {product.rating}
                  </span>
                </div>
                <span className="text-stone-400">•</span>
                <span className="text-stone-500">
                  {product.reviewsCount} customer reviews
                </span>
                <span className="text-stone-400">•</span>
                <span className="text-emerald-600 dark:text-emerald-400 font-medium">
                  {product.reviewSummary?.sentimentLabel || "Highly Positive"}
                </span>
              </div>

              {/* Price */}
              <div className="flex items-baseline gap-2.5 pt-2">
                <span className="text-2xl sm:text-3xl font-bold text-stone-950 dark:text-stone-50">
                  ₹{product.price}
                </span>
                {product.originalPrice && (
                  <span className="text-sm text-stone-400 line-through">
                    ₹{product.originalPrice}
                  </span>
                )}
                <span className="text-xs text-stone-500">
                  Includes all taxes / {product.size}
                </span>
              </div>

              {/* Description */}
              <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-300 leading-relaxed">
                {product.description}
              </p>

              {/* Match explanation trigger card */}
              <div
                onClick={() => setWhyModalOpen(true)}
                className="p-4 rounded-xl border border-stone-200 dark:border-stone-800 bg-stone-100/50 dark:bg-stone-900/50 hover:border-[#C26D53]/50 transition-colors cursor-pointer space-y-1.5"
              >
                <div className="flex items-center justify-between text-xs font-semibold text-stone-900 dark:text-stone-100">
                  <div className="flex items-center gap-1.5 text-[#C26D53]">
                    <Sparkles className="w-4 h-4" />
                    <span>Why this matches your preferences</span>
                  </div>
                  <span className="text-[#C26D53] text-[11px] font-medium">View &rarr;</span>
                </div>
                <p className="text-xs text-stone-500 dark:text-stone-400">
                  {product.matchReasons?.[0]?.detail || "Matches your preference for lightweight texture and everyday budget."}
                </p>
              </div>

              {/* Quick attribute tags */}
              <div className="grid grid-cols-2 gap-2 text-xs pt-1">
                <div className="p-2.5 rounded-lg bg-stone-50 dark:bg-stone-900 border border-stone-100 dark:border-stone-800">
                  <span className="text-stone-400 text-[10px] uppercase tracking-wider block">Texture</span>
                  <span className="font-semibold text-stone-800 dark:text-stone-200">{product.texture}</span>
                </div>
                <div className="p-2.5 rounded-lg bg-stone-50 dark:bg-stone-900 border border-stone-100 dark:border-stone-800">
                  <span className="text-stone-400 text-[10px] uppercase tracking-wider block">Finish</span>
                  <span className="font-semibold text-stone-800 dark:text-stone-200">{product.finish}</span>
                </div>
              </div>
            </div>

            {/* Action Row */}
            <div className="space-y-2.5 pt-4 border-t border-stone-200 dark:border-stone-800">
              <div className="flex items-center gap-3">
                <Button
                  size="lg"
                  variant="primary"
                  className="flex-1"
                  onClick={() => addToBag(product)}
                  icon={ShoppingBag}
                >
                  Add to Bag (₹{product.price})
                </Button>
                <button
                  onClick={() => toggleWishlist(product)}
                  className={`p-3 rounded-xl border transition-colors cursor-pointer ${
                    inWishlist
                      ? "border-[#C26D53] text-[#C26D53] bg-[#C26D53]/10"
                      : "border-stone-300 dark:border-stone-700 text-stone-600 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800"
                  }`}
                  aria-label="Wishlist"
                >
                  <Heart className={`w-5 h-5 ${inWishlist ? "fill-[#C26D53]" : ""}`} />
                </button>
              </div>

              <button
                onClick={() => addToCompare(product)}
                className={`w-full py-2.5 rounded-xl border text-xs font-medium flex items-center justify-center gap-1.5 transition-colors cursor-pointer ${
                  inCompare
                    ? "bg-stone-900 dark:bg-stone-100 text-white dark:text-stone-900 border-transparent"
                    : "border-stone-200 dark:border-stone-800 hover:bg-stone-100 dark:hover:bg-stone-800 text-stone-700 dark:text-stone-300"
                }`}
              >
                <Scale className="w-4 h-4" />
                <span>{inCompare ? "Comparing (Open Compare)" : "Compare with Other Products"}</span>
              </button>
            </div>
          </div>
        </div>

        {/* Reviews Section */}
        <section className="pt-8">
          <ReviewSummary
            reviewSummary={product.reviewSummary}
            totalReviews={product.reviewsCount}
          />
        </section>

        {/* Ingredients & Attributes Tabs */}
        <div className="rounded-xl border border-stone-200/80 dark:border-stone-800/80 bg-white dark:bg-stone-900 p-6 shadow-2xs space-y-5">
          <div className="flex border-b border-stone-200/80 dark:border-stone-800 gap-6 text-xs font-semibold">
            {["overview", "ingredients", "sensory"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`pb-3 capitalize transition-colors cursor-pointer relative ${
                  activeTab === tab
                    ? "text-stone-950 dark:text-stone-50 border-b-2 border-[#C26D53]"
                    : "text-stone-400 hover:text-stone-700 dark:hover:text-stone-300"
                }`}
              >
                {tab === "overview" ? "Product Overview" : tab === "ingredients" ? "Key Ingredients" : "Texture & Feel"}
              </button>
            ))}
          </div>

          {activeTab === "overview" && (
            <div className="space-y-4 text-xs text-stone-600 dark:text-stone-300 leading-relaxed">
              <p>
                Engineered with high dermal biocompatibility for humid and coastal climatic conditions. The water-burst matrix delivers continuous reservoir hydration without occlusion or pore congesting lipids.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                <div className="p-3 rounded-lg bg-stone-50 dark:bg-stone-950/40 border border-stone-100 dark:border-stone-800">
                  <span className="font-semibold block text-stone-900 dark:text-stone-100 mb-0.5">Non-Comedogenic</span>
                  <span className="text-[11px] text-stone-500">Won't clog pores or exacerbate active breakouts.</span>
                </div>
                <div className="p-3 rounded-lg bg-stone-50 dark:bg-stone-950/40 border border-stone-100 dark:border-stone-800">
                  <span className="font-semibold block text-stone-900 dark:text-stone-100 mb-0.5">Fast Absorption</span>
                  <span className="text-[11px] text-stone-500">Absorbs in under 15 seconds without stickiness.</span>
                </div>
                <div className="p-3 rounded-lg bg-stone-50 dark:bg-stone-950/40 border border-stone-100 dark:border-stone-800">
                  <span className="font-semibold block text-stone-900 dark:text-stone-100 mb-0.5">Humidity Tested</span>
                  <span className="text-[11px] text-stone-500">Retains matte skin feel up to 85% relative humidity.</span>
                </div>
              </div>
            </div>
          )}

          {activeTab === "ingredients" && (
            <div className="space-y-3">
              <p className="text-xs text-stone-500 dark:text-stone-400">
                Transparent active ingredient list with concentration and clinical function:
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {product.keyIngredients?.map((ing, i) => (
                  <div key={i} className="p-3 rounded-lg bg-stone-50 dark:bg-stone-950/40 border border-stone-100 dark:border-stone-800 text-xs flex items-center justify-between">
                    <span className="font-semibold text-stone-900 dark:text-stone-100">{ing}</span>
                    <span className="text-[11px] text-emerald-600 dark:text-emerald-400 font-medium">Active High Purity</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === "sensory" && (
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
              <div className="p-3.5 rounded-lg bg-stone-50 dark:bg-stone-950/40 border border-stone-100 dark:border-stone-800 space-y-1">
                <span className="text-stone-400 uppercase text-[10px] tracking-wider block">Texture Feel</span>
                <span className="font-semibold text-stone-900 dark:text-stone-100 block">{product.texture}</span>
                <p className="text-stone-500 text-[11px]">Cools skin on immediate contact.</p>
              </div>
              <div className="p-3.5 rounded-lg bg-stone-50 dark:bg-stone-950/40 border border-stone-100 dark:border-stone-800 space-y-1">
                <span className="text-stone-400 uppercase text-[10px] tracking-wider block">Fragrance Profile</span>
                <span className="font-semibold text-stone-900 dark:text-stone-100 block">Low / No Fragrance</span>
                <p className="text-stone-500 text-[11px]">Safe for allergy-prone & rosacea-prone skin.</p>
              </div>
              <div className="p-3.5 rounded-lg bg-stone-50 dark:bg-stone-950/40 border border-stone-100 dark:border-stone-800 space-y-1">
                <span className="text-stone-400 uppercase text-[10px] tracking-wider block">Layering Safety</span>
                <span className="font-semibold text-stone-900 dark:text-stone-100 block">Zero Pilling</span>
                <p className="text-stone-500 text-[11px]">Seamlessly pairs with physical & chemical sunscreens.</p>
              </div>
            </div>
          )}
        </div>

        {/* Similar Products */}
        {similar.length > 0 && (
          <div className="space-y-4 pt-6">
            <h3 className="text-base font-semibold text-stone-900 dark:text-stone-100">
              Similar Products
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
              {similar.map((s) => (
                <ProductCard key={s.id} product={s} />
              ))}
            </div>
          </div>
        )}
      </div>

      <Footer />

      <WhyRecommended
        product={product}
        isOpen={whyModalOpen}
        onClose={() => setWhyModalOpen(false)}
      />
    </div>
  );
};
