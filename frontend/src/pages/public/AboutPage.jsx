import React from "react";
import { PublicNavbar } from "../../components/layout/PublicNavbar";
import { Footer } from "../../components/layout/Footer";
import { Badge } from "../../components/common/Badge";
import {
  Layers,
  Database,
  Brain,
  Sparkles,
  GitBranch,
  ShieldCheck,
  CheckCircle2,
  Code
} from "lucide-react";

export const AboutPage = () => {
  return (
    <div className="min-h-screen bg-stone-50 dark:bg-stone-950 text-stone-900 dark:text-stone-100 transition-colors pb-16">
      <PublicNavbar />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <Badge variant="accent" size="md">
            Next-Gen Intelligent Commerce • Smart Shopping Experience
          </Badge>
          <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight text-stone-950 dark:text-stone-50">
            About Joyory Beauty Journey Intelligence
          </h1>
          <p className="text-sm text-stone-500 dark:text-stone-400">
            A smarter beauty journey, powered by what you discover, choose and experience.
          </p>
        </div>

        {/* Core Differentiation Section */}
        <div className="p-6 sm:p-8 rounded-2xl border border-stone-200/80 dark:border-stone-800/80 bg-white dark:bg-stone-900 space-y-6 shadow-2xs">
          <h2 className="text-lg font-semibold text-stone-900 dark:text-stone-100">
            Core Innovation & Why This is Differentiated
          </h2>
          <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-300 leading-relaxed">
            Conventional beauty websites rely on one-time quizzes, generic keyword search, or passive recommendation carousels. Joyory changes the model: every search, product comparison, delivery, and experience feedback acts as an active vector in a persistent <strong>Beauty Preference Graph</strong>.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs pt-2">
            <div className="p-4 rounded-xl bg-stone-50 dark:bg-stone-950/40 border border-stone-100 dark:border-stone-800 space-y-2">
              <span className="font-semibold text-stone-900 dark:text-stone-100 block">
                1. Customer Experience Evolution
              </span>
              <p className="text-stone-500 leading-relaxed">
                Interactions continuously make recommendations smarter over time. The customer clearly understands "Why this matches" and sees their profile adapt after every product feedback.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-stone-50 dark:bg-stone-950/40 border border-stone-100 dark:border-stone-800 space-y-2">
              <span className="font-semibold text-stone-900 dark:text-stone-100 block">
                2. Joyory Business Intelligence
              </span>
              <p className="text-stone-500 leading-relaxed">
                Aggregated behavior generates actionable business intelligence. The <strong>⭐ Unmet Need Detector</strong> and <strong>Need Gap Radar</strong> automatically identify high-demand customer queries with low catalog coverage.
              </p>
            </div>
          </div>
        </div>

        {/* 4 Innovation Features Deep-Dive */}
        <div className="p-6 sm:p-8 rounded-2xl border border-stone-200/80 dark:border-stone-800/80 bg-white dark:bg-stone-900 space-y-6 shadow-2xs">
          <div className="space-y-1">
            <h2 className="text-lg font-semibold text-stone-900 dark:text-stone-100">
              Four Flagship Innovation Systems
            </h2>
            <p className="text-xs text-stone-500 dark:text-stone-400">
              How our platform connects customer discovery, post-purchase experience, and product development.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 text-xs">
            {/* 1. Beauty Outcome Loop */}
            <div className="p-4 rounded-xl border border-stone-200 dark:border-stone-800 bg-stone-50 dark:bg-stone-950/40 space-y-2">
              <span className="font-semibold text-stone-900 dark:text-stone-100 block">
                1. Beauty Outcome Loop
              </span>
              <p className="text-stone-500 leading-relaxed">
                Tracks purchased products across a progressive status lifecycle. Captures structured sensory feedback (texture feel, breakout reaction, hydration rating) and dynamically adjusts preference scores with instant feedback.
              </p>
            </div>

            {/* 2. Beauty Memory (Personal Beauty Passport) */}
            <div className="p-4 rounded-xl border border-stone-200 dark:border-stone-800 bg-stone-50 dark:bg-stone-950/40 space-y-2">
              <span className="font-semibold text-stone-900 dark:text-stone-100 block">
                2. Personal Beauty Memory
              </span>
              <p className="text-stone-500 leading-relaxed">
                A persistent, cross-session beauty profile displaying verified skin attributes, liked/disliked ingredients, texture tolerances, fragrance sensitivity, and a continuous memory event log.
              </p>
            </div>

            {/* 3. Beauty Decision Replay */}
            <div className="p-4 rounded-xl border border-stone-200 dark:border-stone-800 bg-stone-50 dark:bg-stone-950/40 space-y-2">
              <span className="font-semibold text-stone-900 dark:text-stone-100 block">
                3. Beauty Decision Replay
              </span>
              <p className="text-stone-500 leading-relaxed">
                Reconstructs the step-by-step decision trajectory for past purchases: <em>Search &rarr; Inspection &rarr; Comparison &rarr; Selection Drivers &rarr; Usage Outcome</em>. Provides complete transparency into why choices worked.
              </p>
            </div>

            {/* 4. Customer Need Gap Radar */}
            <div className="p-4 rounded-xl border border-stone-200 dark:border-stone-800 bg-stone-50 dark:bg-stone-950/40 space-y-2">
              <span className="font-semibold text-stone-900 dark:text-stone-100 block">
                4. Customer Need Gap Radar
              </span>
              <p className="text-stone-500 leading-relaxed">
                A business intelligence radar that correlates customer search demand, bounce rates, and missing catalog attributes to surface high-priority product opportunities for brand managers and product developers.
              </p>
            </div>
          </div>
        </div>

        {/* Intelligent Platform Capabilities */}
        <div className="p-6 sm:p-8 rounded-2xl border border-stone-200/80 dark:border-stone-800/80 bg-white dark:bg-stone-900 space-y-6 shadow-2xs">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-stone-900 dark:text-stone-100">
              How Beauty Journey Intelligence Operates
            </h2>
            <Badge variant="neutral" size="sm">Product Philosophy</Badge>
          </div>

          <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-300 leading-relaxed">
            Every layer of Joyory is designed to eliminate the guesswork from beauty shopping through continuous, transparent customer intelligence:
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 text-xs">
            <div className="p-4 rounded-xl border border-stone-200 dark:border-stone-800 bg-stone-50 dark:bg-stone-950/40 space-y-2">
              <span className="text-[10px] uppercase tracking-wider text-[#C26D53] font-bold block">1. Discovery</span>
              <h4 className="font-semibold text-stone-900 dark:text-stone-100">Adaptive Matching</h4>
              <p className="text-stone-500 leading-relaxed">
                Rather than treating all oily or dry skin the same, Joyory evaluates specific ingredient sensitivities, seasonal humidity changes, and formula textures to recommend optimal products.
              </p>
            </div>

            <div className="p-4 rounded-xl border border-stone-200 dark:border-stone-800 bg-stone-50 dark:bg-stone-950/40 space-y-2">
              <span className="text-[10px] uppercase tracking-wider text-[#C26D53] font-bold block">2. Experience</span>
              <h4 className="font-semibold text-stone-900 dark:text-stone-100">Outcome Calibration</h4>
              <p className="text-stone-500 leading-relaxed">
                After receiving a product, log sensory feedback (hydration feel, breakout reactions, finish). Your personal profile instantly recalibrates to prevent future mismatches.
              </p>
            </div>

            <div className="p-4 rounded-xl border border-stone-200 dark:border-stone-800 bg-stone-50 dark:bg-stone-950/40 space-y-2">
              <span className="text-[10px] uppercase tracking-wider text-[#C26D53] font-bold block">3. Innovation</span>
              <h4 className="font-semibold text-stone-900 dark:text-stone-100">Demand Intelligence</h4>
              <p className="text-stone-500 leading-relaxed">
                Aggregated, anonymized search patterns and unfulfilled queries directly signal formulation gaps to brand managers, ensuring new products match real customer desires.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Commercial Footer */}
      <Footer />
    </div>
  );
};
