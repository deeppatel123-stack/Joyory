import { apiClient } from "./apiClient";
import { products as localProducts } from "../data/products";

// Normalize MongoDB document (_id & properties) with local structure
const normalizeProduct = (p) => {
  if (!p) return p;
  return {
    ...p,
    id: p._id ? p._id.toString() : p.id,
    image: (p.images && p.images[0]) || p.image || "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=600&auto=format&fit=crop&q=80",
    images: p.images && p.images.length > 0 ? p.images : [p.image],
    originalPrice: p.mrp || p.originalPrice || p.price,
    reviewsCount: p.reviewCount || p.reviewsCount || 0,
    skinType: p.skinTypes || p.skinType || []
  };
};

export const productService = {
  // GET /api/products
  async getProducts(filters = {}) {
    try {
      const params = new URLSearchParams();
      if (filters.searchQuery) params.append("q", filters.searchQuery);
      if (filters.category && filters.category !== "All" && filters.category !== "all") params.append("category", filters.category);
      if (filters.brand && filters.brand !== "All") params.append("brand", filters.brand);
      if (filters.skinType && filters.skinType !== "All") params.append("skinType", filters.skinType);
      if (filters.texture && filters.texture !== "All") params.append("texture", filters.texture);
      if (filters.finish && filters.finish !== "All") params.append("finish", filters.finish);
      if (filters.maxPrice) params.append("maxPrice", filters.maxPrice);
      if (filters.sort) params.append("sort", filters.sort);
      if (filters.isFeatured) params.append("isFeatured", "true");
      if (filters.isBestSeller) params.append("isBestSeller", "true");
      if (filters.isNewArrival) params.append("isNewArrival", "true");

      const queryStr = params.toString();
      const res = await apiClient.get(`/products${queryStr ? `?${queryStr}` : ""}`);
      if (res && res.data) {
        return res.data.map(normalizeProduct);
      }
    } catch (err) {
      console.warn("[productService] Falling back to local catalog:", err.message);
    }

    // Resilient local fallback
    let result = localProducts.map(normalizeProduct);

    if (filters.category && filters.category !== "All" && filters.category !== "all") {
      result = result.filter(p => p.category.toLowerCase() === filters.category.toLowerCase());
    }
    if (filters.brand && filters.brand !== "All") {
      result = result.filter(p => p.brand.toLowerCase() === filters.brand.toLowerCase());
    }
    if (filters.maxPrice) {
      result = result.filter(p => p.price <= filters.maxPrice);
    }
    if (filters.skinType && filters.skinType !== "All") {
      result = result.filter(p => p.skinType.some(st => st.toLowerCase().includes(filters.skinType.toLowerCase())));
    }
    if (filters.texture && filters.texture !== "All") {
      result = result.filter(p => p.texture.toLowerCase().includes(filters.texture.toLowerCase()));
    }
    if (filters.isFeatured) {
      result = result.filter(p => p.isFeatured);
    }
    if (filters.isBestSeller) {
      result = result.filter(p => p.isBestSeller);
    }
    if (filters.isNewArrival) {
      result = result.filter(p => p.isNewArrival);
    }
    if (filters.searchQuery) {
      const q = filters.searchQuery.toLowerCase();
      result = result.filter(p =>
        p.name.toLowerCase().includes(q) ||
        p.brand.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.tags.some(t => t.toLowerCase().includes(q))
      );
    }

    return result;
  },

  // GET /api/products/:id
  async getProductById(id) {
    try {
      const res = await apiClient.get(`/products/${id}`);
      if (res && res.data) {
        return normalizeProduct(res.data);
      }
    } catch (err) {
      console.warn(`[productService] Falling back for product ${id}:`, err.message);
    }

    const product = localProducts.find(p => p.id === id || p.sku === id);
    if (!product) {
      throw new Error("Product not found");
    }
    return normalizeProduct(product);
  },

  // GET /api/products/similar/:id
  async getSimilarProducts(id) {
    const all = await this.getProducts();
    const current = all.find(p => p.id === id);
    if (!current) return all.slice(0, 4);
    return all
      .filter(p => p.id !== id && (p.category === current.category || p.texture === current.texture))
      .slice(0, 4);
  },

  // Admin CRUD
  async createProduct(productData) {
    const res = await apiClient.post("/products", productData);
    return normalizeProduct(res.data);
  },

  async updateProduct(id, productData) {
    const res = await apiClient.put(`/products/${id}`, productData);
    return normalizeProduct(res.data);
  },

  async deleteProduct(id) {
    return await apiClient.delete(`/products/${id}`);
  }
};
