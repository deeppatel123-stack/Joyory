import React, { useState, useEffect } from "react";
import { Plus, Search, Edit2, Trash2, Check, X, Star, AlertCircle } from "lucide-react";
import { productService } from "../../services/productService";
import { useNotification } from "../../context/NotificationContext";
import { Button } from "../../components/common/Button";
import { Input } from "../../components/common/Input";
import { FallbackImage } from "../../components/common/FallbackImage";

export const AdminProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const [modalOpen, setModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    brand: "Joyory Labs",
    category: "Skincare",
    subcategory: "Moisturizer",
    price: 599,
    mrp: 699,
    stock: 50,
    images: ["https://images.unsplash.com/photo-1556228720-195a672e8a03?w=600&auto=format&fit=crop&q=80"],
    description: "",
    texture: "Water Gel",
    finish: "Matte",
    skinTypes: ["Oily", "Combination"],
    concerns: ["Midday Shine", "Dehydration"],
    isBestSeller: false,
    isFeatured: false
  });

  const { addToast } = useNotification();

  const loadCatalog = async () => {
    setLoading(true);
    try {
      const data = await productService.getProducts();
      setProducts(data);
    } catch (err) {
      addToast("Failed to load products.", "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCatalog();
  }, []);

  const handleOpenAdd = () => {
    setEditingProduct(null);
    setFormData({
      name: "",
      brand: "Joyory Labs",
      category: "Skincare",
      subcategory: "Moisturizer",
      price: 599,
      mrp: 699,
      stock: 50,
      images: ["https://images.unsplash.com/photo-1556228720-195a672e8a03?w=600&auto=format&fit=crop&q=80"],
      description: "Advanced formulation crafted for optimal skin barrier absorption.",
      texture: "Water Gel",
      finish: "Matte",
      skinTypes: ["Oily", "Combination"],
      concerns: ["Midday Shine"],
      isBestSeller: false,
      isFeatured: false
    });
    setModalOpen(true);
  };

  const handleOpenEdit = (p) => {
    setEditingProduct(p);
    setFormData({
      name: p.name,
      brand: p.brand,
      category: p.category,
      subcategory: p.subcategory || "",
      price: p.price,
      mrp: p.mrp || p.originalPrice || p.price,
      stock: p.stock || 50,
      images: p.images && p.images.length > 0 ? p.images : [p.image],
      description: p.description || "",
      texture: p.texture || "Water Gel",
      finish: p.finish || "Matte",
      skinTypes: p.skinTypes || p.skinType || ["All"],
      concerns: p.concerns || [],
      isBestSeller: !!p.isBestSeller,
      isFeatured: !!p.isFeatured
    });
    setModalOpen(true);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      if (editingProduct) {
        await productService.updateProduct(editingProduct.id, formData);
        addToast(`Updated ${formData.name}`, "success");
      } else {
        await productService.createProduct(formData);
        addToast(`Added ${formData.name} to catalog`, "success");
      }
      setModalOpen(false);
      loadCatalog();
    } catch (err) {
      addToast(err.message || "Operation failed", "error");
    }
  };

  const handleDelete = async (id, name) => {
    if (window.confirm(`Are you sure you want to remove "${name}" from catalog?`)) {
      try {
        await productService.deleteProduct(id);
        addToast(`Removed ${name}`, "info");
        setProducts(prev => prev.filter(p => p.id !== id));
      } catch (err) {
        addToast(err.message || "Failed to delete product", "error");
      }
    }
  };

  const filtered = products.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          p.brand.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCat = selectedCategory === "All" || p.category.toLowerCase() === selectedCategory.toLowerCase();
    return matchesSearch && matchesCat;
  });

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight text-stone-950 dark:text-stone-50">
            Formulation & Product Management
          </h1>
          <p className="text-xs text-stone-500">
            Catalog inventory, stock levels, formulation specs, and commercial pricing
          </p>
        </div>
        <Button variant="primary" icon={Plus} size="sm" onClick={handleOpenAdd}>
          Add Formulation
        </Button>
      </div>

      {/* Filters Bar */}
      <div className="p-4 rounded-xl border border-stone-200/80 dark:border-stone-800/80 bg-white dark:bg-stone-900 flex flex-col sm:flex-row gap-4 items-center justify-between">
        <div className="relative w-full sm:w-72">
          <Input
            placeholder="Search by name or brand..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full text-xs pl-8"
          />
          <Search className="w-3.5 h-3.5 text-stone-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <span className="text-xs text-stone-500 shrink-0">Category:</span>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="text-xs px-3 py-1.5 rounded-lg border border-stone-200 dark:border-stone-800 bg-stone-50 dark:bg-stone-950 text-stone-900 dark:text-stone-100"
          >
            <option value="All">All Categories</option>
            <option value="Skincare">Skincare</option>
            <option value="Makeup">Makeup</option>
            <option value="Hair">Hair</option>
            <option value="Body">Body</option>
          </select>
        </div>
      </div>

      {/* Products Table */}
      <div className="rounded-2xl border border-stone-200/80 dark:border-stone-800/80 bg-white dark:bg-stone-900 overflow-hidden shadow-2xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-stone-50/80 dark:bg-stone-950/60 text-stone-500 border-b border-stone-200/80 dark:border-stone-800/80">
              <tr>
                <th className="py-3 px-4">Product</th>
                <th className="py-3 px-4">Category</th>
                <th className="py-3 px-4">Price / MRP</th>
                <th className="py-3 px-4">Stock</th>
                <th className="py-3 px-4">Flags</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100 dark:divide-stone-800/80">
              {filtered.map((product) => (
                <tr key={product.id} className="hover:bg-stone-50/50 dark:hover:bg-stone-800/30 transition-colors">
                  {/* Product Info */}
                  <td className="py-3 px-4 flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-stone-50 dark:bg-stone-950 p-1 border border-stone-100 dark:border-stone-800 shrink-0 flex items-center justify-center">
                      <FallbackImage
                        src={product.image || (product.images && product.images[0])}
                        alt={product.name}
                        className="w-full h-full object-contain"
                      />
                    </div>
                    <div className="min-w-0">
                      <div className="text-[10px] uppercase font-bold text-[#C26D53]">
                        {product.brand}
                      </div>
                      <div className="font-semibold text-stone-900 dark:text-stone-100 truncate max-w-xs">
                        {product.name}
                      </div>
                      <div className="text-[10px] text-stone-400">
                        {product.texture} • {product.finish}
                      </div>
                    </div>
                  </td>

                  {/* Category */}
                  <td className="py-3 px-4">
                    <span className="px-2 py-0.5 rounded text-[10px] font-medium bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300">
                      {product.category}
                    </span>
                  </td>

                  {/* Pricing */}
                  <td className="py-3 px-4">
                    <div className="font-semibold text-stone-900 dark:text-stone-100">
                      ₹{product.price}
                    </div>
                    {product.originalPrice && product.originalPrice > product.price && (
                      <div className="text-[10px] text-stone-400 line-through">
                        ₹{product.originalPrice}
                      </div>
                    )}
                  </td>

                  {/* Stock Status */}
                  <td className="py-3 px-4">
                    <span
                      className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-medium ${
                        product.stock > 10
                          ? "bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400"
                          : product.stock > 0
                          ? "bg-amber-50 dark:bg-amber-950/40 text-amber-600 dark:text-amber-400"
                          : "bg-red-50 dark:bg-red-950/40 text-red-600 dark:text-red-400"
                      }`}
                    >
                      {product.stock > 0 ? `${product.stock} units` : "Out of Stock"}
                    </span>
                  </td>

                  {/* Flags */}
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-1.5">
                      {product.isBestSeller && (
                        <span className="px-1.5 py-0.2 rounded text-[9px] bg-amber-100 dark:bg-amber-950 text-amber-700 dark:text-amber-300 font-semibold">
                          Best Seller
                        </span>
                      )}
                      {product.isFeatured && (
                        <span className="px-1.5 py-0.2 rounded text-[9px] bg-rose-100 dark:bg-rose-950 text-rose-700 dark:text-rose-300 font-semibold">
                          Featured
                        </span>
                      )}
                      {product.isNewArrival && (
                        <span className="px-1.5 py-0.2 rounded text-[9px] bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300 font-semibold">
                          New
                        </span>
                      )}
                    </div>
                  </td>

                  {/* Actions */}
                  <td className="py-3 px-4 text-right">
                    <div className="flex items-center justify-end gap-1">
                      <button
                        onClick={() => handleOpenEdit(product)}
                        className="p-1.5 rounded-lg text-stone-500 hover:text-stone-900 dark:hover:text-stone-100 hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors"
                        title="Edit product"
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => handleDelete(product.id, product.name)}
                        className="p-1.5 rounded-lg text-stone-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950/40 transition-colors"
                        title="Delete product"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add/Edit Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/60 backdrop-blur-xs">
          <div className="relative w-full max-w-xl bg-white dark:bg-stone-900 rounded-2xl border border-stone-200 dark:border-stone-800 p-6 space-y-5 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-stone-100 dark:border-stone-800 pb-3">
              <h3 className="text-base font-semibold text-stone-900 dark:text-stone-100">
                {editingProduct ? "Edit Formulation" : "Add New Formulation"}
              </h3>
              <button
                onClick={() => setModalOpen(false)}
                className="p-1.5 rounded-full text-stone-400 hover:text-stone-600 dark:hover:text-stone-200"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] font-medium text-stone-600 dark:text-stone-400 mb-1">
                    Product Name *
                  </label>
                  <Input
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                    className="w-full text-xs"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-medium text-stone-600 dark:text-stone-400 mb-1">
                    Brand *
                  </label>
                  <Input
                    value={formData.brand}
                    onChange={(e) => setFormData({ ...formData, brand: e.target.value })}
                    required
                    className="w-full text-xs"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-[11px] font-medium text-stone-600 dark:text-stone-400 mb-1">
                    Category *
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full text-xs px-3 py-2 rounded-lg border border-stone-200 dark:border-stone-800 bg-stone-50 dark:bg-stone-950 text-stone-900 dark:text-stone-100"
                  >
                    <option value="Skincare">Skincare</option>
                    <option value="Makeup">Makeup</option>
                    <option value="Hair">Hair</option>
                    <option value="Body">Body</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[11px] font-medium text-stone-600 dark:text-stone-400 mb-1">
                    Price (₹) *
                  </label>
                  <Input
                    type="number"
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })}
                    required
                    className="w-full text-xs"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-medium text-stone-600 dark:text-stone-400 mb-1">
                    Stock *
                  </label>
                  <Input
                    type="number"
                    value={formData.stock}
                    onChange={(e) => setFormData({ ...formData, stock: Number(e.target.value) })}
                    required
                    className="w-full text-xs"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-medium text-stone-600 dark:text-stone-400 mb-1">
                  Primary Image URL *
                </label>
                <Input
                  value={formData.images[0] || ""}
                  onChange={(e) => setFormData({ ...formData, images: [e.target.value] })}
                  required
                  className="w-full text-xs"
                />
              </div>

              <div>
                <label className="block text-[11px] font-medium text-stone-600 dark:text-stone-400 mb-1">
                  Description
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  rows={3}
                  className="w-full text-xs px-3 py-2 rounded-lg border border-stone-200 dark:border-stone-800 bg-stone-50 dark:bg-stone-950 text-stone-900 dark:text-stone-100 focus:outline-hidden focus:border-[#C26D53]"
                />
              </div>

              <div className="flex items-center gap-6 pt-2">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.isBestSeller}
                    onChange={(e) => setFormData({ ...formData, isBestSeller: e.target.checked })}
                    className="rounded text-[#C26D53]"
                  />
                  <span>Mark as Best Seller</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.isFeatured}
                    onChange={(e) => setFormData({ ...formData, isFeatured: e.target.checked })}
                    className="rounded text-[#C26D53]"
                  />
                  <span>Mark as Featured</span>
                </label>
              </div>

              <div className="pt-4 flex justify-end gap-3 border-t border-stone-100 dark:border-stone-800">
                <Button variant="secondary" size="sm" type="button" onClick={() => setModalOpen(false)}>
                  Cancel
                </Button>
                <Button variant="primary" size="sm" type="submit">
                  {editingProduct ? "Save Changes" : "Create Product"}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
