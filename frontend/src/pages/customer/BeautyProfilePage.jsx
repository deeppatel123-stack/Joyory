import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useCustomer } from "../../context/CustomerContext";
import { useNotification } from "../../context/NotificationContext";
import { authService } from "../../services/authService";
import { customerService } from "../../services/customerService";
import { User, Mail, MapPin, Sparkles, Shield, Heart, ArrowRight, Edit3 } from "lucide-react";
import { Badge } from "../../components/common/Badge";
import { Button } from "../../components/common/Button";
import { Modal } from "../../components/common/Modal";
import { Input } from "../../components/common/Input";

export const BeautyProfilePage = () => {
  const { user } = useAuth();
  const { profile, refreshOrders } = useCustomer();
  const { addToast } = useNotification();

  const [editModalOpen, setEditModalOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const displayName = user?.name || "Aria Chen";
  const displayEmail = user?.email || "aria.chen@joyory.com";

  const stated = profile?.statedPreferences || {
    skinType: user?.beautyPreferences?.skinType || "Oily / Combination",
    primaryGoal: "Hydration & Oil Control",
    budgetRange: user?.beautyPreferences?.budget || "₹500–₹800",
    fragrance: "Low fragrance",
    texture: user?.beautyPreferences?.preferredTexture || "Lightweight",
    finish: "Natural"
  };

  const [editForm, setEditForm] = useState({
    name: displayName,
    skinType: stated.skinType || "Oily / Combination",
    texture: stated.texture || "Lightweight",
    budgetRange: stated.budgetRange || "₹500–₹800",
    finish: stated.finish || "Natural",
    fragrance: stated.fragrance || "Low fragrance"
  });

  const handleOpenEdit = () => {
    setEditForm({
      name: displayName,
      skinType: stated.skinType || "Oily / Combination",
      texture: stated.texture || "Lightweight",
      budgetRange: stated.budgetRange || "₹500–₹800",
      finish: stated.finish || "Natural",
      fragrance: stated.fragrance || "Low fragrance"
    });
    setEditModalOpen(true);
  };

  const handleSaveProfile = async (e) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      // 1. Update backend user document in MongoDB
      await authService.updateProfile({
        name: editForm.name,
        beautyPreferences: {
          skinType: editForm.skinType,
          preferredTexture: editForm.texture,
          budget: editForm.budgetRange,
          finish: editForm.finish,
          fragrance: editForm.fragrance
        }
      });

      // 2. Update customer preferences cache
      await customerService.updatePreferences({
        id: "pref-texture",
        category: "Texture",
        trait: editForm.texture,
        confidence: 90,
        evolution: "Updated via customer account profile"
      });

      if (refreshOrders) refreshOrders();

      setEditModalOpen(false);
      addToast("Profile and beauty preferences updated in MongoDB!", "success");
    } catch (err) {
      console.error(err);
      addToast(err.message || "Failed to save profile changes.", "error");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 py-4">
      {/* Header */}
      <div className="border-b border-stone-200/80 dark:border-stone-800/80 pb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <div className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-[#C26D53]">
            <User className="w-3.5 h-3.5" />
            <span>My Account</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-stone-950 dark:text-stone-50 mt-1">
            Profile & Preferences
          </h1>
          <p className="text-xs sm:text-sm text-stone-500 dark:text-stone-400 mt-1">
            Manage your personal details and custom formulation affinities in MongoDB.
          </p>
        </div>
        <Button
          variant="outline"
          size="sm"
          icon={Edit3}
          onClick={handleOpenEdit}
        >
          Edit Profile
        </Button>
      </div>

      {/* Profile Overview Card */}
      <div className="p-6 rounded-2xl border border-stone-200/80 dark:border-stone-800/80 bg-white dark:bg-stone-900 shadow-2xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-full bg-[#C26D53]/15 text-[#C26D53] flex items-center justify-center font-bold text-xl">
            {displayName.charAt(0).toUpperCase()}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-lg font-semibold text-stone-900 dark:text-stone-100">
                {displayName}
              </h2>
              <Badge variant="accent" size="sm">Customer</Badge>
            </div>
            <p className="text-xs text-stone-500 dark:text-stone-400 flex items-center gap-1.5 mt-0.5">
              <Mail className="w-3 h-3 text-stone-400" />
              {displayEmail}
            </p>
          </div>
        </div>

        <Link
          to="/customer/beauty-memory"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-medium border border-stone-200 dark:border-stone-800 hover:bg-stone-50 dark:hover:bg-stone-800/60 text-stone-800 dark:text-stone-200 transition-colors"
        >
          <Sparkles className="w-3.5 h-3.5 text-[#C26D53]" />
          <span>View Beauty Memory</span>
          <ArrowRight className="w-3 h-3 text-stone-400" />
        </Link>
      </div>

      {/* Two column grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Saved Beauty Preferences */}
        <div className="p-6 rounded-2xl border border-stone-200/80 dark:border-stone-800/80 bg-white dark:bg-stone-900 shadow-2xs space-y-4">
          <div className="flex items-center justify-between border-b border-stone-100 dark:border-stone-800 pb-3">
            <div className="flex items-center gap-2">
              <Heart className="w-4 h-4 text-[#C26D53]" />
              <h3 className="text-sm font-semibold text-stone-900 dark:text-stone-100">
                Beauty Preferences
              </h3>
            </div>
            <span className="text-[11px] text-stone-400">Stored in MongoDB</span>
          </div>

          <div className="space-y-3 text-xs">
            <div className="flex justify-between py-2 border-b border-stone-100 dark:border-stone-800/50">
              <span className="text-stone-500">Skin Type</span>
              <span className="font-semibold text-stone-900 dark:text-stone-100">{stated.skinType}</span>
            </div>
            <div className="flex justify-between py-2 border-b border-stone-100 dark:border-stone-800/50">
              <span className="text-stone-500">Preferred Texture</span>
              <span className="font-semibold text-stone-900 dark:text-stone-100">{stated.texture || "Lightweight"}</span>
            </div>
            <div className="flex justify-between py-2 border-b border-stone-100 dark:border-stone-800/50">
              <span className="text-stone-500">Budget Range</span>
              <span className="font-semibold text-stone-900 dark:text-stone-100">{stated.budgetRange}</span>
            </div>
            <div className="flex justify-between py-2 border-b border-stone-100 dark:border-stone-800/50">
              <span className="text-stone-500">Preferred Finish</span>
              <span className="font-semibold text-stone-900 dark:text-stone-100">{stated.finish || "Natural"}</span>
            </div>
            <div className="flex justify-between py-2">
              <span className="text-stone-500">Fragrance Preference</span>
              <span className="font-semibold text-stone-900 dark:text-stone-100">{stated.fragrance}</span>
            </div>
          </div>
        </div>

        {/* Account Details & Security */}
        <div className="p-6 rounded-2xl border border-stone-200/80 dark:border-stone-800/80 bg-white dark:bg-stone-900 shadow-2xs space-y-4">
          <div className="flex items-center justify-between border-b border-stone-100 dark:border-stone-800 pb-3">
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-[#C26D53]" />
              <h3 className="text-sm font-semibold text-stone-900 dark:text-stone-100">
                Delivery Details
              </h3>
            </div>
            <Badge variant="neutral" size="sm">Primary</Badge>
          </div>

          <div className="space-y-2 text-xs text-stone-600 dark:text-stone-300 leading-relaxed">
            <p className="font-semibold text-stone-900 dark:text-stone-100">{displayName}</p>
            <p>Flat 402, Lotus Residency</p>
            <p>12th Main Road, Indiranagar</p>
            <p>Bengaluru, Karnataka — 560038</p>
            <p className="text-stone-400 pt-1">Phone: +91 98123 45678</p>
          </div>

          <div className="pt-4 border-t border-stone-100 dark:border-stone-800 flex items-center justify-between">
            <div className="flex items-center gap-1.5 text-xs text-stone-500">
              <Shield className="w-3.5 h-3.5 text-emerald-600" />
              <span>Verified Customer Account</span>
            </div>
          </div>
        </div>
      </div>

      {/* Edit Profile Modal */}
      <Modal
        isOpen={editModalOpen}
        onClose={() => setEditModalOpen(false)}
        title="Update Profile & Preferences"
      >
        <form onSubmit={handleSaveProfile} className="space-y-4 text-xs">
          <div>
            <label className="block text-stone-600 dark:text-stone-300 font-medium mb-1">
              Full Name
            </label>
            <Input
              value={editForm.name}
              onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
              required
              className="text-xs"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-stone-600 dark:text-stone-300 font-medium mb-1">
                Skin Type
              </label>
              <select
                value={editForm.skinType}
                onChange={(e) => setEditForm({ ...editForm, skinType: e.target.value })}
                className="w-full text-xs p-2.5 rounded-xl border border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-800 text-stone-900 dark:text-stone-100"
              >
                <option value="Oily">Oily</option>
                <option value="Combination">Combination</option>
                <option value="Dry">Dry</option>
                <option value="Sensitive">Sensitive</option>
                <option value="Normal">Normal</option>
              </select>
            </div>

            <div>
              <label className="block text-stone-600 dark:text-stone-300 font-medium mb-1">
                Preferred Texture
              </label>
              <select
                value={editForm.texture}
                onChange={(e) => setEditForm({ ...editForm, texture: e.target.value })}
                className="w-full text-xs p-2.5 rounded-xl border border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-800 text-stone-900 dark:text-stone-100"
              >
                <option value="Lightweight">Lightweight</option>
                <option value="Water Gel">Water Gel</option>
                <option value="Serum Fluid">Serum Fluid</option>
                <option value="Gentle Cream">Gentle Cream</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-stone-600 dark:text-stone-300 font-medium mb-1">
                Budget Range
              </label>
              <select
                value={editForm.budgetRange}
                onChange={(e) => setEditForm({ ...editForm, budgetRange: e.target.value })}
                className="w-full text-xs p-2.5 rounded-xl border border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-800 text-stone-900 dark:text-stone-100"
              >
                <option value="Under ₹500">Under ₹500</option>
                <option value="₹500–₹800">₹500–₹800</option>
                <option value="₹800–₹1,500">₹800–₹1,500</option>
                <option value="All Budgets">All Budgets</option>
              </select>
            </div>

            <div>
              <label className="block text-stone-600 dark:text-stone-300 font-medium mb-1">
                Preferred Finish
              </label>
              <select
                value={editForm.finish}
                onChange={(e) => setEditForm({ ...editForm, finish: e.target.value })}
                className="w-full text-xs p-2.5 rounded-xl border border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-800 text-stone-900 dark:text-stone-100"
              >
                <option value="Natural">Natural</option>
                <option value="Matte">Matte</option>
                <option value="Dewy">Dewy</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-stone-600 dark:text-stone-300 font-medium mb-1">
              Fragrance Preference
            </label>
            <select
              value={editForm.fragrance}
              onChange={(e) => setEditForm({ ...editForm, fragrance: e.target.value })}
              className="w-full text-xs p-2.5 rounded-xl border border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-800 text-stone-900 dark:text-stone-100"
            >
              <option value="Low fragrance">Low fragrance</option>
              <option value="Fragrance-free">Fragrance-free</option>
              <option value="Subtle botanical">Subtle botanical</option>
            </select>
          </div>

          <div className="flex items-center justify-end gap-2 pt-3 border-t border-stone-100 dark:border-stone-800">
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => setEditModalOpen(false)}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="primary"
              size="sm"
              disabled={isSaving}
            >
              {isSaving ? "Saving to Database..." : "Save Preferences"}
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
