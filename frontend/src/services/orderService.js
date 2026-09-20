import { apiClient } from "./apiClient";
import { initialOrders } from "../data/orders";

export const orderService = {
  async createOrder(orderData) {
    try {
      const res = await apiClient.post("/orders", orderData);
      return res.data;
    } catch (err) {
      // Fallback order creation in localStorage
      const savedOrders = JSON.parse(localStorage.getItem("joyory_orders") || "[]");
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
      localStorage.setItem("joyory_orders", JSON.stringify(savedOrders));
      return newOrder;
    }
  },

  async getOrders() {
    try {
      const res = await apiClient.get("/orders");
      return res.data;
    } catch (err) {
      const saved = localStorage.getItem("joyory_orders");
      return saved ? JSON.parse(saved) : initialOrders;
    }
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
