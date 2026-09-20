import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ThemeProvider } from "./context/ThemeContext";
import { NotificationProvider } from "./context/NotificationContext";
import { AuthProvider } from "./context/AuthContext";
import { CustomerProvider } from "./context/CustomerContext";

// Auth & Security Components
import { AdminRoute } from "./components/auth/AdminRoute";

// Layouts
import { CustomerLayout } from "./components/layout/CustomerLayout";
import { BusinessLayout } from "./components/layout/BusinessLayout";
import { AdminLayout } from "./components/layout/AdminLayout";

// Public Pages
import { LandingPage } from "./pages/public/LandingPage";
import { ProductsPage } from "./pages/public/ProductsPage";
import { ProductDetailPage } from "./pages/public/ProductDetailPage";
import { ComparePage } from "./pages/public/ComparePage";
import { AboutPage } from "./pages/public/AboutPage";

// Auth Pages
import { LoginPage } from "./pages/auth/LoginPage";
import { SignupPage } from "./pages/auth/SignupPage";

// Commerce Pages
import { CartPage } from "./pages/customer/CartPage";
import { CheckoutPage } from "./pages/customer/CheckoutPage";

// Customer Pages
import { CustomerDashboard } from "./pages/customer/CustomerDashboard";
import { SmartDiscoveryPage } from "./pages/customer/SmartDiscoveryPage";
import { RecommendationsPage } from "./pages/customer/RecommendationsPage";
import { BeautyProfilePage } from "./pages/customer/BeautyProfilePage";
import { BeautyJourneyPage } from "./pages/customer/BeautyJourneyPage";
import { WishlistPage } from "./pages/customer/WishlistPage";
import { OrdersPage } from "./pages/customer/OrdersPage";
import { FeedbackPage } from "./pages/customer/FeedbackPage";
import { BeautyOutcomePage } from "./pages/customer/BeautyOutcomePage";
import { BeautyMemoryPage } from "./pages/customer/BeautyMemoryPage";
import { BeautyDecisionReplayPage } from "./pages/customer/BeautyDecisionReplayPage";

// Business Pages
import { BusinessOverviewPage } from "./pages/business/BusinessOverviewPage";
import { CustomerInsightsPage } from "./pages/business/CustomerInsightsPage";
import { SearchTrendsPage } from "./pages/business/SearchTrendsPage";
import { ProductIntelligencePage } from "./pages/business/ProductIntelligencePage";
import { CustomerSegmentsPage } from "./pages/business/CustomerSegmentsPage";
import { ShoppingFunnelPage } from "./pages/business/ShoppingFunnelPage";
import { FeedbackIntelligencePage } from "./pages/business/FeedbackIntelligencePage";
import { OpportunitiesPage } from "./pages/business/OpportunitiesPage";
import { OpportunityDetailPage } from "./pages/business/OpportunityDetailPage";
import { RecommendationAnalyticsPage } from "./pages/business/RecommendationAnalyticsPage";
import { BusinessSettingsPage } from "./pages/business/BusinessSettingsPage";
import { NeedGapRadarPage } from "./pages/business/NeedGapRadarPage";

// Admin Suite Pages
import { AdminDashboard } from "./pages/admin/AdminDashboard";
import { AdminProductsPage } from "./pages/admin/AdminProductsPage";
import { AdminOrdersPage } from "./pages/admin/AdminOrdersPage";
import { AdminUsersPage } from "./pages/admin/AdminUsersPage";
import { AdminReviewsPage } from "./pages/admin/AdminReviewsPage";

export default function App() {
  return (
    <ThemeProvider>
      <NotificationProvider>
        <AuthProvider>
          <CustomerProvider>
            <BrowserRouter>
              <Routes>
                {/* Public Routes */}
                <Route path="/" element={<LandingPage />} />
                <Route path="/discover" element={<Navigate to="/customer/discover" replace />} />
                <Route path="/products" element={<ProductsPage />} />
                <Route path="/products/:id" element={<ProductDetailPage />} />
                <Route path="/compare" element={<ComparePage />} />
                <Route path="/about" element={<AboutPage />} />

                {/* Authentication Routes */}
                <Route path="/login" element={<LoginPage />} />
                <Route path="/signup" element={<SignupPage />} />

                {/* Commerce & Checkout Routes */}
                <Route path="/cart" element={<CartPage />} />
                <Route path="/checkout" element={<CheckoutPage />} />
              
              {/* Public direct shortcut aliases */}
              <Route path="/beauty-outcome" element={<Navigate to="/customer/beauty-outcome" replace />} />
              <Route path="/beauty-memory" element={<Navigate to="/customer/beauty-memory" replace />} />
              <Route path="/decision-replay" element={<Navigate to="/customer/decision-replay" replace />} />

              {/* Customer Routes */}
              <Route path="/customer" element={<CustomerLayout />}>
                <Route index element={<CustomerDashboard />} />
                <Route path="discover" element={<SmartDiscoveryPage />} />
                <Route path="recommendations" element={<RecommendationsPage />} />
                <Route path="profile" element={<BeautyProfilePage />} />
                <Route path="memory" element={<Navigate to="/customer/beauty-memory" replace />} />
                <Route path="beauty-memory" element={<BeautyMemoryPage />} />
                <Route path="journey" element={<BeautyJourneyPage />} />
                <Route path="outcome" element={<Navigate to="/customer/beauty-outcome" replace />} />
                <Route path="beauty-outcome" element={<BeautyOutcomePage />} />
                <Route path="decision-replay" element={<BeautyDecisionReplayPage />} />
                <Route path="wishlist" element={<WishlistPage />} />
                <Route path="orders" element={<OrdersPage />} />
                <Route path="feedback" element={<FeedbackPage />} />
              </Route>

              {/* Business Intelligence Routes */}
              <Route path="/business" element={<BusinessLayout />}>
                <Route index element={<Navigate to="/business/overview" replace />} />
                <Route path="overview" element={<BusinessOverviewPage />} />
                <Route path="need-gaps" element={<NeedGapRadarPage />} />
                <Route path="customer-insights" element={<CustomerInsightsPage />} />
                <Route path="search-trends" element={<SearchTrendsPage />} />
                <Route path="product-intelligence" element={<ProductIntelligencePage />} />
                <Route path="customer-segments" element={<CustomerSegmentsPage />} />
                <Route path="funnel" element={<ShoppingFunnelPage />} />
                <Route path="feedback-intelligence" element={<FeedbackIntelligencePage />} />
                <Route path="opportunities" element={<OpportunitiesPage />} />
                <Route path="opportunities/:id" element={<OpportunityDetailPage />} />
                <Route path="recommendation-analytics" element={<RecommendationAnalyticsPage />} />
                <Route path="settings" element={<BusinessSettingsPage />} />
              </Route>

              {/* Admin Suite Routes */}
              <Route
                path="/admin"
                element={
                  <AdminRoute>
                    <AdminLayout />
                  </AdminRoute>
                }
              >
                <Route index element={<AdminDashboard />} />
                <Route path="products" element={<AdminProductsPage />} />
                <Route path="orders" element={<AdminOrdersPage />} />
                <Route path="users" element={<AdminUsersPage />} />
                <Route path="reviews" element={<AdminReviewsPage />} />
              </Route>

              {/* Catch-all fallback */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </BrowserRouter>
        </CustomerProvider>
      </AuthProvider>
    </NotificationProvider>
  </ThemeProvider>
);
}
