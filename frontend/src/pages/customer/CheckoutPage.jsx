import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft, CheckCircle2, ShieldCheck, ShoppingBag, Truck, CreditCard } from "lucide-react";
import { useCustomer } from "../../context/CustomerContext";
import { useAuth } from "../../context/AuthContext";
import { useNotification } from "../../context/NotificationContext";
import { orderService } from "../../services/orderService";
import { productService } from "../../services/productService";
import { journeyService } from "../../services/journeyService";
import { Button } from "../../components/common/Button";
import { Input } from "../../components/common/Input";
import { FallbackImage } from "../../components/common/FallbackImage";
import { PublicNavbar } from "../../components/layout/PublicNavbar";
import { Footer } from "../../components/layout/Footer";

export const CheckoutPage = () => {
  const { cart, cartTotal, clearCart } = useCustomer();
  const { user } = useAuth();
  const { addToast } = useNotification();
  const navigate = useNavigate();

  const [address, setAddress] = useState({
    fullName: user?.name || "Aria Chen",
    phone: user?.phone || "+91 98123 45678",
    address: "Flat 402, Lotus Residency, 12th Main, Indiranagar",
    city: "Bengaluru",
    state: "Karnataka",
    pincode: "560038"
  });

  const [paymentMethod, setPaymentMethod] = useState("cod");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [confirmedOrder, setConfirmedOrder] = useState(null);

  const shippingFee = cartTotal > 799 ? 0 : 50;
  const totalAmount = cartTotal + shippingFee;

  const handleInputChange = (e) => {
    setAddress({ ...address, [e.target.name]: e.target.value });
  };

  const handlePlaceOrder = async (e) => {
    e.preventDefault();
    if (!address.fullName || !address.address || !address.city || !address.pincode) {
      addToast("Please fill in all delivery address details.", "error");
      return;
    }

    if (cart.length === 0) {
      addToast("Your cart is empty.", "error");
      navigate("/cart");
      return;
    }

    setIsSubmitting(true);
    try {
      const orderPayload = {
        items: cart.map(item => ({
          productId: item.productId || item.product?.id,
          product: item.product?.id || item.productId,
          name: item.product?.name || item.name,
          image: item.product?.image || item.product?.images?.[0] || item.image,
          price: item.product?.price || item.price,
          quantity: item.quantity
        })),
        shippingAddress: address,
        paymentMethod,
        subtotal: cartTotal,
        shippingFee,
        totalAmount,
        userId: user?.id || user?._id || "cust-101",
        user: {
          id: user?.id || user?._id || "cust-101",
          name: user?.name || "Aria Chen",
          email: user?.email || "aria.chen@joyory.com"
        }
      };

      const res = await orderService.createOrder(orderPayload);

      // Decrement catalog stock for purchased products
      try {
        await productService.decreaseStock(orderPayload.items);
      } catch (stockErr) {
        console.warn("Stock decrease warning:", stockErr);
      }

      // Record in customer Beauty Journey
      try {
        await journeyService.addEvent({
          type: "PURCHASE",
          title: `Order Placed (${res.orderId || res.id})`,
          description: `Ordered ${orderPayload.items.map(i => i.name).join(", ")} (₹${totalAmount})`,
          productName: orderPayload.items[0]?.name || "Skincare Formulations",
          systemImpact: "Stock decremented. Items queued for Beauty Outcome feedback loop."
        });
      } catch (journeyErr) {
        console.warn("Journey event warning:", journeyErr);
      }

      // Clear customer cart
      if (clearCart) {
        clearCart();
      }

      setConfirmedOrder(res);
      addToast("Order placed successfully! Beauty Outcome Loop initiated.", "success");
    } catch (err) {
      addToast(err.message || "Failed to place order. Please try again.", "error");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (confirmedOrder) {
    return (
      <div className="min-h-screen bg-stone-50 dark:bg-stone-950 text-stone-900 dark:text-stone-100 flex flex-col transition-colors">
        <PublicNavbar />
        <div className="flex-1 flex items-center justify-center p-6">
          <div className="w-full max-w-lg p-8 rounded-2xl border border-stone-200/80 dark:border-stone-800/80 bg-white dark:bg-stone-900 text-center space-y-6 shadow-sm">
            <div className="w-16 h-16 rounded-full bg-emerald-50 dark:bg-emerald-950/50 text-emerald-600 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <div className="space-y-2">
              <h2 className="text-2xl font-semibold text-stone-950 dark:text-stone-50">
                Order Confirmed!
              </h2>
              <p className="text-xs text-stone-500">
                Order ID: <span className="font-mono font-bold text-stone-800 dark:text-stone-200">{confirmedOrder.orderId || confirmedOrder.id}</span>
              </p>
              <p className="text-xs text-stone-600 dark:text-stone-300 max-w-sm mx-auto leading-relaxed">
                Thank you for your order. We've added these formulations to your <strong>Beauty Outcome Loop</strong>. Once delivered, you'll be prompted to record your sensory experience to make future recommendations smarter.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-stone-50 dark:bg-stone-950/60 border border-stone-100 dark:border-stone-800 text-left text-xs space-y-2">
              <div className="flex justify-between">
                <span className="text-stone-500">Delivery Address:</span>
                <span className="font-medium text-stone-900 dark:text-stone-100">{address.address}, {address.city}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-stone-500">Payment:</span>
                <span className="font-medium text-stone-900 dark:text-stone-100 uppercase">{paymentMethod === "cod" ? "Cash on Delivery" : "Online Paid (Prepaid)"}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-stone-500">Total Paid:</span>
                <span className="font-bold text-stone-900 dark:text-stone-100">₹{totalAmount}</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <Link to="/customer/orders" className="flex-1">
                <Button variant="primary" className="w-full justify-center text-xs py-2.5">
                  View Orders
                </Button>
              </Link>
              <Link to="/customer/beauty-outcome" className="flex-1">
                <Button variant="secondary" className="w-full justify-center text-xs py-2.5">
                  Track Outcome Loop
                </Button>
              </Link>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-stone-50 dark:bg-stone-950 text-stone-900 dark:text-stone-100 flex flex-col transition-colors pb-16">
      <PublicNavbar />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full space-y-6">
        <div className="flex items-center gap-2">
          <Link to="/cart" className="p-1.5 rounded-lg text-stone-500 hover:text-stone-900 dark:hover:text-stone-100 hover:bg-stone-100 dark:hover:bg-stone-800">
            <ArrowLeft className="w-4 h-4" />
          </Link>
          <div>
            <h1 className="text-2xl font-semibold tracking-tight text-stone-950 dark:text-stone-50">
              Secure Checkout
            </h1>
            <p className="text-xs text-stone-500">Enter delivery details and confirm your purchase</p>
          </div>
        </div>

        <form onSubmit={handlePlaceOrder} className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          {/* Left 2 Cols: Delivery & Payment */}
          <div className="lg:col-span-2 space-y-6">
            {/* Delivery Address Card */}
            <div className="p-6 rounded-2xl border border-stone-200/80 dark:border-stone-800/80 bg-white dark:bg-stone-900 space-y-4">
              <div className="flex items-center gap-2 text-sm font-semibold text-stone-900 dark:text-stone-100 border-b border-stone-100 dark:border-stone-800 pb-3">
                <Truck className="w-4 h-4 text-[#C26D53]" />
                <h3>1. Delivery Address</h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-stone-600 dark:text-stone-400 mb-1">
                    Recipient Full Name *
                  </label>
                  <Input
                    name="fullName"
                    value={address.fullName}
                    onChange={handleInputChange}
                    required
                    className="w-full text-xs"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-stone-600 dark:text-stone-400 mb-1">
                    Phone Number *
                  </label>
                  <Input
                    name="phone"
                    value={address.phone}
                    onChange={handleInputChange}
                    required
                    className="w-full text-xs"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-stone-600 dark:text-stone-400 mb-1">
                  Street Address & Flat / Building *
                </label>
                <Input
                  name="address"
                  value={address.address}
                  onChange={handleInputChange}
                  required
                  className="w-full text-xs"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-medium text-stone-600 dark:text-stone-400 mb-1">
                    City *
                  </label>
                  <Input
                    name="city"
                    value={address.city}
                    onChange={handleInputChange}
                    required
                    className="w-full text-xs"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-stone-600 dark:text-stone-400 mb-1">
                    State *
                  </label>
                  <Input
                    name="state"
                    value={address.state}
                    onChange={handleInputChange}
                    required
                    className="w-full text-xs"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-stone-600 dark:text-stone-400 mb-1">
                    Pincode *
                  </label>
                  <Input
                    name="pincode"
                    value={address.pincode}
                    onChange={handleInputChange}
                    required
                    className="w-full text-xs"
                  />
                </div>
              </div>
            </div>

            {/* Payment Method Card */}
            <div className="p-6 rounded-2xl border border-stone-200/80 dark:border-stone-800/80 bg-white dark:bg-stone-900 space-y-4">
              <div className="flex items-center gap-2 text-sm font-semibold text-stone-900 dark:text-stone-100 border-b border-stone-100 dark:border-stone-800 pb-3">
                <CreditCard className="w-4 h-4 text-[#C26D53]" />
                <h3>2. Payment Method</h3>
              </div>

              <div className="space-y-3">
                <label
                  className={`flex items-center justify-between p-4 rounded-xl border cursor-pointer transition-colors ${
                    paymentMethod === "cod"
                      ? "border-[#C26D53] bg-rose-50/50 dark:bg-rose-950/20"
                      : "border-stone-200 dark:border-stone-800"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="cod"
                      checked={paymentMethod === "cod"}
                      onChange={() => setPaymentMethod("cod")}
                      className="text-[#C26D53] focus:ring-[#C26D53]"
                    />
                    <div>
                      <div className="text-xs font-semibold text-stone-900 dark:text-stone-100">
                        Cash on Delivery (Pay upon delivery)
                      </div>
                      <div className="text-[11px] text-stone-500">
                        Pay cash or UPI to delivery agent at your doorstep. Zero fee.
                      </div>
                    </div>
                  </div>
                </label>

                <label
                  className={`flex items-center justify-between p-4 rounded-xl border cursor-pointer transition-colors ${
                    paymentMethod === "online"
                      ? "border-[#C26D53] bg-rose-50/50 dark:bg-rose-950/20"
                      : "border-stone-200 dark:border-stone-800"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="online"
                      checked={paymentMethod === "online"}
                      onChange={() => setPaymentMethod("online")}
                      className="text-[#C26D53] focus:ring-[#C26D53]"
                    />
                    <div>
                      <div className="text-xs font-semibold text-stone-900 dark:text-stone-100">
                        Online Payment (UPI, Cards & Netbanking)
                      </div>
                      <div className="text-[11px] text-stone-500">
                        Instant payment via PhonePe, Google Pay, Cards, or Netbanking.
                      </div>
                    </div>
                  </div>
                </label>
              </div>
            </div>
          </div>

          {/* Right Col: Order Summary & Place Order */}
          <div className="p-6 rounded-2xl border border-stone-200/80 dark:border-stone-800/80 bg-white dark:bg-stone-900 space-y-5">
            <h3 className="text-base font-semibold text-stone-950 dark:text-stone-50">
              Order Review
            </h3>

            <div className="divide-y divide-stone-100 dark:divide-stone-800 max-h-56 overflow-y-auto">
              {cart.map(({ productId, product, quantity }) => (
                <div key={productId} className="py-2.5 flex items-center justify-between text-xs gap-3">
                  <div className="flex items-center gap-2 min-w-0">
                    <span className="font-semibold text-stone-900 dark:text-stone-100 truncate">
                      {product.name}
                    </span>
                    <span className="text-stone-400">×{quantity}</span>
                  </div>
                  <span className="font-semibold shrink-0">₹{product.price * quantity}</span>
                </div>
              ))}
            </div>

            <div className="space-y-2 border-t border-stone-100 dark:border-stone-800 pt-3 text-xs text-stone-600 dark:text-stone-400">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="font-semibold text-stone-900 dark:text-stone-100">₹{cartTotal}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping</span>
                <span>{shippingFee === 0 ? <span className="text-emerald-600 font-semibold">FREE</span> : `₹${shippingFee}`}</span>
              </div>
              <div className="border-t border-stone-100 dark:border-stone-800 pt-3 flex justify-between text-sm font-bold text-stone-950 dark:text-stone-50">
                <span>Total</span>
                <span>₹{totalAmount}</span>
              </div>
            </div>

            <Button
              type="submit"
              variant="primary"
              className="w-full justify-center text-xs py-2.5"
              disabled={isSubmitting || cart.length === 0}
            >
              {isSubmitting ? "Placing Order..." : `Place Order (₹${totalAmount})`}
            </Button>

            <div className="text-[11px] text-stone-400 flex items-center justify-center gap-1.5 pt-1">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span>100% Genuine Formulations • Direct Dispatch</span>
            </div>
          </div>
        </form>
      </div>

      <Footer />
    </div>
  );
};
