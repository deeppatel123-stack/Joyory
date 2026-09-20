import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useNotification } from "../../context/NotificationContext";
import { Button } from "../../components/common/Button";
import { Input } from "../../components/common/Input";
import { PublicNavbar } from "../../components/layout/PublicNavbar";
import { Footer } from "../../components/layout/Footer";
import { Eye, EyeOff, Sparkles, CheckCircle2, ShieldCheck } from "lucide-react";

export const SignupPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    skinType: "Combination",
    budget: "₹500 - ₹1500"
  });

  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const { register } = useAuth();
  const { addToast } = useNotification();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.password) {
      setErrorMsg("Please fill in all required fields.");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setErrorMsg("Passwords do not match.");
      return;
    }

    if (formData.password.length < 6) {
      setErrorMsg("Password must be at least 6 characters.");
      return;
    }

    setErrorMsg("");
    setIsSubmitting(true);

    try {
      await register({
        name: formData.name,
        email: formData.email,
        password: formData.password,
        confirmPassword: formData.confirmPassword,
        beautyPreferences: {
          skinType: formData.skinType,
          budget: formData.budget
        }
      });

      addToast("Account created successfully! Welcome to Joyory.", "success");
      navigate("/customer/discover", { replace: true });
    } catch (err) {
      setErrorMsg(err.message || "Registration failed. Please try again.");
      addToast(err.message || "Registration failed", "error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-stone-50 dark:bg-stone-950 text-stone-900 dark:text-stone-100 flex flex-col transition-colors">
      <PublicNavbar />

      <div className="flex-1 flex items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
        <div className="w-full max-w-lg space-y-6 p-8 rounded-2xl border border-stone-200/80 dark:border-stone-800/80 bg-white/90 dark:bg-stone-900/90 shadow-sm backdrop-blur-xs">
          {/* Header */}
          <div className="text-center space-y-2">
            <div className="w-10 h-10 rounded-xl bg-stone-900 dark:bg-stone-100 text-white dark:text-stone-900 flex items-center justify-center font-bold text-base mx-auto">
              J
            </div>
            <h2 className="text-2xl font-semibold tracking-tight text-stone-950 dark:text-stone-50">
              Create Your Beauty Passport
            </h2>
            <p className="text-xs text-stone-500 dark:text-stone-400">
              Personalized formulations, preference graph evolution, and lifetime memory
            </p>
          </div>

          {/* Error Notice */}
          {errorMsg && (
            <div className="p-3 rounded-lg bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-900/60 text-xs text-red-600 dark:text-red-300">
              {errorMsg}
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-stone-700 dark:text-stone-300 mb-1">
                  Full Name *
                </label>
                <Input
                  type="text"
                  name="name"
                  placeholder="Aria Chen"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full text-xs"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-stone-700 dark:text-stone-300 mb-1">
                  Email Address *
                </label>
                <Input
                  type="email"
                  name="email"
                  placeholder="aria@example.com"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full text-xs"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-stone-700 dark:text-stone-300 mb-1">
                  Password *
                </label>
                <div className="relative">
                  <Input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    placeholder="Min. 6 characters"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    className="w-full text-xs pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600 dark:hover:text-stone-200"
                    aria-label={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-stone-700 dark:text-stone-300 mb-1">
                  Confirm Password *
                </label>
                <Input
                  type="password"
                  name="confirmPassword"
                  placeholder="Repeat password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                  className="w-full text-xs"
                />
              </div>
            </div>

            {/* Optional Beauty Profile Quick-Start */}
            <div className="pt-2 border-t border-stone-100 dark:border-stone-800 space-y-3">
              <div className="flex items-center gap-1.5 text-xs font-semibold text-stone-800 dark:text-stone-200">
                <Sparkles className="w-3.5 h-3.5 text-[#C26D53]" />
                Beauty Preferences (Initial Calibration)
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] font-medium text-stone-600 dark:text-stone-400 mb-1">
                    Skin Type
                  </label>
                  <select
                    name="skinType"
                    value={formData.skinType}
                    onChange={handleChange}
                    className="w-full text-xs px-3 py-2 rounded-lg border border-stone-200 dark:border-stone-800 bg-stone-50/70 dark:bg-stone-950/40 text-stone-900 dark:text-stone-100 focus:outline-hidden focus:border-[#C26D53]"
                  >
                    <option value="Combination">Combination</option>
                    <option value="Oily">Oily</option>
                    <option value="Dry">Dry</option>
                    <option value="Sensitive">Sensitive</option>
                    <option value="Acne-prone">Acne-prone</option>
                    <option value="Normal">Normal</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] font-medium text-stone-600 dark:text-stone-400 mb-1">
                    Preferred Budget Band
                  </label>
                  <select
                    name="budget"
                    value={formData.budget}
                    onChange={handleChange}
                    className="w-full text-xs px-3 py-2 rounded-lg border border-stone-200 dark:border-stone-800 bg-stone-50/70 dark:bg-stone-950/40 text-stone-900 dark:text-stone-100 focus:outline-hidden focus:border-[#C26D53]"
                  >
                    <option value="Under ₹500">Under ₹500</option>
                    <option value="₹500 - ₹1000">₹500 - ₹1000</option>
                    <option value="₹500 - ₹1500">₹500 - ₹1500</option>
                    <option value="₹1500+">₹1500+ Luxury</option>
                  </select>
                </div>
              </div>
            </div>

            <Button
              type="submit"
              variant="primary"
              className="w-full justify-center text-xs py-2.5"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Creating Account..." : "Create Account"}
            </Button>
          </form>

          {/* Footer link */}
          <div className="text-center text-xs text-stone-500 pt-2 border-t border-stone-100 dark:border-stone-800">
            Already have an account?{" "}
            <Link to="/login" className="text-[#C26D53] font-medium hover:underline">
              Sign in
            </Link>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};
