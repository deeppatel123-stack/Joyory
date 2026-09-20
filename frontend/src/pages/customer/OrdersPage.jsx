import React, { useState, useEffect, useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Package,
  CheckCircle2,
  Clock,
  Truck,
  X,
  MessageSquare,
  Sparkles,
  ShoppingBag
} from "lucide-react";
import { useCustomer } from "../../context/CustomerContext";
import { useAuth } from "../../context/AuthContext";
import { orderService } from "../../services/orderService";
import { Button } from "../../components/common/Button";
import { Badge } from "../../components/common/Badge";
import { FallbackImage } from "../../components/common/FallbackImage";
import { EmptyState } from "../../components/common/EmptyState";
import { ErrorBoundary } from "../../components/common/ErrorBoundary";
import { FeedbackModal } from "../../components/customer/FeedbackModal";

const OrdersContent = () => {
  const { user } = useAuth();
  const { orders: contextOrders } = useCustomer();
  const navigate = useNavigate();

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [selectedOrder, setSelectedOrder] = useState(null);
  const [detailsModalOpen, setDetailsModalOpen] = useState(false);
  const [feedbackOrder, setFeedbackOrder] = useState(null);
  const [feedbackOpen, setFeedbackOpen] = useState(false);

  const fetchCustomerOrders = useCallback(async () => {
    try {
      let rawOrders = [];
      try {
        rawOrders = await orderService.getOrders();
      } catch {
        rawOrders = contextOrders || [];
      }

      if (!Array.isArray(rawOrders)) {
        rawOrders = [];
      }

      // Filter customer-specific orders: only orders belonging to the logged-in customer
      const currentUserId = user?.id || user?._id || "cust-101";
      const currentUserEmail = user?.email || "aria.chen@joyory.com";

      const filtered = rawOrders.filter((o) => {
        if (!o) return false;
        // Check userId match
        if (o.userId && (o.userId === currentUserId || (currentUserId === "cust-101" && o.userId === "cust-101"))) {
          return true;
        }
        // Check user.id match
        if (o.user?.id && (o.user.id === currentUserId || (currentUserId === "cust-101" && o.user.id === "cust-101"))) {
          return true;
        }
        // Check user.email match
        if (o.user?.email && o.user.email.toLowerCase() === currentUserEmail.toLowerCase()) {
          return true;
        }
        // Demo fallback for Aria Chen
        if (!o.userId && (currentUserEmail.includes("aria.chen") || currentUserId === "cust-101")) {
          return true;
        }
        return false;
      });

      setOrders(filtered);
    } catch (err) {
      console.error("[OrdersPage error]:", err);
      setError("Unable to load your orders right now.");
    } finally {
      setLoading(false);
    }
  }, [user, contextOrders]);

  useEffect(() => {
    let ignore = false;
    async function start() {
      if (!ignore) {
        await fetchCustomerOrders();
      }
    }
    start();
    return () => {
      ignore = true;
    };
  }, [fetchCustomerOrders]);

  const handleOpenDetails = (order) => {
    setSelectedOrder(order);
    setDetailsModalOpen(true);
  };

  const handleOpenFeedback = (order) => {
    setFeedbackOrder(order);
    setFeedbackOpen(true);
  };

  // Helper to extract primary product data safely
  const getOrderProduct = (order) => {
    if (!order) return {};
    if (order.product && typeof order.product === "object") {
      return order.product;
    }
    if (Array.isArray(order.items) && order.items.length > 0 && order.items[0]) {
      return order.items[0];
    }
    return {};
  };

  const getOrderStatusBadge = (status) => {
    const s = (status || "Confirmed").toLowerCase();
    if (s.includes("delivered")) {
      return (
        <Badge variant="success" size="sm" className="gap-1">
          <CheckCircle2 className="w-3 h-3" />
          <span>Delivered</span>
        </Badge>
      );
    }
    if (s.includes("shipped") || s.includes("transit")) {
      return (
        <Badge variant="info" size="sm" className="gap-1">
          <Truck className="w-3 h-3" />
          <span>In Transit</span>
        </Badge>
      );
    }
    return (
      <Badge variant="neutral" size="sm" className="gap-1">
        <Clock className="w-3 h-3" />
        <span>{status || "Confirmed"}</span>
      </Badge>
    );
  };

  if (loading) {
    return (
      <div className="space-y-6 max-w-4xl mx-auto py-8">
        <div className="h-8 w-48 bg-stone-200 dark:bg-stone-800 rounded-lg animate-pulse" />
        <div className="space-y-4">
          {[1, 2].map((i) => (
            <div
              key={i}
              className="h-36 rounded-2xl border border-stone-200/80 dark:border-stone-800/80 bg-white dark:bg-stone-900 animate-pulse p-6"
            />
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-md mx-auto py-16 text-center space-y-4">
        <div className="p-6 rounded-2xl border border-stone-200/80 dark:border-stone-800/80 bg-white dark:bg-stone-900 shadow-sm space-y-4">
          <h3 className="text-base font-semibold text-stone-900 dark:text-stone-100">
            Something went wrong.
          </h3>
          <p className="text-xs text-stone-500 dark:text-stone-400">
            {error}
          </p>
          <Button size="sm" variant="primary" onClick={fetchCustomerOrders}>
            Try Again
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      {/* Header */}
      <div className="border-b border-stone-200/80 dark:border-stone-800/80 pb-6 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <span className="text-xs font-semibold uppercase tracking-wider text-[#C26D53]">
            Purchase History
          </span>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-stone-950 dark:text-stone-50 mt-1">
            My Orders
          </h1>
          <p className="text-xs sm:text-sm text-stone-500 dark:text-stone-400 mt-1">
            Track your deliveries, review orders, and share observations to refine your beauty journey.
          </p>
        </div>

        <Link to="/customer/discover">
          <Button variant="outline" size="sm" icon={ShoppingBag}>
            Explore Products
          </Button>
        </Link>
      </div>

      {/* Orders List */}
      {orders.length === 0 ? (
        <EmptyState
          icon={Package}
          title="No orders yet"
          description="Your purchased products will appear here."
          actionLabel="Explore Products"
          onAction={() => navigate("/customer/discover")}
        />
      ) : (
        <div className="space-y-4">
          {orders.map((order, orderIdx) => {
            const product = getOrderProduct(order);
            const orderId = order.orderId || order.id || "JOY-1000";
            const orderDate = order.date || order.orderDate || "Recent";
            const priceDisplay = product.price !== undefined
              ? `₹${product.price}`
              : (order.totalAmount !== undefined ? `₹${order.totalAmount}` : "Price unavailable");
            const productName = product.name || "HydraGel Ultra-Light Moisturizer";
            const productBrand = product.brand || "Joyory Labs";
            const productImage = product.image || product.images?.[0] || null;

            return (
              <div
                key={order.id || order.orderId || `order-${orderIdx}`}
                className="rounded-2xl border border-stone-200/80 dark:border-stone-800/80 bg-white dark:bg-stone-900 p-5 sm:p-6 shadow-2xs transition-colors space-y-4"
              >
                {/* Top Row: Product + Info */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex items-center gap-4 min-w-0">
                    <div className="w-16 h-16 rounded-xl overflow-hidden bg-stone-100 dark:bg-stone-800 shrink-0 border border-stone-200/60 dark:border-stone-700/60">
                      <FallbackImage
                        src={productImage}
                        alt={productName}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="min-w-0 flex-1">
                      <span className="text-[10px] uppercase tracking-wider font-semibold text-stone-400 dark:text-stone-500 block">
                        {productBrand}
                      </span>
                      <h3 className="font-semibold text-sm sm:text-base text-stone-950 dark:text-stone-50 truncate">
                        {productName}
                      </h3>
                      <div className="flex items-center gap-2 mt-1 text-xs">
                        <span className="font-bold text-[#C26D53]">
                          {priceDisplay}
                        </span>
                        <span className="text-stone-300 dark:text-stone-700">•</span>
                        <span className="font-mono text-stone-500 dark:text-stone-400 text-[11px]">
                          Order #{orderId}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Status & Date */}
                  <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-center gap-1.5 shrink-0 pt-2 sm:pt-0 border-t sm:border-t-0 border-stone-100 dark:border-stone-800/80">
                    <div>{getOrderStatusBadge(order.status)}</div>
                    <span className="text-xs text-stone-500 dark:text-stone-400">
                      {orderDate}
                    </span>
                  </div>
                </div>

                {/* Bottom Row: Actions */}
                <div className="flex items-center justify-between gap-3 pt-3 border-t border-stone-100 dark:border-stone-800/80 text-xs">
                  <div>
                    {order.hasFeedback ? (
                      <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 text-[11px] font-medium">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>Experience Captured</span>
                      </div>
                    ) : (
                      <button
                        onClick={() => handleOpenFeedback(order)}
                        className="inline-flex items-center gap-1.5 text-xs text-[#C26D53] hover:underline font-medium cursor-pointer"
                      >
                        <MessageSquare className="w-3.5 h-3.5" />
                        <span>Share Feedback</span>
                      </button>
                    )}
                  </div>

                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleOpenDetails(order)}
                    >
                      View Details
                    </Button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Order Details Modal */}
      {detailsModalOpen && selectedOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="fixed inset-0 bg-stone-900/40 dark:bg-stone-950/70 backdrop-blur-xs transition-opacity"
            onClick={() => setDetailsModalOpen(false)}
          />

          <div className="relative w-full max-w-lg rounded-2xl bg-white dark:bg-stone-900 border border-stone-200/80 dark:border-stone-800/80 shadow-2xl p-6 transition-all max-h-[90vh] overflow-y-auto space-y-6">
            {/* Header */}
            <div className="flex items-start justify-between border-b border-stone-100 dark:border-stone-800 pb-4">
              <div>
                <span className="text-[10px] font-mono uppercase tracking-wider text-stone-400 block">
                  Order Details
                </span>
                <h3 className="text-lg font-bold text-stone-950 dark:text-stone-50 mt-0.5">
                  Order #{selectedOrder.orderId || selectedOrder.id}
                </h3>
                <p className="text-xs text-stone-500 dark:text-stone-400">
                  Placed on {selectedOrder.date || selectedOrder.orderDate || "Recent"}
                </p>
              </div>
              <button
                onClick={() => setDetailsModalOpen(false)}
                className="p-1 rounded-lg text-stone-400 hover:text-stone-700 dark:hover:text-stone-200"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Status bar */}
            <div className="flex items-center justify-between p-3.5 rounded-xl bg-stone-50 dark:bg-stone-800/60 border border-stone-100 dark:border-stone-800">
              <span className="text-xs text-stone-600 dark:text-stone-300 font-medium">
                Fulfillment Status:
              </span>
              <div>{getOrderStatusBadge(selectedOrder.status)}</div>
            </div>

            {/* Products List */}
            <div className="space-y-3">
              <h4 className="text-xs font-semibold uppercase tracking-wider text-stone-400">
                Purchased Items
              </h4>
              {(selectedOrder.items && selectedOrder.items.length > 0
                ? selectedOrder.items
                : [getOrderProduct(selectedOrder)]
              ).map((item, idx) => {
                const itemPrice = item.price !== undefined ? `₹${item.price}` : "Price unavailable";
                return (
                  <div
                    key={idx}
                    className="flex items-center justify-between gap-3 p-3 rounded-xl border border-stone-100 dark:border-stone-800/80 bg-stone-50/50 dark:bg-stone-950/40"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="w-12 h-12 rounded-lg bg-stone-100 dark:bg-stone-800 shrink-0 overflow-hidden">
                        <FallbackImage
                          src={item.image}
                          alt={item.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="text-xs font-semibold text-stone-900 dark:text-stone-100 truncate">
                          {item.name || "HydraGel Ultra-Light Moisturizer"}
                        </p>
                        <p className="text-[11px] text-stone-500">
                          Qty: {item.quantity || 1} • {item.size || "Standard"}
                        </p>
                      </div>
                    </div>
                    <span className="text-xs font-bold text-stone-900 dark:text-stone-100 shrink-0">
                      {itemPrice}
                    </span>
                  </div>
                );
              })}
            </div>

            {/* Order Summary */}
            <div className="space-y-2 pt-2 border-t border-stone-100 dark:border-stone-800 text-xs">
              <div className="flex justify-between text-stone-500">
                <span>Payment Method</span>
                <span className="font-medium text-stone-800 dark:text-stone-200 uppercase">
                  {selectedOrder.paymentMethod === "cod" ? "Cash on Delivery" : "Online Payment"}
                </span>
              </div>
              <div className="flex justify-between text-stone-500">
                <span>Shipping</span>
                <span className="font-medium text-emerald-600">Free</span>
              </div>
              <div className="flex justify-between font-bold text-sm text-stone-950 dark:text-stone-50 pt-2 border-t border-stone-100 dark:border-stone-800">
                <span>Total</span>
                <span>
                  {selectedOrder.totalAmount !== undefined
                    ? `₹${selectedOrder.totalAmount}`
                    : (selectedOrder.product?.price ? `₹${selectedOrder.product.price}` : "Price unavailable")}
                </span>
              </div>
            </div>

            {/* Modal Actions */}
            <div className="flex items-center justify-between gap-3 pt-3 border-t border-stone-100 dark:border-stone-800">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setDetailsModalOpen(false)}
              >
                Close
              </Button>

              {!selectedOrder.hasFeedback && (
                <Button
                  variant="primary"
                  size="sm"
                  icon={Sparkles}
                  onClick={() => {
                    setDetailsModalOpen(false);
                    handleOpenFeedback(selectedOrder);
                  }}
                >
                  Share Experience Feedback
                </Button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Experience Feedback Modal */}
      <FeedbackModal
        isOpen={feedbackOpen}
        onClose={() => setFeedbackOpen(false)}
        order={feedbackOrder}
      />
    </div>
  );
};

export const OrdersPage = () => {
  return (
    <ErrorBoundary>
      <OrdersContent />
    </ErrorBoundary>
  );
};
