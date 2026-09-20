import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Trash2, Plus, Minus, ArrowRight, ShoppingBag, ArrowLeft, ShieldCheck } from "lucide-react";
import { useCustomer } from "../../context/CustomerContext";
import { Button } from "../../components/common/Button";
import { FallbackImage } from "../../components/common/FallbackImage";
import { PublicNavbar } from "../../components/layout/PublicNavbar";

export const CartPage = () => {
  const { cart, updateQuantity, removeFromBag, cartTotal, cartCount } = useCustomer();
  const navigate = useNavigate();

  const shippingFee = cartTotal > 799 || cartTotal === 0 ? 0 : 50;
  const finalTotal = cartTotal + shippingFee;

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-stone-50 dark:bg-stone-950 text-stone-900 dark:text-stone-100 flex flex-col transition-colors">
        <PublicNavbar />
        <div className="flex-1 flex flex-col items-center justify-center p-6 text-center space-y-4">
          <div className="w-16 h-16 rounded-full bg-stone-100 dark:bg-stone-800 flex items-center justify-center text-stone-400">
            <ShoppingBag className="w-8 h-8" />
          </div>
          <h2 className="text-xl font-semibold text-stone-900 dark:text-stone-100">
            Your shopping bag is empty
          </h2>
          <p className="text-xs text-stone-500 max-w-sm">
            Your bag is waiting for its first beauty discovery. Explore our catalog of formulations tailored to your skin.
          </p>
          <Link to="/products" className="pt-2">
            <Button variant="primary" icon={ArrowRight}>
              Explore Formulations
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-stone-50 dark:bg-stone-950 text-stone-900 dark:text-stone-100 flex flex-col transition-colors pb-16">
      <PublicNavbar />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight text-stone-950 dark:text-stone-50">
              Shopping Bag ({cartCount} {cartCount === 1 ? "item" : "items"})
            </h1>
            <p className="text-xs text-stone-500">
              Review selected items and proceed to secure checkout
            </p>
          </div>
          <Link to="/products" className="text-xs text-[#C26D53] hover:underline flex items-center gap-1">
            <ArrowLeft className="w-3 h-3" />
            Continue Shopping
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          {/* Items List */}
          <div className="lg:col-span-2 space-y-4">
            {cart.map(({ productId, product, quantity }) => (
              <div
                key={productId}
                className="p-4 rounded-xl border border-stone-200/80 dark:border-stone-800/80 bg-white dark:bg-stone-900 flex gap-4 items-center justify-between"
              >
                {/* Image */}
                <div className="w-20 h-20 bg-stone-50 dark:bg-stone-950 rounded-lg p-2 shrink-0 flex items-center justify-center border border-stone-100 dark:border-stone-800">
                  <FallbackImage
                    src={product.image || (product.images && product.images[0])}
                    alt={product.name}
                    className="w-full h-full object-contain"
                  />
                </div>

                {/* Details */}
                <div className="flex-1 min-w-0 pr-2">
                  <span className="text-[10px] uppercase font-semibold text-[#C26D53]">
                    {product.brand}
                  </span>
                  <h4 className="text-sm font-semibold text-stone-900 dark:text-stone-100 truncate">
                    {product.name}
                  </h4>
                  <p className="text-xs text-stone-500">{product.texture} • {product.size || "Standard"}</p>
                  <div className="text-xs font-semibold text-stone-900 dark:text-stone-100 pt-1">
                    ₹{product.price}
                  </div>
                </div>

                {/* Quantity Controls */}
                <div className="flex items-center gap-2 border border-stone-200 dark:border-stone-800 rounded-lg p-1 bg-stone-50 dark:bg-stone-950/40">
                  <button
                    onClick={() => updateQuantity(productId, quantity - 1)}
                    className="p-1 text-stone-500 hover:text-stone-900 dark:hover:text-stone-100 transition-colors"
                    aria-label="Decrease quantity"
                  >
                    <Minus className="w-3 h-3" />
                  </button>
                  <span className="text-xs font-semibold px-1">{quantity}</span>
                  <button
                    onClick={() => updateQuantity(productId, quantity + 1)}
                    className="p-1 text-stone-500 hover:text-stone-900 dark:hover:text-stone-100 transition-colors"
                    aria-label="Increase quantity"
                  >
                    <Plus className="w-3 h-3" />
                  </button>
                </div>

                {/* Item Total & Remove */}
                <div className="text-right space-y-1">
                  <div className="text-sm font-semibold text-stone-900 dark:text-stone-100">
                    ₹{product.price * quantity}
                  </div>
                  <button
                    onClick={() => removeFromBag(productId)}
                    className="text-stone-400 hover:text-red-500 transition-colors p-1"
                    title="Remove item"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary Card */}
          <div className="p-6 rounded-2xl border border-stone-200/80 dark:border-stone-800/80 bg-white dark:bg-stone-900 space-y-5">
            <h3 className="text-base font-semibold text-stone-950 dark:text-stone-50">
              Order Summary
            </h3>

            <div className="space-y-2.5 text-xs text-stone-600 dark:text-stone-400">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="font-semibold text-stone-900 dark:text-stone-100">₹{cartTotal}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping</span>
                <span>{shippingFee === 0 ? <span className="text-emerald-600 font-semibold">FREE</span> : `₹${shippingFee}`}</span>
              </div>
              {shippingFee > 0 && (
                <div className="text-[11px] text-[#C26D53]">
                  Add ₹{799 - cartTotal} more for FREE standard shipping!
                </div>
              )}
              <div className="border-t border-stone-100 dark:border-stone-800 pt-3 flex justify-between text-sm font-bold text-stone-950 dark:text-stone-50">
                <span>Estimated Total</span>
                <span>₹{finalTotal}</span>
              </div>
            </div>

            <Button
              variant="primary"
              className="w-full justify-center text-xs py-2.5"
              icon={ArrowRight}
              onClick={() => navigate("/checkout")}
            >
              Proceed to Checkout
            </Button>

            <div className="pt-2 text-[11px] text-stone-400 flex items-center justify-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span>Safe & Secure Cash on Delivery / Demo Checkout</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
