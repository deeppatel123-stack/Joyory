import { apiClient } from "./apiClient";

export const cartService = {
  async getCart() {
    try {
      const res = await apiClient.get("/cart");
      return res.data;
    } catch (err) {
      const saved = localStorage.getItem("joyory_cart");
      const items = saved ? JSON.parse(saved) : [];
      const subtotal = items.reduce((sum, item) => sum + (item.product?.price || 0) * item.quantity, 0);
      const shipping = subtotal > 799 || subtotal === 0 ? 0 : 50;
      return {
        items,
        subtotal,
        shipping,
        total: subtotal + shipping,
        discount: 0
      };
    }
  },

  async addToCart(productId, quantity = 1) {
    try {
      const res = await apiClient.post("/cart", { productId, quantity });
      return res.data;
    } catch (err) {
      throw err;
    }
  },

  async updateQuantity(productId, quantity) {
    try {
      const res = await apiClient.put(`/cart/${productId}`, { quantity });
      return res.data;
    } catch (err) {
      throw err;
    }
  },

  async removeFromCart(productId) {
    try {
      const res = await apiClient.delete(`/cart/${productId}`);
      return res.data;
    } catch (err) {
      throw err;
    }
  },

  async clearCart() {
    try {
      const res = await apiClient.delete("/cart");
      return res.data;
    } catch (err) {
      localStorage.removeItem("joyory_cart");
      return { items: [], subtotal: 0, shipping: 0, total: 0 };
    }
  }
};
