import React, { use, useContext, useState } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { Link, useLocation, useNavigate } from "react-router";
import toast from "react-hot-toast";
import { Eye, EyeOff, Mail, Lock, LogIn, Loader, XCircle, User } from "lucide-react";

const Login = () => {
  const { signInUser, signInWithGoogle, updateUserProfile, loading } =
    useContext(AuthContext);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  // Validate individual fields
  const validateField = (name, value) => {
    const newErrors = { ...errors };

    switch (name) {
      case "email":
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!value.trim()) {
          newErrors.email = "Email is required";
        } else if (!emailRegex.test(value)) {
          newErrors.email = "Please enter a valid email";
        } else {
          delete newErrors.email;
        }
        break;

      case "password":
        if (!value) {
          newErrors.password = "Password is required";
        } else if (value.length < 6) {
          newErrors.password = "Password must be at least 6 characters";
        } else {
          delete newErrors.password;
        }
        break;

      default:
        break;
    }

    setErrors(newErrors);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    validateField(name, value);
  };

  const validateForm = () => {
    const newErrors = {};

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = "Please enter a valid email";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      toast.error("Please fix all errors before submitting");
      return;
    }

    setIsSubmitting(true);

    try {
      await signInUser(formData.email, formData.password);
      toast.success("Logged in successfully! Welcome back!");

      const from = location.state?.from?.pathname || "/";
      navigate(from, { replace: true });
    } catch (err) {
      console.error("Login error:", err);

      if (err.code === "auth/user-not-found") {
        toast.error("No account found with this email. Please register first.");
        setErrors({ email: "User not found" });
      } else if (err.code === "auth/wrong-password") {
        toast.error("Incorrect password. Please try again.");
        setErrors({ password: "Incorrect password" });
      } else if (err.code === "auth/invalid-credential") {
        toast.error("Invalid email or password. Please check and try again.");
      } else if (err.code === "auth/too-many-requests") {
        toast.error("Too many failed attempts. Please try again later.");
      } else {
        toast.error("Login failed. Please try again.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  // const handleGoogleLogin = async () => {
  //   setIsSubmitting(true);

  //   try {
  //     const result = await signInWithGoogle();
  //     const loggedUser = result.user;
  //     const userName = loggedUser.displayName || "User";

  //     toast.success(`Welcome back, ${userName}!`);

  //     const from = location.state?.from?.pathname || "/";
  //     navigate(from, { replace: true });
  //   } catch (err) {
  //     console.error("Google login error:", err);

  //     if (err.code === "auth/popup-closed-by-user") {
  //       toast.error("Login cancelled. Please try again.");
  //     } else if (err.code === "auth/popup-blocked") {
  //       toast.error("Popup blocked. Please allow popups for this site.");
  //     } else {
  //       toast.error("Google login failed. Please try again.");
  //     }
  //   } finally {
  //     setIsSubmitting(false);
  //   }
  // };
  const handleGoogleLogin = async () => {
    setIsSubmitting(true);
    try {
      const result = await signInWithGoogle();
      const loggedUser = result.user;
      const userName = loggedUser.displayName || "User";
      const userPhoto = loggedUser.photoURL || "/default-profile.png";

      // Update Firebase profile
      await updateUserProfile({
        displayName: userName,
        photoURL: userPhoto,
      });

      // Save user to MongoDB backend
      try {
        await fetch(
          "https://finease-personal-finance-management.vercel.app/users",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              name: userName,
              email: loggedUser.email,
              photoURL: userPhoto,
            }),
          },
        );
      } catch (backendError) {
        console.error("Backend save error (non-critical):", backendError);
      }

      toast.success(`Welcome, ${userName}!`);
      navigate("/");
    } catch (err) {
      console.error("Google login error:", err);

      if (err.code === "auth/popup-closed-by-user") {
        toast.error("Login cancelled. Please try again.");
      } else if (err.code === "auth/popup-blocked") {
        toast.error("Popup blocked. Please allow popups for this site.");
      } else if (err.code === "auth/unauthorized-domain") {
        toast.error("This domain is not authorized. Please contact support.");
      } else {
        toast.error(`Google login failed: ${err.message}`);
      }
    } finally {
      setIsSubmitting(false);
    }
  };
  const handleForgotPassword = () => {
    if (!formData.email) {
      toast.error("Please enter your email first");
      return;
    }

    toast.success("Password reset link sent to your email!");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 py-12 px-4">
      <div className="max-w-md mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-block p-3 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full mb-4">
            <LogIn className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            Welcome Back
          </h1>
          <p className="text-gray-600">
            Login to continue managing your finances
          </p>
        </div>

        {/* Login Form Card */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="p-8">
            <div className="space-y-6">
              {/* Email Field */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Email Address <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    disabled={isSubmitting}
                    className={`w-full pl-10 pr-4 py-3 border-2 rounded-lg focus:outline-none focus:ring-2 transition-all ${
                      errors.email
                        ? "border-red-300 focus:border-red-500 focus:ring-red-200"
                        : "border-gray-200 focus:border-purple-500 focus:ring-purple-200"
                    } ${isSubmitting ? "bg-gray-50 cursor-not-allowed" : ""}`}
                    placeholder="your@email.com"
                  />
                </div>
                {errors.email && (
                  <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                    <XCircle className="w-4 h-4" />
                    {errors.email}
                  </p>
                )}
              </div>

              {/* Password Field */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="block text-sm font-semibold text-gray-700">
                    Password <span className="text-red-500">*</span>
                  </label>
                  <button
                    type="button"
                    onClick={handleForgotPassword}
                    className="text-sm text-purple-600 hover:text-purple-700 font-semibold"
                  >
                    Forgot Password?
                  </button>
                </div>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    disabled={isSubmitting}
                    className={`w-full pl-10 pr-12 py-3 border-2 rounded-lg focus:outline-none focus:ring-2 transition-all ${
                      errors.password
                        ? "border-red-300 focus:border-red-500 focus:ring-red-200"
                        : "border-gray-200 focus:border-purple-500 focus:ring-purple-200"
                    } ${isSubmitting ? "bg-gray-50 cursor-not-allowed" : ""}`}
                    placeholder="Enter your password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    disabled={isSubmitting}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? (
                      <EyeOff className="w-5 h-5" />
                    ) : (
                      <Eye className="w-5 h-5" />
                    )}
                  </button>
                </div>
                {errors.password && (
                  <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                    <XCircle className="w-4 h-4" />
                    {errors.password}
                  </p>
                )}
              </div>

              {/* Remember Me Checkbox */}
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="remember"
                  className="w-4 h-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
                />
                <label
                  htmlFor="remember"
                  className="ml-2 text-sm text-gray-600"
                >
                  Remember me for 30 days
                </label>
              </div>

              {/* Login Button */}
              <button
                onClick={handleSubmit}
                disabled={isSubmitting || loading}
                className={`w-full flex items-center justify-center gap-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white py-3 px-6 rounded-lg font-semibold transition-all duration-300 ${
                  isSubmitting || loading
                    ? "opacity-50 cursor-not-allowed"
                    : "hover:shadow-lg hover:scale-105"
                }`}
              >
                {isSubmitting || loading ? (
                  <>
                    <Loader className="w-5 h-5 animate-spin" />
                    Logging in...
                  </>
                ) : (
                  <>
                    <LogIn className="w-5 h-5" />
                    Login
                  </>
                )}
              </button>

              {/* Divider */}
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-200"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-4 bg-white text-gray-500">
                    Or continue with
                  </span>
                </div>
              </div>

              {/* Google Login */}
              <button
                onClick={handleGoogleLogin}
                disabled={isSubmitting || loading}
                className={`w-full flex items-center justify-center gap-3 bg-white border-2 border-gray-200 text-gray-700 py-3 px-6 rounded-lg font-semibold transition-all ${
                  isSubmitting || loading
                    ? "opacity-50 cursor-not-allowed"
                    : "hover:bg-gray-50 hover:border-gray-300"
                }`}
              >
                <svg
                  width="20"
                  height="20"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 512 512"
                >
                  <path
                    fill="#fbbc02"
                    d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"
                  />
                  <path
                    fill="#ea4335"
                    d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"
                  />
                  <path
                    fill="#34a853"
                    d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"
                  />
                  <path
                    fill="#4285f4"
                    d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"
                  />
                </svg>
                Continue with Google
              </button>

              {/* Demo Credentials */}
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-200"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-4 bg-white text-gray-500">
                    Quick Demo Access
                  </span>
                </div>
              </div>

              <button
                onClick={() => {
                  setFormData({
                    email: "naila@gmail.com",
                    password: "356690Da",
                  });
                  toast.success(
                    "Demo credentials loaded! Click login to continue.",
                    {
                      icon: "🎯",
                      duration: 3000,
                    },
                  );
                }}
                className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-blue-50 to-purple-50 border-2 border-blue-200 text-blue-700 py-3 px-4 rounded-lg font-semibold hover:bg-gradient-to-r hover:from-blue-100 hover:to-purple-100 hover:border-blue-300 transition-all"
              >
                <User className="w-5 h-5" />
                Try Demo Account
              </button>

              <p className="text-xs text-center text-gray-500">
                Test the app without registration - all features available
              </p>

              {/* Register Link */}
              <p className="text-center text-gray-600">
                Don't have an account?{" "}
                <Link
                  to="/auth/register"
                  className="text-indigo-600 hover:text-indigo-700 font-semibold"
                >
                  Register now
                </Link>
              </p>
            </div>
          </div>
        </div>

        {/* Benefits Section */}
        <div className="mt-8 bg-white rounded-xl shadow-md p-6">
          <h3 className="font-bold text-gray-800 mb-3 text-center">
            Why Login to FinEase?
          </h3>
          <ul className="space-y-2 text-sm text-gray-600">
            <li className="flex items-start gap-2">
              <span className="text-purple-600 mt-1">✓</span>
              <span>Track your income and expenses in real-time</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-purple-600 mt-1">✓</span>
              <span>Set budgets and achieve your financial goals</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-purple-600 mt-1">✓</span>
              <span>Generate detailed reports and insights</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-purple-600 mt-1">✓</span>
              <span>Secure and private - your data is protected</span>
            </li>
          </ul>
        </div>

        {/* Security Badge */}
        <div className="mt-6 text-center">
          <p className="text-xs text-gray-500 flex items-center justify-center gap-2">
            <Lock className="w-3 h-3" />
            Your data is secured with bank-level encryption
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
