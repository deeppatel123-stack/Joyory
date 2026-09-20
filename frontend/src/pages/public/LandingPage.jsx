import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Sparkles,
  ArrowRight,
  CheckCircle2,
  Star,
  Compass,
  Brain,
  RotateCw,
  TrendingUp,
  ShoppingBag
} from "lucide-react";
import { Button } from "../../components/common/Button";
import { PublicNavbar } from "../../components/layout/PublicNavbar";
import { Footer } from "../../components/layout/Footer";
import { ProductCard } from "../../components/customer/ProductCard";
import { productService } from "../../services/productService";
import { FallbackImage } from "../../components/common/FallbackImage";
import { useAuth } from "../../context/AuthContext";
import { useCustomer } from "../../context/CustomerContext";

export const LandingPage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { isAuthenticated } = useAuth();
  const { addToCart } = useCustomer();

  useEffect(() => {
    async function load() {
      try {
        const data = await productService.getProducts();
        setProducts(data);
      } catch (err) {
        console.warn("Using local product catalog");
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  // Curated 4-product selections as strictly specified
  const featuredProducts = products.filter(p => p.isFeatured).slice(0, 4);
  const bestSellers = products.filter(p => p.isBestSeller).slice(0, 4);
  const newArrivals = products.filter(p => p.isNewArrival).slice(0, 4);

  // Fallbacks if data loading or filtering
  const displayFeatured = featuredProducts.length === 4 ? featuredProducts : products.slice(0, 4);
  const displayBestSellers = bestSellers.length === 4 ? bestSellers : products.slice(4, 8);
  const displayNewArrivals = newArrivals.length === 4 ? newArrivals : products.slice(8, 12);

  const heroFeatured = products[0] || {
    id: "JOY-SKN-001",
    name: "HydraGel Ultra-Light Moisturizer",
    brand: "Joyory Labs",
    price: 649,
    originalPrice: 799,
    rating: 4.8,
    reviewsCount: 384,
    image: "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=800&auto=format&fit=crop&q=80",
    texture: "Water Gel",
    finish: "Matte",
    shortDescription: "Ultra-lightweight oil-free water gel with 2% Hyaluronic Acid and Centella."
  };

  return (
    <div className="min-h-screen bg-stone-50 dark:bg-stone-950 text-stone-900 dark:text-stone-100 transition-colors flex flex-col">
      <PublicNavbar />

      {/* 2. HERO SECTION */}
      <section className="relative pt-12 pb-16 sm:pt-20 sm:pb-24 border-b border-stone-200/80 dark:border-stone-800/80 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-6 text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-stone-100 dark:bg-stone-900 border border-stone-200 dark:border-stone-800 text-xs text-[#C26D53] font-medium">
                <span className="w-1.5 h-1.5 rounded-full bg-[#C26D53]" />
                <span>Intelligent Beauty Commerce</span>
              </div>

              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-semibold tracking-tight text-stone-950 dark:text-stone-50 leading-[1.12]">
                Beauty shopping that gets smarter with every interaction.
              </h1>

              <p className="text-base sm:text-lg text-stone-600 dark:text-stone-300 max-w-2xl leading-relaxed font-normal">
                Discover products that fit your preferences and build a beauty journey that becomes more personal over time.
              </p>

              {/* Buttons */}
              <div className="pt-2 flex flex-col sm:flex-row items-center gap-3">
                <Link to="/products" className="w-full sm:w-auto">
                  <Button size="lg" variant="primary" icon={ArrowRight} className="w-full sm:w-auto justify-center">
                    Explore Products
                  </Button>
                </Link>
                <Link to={isAuthenticated ? "/customer/journey" : "/login"} className="w-full sm:w-auto">
                  <Button size="lg" variant="secondary" className="w-full sm:w-auto justify-center">
                    Discover Your Journey
                  </Button>
                </Link>
              </div>

              {/* 3 small trust points */}
              <div className="pt-3 flex flex-wrap items-center gap-6 text-xs text-stone-500 dark:text-stone-400">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-500" />
                  <span>Personalized discovery</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-500" />
                  <span>Smarter recommendations</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-500" />
                  <span>Beauty journey memory</span>
                </div>
              </div>
            </div>

            {/* Right: Clean Featured Product Card */}
            <div className="lg:col-span-5 relative">
              <div className="relative rounded-2xl p-5 bg-white dark:bg-stone-900 border border-stone-200/80 dark:border-stone-800/80 shadow-md space-y-4">
                <div className="relative aspect-4/3 rounded-xl overflow-hidden bg-stone-100 dark:bg-stone-950">
                  <FallbackImage
                    src={heroFeatured.image}
                    alt={heroFeatured.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-white/95 dark:bg-stone-900/95 backdrop-blur-xs text-[11px] font-semibold text-stone-900 dark:text-stone-100 border border-stone-200/60 dark:border-stone-800/60 shadow-xs">
                    Featured Formulation
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <span className="text-[10px] uppercase tracking-wider font-semibold text-[#C26D53]">
                        {heroFeatured.brand}
                      </span>
                      <h3 className="text-base font-semibold text-stone-900 dark:text-stone-100">
                        {heroFeatured.name}
                      </h3>
                    </div>
                    <div className="text-right shrink-0">
                      <span className="text-lg font-bold text-stone-950 dark:text-stone-50">
                        ₹{heroFeatured.price}
                      </span>
                      {heroFeatured.originalPrice && (
                        <span className="text-xs text-stone-400 line-through block">
                          ₹{heroFeatured.originalPrice}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center gap-2 text-xs text-stone-500 dark:text-stone-400">
                    <span className="flex items-center text-amber-500 font-semibold">
                      ★ {heroFeatured.rating || 4.8}
                    </span>
                    <span>•</span>
                    <span>{heroFeatured.texture || "Lightweight Gel"} • {heroFeatured.finish || "Matte"}</span>
                  </div>

                  <div className="pt-2 flex items-center gap-2">
                    <Link to={`/products/${heroFeatured.id}`} className="flex-1">
                      <Button variant="primary" className="w-full justify-center text-xs py-2.5" icon={ArrowRight}>
                        View Product
                      </Button>
                    </Link>
                    <Button
                      variant="outline"
                      className="px-3 py-2.5 text-xs"
                      onClick={() => addToCart(heroFeatured)}
                      aria-label="Add to bag"
                    >
                      <ShoppingBag className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. FEATURED PRODUCTS (4 Products) */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6 w-full">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2">
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-[#C26D53]">
              Curated Selection
            </span>
            <h2 className="text-2xl sm:text-3xl font-semibold text-stone-950 dark:text-stone-50 mt-1">
              Featured for You
            </h2>
          </div>
          <Link
            to="/products"
            className="text-xs text-[#C26D53] hover:underline font-medium flex items-center gap-1"
          >
            Browse All Products
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {displayFeatured.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* 4. SIMPLE SOLUTION SECTION (Discover, Remember, Experience, Understand) */}
      <section className="py-16 bg-stone-100/50 dark:bg-stone-900/30 border-y border-stone-200/80 dark:border-stone-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#C26D53]">
              How Joyory Works
            </span>
            <h2 className="text-2xl sm:text-3xl font-semibold text-stone-950 dark:text-stone-50">
              Your beauty journey, connected.
            </h2>
            <p className="text-xs sm:text-sm text-stone-500 dark:text-stone-400">
              A continuous, thoughtful cycle designed around what truly works for your skin.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Card 1: Discover */}
            <div className="p-6 rounded-2xl border border-stone-200/80 dark:border-stone-800/80 bg-white dark:bg-stone-900 shadow-2xs space-y-3">
              <div className="w-10 h-10 rounded-xl bg-stone-100 dark:bg-stone-800 flex items-center justify-center text-[#C26D53]">
                <Compass className="w-5 h-5" />
              </div>
              <h3 className="text-base font-semibold text-stone-900 dark:text-stone-100">
                Discover
              </h3>
              <p className="text-xs text-stone-500 dark:text-stone-400 leading-relaxed">
                Find products that match your personal preferences, textures, and comfort levels.
              </p>
            </div>

            {/* Card 2: Remember */}
            <div className="p-6 rounded-2xl border border-stone-200/80 dark:border-stone-800/80 bg-white dark:bg-stone-900 shadow-2xs space-y-3">
              <div className="w-10 h-10 rounded-xl bg-stone-100 dark:bg-stone-800 flex items-center justify-center text-[#C26D53]">
                <Brain className="w-5 h-5" />
              </div>
              <h3 className="text-base font-semibold text-stone-900 dark:text-stone-100">
                Remember
              </h3>
              <p className="text-xs text-stone-500 dark:text-stone-400 leading-relaxed">
                Your Beauty Memory learns what works for you and carries your preferences forward.
              </p>
            </div>

            {/* Card 3: Experience */}
            <div className="p-6 rounded-2xl border border-stone-200/80 dark:border-stone-800/80 bg-white dark:bg-stone-900 shadow-2xs space-y-3">
              <div className="w-10 h-10 rounded-xl bg-stone-100 dark:bg-stone-800 flex items-center justify-center text-[#C26D53]">
                <RotateCw className="w-5 h-5" />
              </div>
              <h3 className="text-base font-semibold text-stone-900 dark:text-stone-100">
                Experience
              </h3>
              <p className="text-xs text-stone-500 dark:text-stone-400 leading-relaxed">
                Your real product experience updates your profile to improve future recommendations.
              </p>
            </div>

            {/* Card 4: Understand */}
            <div className="p-6 rounded-2xl border border-stone-200/80 dark:border-stone-800/80 bg-white dark:bg-stone-900 shadow-2xs space-y-3">
              <div className="w-10 h-10 rounded-xl bg-stone-100 dark:bg-stone-800 flex items-center justify-center text-[#C26D53]">
                <TrendingUp className="w-5 h-5" />
              </div>
              <h3 className="text-base font-semibold text-stone-900 dark:text-stone-100">
                Understand
              </h3>
              <p className="text-xs text-stone-500 dark:text-stone-400 leading-relaxed">
                Joyory sees aggregated demand and emerging needs to bring better products to life.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. BEST SELLERS SECTION (4 Products) */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6 w-full">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2">
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-[#C26D53]">
              Customer Favorites
            </span>
            <h2 className="text-2xl sm:text-3xl font-semibold text-stone-950 dark:text-stone-50 mt-1">
              Best Sellers
            </h2>
          </div>
          <Link
            to="/products"
            className="text-xs text-[#C26D53] hover:underline font-medium flex items-center gap-1"
          >
            View All
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {displayBestSellers.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* 6. BEAUTY JOURNEY SECTION (Simple Visual Journey) */}
      <section className="py-16 bg-stone-100/40 dark:bg-stone-900/20 border-y border-stone-200/80 dark:border-stone-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="text-center max-w-xl mx-auto space-y-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#C26D53]">
              Simple & Transparent
            </span>
            <h2 className="text-2xl sm:text-3xl font-semibold text-stone-950 dark:text-stone-50">
              A beauty journey that evolves with you
            </h2>
            <p className="text-xs sm:text-sm text-stone-500 dark:text-stone-400">
              Every step you take makes your next beauty choice more effortless.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <div className="p-6 rounded-2xl bg-white dark:bg-stone-900 border border-stone-200/80 dark:border-stone-800/80 shadow-2xs space-y-3 text-center">
              <div className="w-8 h-8 rounded-full bg-stone-100 dark:bg-stone-800 text-stone-900 dark:text-stone-100 font-semibold text-sm flex items-center justify-center mx-auto">
                1
              </div>
              <h3 className="text-sm font-semibold text-stone-900 dark:text-stone-100">
                Find products that fit you
              </h3>
              <p className="text-xs text-stone-500 dark:text-stone-400">
                Search and filter effortlessly across curated, high-efficacy formulations.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white dark:bg-stone-900 border border-stone-200/80 dark:border-stone-800/80 shadow-2xs space-y-3 text-center">
              <div className="w-8 h-8 rounded-full bg-stone-100 dark:bg-stone-800 text-stone-900 dark:text-stone-100 font-semibold text-sm flex items-center justify-center mx-auto">
                2
              </div>
              <h3 className="text-sm font-semibold text-stone-900 dark:text-stone-100">
                Remember what works
              </h3>
              <p className="text-xs text-stone-500 dark:text-stone-400">
                Log quick feedback on textures and absorption to build your Beauty Memory.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white dark:bg-stone-900 border border-stone-200/80 dark:border-stone-800/80 shadow-2xs space-y-3 text-center">
              <div className="w-8 h-8 rounded-full bg-stone-100 dark:bg-stone-800 text-stone-900 dark:text-stone-100 font-semibold text-sm flex items-center justify-center mx-auto">
                3
              </div>
              <h3 className="text-sm font-semibold text-stone-900 dark:text-stone-100">
                Understand why you chose it
              </h3>
              <p className="text-xs text-stone-500 dark:text-stone-400">
                Replay your past choices and see the factors that led to great results.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 7. NEW ARRIVALS (4 Products) */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6 w-full">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2">
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-[#C26D53]">
              Fresh Drops
            </span>
            <h2 className="text-2xl sm:text-3xl font-semibold text-stone-950 dark:text-stone-50 mt-1">
              New Arrivals
            </h2>
          </div>
          <Link
            to="/products"
            className="text-xs text-[#C26D53] hover:underline font-medium flex items-center gap-1"
          >
            Explore Catalog
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {displayNewArrivals.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* 8. SHORT CTA */}
      <section className="py-16 bg-stone-900 text-stone-100 text-center">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-5">
          <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight">
            Start your smarter beauty journey today.
          </h2>
          <p className="text-xs sm:text-sm text-stone-400 max-w-lg mx-auto leading-relaxed">
            Discover products that fit your preferences and build a beauty journey that becomes more personal over time.
          </p>
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link to="/signup">
              <Button size="lg" variant="primary" icon={ArrowRight}>
                Join Joyory Free
              </Button>
            </Link>
            <Link to="/products">
              <Button size="lg" variant="secondary">
                Explore Catalog
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* 9. FOOTER */}
      <Footer />
    </div>
  );
};
