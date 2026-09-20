import { apiClient } from "./apiClient";
import { initialOrders } from "../data/orders";

const getUserOrdersKey = () => {
  try {
    const u = JSON.parse(localStorage.getItem("joyory_user") || "{}");
    return `joyory_orders_${u.id || u._id || (u.email ? u.email.toLowerCase() : "guest")}`;
  } catch {
    return "joyory_orders_guest";
  }
};

const isDemoUser = () => {
  try {
    const u = JSON.parse(localStorage.getItem("joyory_user") || "{}");
    return (u.email || "").toLowerCase().includes("aria.chen") || (u.email || "").toLowerCase().includes("customer@joyory.com");
  } catch {
    return false;
  }
};

export const orderService = {
  async createOrder(orderData) {
    const key = getUserOrdersKey();
    try {
      const res = await apiClient.post("/orders", orderData);
      const savedOrders = JSON.parse(localStorage.getItem(key) || "[]");
      const savedOrder = res.data || res;
      savedOrders.unshift(savedOrder);
      localStorage.setItem(key, JSON.stringify(savedOrders));
      return savedOrder;
    } catch (err) {
      console.warn("[orderService] Falling back to local order creation:", err.message);
      const savedOrders = JSON.parse(localStorage.getItem(key) || "[]");
      const idStr = `JOY-${Date.now().toString().slice(-6)}`;
      const dateStr = new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
      const firstItem = orderData.items?.[0] || {};
      const newOrder = {
        id: idStr,
        orderId: idStr,
        userId: orderData.userId || "cust-101",
        user: orderData.user || { id: "cust-101", name: "Aria Chen", email: "aria.chen@joyory.com" },
        orderDate: dateStr,
        date: dateStr,
        items: orderData.items || [],
        product: {
          id: firstItem.productId || firstItem.id || "prod-1",
          name: firstItem.name || "HydraGel Ultra-Light Moisturizer",
          brand: firstItem.brand || "Joyory Labs",
          image: firstItem.image || "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=600&auto=format&fit=crop&q=80",
          price: firstItem.price || orderData.totalAmount || 649,
          size: firstItem.size || "50ml",
          texture: firstItem.texture || "Gel"
        },
        totalAmount: orderData.totalAmount || 649,
        subtotal: orderData.subtotal || orderData.totalAmount || 649,
        shippingFee: orderData.shippingFee || 0,
        status: "Confirmed",
        deliveredDate: dateStr,
        paymentMethod: orderData.paymentMethod || "cod",
        shippingAddress: orderData.shippingAddress,
        hasFeedback: false
      };
      savedOrders.unshift(newOrder);
      localStorage.setItem(key, JSON.stringify(savedOrders));
      return newOrder;
    }
  },

  async getOrders() {
    try {
      const res = await apiClient.get("/orders");
      if (res && res.data && Array.isArray(res.data)) {
        return res.data;
      }
      if (Array.isArray(res)) {
        return res;
      }
    } catch (err) {
      console.warn("[orderService] Falling back to user-scoped orders:", err.message);
    }
    const key = getUserOrdersKey();
    const saved = localStorage.getItem(key);
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return [];
      }
    }
    return isDemoUser() ? initialOrders : [];
  },

  async getOrderById(id) {
    try {
      const res = await apiClient.get(`/orders/${id}`);
      return res.data;
    } catch (err) {
      const orders = await this.getOrders();
      return orders.find(o => o.id === id || o.orderId === id);
    }
  },

  async updateOrderStatus(id, status) {
    try {
      const res = await apiClient.put(`/orders/${id}/status`, { status });
      return res.data;
    } catch {
      let savedOrders = [];
      try {
        const raw = localStorage.getItem("joyory_orders");
        savedOrders = raw ? JSON.parse(raw) : initialOrders;
      } catch {
        savedOrders = initialOrders;
      }
      const updated = savedOrders.map(o => {
        if (o.id === id || o.orderId === id) {
          return { ...o, status };
        }
        return o;
      });
      localStorage.setItem("joyory_orders", JSON.stringify(updated));
      return { success: true, status };
    }
  }
};
