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
      const newOrder = {
        id: `JOY-${Date.now().toString().slice(-6)}`,
        orderId: `JOY-${Date.now().toString().slice(-6)}`,
        orderDate: new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
        items: orderData.items,
        totalAmount: orderData.totalAmount || 1200,
        subtotal: orderData.subtotal || 1200,
        shippingFee: orderData.shippingFee || 0,
        status: "Confirmed",
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
    } catch (err) {
      throw err;
    }
  }
};
