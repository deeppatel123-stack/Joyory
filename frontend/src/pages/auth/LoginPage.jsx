import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useNotification } from "../../context/NotificationContext";
import { Button } from "../../components/common/Button";
import { Input } from "../../components/common/Input";
import { PublicNavbar } from "../../components/layout/PublicNavbar";
import { Footer } from "../../components/layout/Footer";
import { Eye, EyeOff, Lock, Mail, ArrowRight } from "lucide-react";

export const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const { login } = useAuth();
  const { addToast } = useNotification();
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      setErrorMsg("Please enter both your email address and password.");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setErrorMsg("Please enter a valid email address.");
      return;
    }

    setErrorMsg("");
    setIsSubmitting(true);

    try {
      const data = await login(email, password);
      addToast(`Welcome back, ${data.user.name}!`, "success");

      if (data.user.role === "admin") {
        navigate("/admin", { replace: true });
      } else if (from) {
        navigate(from, { replace: true });
      } else {
        navigate("/customer/discover", { replace: true });
      }
    } catch (err) {
      setErrorMsg(err.message || "Invalid email or password. Please try again.");
      addToast(err.message || "Authentication failed", "error");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDemoCustomerLogin = async () => {
    setErrorMsg("");
    setIsSubmitting(true);
    try {
      const data = await login("aria.chen@joyory.com", "Customer@Joyory2026");
      addToast(`Welcome back, ${data.user.name}!`, "success");
      navigate("/customer/discover", { replace: true });
    } catch (err) {
      setErrorMsg(err.message || "Demo customer login failed.");
      addToast(err.message || "Demo customer login failed", "error");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDemoAdminLogin = async () => {
    setErrorMsg("");
    setIsSubmitting(true);
    try {
      const data = await login("admin@joyory.com", "Admin@Joyory2026");
      addToast(`Welcome back, ${data.user.name}!`, "success");
      navigate("/admin", { replace: true });
    } catch (err) {
      setErrorMsg(err.message || "Demo admin login failed.");
      addToast(err.message || "Demo admin login failed", "error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-stone-50 dark:bg-stone-950 text-stone-900 dark:text-stone-100 flex flex-col transition-colors">
      <PublicNavbar />

      <div className="flex-1 flex items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
        <div className="w-full max-w-md space-y-6 p-8 rounded-2xl border border-stone-200/80 dark:border-stone-800/80 bg-white/95 dark:bg-stone-900/95 shadow-sm backdrop-blur-xs">
          {/* Header */}
          <div className="text-center space-y-2">
            <div className="w-10 h-10 rounded-xl bg-stone-900 dark:bg-stone-100 text-white dark:text-stone-900 flex items-center justify-center font-bold text-base mx-auto shadow-xs">
              J
            </div>
            <h2 className="text-2xl font-semibold tracking-tight text-stone-950 dark:text-stone-50">
              Welcome to Joyory
            </h2>
            <p className="text-xs text-stone-500 dark:text-stone-400">
              Sign in to your account to continue your beauty journey
            </p>
          </div>

          {/* Redirect info notice */}
          {location.state?.message && !errorMsg && (
            <div className="p-3 rounded-lg bg-stone-100 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-xs text-stone-700 dark:text-stone-300 flex items-center gap-2">
              <Lock className="w-3.5 h-3.5 text-[#C26D53] shrink-0" />
              <span>{location.state.message}</span>
            </div>
          )}

          {/* Error notice */}
          {errorMsg && (
            <div className="p-3 rounded-lg bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-900/60 text-xs text-red-600 dark:text-red-300">
              {errorMsg}
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-medium text-stone-700 dark:text-stone-300 mb-1">
                Email Address
              </label>
              <div className="relative">
                <Input
                  type="email"
                  placeholder="name@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={isSubmitting}
                  required
                  className="pl-9 text-xs"
                />
                <Mail className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-stone-700 dark:text-stone-300 mb-1">
                Password
              </label>
              <div className="relative">
                <Input
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={isSubmitting}
                  required
                  className="pl-9 pr-10 text-xs"
                />
                <Lock className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600 dark:hover:text-stone-200 cursor-pointer"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <Button
              type="submit"
              variant="primary"
              className="w-full justify-center text-xs py-2.5 mt-2"
              disabled={isSubmitting}
              icon={ArrowRight}
            >
              {isSubmitting ? "Signing in..." : "Sign In"}
            </Button>
          </form>

          {/* Quick Demo Login Section */}
          <div className="pt-4 border-t border-stone-100 dark:border-stone-800 space-y-2.5 text-center">
            <span className="text-[11px] font-medium text-stone-400 dark:text-stone-500 uppercase tracking-wider block">
              Quick Demo
            </span>
            <div className="flex items-center justify-center gap-3">
              <button
                type="button"
                onClick={handleDemoCustomerLogin}
                disabled={isSubmitting}
                className="px-3.5 py-1.5 rounded-lg border border-stone-200 dark:border-stone-700 bg-stone-50 dark:bg-stone-800/60 hover:bg-stone-100 dark:hover:bg-stone-800 text-stone-700 dark:text-stone-300 text-xs font-medium transition-colors cursor-pointer shadow-2xs"
              >
                Demo Customer
              </button>
              <button
                type="button"
                onClick={handleDemoAdminLogin}
                disabled={isSubmitting}
                className="px-3.5 py-1.5 rounded-lg border border-stone-200 dark:border-stone-700 bg-stone-50 dark:bg-stone-800/60 hover:bg-stone-100 dark:hover:bg-stone-800 text-stone-700 dark:text-stone-300 text-xs font-medium transition-colors cursor-pointer shadow-2xs"
              >
                Demo Admin
              </button>
            </div>
          </div>

          {/* Footer link */}
          <div className="text-center text-xs text-stone-500 pt-3 border-t border-stone-100 dark:border-stone-800 space-y-1">
            <div>
              Don't have an account?{" "}
              <Link to="/signup" className="text-[#C26D53] font-medium hover:underline">
                Create Account
              </Link>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};
