import { apiClient } from "./apiClient";

export const authService = {
  async register(userData) {
    try {
      const res = await apiClient.post("/auth/register", userData);
      if (res && res.data && res.data.token) {
        localStorage.setItem("joyory_token", res.data.token);
        localStorage.setItem("joyory_user", JSON.stringify(res.data.user));
      }
      return res.data;
    } catch (err) {
      throw err;
    }
  },

  async login(email, password) {
    try {
      const res = await apiClient.post("/auth/login", { email, password });
      if (res && res.data && res.data.token) {
        localStorage.setItem("joyory_token", res.data.token);
        localStorage.setItem("joyory_user", JSON.stringify(res.data.user));
      }
      return res.data;
    } catch (err) {
      // Local fallback for quick demo login if backend is unreachable
      if (err.isNetworkError) {
        if (email.includes("admin")) {
          const demoAdmin = {
            id: "adm-001",
            name: "Joyory Admin",
            email: "admin@joyory.com",
            role: "admin"
          };
          const mockToken = "mock_jwt_token_admin_2026";
          localStorage.setItem("joyory_token", mockToken);
          localStorage.setItem("joyory_user", JSON.stringify(demoAdmin));
          return { user: demoAdmin, token: mockToken };
        } else {
          const demoCust = {
            id: "cust-101",
            name: "Aria Chen",
            email: "aria.chen@joyory.com",
            role: "customer",
            beautyPreferences: {
              skinType: "Combination",
              budget: "₹500 - ₹1500"
            }
          };
          const mockToken = "mock_jwt_token_customer_2026";
          localStorage.setItem("joyory_token", mockToken);
          localStorage.setItem("joyory_user", JSON.stringify(demoCust));
          return { user: demoCust, token: mockToken };
        }
      }
      throw err;
    }
  },

  async getMe() {
    try {
      const res = await apiClient.get("/auth/me");
      if (res && res.data) {
        localStorage.setItem("joyory_user", JSON.stringify(res.data));
        return res.data;
      }
    } catch (err) {
      const saved = localStorage.getItem("joyory_user");
      if (saved) {
        return JSON.parse(saved);
      }
      return null;
    }
  },

  logout() {
    localStorage.removeItem("joyory_token");
    localStorage.removeItem("joyory_user");
  }
};
