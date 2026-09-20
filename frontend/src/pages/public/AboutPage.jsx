import React from "react";
import { PublicNavbar } from "../../components/layout/PublicNavbar";
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
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-stone-900 dark:text-stone-100">
                Four Flagship Innovation Systems
              </h2>
              <Badge variant="accent" size="sm">Smart Shopping Experience</Badge>
            </div>
            <p className="text-xs text-stone-400 italic">
              * This capability is not publicly listed/documented among Joyory's current visible product features.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 text-xs">
            {/* 1. Beauty Outcome Loop */}
            <div className="p-4 rounded-xl border border-stone-200 dark:border-stone-800 bg-stone-50 dark:bg-stone-950/40 space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-semibold text-stone-900 dark:text-stone-100">
                  1. Beauty Outcome Loop
                </span>
                <span className="text-[10px] font-mono text-[#C26D53]">/customer/beauty-outcome</span>
              </div>
              <p className="text-stone-500 leading-relaxed">
                Tracks purchased products across a progressive status lifecycle (<em>Purchased &rarr; Trying &rarr; Used &rarr; Experience Logged &rarr; Preference Updated</em>). Captures structured sensory feedback (texture feel, breakout reaction, hydration rating) and dynamically adjusts preference graph node weights with instant feedback.
              </p>
            </div>

            {/* 2. Beauty Memory (Personal Beauty Passport) */}
            <div className="p-4 rounded-xl border border-stone-200 dark:border-stone-800 bg-stone-50 dark:bg-stone-950/40 space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-semibold text-stone-900 dark:text-stone-100">
                  2. Personal Beauty Passport
                </span>
                <span className="text-[10px] font-mono text-[#C26D53]">/customer/beauty-memory</span>
              </div>
              <p className="text-stone-500 leading-relaxed">
                A persistent, cross-session beauty profile displaying verified skin attributes, liked/disliked ingredients, texture tolerances, fragrance sensitivity, 3-month seasonal evolution shifts, and a chronological memory event log.
              </p>
            </div>

            {/* 3. Beauty Decision Replay */}
            <div className="p-4 rounded-xl border border-stone-200 dark:border-stone-800 bg-stone-50 dark:bg-stone-950/40 space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-semibold text-stone-900 dark:text-stone-100">
                  3. Beauty Decision Replay
                </span>
                <span className="text-[10px] font-mono text-[#C26D53]">/customer/decision-replay</span>
              </div>
              <p className="text-stone-500 leading-relaxed">
                Reconstructs the step-by-step decision trajectory for any past purchase: <em>Intent Search &rarr; Detail Inspection &rarr; Head-to-Head Comparison &rarr; Selection Drivers &rarr; Usage Outcome Correlation</em>. Provides complete transparency into why choices succeeded or failed.
              </p>
            </div>

            {/* 4. Customer Need Gap Radar */}
            <div className="p-4 rounded-xl border border-stone-200 dark:border-stone-800 bg-stone-50 dark:bg-stone-950/40 space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-semibold text-stone-900 dark:text-stone-100">
                  4. Customer Need Gap Radar
                </span>
                <span className="text-[10px] font-mono text-[#C26D53]">/business/need-gaps</span>
              </div>
              <p className="text-stone-500 leading-relaxed">
                A business intelligence radar that correlates customer search demand, bounce rates, price resistance, and missing catalog attributes to surface high-priority product gaps for Joyory brand managers and inventory planners.
              </p>
            </div>
          </div>
        </div>

        {/* Future MERN + Python AI/ML Stack Architecture */}
        <div className="p-6 sm:p-8 rounded-2xl border border-stone-200/80 dark:border-stone-800/80 bg-white dark:bg-stone-900 space-y-6 shadow-2xs">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-stone-900 dark:text-stone-100">
              Future MERN + Python AI/ML Integration Blueprint
            </h2>
            <Badge variant="neutral" size="sm">Architecture Design</Badge>
          </div>

          <p className="text-xs text-stone-500">
            The frontend has been built with an isolated Promise-based service layer (`/src/services`), perfectly prepared for the subsequent backend implementation phase:
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
            <div className="p-4 rounded-xl border border-stone-200 dark:border-stone-800 bg-stone-50 dark:bg-stone-950/40 space-y-2">
              <span className="text-[10px] font-mono text-[#C26D53] uppercase font-bold">Tier 1: Client</span>
              <h4 className="font-semibold text-stone-900 dark:text-stone-100">React + Vite Frontend</h4>
              <p className="text-stone-500 text-[11px]">
                Reactive Context state, interactive Preference Graph, Tailwind minimalism styling.
              </p>
            </div>

            <div className="p-4 rounded-xl border border-stone-200 dark:border-stone-800 bg-stone-50 dark:bg-stone-950/40 space-y-2">
              <span className="text-[10px] font-mono text-[#C26D53] uppercase font-bold">Tier 2: Backend</span>
              <h4 className="font-semibold text-stone-900 dark:text-stone-100">Node.js + Express + MongoDB</h4>
              <p className="text-stone-500 text-[11px]">
                REST endpoints, customer graph document store, session management, catalog database.
              </p>
            </div>

            <div className="p-4 rounded-xl border border-stone-200 dark:border-stone-800 bg-stone-50 dark:bg-stone-950/40 space-y-2">
              <span className="text-[10px] font-mono text-[#C26D53] uppercase font-bold">Tier 3: AI Engine</span>
              <h4 className="font-semibold text-stone-900 dark:text-stone-100">Python + FastAPI + Scikit</h4>
              <p className="text-stone-500 text-[11px]">
                NLP query understanding, customer clustering, review sentiment analysis, demand gap detector.
              </p>
            </div>
          </div>

          {/* Prepared API Contract Table */}
          <div className="space-y-3 pt-2">
            <h4 className="text-xs font-semibold text-stone-800 dark:text-stone-200 uppercase tracking-wider">
              Prepared Service Abstraction Contracts (Future API Specs)
            </h4>
            <div className="overflow-x-auto rounded-lg border border-stone-200 dark:border-stone-800">
              <table className="w-full text-left text-xs">
                <thead className="bg-stone-50 dark:bg-stone-950/50 text-stone-500">
                  <tr className="border-b border-stone-200 dark:border-stone-800">
                    <th className="p-2.5">Method</th>
                    <th className="p-2.5">Endpoint</th>
                    <th className="p-2.5">Service Abstraction</th>
                    <th className="p-2.5">Function</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-100 dark:divide-stone-800/80 font-mono text-[11px]">
                  <tr>
                    <td className="p-2.5 font-bold text-emerald-600">GET</td>
                    <td className="p-2.5">/api/products</td>
                    <td className="p-2.5 text-stone-600 dark:text-stone-300">productService.getProducts()</td>
                    <td className="p-2.5 text-stone-400 font-sans">Filtered catalog query</td>
                  </tr>
                  <tr>
                    <td className="p-2.5 font-bold text-emerald-600">GET</td>
                    <td className="p-2.5">/api/recommendations</td>
                    <td className="p-2.5 text-stone-600 dark:text-stone-300">recommendationService.getRecommendations()</td>
                    <td className="p-2.5 text-stone-400 font-sans">Ranked personalized bundles</td>
                  </tr>
                  <tr>
                    <td className="p-2.5 font-bold text-blue-600">POST</td>
                    <td className="p-2.5">/api/feedback</td>
                    <td className="p-2.5 text-stone-600 dark:text-stone-300">feedbackService.submitFeedback()</td>
                    <td className="p-2.5 text-stone-400 font-sans">Preference graph tuning loop</td>
                  </tr>
                  <tr>
                    <td className="p-2.5 font-bold text-emerald-600">GET</td>
                    <td className="p-2.5">/api/customer/outcomes</td>
                    <td className="p-2.5 text-stone-600 dark:text-stone-300">outcomeService.getBeautyOutcomes()</td>
                    <td className="p-2.5 text-stone-400 font-sans">Track outcome lifecycle</td>
                  </tr>
                  <tr>
                    <td className="p-2.5 font-bold text-blue-600">POST</td>
                    <td className="p-2.5">/api/customer/outcomes/:id</td>
                    <td className="p-2.5 text-stone-600 dark:text-stone-300">outcomeService.updateOutcomeFeedback()</td>
                    <td className="p-2.5 text-stone-400 font-sans">Submit experience feedback & update graph</td>
                  </tr>
                  <tr>
                    <td className="p-2.5 font-bold text-emerald-600">GET</td>
                    <td className="p-2.5">/api/customer/memory</td>
                    <td className="p-2.5 text-stone-600 dark:text-stone-300">outcomeService.getBeautyMemory()</td>
                    <td className="p-2.5 text-stone-400 font-sans">Fetch Personal Beauty Passport</td>
                  </tr>
                  <tr>
                    <td className="p-2.5 font-bold text-emerald-600">GET</td>
                    <td className="p-2.5">/api/customer/decision-replays</td>
                    <td className="p-2.5 text-stone-600 dark:text-stone-300">outcomeService.getDecisionReplays()</td>
                    <td className="p-2.5 text-stone-400 font-sans">Reconstruct decision paths</td>
                  </tr>
                  <tr>
                    <td className="p-2.5 font-bold text-emerald-600">GET</td>
                    <td className="p-2.5">/api/business/need-gaps</td>
                    <td className="p-2.5 text-stone-600 dark:text-stone-300">outcomeService.getNeedGaps()</td>
                    <td className="p-2.5 text-stone-400 font-sans">Catalog Need Gap Radar metrics</td>
                  </tr>
                  <tr>
                    <td className="p-2.5 font-bold text-emerald-600">GET</td>
                    <td className="p-2.5">/api/business/opportunities</td>
                    <td className="p-2.5 text-stone-600 dark:text-stone-300">opportunityService.getOpportunities()</td>
                    <td className="p-2.5 text-stone-400 font-sans">Unmet need demand detector</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
