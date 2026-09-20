import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Sparkles,
  ArrowRight,
  GitBranch,
  Brain,
  Compass,
  Flame,
  ShieldCheck,
  CheckCircle2,
  TrendingUp,
  Heart,
  Radar,
  Star,
  Layers,
  ShoppingBag
} from "lucide-react";
import { Button } from "../../components/common/Button";
import { Badge } from "../../components/common/Badge";
import { PublicNavbar } from "../../components/layout/PublicNavbar";
import { ProductCard } from "../../components/customer/ProductCard";
import { productService } from "../../services/productService";
import { FallbackImage } from "../../components/common/FallbackImage";

export const LandingPage = () => {
  const [allProducts, setAllProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const data = await productService.getProducts();
        setAllProducts(data);
      } catch (err) {
        console.warn("Using local product catalog");
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  // Filter curated showcases
  const bestSellers = allProducts.filter(p => p.isBestSeller).slice(0, 8);
  const newArrivals = allProducts.filter(p => p.isNewArrival).slice(0, 6);
  const trendingNow = allProducts.filter(p => p.rating >= 4.8).slice(0, 6);
  const personalizedPicks = allProducts.slice(0, 6);

  const categoriesShowcase = [
    {
      name: "Skincare",
      desc: "Water gels, barrier creams & non-nano SPF",
      image: "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=600&auto=format&fit=crop&q=80",
      query: "Skincare",
      count: "18+ Formulations"
    },
    {
      name: "Makeup",
      desc: "Breathable foundations, lip stains & blushes",
      image: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=600&auto=format&fit=crop&q=80",
      query: "Makeup",
      count: "10+ Formulations"
    },
    {
      name: "Hair Care",
      desc: "Scalp serums, chelating washes & hair masks",
      image: "https://images.unsplash.com/photo-1535585209827-a15fcdbc4c2d?w=600&auto=format&fit=crop&q=80",
      query: "Hair",
      count: "6+ Formulations"
    },
    {
      name: "Body Care",
      desc: "AHA exfoliating gels & rich ceramide lotions",
      image: "https://images.unsplash.com/photo-1556228722-d0b5be7490bf?w=600&auto=format&fit=crop&q=80",
      query: "Body",
      count: "5+ Formulations"
    }
  ];

  const brandNames = [
    "Minimalist",
    "Dot & Key",
    "Aqualogica",
    "Plum",
    "Swiss Beauty",
    "Lakmé",
    "Maybelline",
    "Pilgrim",
    "Joyory Labs"
  ];

  return (
    <div className="min-h-screen bg-stone-50 dark:bg-stone-950 text-stone-900 dark:text-stone-100 transition-colors">
      <PublicNavbar />

      {/* 1. HERO SECTION */}
      <section className="relative pt-12 pb-16 sm:pt-20 sm:pb-24 overflow-hidden border-b border-stone-200/80 dark:border-stone-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-6 text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-stone-100 dark:bg-stone-900 border border-stone-200 dark:border-stone-800 text-xs text-stone-600 dark:text-stone-300">
                <span className="w-2 h-2 rounded-full bg-[#C26D53] animate-ping" />
                <span className="font-semibold text-stone-900 dark:text-stone-100">Intelligent Beauty Commerce</span>
                <span className="text-stone-400">•</span>
                <span>Continuously Adaptive Preferences</span>
              </div>

              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-semibold tracking-tight text-stone-950 dark:text-stone-50 leading-[1.12]">
                Beauty shopping that gets smarter with every interaction.
              </h1>

              <p className="text-base sm:text-lg text-stone-600 dark:text-stone-300 max-w-2xl leading-relaxed font-normal">
                A personalized beauty experience that learns from what you discover, choose and experience. Calibrated formulations tailored to your exact skin tolerances.
              </p>

              {/* Hero CTAs */}
              <div className="pt-2 flex flex-col sm:flex-row items-center gap-3">
                <Link to="/products" className="w-full sm:w-auto">
                  <Button size="lg" variant="primary" icon={ArrowRight} className="w-full sm:w-auto justify-center">
                    Explore Products
                  </Button>
                </Link>
                <Link to="/customer/discover" className="w-full sm:w-auto">
                  <Button size="lg" variant="secondary" className="w-full sm:w-auto justify-center">
                    Discover Your Beauty Journey
                  </Button>
                </Link>
              </div>

              {/* Guarantees */}
              <div className="pt-4 flex flex-wrap items-center gap-6 text-xs text-stone-500">
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Verified Formulations</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Explainable Match Scoring</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Persistent Beauty Passport</span>
                </div>
              </div>
            </div>

            {/* Right Hero Visual Card */}
            <div className="lg:col-span-5 relative">
              <div className="relative rounded-3xl p-6 bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 shadow-xl overflow-hidden space-y-6">
                <div className="relative aspect-4/3 rounded-2xl overflow-hidden bg-stone-100 dark:bg-stone-950">
                  <FallbackImage
                    src="https://images.unsplash.com/photo-1556228720-195a672e8a03?w=800&auto=format&fit=crop&q=80"
                    alt="Hero Product"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-white/90 dark:bg-stone-900/90 backdrop-blur-xs text-[11px] font-semibold text-[#C26D53] border border-stone-200/60 dark:border-stone-800/60 shadow-xs flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>96% Journey Alignment</span>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-[10px] uppercase tracking-wider font-bold text-[#C26D53]">
                        Joyory Labs
                      </span>
                      <h3 className="text-base font-semibold text-stone-900 dark:text-stone-100">
                        HydraGel Ultra-Light Moisturizer
                      </h3>
                    </div>
                    <div className="text-right">
                      <span className="text-lg font-bold text-stone-900 dark:text-stone-100">₹649</span>
                      <span className="text-xs text-stone-400 line-through block">₹799</span>
                    </div>
                  </div>

                  <p className="text-xs text-stone-500 leading-relaxed">
                    Zero-oil water burst gel with 2% Hyaluronic Acid & Centella. Tailored for oily T-zones under humid conditions.
                  </p>

                  <div className="p-3 rounded-xl bg-stone-50 dark:bg-stone-950/60 border border-stone-100 dark:border-stone-800 flex items-center justify-between text-xs">
                    <span className="text-stone-500">Learned Affinity:</span>
                    <span className="font-semibold text-emerald-600">Lightweight Texture (+4%)</span>
                  </div>

                  <Link to="/products/JOY-SKN-001">
                    <Button variant="primary" className="w-full justify-center text-xs py-2.5" icon={ArrowRight}>
                      View Formulation Specs
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. BRANDS CAROUSEL / STRIP */}
      <section className="py-8 bg-stone-100/60 dark:bg-stone-900/40 border-b border-stone-200/80 dark:border-stone-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center text-xs font-semibold uppercase tracking-wider text-stone-400 mb-5">
            Formulations From Respected Beauty Innovators
          </div>
          <div className="flex flex-wrap items-center justify-center gap-8 sm:gap-12 opacity-80 dark:opacity-70">
            {brandNames.map((brand) => (
              <span
                key={brand}
                className="text-sm font-semibold tracking-wider uppercase text-stone-700 dark:text-stone-300 hover:text-[#C26D53] transition-colors cursor-default"
              >
                {brand}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* 3. SHOP BY CATEGORY */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2">
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-[#C26D53]">
              Curated Collections
            </span>
            <h2 className="text-2xl sm:text-3xl font-semibold text-stone-950 dark:text-stone-50">
              Shop By Category
            </h2>
          </div>
          <Link to="/products" className="text-xs text-[#C26D53] hover:underline font-medium flex items-center gap-1">
            Browse All Formulations
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categoriesShowcase.map((cat) => (
            <Link
              key={cat.name}
              to={`/products?category=${cat.query}`}
              className="group relative rounded-2xl overflow-hidden border border-stone-200/80 dark:border-stone-800/80 bg-white dark:bg-stone-900 hover:border-[#C26D53]/40 transition-all shadow-2xs hover:shadow-sm flex flex-col justify-between"
            >
              <div className="aspect-4/3 overflow-hidden bg-stone-100 dark:bg-stone-950">
                <FallbackImage
                  src={cat.image}
                  alt={cat.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-4 space-y-1">
                <div className="flex items-center justify-between">
                  <h3 className="text-base font-semibold text-stone-900 dark:text-stone-100 group-hover:text-[#C26D53] transition-colors">
                    {cat.name}
                  </h3>
                  <span className="text-[10px] text-stone-400 font-mono">{cat.count}</span>
                </div>
                <p className="text-xs text-stone-500 line-clamp-1">{cat.desc}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* 4. BEST SELLERS SECTION (8 Products) */}
      <section className="py-16 bg-stone-100/40 dark:bg-stone-900/20 border-y border-stone-200/80 dark:border-stone-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2">
            <div>
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-900/60 text-[11px] text-amber-700 dark:text-amber-300 font-medium mb-1">
                <Star className="w-3 h-3 fill-current" />
                <span>Customer Verified Favorites</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-semibold text-stone-950 dark:text-stone-50">
                Best Sellers
              </h2>
            </div>
            <Link to="/products" className="text-xs text-[#C26D53] hover:underline font-medium flex items-center gap-1">
              View All
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {(bestSellers.length > 0 ? bestSellers : allProducts.slice(0, 8)).map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* 5. NEW ARRIVALS (6 Products) */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2">
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-[#C26D53]">
              Fresh Drops
            </span>
            <h2 className="text-2xl sm:text-3xl font-semibold text-stone-950 dark:text-stone-50">
              New Arrivals
            </h2>
          </div>
          <Link to="/products" className="text-xs text-[#C26D53] hover:underline font-medium flex items-center gap-1">
            Explore All New
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {(newArrivals.length > 0 ? newArrivals : allProducts.slice(8, 14)).map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* 6. FOUR CORE BEAUTY INNOVATION PILLARS */}
      <section className="py-20 bg-stone-100/60 dark:bg-stone-900/40 border-y border-stone-200/80 dark:border-stone-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <Badge variant="accent" size="md">
              Core Platform Architecture
            </Badge>
            <h2 className="text-2xl sm:text-3xl font-semibold text-stone-950 dark:text-stone-50">
              Beyond Quizzes: An Active Learning Loop
            </h2>
            <p className="text-xs sm:text-sm text-stone-500 dark:text-stone-400">
              Unlike static recommendation quizzes, Joyory tracks the full shopping lifecycle from natural search intent to post-purchase sensory evaluation.
            </p>
            <p className="text-[11px] text-stone-400 dark:text-stone-500 italic">
              * This capability is not publicly listed/documented among Joyory's current visible product features.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Innovation 1: Beauty Outcome Loop */}
            <div className="p-6 rounded-2xl border border-stone-200/80 dark:border-stone-800/80 bg-white dark:bg-stone-900 space-y-4 flex flex-col justify-between hover:border-[#C26D53]/40 transition-colors">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-bold text-[#C26D53]">01 • Post-Purchase Tracking</span>
                  <Badge variant="accent" size="sm">Active Loop</Badge>
                </div>
                <h3 className="text-base font-semibold text-stone-900 dark:text-stone-100">
                  Beauty Outcome Loop
                </h3>
                <p className="text-xs text-stone-500 dark:text-stone-400 leading-relaxed">
                  Transforms post-purchase shopping. Tracks the lifecycle from <em>Purchased &rarr; Trying &rarr; Used &rarr; Experience Logged &rarr; Preference Updated</em>. Submitting sensory feedback immediately updates your Beauty Preference Graph with a transparent "What We Learned" feedback loop.
                </p>
                <div className="p-3 rounded-lg bg-stone-50 dark:bg-stone-950/50 border border-stone-100 dark:border-stone-800 text-[11px] text-stone-600 dark:text-stone-300">
                  <span className="font-semibold text-stone-800 dark:text-stone-200">Outcome Impact: </span>
                  Calibrates tolerance against niacinamide/peptides and reinforces lightweight texture preference scores.
                </div>
              </div>
              <Link to="/customer/beauty-outcome" className="pt-2">
                <Button variant="secondary" size="sm" className="w-full" icon={ArrowRight}>
                  View Beauty Outcome Loop
                </Button>
              </Link>
            </div>

            {/* Innovation 2: Beauty Memory / Personal Beauty Passport */}
            <div className="p-6 rounded-2xl border border-stone-200/80 dark:border-stone-800/80 bg-white dark:bg-stone-900 space-y-4 flex flex-col justify-between hover:border-[#C26D53]/40 transition-colors">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-bold text-[#C26D53]">02 • Persistent Identity</span>
                  <Badge variant="neutral" size="sm">Passport ID</Badge>
                </div>
                <h3 className="text-base font-semibold text-stone-900 dark:text-stone-100">
                  Beauty Memory (Personal Beauty Passport)
                </h3>
                <p className="text-xs text-stone-500 dark:text-stone-400 leading-relaxed">
                  A permanent, customer-owned beauty memory profile storing proven ingredient synergies, texture tolerances, fragrance sensitivities, and 3-month seasonal shift trends so you never have to re-explain your skin again.
                </p>
                <div className="p-3 rounded-lg bg-stone-50 dark:bg-stone-950/50 border border-stone-100 dark:border-stone-800 text-[11px] text-stone-600 dark:text-stone-300">
                  <span className="font-semibold text-stone-800 dark:text-stone-200">Continuous Memory: </span>
                  Chronological timeline captures seasonal shifts (Monsoon barrier recovery, Gel hydration adaptations).
                </div>
              </div>
              <Link to="/customer/beauty-memory" className="pt-2">
                <Button variant="secondary" size="sm" className="w-full" icon={ArrowRight}>
                  Open Beauty Passport
                </Button>
              </Link>
            </div>

            {/* Innovation 3: Beauty Decision Replay */}
            <div className="p-6 rounded-2xl border border-stone-200/80 dark:border-stone-800/80 bg-white dark:bg-stone-900 space-y-4 flex flex-col justify-between hover:border-[#C26D53]/40 transition-colors">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-bold text-[#C26D53]">03 • Journey Transparency</span>
                  <Badge variant="neutral" size="sm">Explainable AI</Badge>
                </div>
                <h3 className="text-base font-semibold text-stone-900 dark:text-stone-100">
                  Beauty Decision Replay
                </h3>
                <p className="text-xs text-stone-500 dark:text-stone-400 leading-relaxed">
                  Reconstructs the entire trajectory behind every past purchase: <em>Search Query &rarr; Product Views &rarr; Side-by-Side Comparison &rarr; Key Decision Factors &rarr; Post-Purchase Validation</em>. Understand exactly why you made each choice and how it turned out.
                </p>
                <div className="p-3 rounded-lg bg-stone-50 dark:bg-stone-950/50 border border-stone-100 dark:border-stone-800 text-[11px] text-stone-600 dark:text-stone-300">
                  <span className="font-semibold text-stone-800 dark:text-stone-200">Explainable Drivers: </span>
                  Reveals trade-offs evaluated (e.g. Ceramide repair vs. oily finish, SPF 50 non-greasy finish).
                </div>
              </div>
              <Link to="/customer/decision-replay" className="pt-2">
                <Button variant="secondary" size="sm" className="w-full" icon={ArrowRight}>
                  Explore Decision Replay
                </Button>
              </Link>
            </div>

            {/* Innovation 4: Customer Need Gap Radar */}
            <div className="p-6 rounded-2xl border border-stone-200/80 dark:border-stone-800/80 bg-white dark:bg-stone-900 space-y-4 flex flex-col justify-between hover:border-[#C26D53]/40 transition-colors">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-bold text-[#C26D53]">04 • Business Intelligence</span>
                  <Badge variant="accent" size="sm">Radar Engine</Badge>
                </div>
                <h3 className="text-base font-semibold text-stone-900 dark:text-stone-100">
                  Customer Need Gap Radar
                </h3>
                <p className="text-xs text-stone-500 dark:text-stone-400 leading-relaxed">
                  Empowers Joyory brand managers by systematically identifying unmet customer beauty demands where search volume and exit rates are high, but catalog SKU coverage or pricing options are inadequate.
                </p>
                <div className="p-3 rounded-lg bg-stone-50 dark:bg-stone-950/50 border border-stone-100 dark:border-stone-800 text-[11px] text-stone-600 dark:text-stone-300">
                  <span className="font-semibold text-stone-800 dark:text-stone-200">Catalog Opportunity: </span>
                  Identifies gaps such as Mineral matte physical sunscreens &lt; ₹500 with a 94/100 Gap Severity Score.
                </div>
              </div>
              <Link to="/business/need-gaps" className="pt-2">
                <Button variant="secondary" size="sm" className="w-full" icon={ArrowRight}>
                  Open Need Gap Radar
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 7. TRENDING NOW & PERSONALIZED PICKS (6 Products) */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2">
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900/60 text-[11px] text-[#C26D53] font-medium mb-1">
              <Flame className="w-3 h-3 text-[#C26D53]" />
              <span>High Community Velocity</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-semibold text-stone-950 dark:text-stone-50">
              Trending Formulations
            </h2>
          </div>
          <Link to="/products" className="text-xs text-[#C26D53] hover:underline font-medium flex items-center gap-1">
            View All
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {(trendingNow.length > 0 ? trendingNow : allProducts.slice(14, 20)).map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* 8. FOOTER CTA */}
      <section className="py-16 bg-stone-900 text-stone-100 text-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <h2 className="text-2xl sm:text-4xl font-semibold tracking-tight">
            Start your smarter beauty journey today.
          </h2>
          <p className="text-sm text-stone-400 max-w-xl mx-auto leading-relaxed">
            Create your personalized beauty profile in under 60 seconds and experience recommendations that truly understand your skin.
          </p>
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link to="/signup">
              <Button size="lg" variant="primary" icon={ArrowRight}>
                Create Free Beauty Passport
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

      {/* Footer */}
      <footer className="py-8 border-t border-stone-200 dark:border-stone-800 text-center text-xs text-stone-400">
        <p>© 2026 Joyory Beauty Journey Intelligence. Powered by Node.js, Express & MongoDB.</p>
      </footer>
    </div>
  );
};
