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
      if (filters.concern && filters.concern !== "All") params.append("concern", filters.concern);
      if (filters.texture && filters.texture !== "All") params.append("texture", filters.texture);
      if (filters.finish && filters.finish !== "All") params.append("finish", filters.finish);
      if (filters.rating && filters.rating !== "All") params.append("rating", filters.rating);
      if (filters.maxPrice) params.append("maxPrice", filters.maxPrice);
      if (filters.sort) params.append("sort", filters.sort);
      if (filters.isFeatured) params.append("isFeatured", "true");
      if (filters.isBestSeller) params.append("isBestSeller", "true");
      if (filters.isNewArrival) params.append("isNewArrival", "true");

      const queryStr = params.toString();
      const res = await apiClient.get(`/products${queryStr ? `?${queryStr}` : ""}`);
      if (res && Array.isArray(res.data)) {
        return res.data.map(normalizeProduct);
      }
      if (Array.isArray(res)) {
        return res.map(normalizeProduct);
      }
    } catch (err) {
      console.warn("[productService] Falling back to local catalog:", err.message);
    }

    // Resilient local fallback from stored catalog
    let catalog = [];
    try {
      const saved = localStorage.getItem("joyory_catalog");
      catalog = saved ? JSON.parse(saved) : localProducts.map(normalizeProduct);
    } catch {
      catalog = localProducts.map(normalizeProduct);
    }

    let result = catalog;

    // Helper for diacritic/case insensitive normalization
    const normalizeStr = (str) =>
      (str || "").toString().normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();

    if (filters.category && filters.category !== "All" && filters.category !== "all") {
      const catNorm = normalizeStr(filters.category);
      result = result.filter(p =>
        normalizeStr(p.category) === catNorm ||
        normalizeStr(p.subcategory) === catNorm ||
        normalizeStr(p.category).includes(catNorm) ||
        normalizeStr(p.subcategory).includes(catNorm) ||
        (p.tags || []).some(t => normalizeStr(t).includes(catNorm))
      );
    }
    if (filters.brand && filters.brand !== "All" && filters.brand !== "all") {
      const brandNorm = normalizeStr(filters.brand);
      result = result.filter(p => normalizeStr(p.brand) === brandNorm);
    }
    if (filters.maxPrice) {
      result = result.filter(p => p.price <= filters.maxPrice);
    }
    if (filters.rating && filters.rating !== "All") {
      result = result.filter(p => p.rating >= Number(filters.rating));
    }
    if (filters.skinType && filters.skinType !== "All" && filters.skinType !== "all") {
      const stNorm = normalizeStr(filters.skinType);
      result = result.filter(p =>
        (p.skinTypes || p.skinType || []).some(st => normalizeStr(st).includes(stNorm))
      );
    }
    if (filters.concern && filters.concern !== "All" && filters.concern !== "all") {
      const cnNorm = normalizeStr(filters.concern);
      result = result.filter(p =>
        (p.concerns || []).some(c => normalizeStr(c).includes(cnNorm))
      );
    }
    if (filters.texture && filters.texture !== "All" && filters.texture !== "all") {
      const texNorm = normalizeStr(filters.texture);
      result = result.filter(p => normalizeStr(p.texture).includes(texNorm));
    }
    if (filters.finish && filters.finish !== "All" && filters.finish !== "all") {
      const finNorm = normalizeStr(filters.finish);
      result = result.filter(p => normalizeStr(p.finish).includes(finNorm));
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
      const rawQ = normalizeStr(filters.searchQuery).trim();
      let q = rawQ;
      if (q.startsWith("moisturi")) q = "moist";
      result = result.filter(p => {
        const nameMatch = normalizeStr(p.name).includes(q) || normalizeStr(p.name).includes(rawQ);
        const brandMatch = normalizeStr(p.brand).includes(q) || normalizeStr(p.brand).includes(rawQ);
        const catMatch = normalizeStr(p.category).includes(q) || normalizeStr(p.subcategory).includes(q);
        const descMatch = normalizeStr(p.description).includes(q) || normalizeStr(p.shortDescription).includes(q);
        const tagMatch = (p.tags || []).some(t => normalizeStr(t).includes(q) || normalizeStr(t).includes(rawQ));
        const ingMatch = (p.ingredients || p.keyIngredients || []).some(i => normalizeStr(i).includes(q));
        const conMatch = (p.concerns || []).some(c => normalizeStr(c).includes(q));
        const texMatch = normalizeStr(p.texture).includes(q);
        const stMatch = (p.skinTypes || p.skinType || []).some(st => normalizeStr(st).includes(q));
        return nameMatch || brandMatch || catMatch || descMatch || tagMatch || ingMatch || conMatch || texMatch || stMatch;
      });
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
    } catch {
      // Fallback below
    }

    let catalog = [];
    try {
      const saved = localStorage.getItem("joyory_catalog");
      catalog = saved ? JSON.parse(saved) : localProducts.map(normalizeProduct);
    } catch {
      catalog = localProducts.map(normalizeProduct);
    }

    const product = catalog.find(p => p.id === id || p.sku === id);
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

  // Decrease stock on customer purchase
  async decreaseStock(items = []) {
    try {
      let catalog = [];
      const saved = localStorage.getItem("joyory_catalog");
      catalog = saved ? JSON.parse(saved) : localProducts.map(normalizeProduct);
      
      const updated = catalog.map(p => {
        const purchased = items.find(item => (item.productId || item.id) === p.id);
        if (purchased) {
          const qty = purchased.quantity || 1;
          const newStock = Math.max(0, (p.stock || 0) - qty);
          return { ...p, stock: newStock };
        }
        return p;
      });

      localStorage.setItem("joyory_catalog", JSON.stringify(updated));
    } catch (e) {
      console.warn("Could not decrease stock locally:", e);
    }
  },

  // Admin CRUD
  async createProduct(productData) {
    try {
      const res = await apiClient.post("/products", productData);
      return normalizeProduct(res.data);
    } catch {
      let catalog = [];
      const saved = localStorage.getItem("joyory_catalog");
      catalog = saved ? JSON.parse(saved) : localProducts.map(normalizeProduct);

      const newProduct = normalizeProduct({
        ...productData,
        id: `prod-${Date.now().toString().slice(-4)}`,
        rating: 4.8,
        reviewsCount: 1,
        stock: Number(productData.stock) || 30
      });

      catalog.unshift(newProduct);
      localStorage.setItem("joyory_catalog", JSON.stringify(catalog));
      return newProduct;
    }
  },

  async updateProduct(id, productData) {
    try {
      const res = await apiClient.put(`/products/${id}`, productData);
      return normalizeProduct(res.data);
    } catch {
      let catalog = [];
      const saved = localStorage.getItem("joyory_catalog");
      catalog = saved ? JSON.parse(saved) : localProducts.map(normalizeProduct);

      let updatedProd = null;
      const updated = catalog.map(p => {
        if (p.id === id) {
          updatedProd = normalizeProduct({ ...p, ...productData });
          return updatedProd;
        }
        return p;
      });

      localStorage.setItem("joyory_catalog", JSON.stringify(updated));
      return updatedProd || productData;
    }
  },

  async deleteProduct(id) {
    try {
      return await apiClient.delete(`/products/${id}`);
    } catch {
      let catalog = [];
      const saved = localStorage.getItem("joyory_catalog");
      catalog = saved ? JSON.parse(saved) : localProducts.map(normalizeProduct);

      const filtered = catalog.filter(p => p.id !== id);
      localStorage.setItem("joyory_catalog", JSON.stringify(filtered));
      return { success: true, id };
    }
  }
};
