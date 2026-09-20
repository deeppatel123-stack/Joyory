import React, { createContext, useContext, useState, useEffect } from "react";
import { customerService } from "../services/customerService";
import { journeyService } from "../services/journeyService";
import { feedbackService } from "../services/feedbackService";
import { initialOrders } from "../data/orders";
import { products } from "../data/products";
import { useNotification } from "./NotificationContext";

const CustomerContext = createContext();

const WISHLIST_KEY = "joyory_wishlist";
const CART_KEY = "joyory_cart";
const ORDERS_KEY = "joyory_orders";

export const CustomerProvider = ({ children }) => {
  const { addToast } = useNotification();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  // Wishlist state
  const [wishlist, setWishlist] = useState(() => {
    try {
      const saved = localStorage.getItem(WISHLIST_KEY);
      return saved ? JSON.parse(saved) : ["prod-1", "prod-4"];
    } catch {
      return ["prod-1", "prod-4"];
    }
  });

  // Cart state
  const [cart, setCart] = useState(() => {
    try {
      const saved = localStorage.getItem(CART_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Compare products state (max 4)
  const [compareList, setCompareList] = useState(() => {
    // Default 2 products to immediately showcase comparison table
    const p1 = products.find(p => p.id === "prod-1") || products[0];
    const p2 = products.find(p => p.id === "prod-2") || products[1];
    return p1 && p2 ? [p1, p2] : [];
  });

  // Orders state
  const [orders, setOrders] = useState(() => {
    try {
      const saved = localStorage.getItem(ORDERS_KEY);
      return saved ? JSON.parse(saved) : initialOrders;
    } catch {
      return initialOrders;
    }
  });

  // Load customer profile
  useEffect(() => {
    async function load() {
      try {
        const data = await customerService.getProfile();
        setProfile(data);
      } catch (err) {
        console.error("Failed to load customer profile:", err);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  // Sync wishlist
  useEffect(() => {
    localStorage.setItem(WISHLIST_KEY, JSON.stringify(wishlist));
  }, [wishlist]);

  // Sync cart
  useEffect(() => {
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
  }, [cart]);

  // Sync orders
  useEffect(() => {
    localStorage.setItem(ORDERS_KEY, JSON.stringify(orders));
  }, [orders]);

  // Wishlist actions
  const toggleWishlist = (product) => {
    const exists = wishlist.includes(product.id);
    if (exists) {
      setWishlist(prev => prev.filter(id => id !== product.id));
      addToast(`Removed ${product.name} from wishlist`, "info");
    } else {
      setWishlist(prev => [...prev, product.id]);
      addToast(`Added ${product.name} to wishlist`, "success");
      // Record wishlist signal
      journeyService.addEvent({
        type: "WISHLIST",
        title: "Wishlist Consideration",
        description: `Saved ${product.name} (${product.texture}) to wishlist`,
        productName: product.name,
        productId: product.id,
        systemImpact: `Reinforced affinity for ${product.category} in price band ₹${product.price}.`
      });
    }
  };

  const isWishlisted = (productId) => wishlist.includes(productId);

  // Cart actions
  const addToBag = (product, quantity = 1) => {
    setCart(prev => {
      const existing = prev.find(item => item.productId === product.id);
      if (existing) {
        return prev.map(item =>
          item.productId === product.id ? { ...item, quantity: item.quantity + quantity } : item
        );
      }
      return [...prev, { productId: product.id, product, quantity }];
    });
    addToast(`Added ${product.name} to bag`, "success");
  };

  const removeFromBag = (productId) => {
    setCart(prev => prev.filter(item => item.productId !== productId));
    addToast("Item removed from bag", "info");
  };

  const updateQuantity = (productId, qty) => {
    if (qty <= 0) {
      removeFromBag(productId);
      return;
    }
    setCart(prev => prev.map(item =>
      item.productId === productId ? { ...item, quantity: qty } : item
    ));
  };

  // Compare actions
  const addToCompare = (product) => {
    if (compareList.some(p => p.id === product.id)) {
      setCompareList(prev => prev.filter(p => p.id !== product.id));
      addToast(`Removed ${product.name} from comparison`, "info");
      return;
    }
    if (compareList.length >= 4) {
      addToast("You can compare up to 4 products at a time.", "error");
      return;
    }
    setCompareList(prev => [...prev, product]);
    addToast(`Added ${product.name} to comparison`, "success");

    // Record compare event in journey
    journeyService.addEvent({
      type: "COMPARE",
      title: "Side-by-Side Comparison",
      description: `Comparing ${product.name} with existing selections`,
      productName: product.name,
      productId: product.id,
      systemImpact: "Evaluating formulation, price point and ingredient trade-offs."
    });
  };

  const removeFromCompare = (productId) => {
    setCompareList(prev => prev.filter(p => p.id !== productId));
  };

  const clearCompare = () => {
    setCompareList([]);
  };

  const isInCompare = (productId) => compareList.some(p => p.id === productId);

  // Continuous Learning: Feedback submission
  const submitFeedback = async (feedbackData) => {
    try {
      const res = await feedbackService.submitFeedback(feedbackData);
      
      // Update local orders to show feedback has been given
      if (feedbackData.orderId) {
        setOrders(prev => prev.map(order => {
          if (order.id === feedbackData.orderId) {
            return {
              ...order,
              hasFeedback: true,
              feedbackGiven: {
                rating: feedbackData.overallRating,
                texture: feedbackData.textureRating,
                fragrance: feedbackData.fragranceRating,
                comment: feedbackData.comments
              }
            };
          }
          return order;
        }));
      }

      // Reload updated profile
      const updatedProfile = await customerService.getProfile();
      setProfile(updatedProfile);

      addToast(
        `${res.preferenceUpdate}`,
        "success",
        `Preference Signal: ${res.preferenceSignal}`
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
    journeyService.addEvent({
      type: "VIEW",
      title: "Inspected Product Specifications",
      description: `Viewed details for ${product.name} (${product.brand})`,
      productName: product.name,
      productId: product.id,
      systemImpact: `Active interest registered in ${product.category} category.`
    });
  };

  const resetAllDemoData = async () => {
    const initial = await customerService.resetDemoProfile();
    await journeyService.resetJourney();
    setProfile(initial);
    setWishlist(["prod-1", "prod-4"]);
    setCart([]);
    setOrders(initialOrders);
    const p1 = products.find(p => p.id === "prod-1");
    const p2 = products.find(p => p.id === "prod-2");
    setCompareList(p1 && p2 ? [p1, p2] : []);
    addToast("Demo state reset to initial values", "info");
  };

  const cartTotal = cart.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
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
        cartTotal,
        cartCount,
        compareList,
        addToCompare,
        removeFromCompare,
        clearCompare,
        isInCompare,
        orders,
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
