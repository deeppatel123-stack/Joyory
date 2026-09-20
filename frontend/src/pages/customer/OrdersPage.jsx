import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Package, MessageSquare, CheckCircle2, Sparkles, Clock } from "lucide-react";
import { useCustomer } from "../../context/CustomerContext";
import { Button } from "../../components/common/Button";
import { Badge } from "../../components/common/Badge";
import { FeedbackModal } from "../../components/customer/FeedbackModal";

export const OrdersPage = () => {
  const { orders } = useCustomer();
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [feedbackOpen, setFeedbackOpen] = useState(false);

  const handleOpenFeedback = (order) => {
    setSelectedOrder(order);
    setFeedbackOpen(true);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="border-b border-stone-200/80 dark:border-stone-800/80 pb-6">
        <span className="text-xs font-semibold uppercase tracking-wider text-[#C26D53]">
          Delivered Experiences
        </span>
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-stone-950 dark:text-stone-50 mt-1">
          Your Orders & Experience Feedback
        </h1>
        <p className="text-xs sm:text-sm text-stone-500 dark:text-stone-400 mt-1">
          Sharing your sensory and texture observations on delivered items continuously trains your personalized profile.
        </p>
      </div>

      {/* Orders List */}
      <div className="space-y-4">
        {orders.map((order) => (
          <div
            key={order.id}
            className="rounded-xl border border-stone-200/80 dark:border-stone-800/80 bg-white dark:bg-stone-900 p-5 space-y-4 shadow-2xs"
          >
            {/* Top order bar */}
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-stone-100 dark:border-stone-800 pb-3 text-xs">
              <div className="flex items-center gap-3">
                <span className="font-mono font-bold text-stone-900 dark:text-stone-100">
                  {order.id}
                </span>
                <span className="text-stone-400">•</span>
                <span className="text-stone-500">Ordered: {order.date}</span>
              </div>

              <div className="flex items-center gap-2">
                <Badge variant="success" size="sm" className="gap-1">
                  <CheckCircle2 className="w-3 h-3" />
                  <span>Delivered on {order.deliveredDate}</span>
                </Badge>
              </div>
            </div>

            {/* Product details */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <img
                  src={order.product.image}
                  alt={order.product.name}
                  className="w-16 h-16 rounded-lg object-cover"
                />
                <div>
                  <span className="text-[10px] text-stone-400 uppercase tracking-wider block">
                    {order.product.brand}
                  </span>
                  <Link
                    to={`/products/${order.product.id}`}
                    className="font-semibold text-sm text-stone-900 dark:text-stone-100 hover:text-[#C26D53]"
                  >
                    {order.product.name}
                  </Link>
                  <div className="flex items-center gap-2 mt-1 text-xs text-stone-500">
                    <span className="font-semibold text-stone-900 dark:text-stone-100">
                      ₹{order.product.price}
                    </span>
                    <span>• {order.product.size}</span>
                    <span>• {order.product.texture}</span>
                  </div>
                </div>
              </div>

              {/* Action: Share Experience or Feedback given summary */}
              <div>
                {order.hasFeedback ? (
                  <div className="p-3 rounded-lg bg-stone-50 dark:bg-stone-950/40 border border-stone-100 dark:border-stone-800 text-xs space-y-1">
                    <div className="flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400 font-semibold">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>Experience Captured</span>
                    </div>
                    <p className="text-stone-500 italic max-w-xs text-[11px]">
                      "{order.feedbackGiven?.comment || "Feels slightly heavy during humidity"}"
                    </p>
                  </div>
                ) : (
                  <Button
                    variant="primary"
                    size="sm"
                    icon={MessageSquare}
                    onClick={() => handleOpenFeedback(order)}
                  >
                    Share Experience
                  </Button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Feedback Modal */}
      <FeedbackModal
        isOpen={feedbackOpen}
        onClose={() => setFeedbackOpen(false)}
        order={selectedOrder}
      />
    </div>
  );
};
