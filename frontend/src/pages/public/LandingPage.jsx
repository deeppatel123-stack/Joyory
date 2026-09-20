import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  CheckCircle2,
  Compass,
  BookmarkCheck,
  RotateCw,
  TrendingUp
} from "lucide-react";
import { Button } from "../../components/common/Button";
import { PublicNavbar } from "../../components/layout/PublicNavbar";
import { Footer } from "../../components/layout/Footer";
import { ProductCard } from "../../components/customer/ProductCard";
import { productService } from "../../services/productService";
import { useAuth } from "../../context/AuthContext";

export const LandingPage = () => {
  const [products, setProducts] = useState([]);
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    async function load() {
      try {
        const data = await productService.getProducts();
        setProducts(data);
      } catch {
        console.warn("Using local product catalog");
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

  return (
    <div className="min-h-screen bg-stone-50 dark:bg-stone-950 text-stone-900 dark:text-stone-100 transition-colors flex flex-col">
      <PublicNavbar />

      {/* 2. PRODUCT-FREE PROFESSIONAL HERO SECTION */}
      <section className="relative pt-14 pb-18 sm:pt-24 sm:pb-28 border-b border-stone-200/80 dark:border-stone-800/80 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-6 text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-stone-100 dark:bg-stone-900 border border-stone-200 dark:border-stone-800 text-[11px] uppercase tracking-wider text-[#C26D53] font-semibold">
                <span className="w-1.5 h-1.5 rounded-full bg-[#C26D53]" />
                <span>Intelligent Beauty Commerce</span>
              </div>

              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-semibold tracking-tight text-stone-950 dark:text-stone-50 leading-[1.12]">
                Beauty shopping that gets smarter with every interaction.
              </h1>

              <p className="text-base sm:text-lg text-stone-600 dark:text-stone-300 max-w-2xl leading-relaxed font-normal">
                Discover products that fit your preferences, learn from your experience, and build a beauty journey that becomes more personal over time.
              </p>

              {/* Buttons */}
              <div className="pt-2 flex flex-col sm:flex-row items-center gap-3">
                <Link to="/products" className="w-full sm:w-auto">
                  <Button size="lg" variant="primary" icon={ArrowRight} className="w-full sm:w-auto justify-center">
                    Explore Products
                  </Button>
                </Link>
                <Link to={isAuthenticated ? "/customer/journey" : "/signup"} className="w-full sm:w-auto">
                  <Button size="lg" variant="secondary" className="w-full sm:w-auto justify-center">
                    Discover Your Beauty Journey
                  </Button>
                </Link>
              </div>

              {/* 3 small value points */}
              <div className="pt-3 flex flex-wrap items-center gap-6 text-xs text-stone-600 dark:text-stone-400">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-500 shrink-0" />
                  <span>Personalized discovery</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-500 shrink-0" />
                  <span>Remembers what works for you</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-500 shrink-0" />
                  <span>Smarter journeys over time</span>
                </div>
              </div>
            </div>

            {/* Right: Abstract Beauty Journey Flow Visual (Product-Free) */}
            <div className="lg:col-span-5 relative">
              <div className="relative rounded-2xl p-6 sm:p-8 bg-white dark:bg-stone-900 border border-stone-200/80 dark:border-stone-800/80 shadow-sm space-y-6">
                <div className="border-b border-stone-100 dark:border-stone-800 pb-3 flex items-center justify-between">
                  <span className="text-[11px] font-semibold uppercase tracking-wider text-[#C26D53]">
                    The Journey Cycle
                  </span>
                  <span className="text-[11px] text-stone-400">Continuous Learning</span>
                </div>

                {/* 4 Journey Steps Flow */}
                <div className="relative pl-6 space-y-6 before:absolute before:left-2.5 before:top-2 before:bottom-2 before:w-px before:bg-gradient-to-b before:from-[#C26D53] before:via-stone-300 dark:before:via-stone-700 before:to-[#C26D53]">
                  {/* Step 1: Discover */}
                  <div className="relative">
                    <div className="absolute -left-[29px] top-0.5 w-3 h-3 rounded-full bg-[#C26D53] ring-4 ring-white dark:ring-stone-900" />
                    <div>
                      <h4 className="text-sm font-semibold text-stone-900 dark:text-stone-100">
                        1. Discover
                      </h4>
                      <p className="text-xs text-stone-500 dark:text-stone-400 mt-0.5 leading-relaxed">
                        Find products that match your specific skin type, finish, and budget.
                      </p>
                    </div>
                  </div>

                  {/* Step 2: Choose */}
                  <div className="relative">
                    <div className="absolute -left-[29px] top-0.5 w-3 h-3 rounded-full bg-stone-300 dark:bg-stone-700 ring-4 ring-white dark:ring-stone-900" />
                    <div>
                      <h4 className="text-sm font-semibold text-stone-900 dark:text-stone-100">
                        2. Choose
                      </h4>
                      <p className="text-xs text-stone-500 dark:text-stone-400 mt-0.5 leading-relaxed">
                        Compare formulation textures and suitability to pick what works best.
                      </p>
                    </div>
                  </div>

                  {/* Step 3: Experience */}
                  <div className="relative">
                    <div className="absolute -left-[29px] top-0.5 w-3 h-3 rounded-full bg-stone-300 dark:bg-stone-700 ring-4 ring-white dark:ring-stone-900" />
                    <div>
                      <h4 className="text-sm font-semibold text-stone-900 dark:text-stone-100">
                        3. Experience
                      </h4>
                      <p className="text-xs text-stone-500 dark:text-stone-400 mt-0.5 leading-relaxed">
                        Share simple feedback on how the product felt and worked for you.
                      </p>
                    </div>
                  </div>

                  {/* Step 4: Remember */}
                  <div className="relative">
                    <div className="absolute -left-[29px] top-0.5 w-3 h-3 rounded-full bg-[#C26D53] ring-4 ring-white dark:ring-stone-900" />
                    <div>
                      <h4 className="text-sm font-semibold text-stone-900 dark:text-stone-100">
                        4. Remember
                      </h4>
                      <p className="text-xs text-stone-500 dark:text-stone-400 mt-0.5 leading-relaxed">
                        Your Beauty Memory saves what worked, making future recommendations effortless.
                      </p>
                    </div>
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
                <BookmarkCheck className="w-5 h-5" />
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
