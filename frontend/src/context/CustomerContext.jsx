import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import { useAuth } from "./AuthContext";
import { apiClient } from "../services/apiClient";
import { customerService } from "../services/customerService";
import { journeyService } from "../services/journeyService";
import { feedbackService } from "../services/feedbackService";
import { initialOrders } from "../data/orders";
import { products } from "../data/products";
import { useNotification } from "./NotificationContext";

const CustomerContext = createContext();

export const CustomerProvider = ({ children }) => {
  const { user, token } = useAuth();
  const { addToast } = useNotification();

  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  // Compute active user partition key
  const userId = user?.id || user?._id || (user?.email ? user.email.toLowerCase() : "guest");
  const isDemoCustomer = (user?.email || "").toLowerCase().includes("aria.chen") || (user?.email || "").toLowerCase().includes("customer@joyory.com");

  const userWishlistKey = `joyory_wishlist_${userId}`;
  const userCartKey = `joyory_cart_${userId}`;
  const userOrdersKey = `joyory_orders_${userId}`;

  // Initial local states keyed per user
  const [wishlist, setWishlist] = useState([]);
  const [cart, setCart] = useState([]);
  const [orders, setOrders] = useState([]);

  // Compare products state (max 4, session-scoped)
  const [compareList, setCompareList] = useState(() => {
    const p1 = products.find(p => p.id === "prod-1") || products[0];
    const p2 = products.find(p => p.id === "prod-2") || products[1];
    return p1 && p2 ? [p1, p2] : [];
  });

  // Load User Data whenever active user or token changes
  const loadUserData = useCallback(async () => {
    if (!user) {
      setWishlist([]);
      setCart([]);
      setOrders([]);
      setProfile(null);
      setLoading(false);
      return;
    }

    setLoading(true);

    // 1. Load Profile
    try {
      const p = await customerService.getProfile();
      setProfile(p);
    } catch (err) {
      console.warn("[CustomerContext] Profile load note:", err.message);
    }

    // 2. Load Wishlist from MongoDB (with user-scoped local fallback)
    try {
      const wishRes = await apiClient.get("/wishlist");
      if (wishRes && wishRes.data && Array.isArray(wishRes.data)) {
        const ids = wishRes.data.map(item => (typeof item === "object" && item._id) ? item._id.toString() : (item.id || item));
        setWishlist(ids);
        localStorage.setItem(userWishlistKey, JSON.stringify(ids));
      } else {
        throw new Error("No remote wishlist data");
      }
    } catch {
      const cachedWish = localStorage.getItem(userWishlistKey);
      if (cachedWish) {
        try { setWishlist(JSON.parse(cachedWish)); } catch { setWishlist([]); }
      } else {
        const initialWish = isDemoCustomer ? ["prod-1", "prod-4"] : [];
        setWishlist(initialWish);
        localStorage.setItem(userWishlistKey, JSON.stringify(initialWish));
      }
    }

    // 3. Load Cart from MongoDB
    try {
      const cartRes = await apiClient.get("/cart");
      if (cartRes && cartRes.data && Array.isArray(cartRes.data.items)) {
        const mappedCart = cartRes.data.items.map(item => ({
          productId: item.product?._id ? item.product._id.toString() : (item.product?.id || item.product),
          product: {
            ...item.product,
            id: item.product?._id ? item.product._id.toString() : (item.product?.id || item.product),
            image: item.product?.images?.[0] || item.product?.image || item.image,
            price: item.product?.price || item.price
          },
          quantity: item.quantity
        }));
        setCart(mappedCart);
        localStorage.setItem(userCartKey, JSON.stringify(mappedCart));
      } else {
        throw new Error("No remote cart data");
      }
    } catch {
      const cachedCart = localStorage.getItem(userCartKey);
      if (cachedCart) {
        try { setCart(JSON.parse(cachedCart)); } catch { setCart([]); }
      } else {
        setCart([]);
        localStorage.setItem(userCartKey, JSON.stringify([]));
      }
    }

    // 4. Load Orders from MongoDB
    try {
      const ordersRes = await apiClient.get("/orders");
      if (ordersRes && ordersRes.data && Array.isArray(ordersRes.data)) {
        // Map backend orders
        const mappedOrders = ordersRes.data.map(o => ({
          id: o.orderId || o._id,
          orderId: o.orderId || o._id,
          date: o.createdAt ? new Date(o.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }) : (o.orderDate || "Recent"),
          orderDate: o.createdAt ? new Date(o.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }) : (o.orderDate || "Recent"),
          status: o.status || "Confirmed",
          totalAmount: o.totalAmount,
          subtotal: o.subtotal || o.totalAmount,
          shippingFee: o.shippingFee || 0,
          items: o.items || [],
          product: o.items?.[0] ? {
            id: o.items[0].product?._id || o.items[0].product || "prod-1",
            name: o.items[0].name,
            brand: o.items[0].brand || "Joyory Labs",
            image: o.items[0].image || (o.items[0].images && o.items[0].images[0]),
            price: o.items[0].price,
            quantity: o.items[0].quantity || 1
          } : null,
          hasFeedback: o.hasFeedback || false,
          feedbackGiven: o.feedbackGiven || null,
          deliveredDate: o.deliveredAt ? new Date(o.deliveredAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }) : null
        }));
        setOrders(mappedOrders);
        localStorage.setItem(userOrdersKey, JSON.stringify(mappedOrders));
      } else {
        throw new Error("No remote orders data");
      }
    } catch {
      const cachedOrders = localStorage.getItem(userOrdersKey);
      if (cachedOrders) {
        try { setOrders(JSON.parse(cachedOrders)); } catch { setOrders([]); }
      } else {
        const initialOrd = isDemoCustomer ? initialOrders : [];
        setOrders(initialOrd);
        localStorage.setItem(userOrdersKey, JSON.stringify(initialOrd));
      }
    }

    setLoading(false);
  }, [user, userWishlistKey, userCartKey, userOrdersKey, isDemoCustomer]);

  useEffect(() => {
    loadUserData();
  }, [loadUserData]);

  // Wishlist actions
  const toggleWishlist = async (product) => {
    const prodId = product.id || product._id;
    const exists = wishlist.includes(prodId);
    const updated = exists ? wishlist.filter(id => id !== prodId) : [...wishlist, prodId];

    setWishlist(updated);
    localStorage.setItem(userWishlistKey, JSON.stringify(updated));

    if (exists) {
      addToast(`Removed ${product.name} from wishlist`, "info");
    } else {
      addToast(`Added ${product.name} to wishlist`, "success");
      // Record signal in journey
      journeyService.addEvent({
        type: "WISHLIST",
        title: "Wishlist Consideration",
        description: `Saved ${product.name} (${product.texture || "Essential"}) to wishlist`,
        productName: product.name,
        productId: prodId,
        systemImpact: `Reinforced affinity for ${product.category || "Beauty"} in price band ₹${product.price}.`
      });
    }

    // Sync to MongoDB
    try {
      await apiClient.post("/wishlist/toggle", { productId: prodId });
    } catch (err) {
      console.warn("[CustomerContext] Remote wishlist sync note:", err.message);
    }
  };

  const isWishlisted = (productId) => wishlist.includes(productId);

  // Cart actions
  const addToBag = async (product, quantity = 1) => {
    const prodId = product.id || product._id;
    const stock = product.stock !== undefined ? product.stock : 99;
    if (stock <= 0) {
      addToast(`${product.name} is currently out of stock.`, "error");
      return;
    }

    let updatedCart = [];
    const existing = cart.find(item => item.productId === prodId);
    if (existing) {
      if (existing.quantity >= stock) {
        addToast(`Maximum available stock (${stock} units) reached.`, "error");
        return;
      }
      const newQty = Math.min(stock, existing.quantity + quantity);
      updatedCart = cart.map(item =>
        item.productId === prodId ? { ...item, quantity: newQty } : item
      );
    } else {
      updatedCart = [...cart, { productId: prodId, product, quantity: Math.min(stock, quantity) }];
    }

    setCart(updatedCart);
    localStorage.setItem(userCartKey, JSON.stringify(updatedCart));
    addToast(`Added ${product.name} to bag`, "success");

    // Sync to MongoDB
    try {
      await apiClient.post("/cart", { productId: prodId, quantity });
    } catch (err) {
      console.warn("[CustomerContext] Remote cart sync note:", err.message);
    }
  };

  const removeFromBag = async (productId) => {
    const updatedCart = cart.filter(item => item.productId !== productId);
    setCart(updatedCart);
    localStorage.setItem(userCartKey, JSON.stringify(updatedCart));
    addToast("Item removed from bag", "info");

    try {
      await apiClient.delete(`/cart/${productId}`);
    } catch (err) {
      console.warn("[CustomerContext] Remote cart remove note:", err.message);
    }
  };

  const updateQuantity = async (productId, qty) => {
    if (qty <= 0) {
      removeFromBag(productId);
      return;
    }

    const updatedCart = cart.map(item => {
      if (item.productId === productId) {
        const stock = item.product?.stock !== undefined ? item.product.stock : 99;
        return { ...item, quantity: Math.min(stock, qty) };
      }
      return item;
    });

    setCart(updatedCart);
    localStorage.setItem(userCartKey, JSON.stringify(updatedCart));

    try {
      await apiClient.put(`/cart/${productId}`, { quantity: qty });
    } catch (err) {
      console.warn("[CustomerContext] Remote cart update note:", err.message);
    }
  };

  const clearCart = async () => {
    setCart([]);
    localStorage.setItem(userCartKey, JSON.stringify([]));
    try {
      await apiClient.delete("/cart");
    } catch (err) {
      console.warn("[CustomerContext] Remote clear cart note:", err.message);
    }
  };

  // Compare actions
  const addToCompare = (product) => {
    const prodId = product.id || product._id;
    if (compareList.some(p => (p.id || p._id) === prodId)) {
      setCompareList(prev => prev.filter(p => (p.id || p._id) !== prodId));
      addToast(`Removed ${product.name} from comparison`, "info");
      return;
    }
    if (compareList.length >= 4) {
      addToast("You can compare up to 4 products at a time.", "error");
      return;
    }
    setCompareList(prev => [...prev, product]);
    addToast(`Added ${product.name} to comparison`, "success");

    journeyService.addEvent({
      type: "COMPARE",
      title: "Side-by-Side Comparison",
      description: `Comparing ${product.name} with existing selections`,
      productName: product.name,
      productId: prodId,
      systemImpact: "Evaluating formulation, price point and ingredient trade-offs."
    });
  };

  const removeFromCompare = (productId) => {
    setCompareList(prev => prev.filter(p => (p.id || p._id) !== productId));
  };

  const clearCompare = () => {
    setCompareList([]);
  };

  const isInCompare = (productId) => compareList.some(p => (p.id || p._id) === productId);

  // Continuous Learning: Feedback submission
  const submitFeedback = async (feedbackData) => {
    try {
      const res = await feedbackService.submitFeedback(feedbackData);

      // Refresh orders from DB
      await loadUserData();

      addToast(
        `${res.preferenceUpdate || "Experience logged successfully"}`,
        "success",
        `Preference Signal: ${res.preferenceSignal || "Beauty Memory calibrated"}`
      );

      return res;
    } catch (err) {
      addToast("Failed to submit feedback. Please try again.", "error");
      throw err;
    }
  };

  // Record Search Signal
  const recordSearch = (query) => {
    journeyService.addEvent({
      type: "SEARCH",
      title: "Smart Discovery Search",
      description: `Natural query: "${query}"`,
      productName: null,
      systemImpact: "Intent parsed: Extracted texture, skin type and budget filters."
    });
  };

  // Record View Signal
  const recordView = (product) => {
    const prodId = product.id || product._id;
    journeyService.addEvent({
      type: "VIEW",
      title: "Inspected Product Specifications",
      description: `Viewed details for ${product.name} (${product.brand})`,
      productName: product.name,
      productId: prodId,
      systemImpact: `Active interest registered in ${product.category || "Skincare"} category.`
    });
  };

  const resetAllDemoData = async () => {
    await customerService.resetDemoProfile();
    await journeyService.resetJourney();
    localStorage.removeItem(userWishlistKey);
    localStorage.removeItem(userCartKey);
    localStorage.removeItem(userOrdersKey);
    await loadUserData();
    addToast("Data reset to clean initial state", "info");
  };

  const cartTotal = cart.reduce((sum, item) => sum + ((item.product?.price || 0) * item.quantity), 0);
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <CustomerContext.Provider
      value={{
        profile,
        loading,
        wishlist,
        toggleWishlist,
        isWishlisted,
        cart,
        addToBag,
        removeFromBag,
        updateQuantity,
        clearCart,
        cartTotal,
        cartCount,
        compareList,
        addToCompare,
        removeFromCompare,
        clearCompare,
        isInCompare,
        orders,
        refreshOrders: loadUserData,
        submitFeedback,
        recordSearch,
        recordView,
        resetAllDemoData
      }}
    >
      {children}
    </CustomerContext.Provider>
  );
};

export const useCustomer = () => {
  const context = useContext(CustomerContext);
  if (!context) throw new Error("useCustomer must be used within CustomerProvider");
  return context;
};
