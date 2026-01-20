
import React, { use, useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router";
import { AuthContext } from "../../contexts/AuthContext";
import { 
  Eye, 
  EyeOff, 
  User, 
  Mail, 
  Lock, 
  Camera, 
  UserPlus,
  CheckCircle,
  XCircle,
  Loader
} from "lucide-react";

const Register = () => {
  const { createUser, updateUserProfile, signInWithGoogle, loading } = use(AuthContext);
  
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    photoURL: "",
  });
  
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState({
    hasLength: false,
    hasUppercase: false,
    hasLowercase: false,
    hasNumber: false,
  });
  
  const navigate = useNavigate();

  // Validate individual fields
  const validateField = (name, value) => {
    const newErrors = { ...errors };

    switch (name) {
      case "name":
        if (!value.trim()) {
          newErrors.name = "Name is required";
        } else if (value.trim().length < 3) {
          newErrors.name = "Name must be at least 3 characters";
        } else {
          delete newErrors.name;
        }
        break;

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
        } else if (!/[A-Z]/.test(value)) {
          newErrors.password = "Password must contain an uppercase letter";
        } else if (!/[a-z]/.test(value)) {
          newErrors.password = "Password must contain a lowercase letter";
        } else {
          delete newErrors.password;
        }
        break;

      case "photoURL":
        if (value && !isValidURL(value)) {
          newErrors.photoURL = "Please enter a valid URL";
        } else {
          delete newErrors.photoURL;
        }
        break;

      default:
        break;
    }

    setErrors(newErrors);
  };

  // Check password strength
  const checkPasswordStrength = (password) => {
    setPasswordStrength({
      hasLength: password.length >= 6,
      hasUppercase: /[A-Z]/.test(password),
      hasLowercase: /[a-z]/.test(password),
      hasNumber: /[0-9]/.test(password),
    });
  };

  const isValidURL = (string) => {
    try {
      new URL(string);
      return true;
    } catch (_) {
      return false;
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    validateField(name, value);

    if (name === "password") {
      checkPasswordStrength(value);
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    } else if (formData.name.trim().length < 3) {
      newErrors.name = "Name must be at least 3 characters";
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = "Please enter a valid email";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (
      formData.password.length < 6 ||
      !/[A-Z]/.test(formData.password) ||
      !/[a-z]/.test(formData.password)
    ) {
      newErrors.password = "Password doesn't meet requirements";
    }

    if (formData.photoURL && !isValidURL(formData.photoURL)) {
      newErrors.photoURL = "Please enter a valid URL";
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
      const userCredential = await createUser(formData.email, formData.password);
      await updateUserProfile({
        displayName: formData.name,
        photoURL: formData.photoURL || "/default-profile.png",
      });
      
      toast.success("Registration successful! Welcome to FinEase!");
      navigate("/");
    } catch (err) {
      console.error("Registration error:", err);
      
      if (err.code === "auth/email-already-in-use") {
        toast.error("This email is already registered. Please login instead.");
        navigate("/auth/login");
        setErrors({ email: "Email already in use" });
      } else if (err.code === "auth/weak-password") {
        toast.error("Password is too weak. Please choose a stronger password.");
      } else {
        toast.error("Registration failed. Please try again.");
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
  //     const userPhoto = loggedUser.photoURL || "/default-profile.png";
      
  //     await updateUserProfile({ 
  //       displayName: userName, 
  //       photoURL: userPhoto 
  //     });
      
  //     toast.success(`Welcome, ${userName}!`);
  //     navigate("/");
  //   } catch (err) {
  //     console.error("Google login error:", err);
  //     toast.error("Google login failed. Please try again.");
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
      photoURL: userPhoto 
    });

    // Save user to MongoDB backend
    try {
      await fetch('https://finease-personal-finance-management.vercel.app/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: userName,
          email: loggedUser.email,
          photoURL: userPhoto,
        }),
      });
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



  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 py-12 px-4">
      <div className="max-w-md mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-block p-3 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full mb-4">
            <UserPlus className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-gray-800 mb-2">Create Account</h1>
          <p className="text-gray-600">Join FinEase and start managing your finances</p>
        </div>

        {/* Registration Form Card */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="p-8">
            <div className="space-y-6">
              {/* Name Field */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Full Name <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    disabled={isSubmitting}
                    className={`w-full pl-10 pr-4 py-3 border-2 rounded-lg focus:outline-none focus:ring-2 transition-all ${
                      errors.name
                        ? "border-red-300 focus:border-red-500 focus:ring-red-200"
                        : "border-gray-200 focus:border-purple-500 focus:ring-purple-200"
                    } ${isSubmitting ? "bg-gray-50 cursor-not-allowed" : ""}`}
                    placeholder="Enter your full name"
                  />
                </div>
                {errors.name && (
                  <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                    <XCircle className="w-4 h-4" />
                    {errors.name}
                  </p>
                )}
              </div>

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
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Password <span className="text-red-500">*</span>
                </label>
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
                    placeholder="Create a strong password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
                {errors.password && (
                  <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                    <XCircle className="w-4 h-4" />
                    {errors.password}
                  </p>
                )}

                {/* Password Strength Indicator */}
                {formData.password && (
                  <div className="mt-3 p-3 bg-gray-50 rounded-lg">
                    <p className="text-xs font-semibold text-gray-700 mb-2">Password Requirements:</p>
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 text-xs">
                        {passwordStrength.hasLength ? (
                          <CheckCircle className="w-4 h-4 text-green-500" />
                        ) : (
                          <XCircle className="w-4 h-4 text-gray-300" />
                        )}
                        <span className={passwordStrength.hasLength ? "text-green-600" : "text-gray-500"}>
                          At least 6 characters
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-xs">
                        {passwordStrength.hasUppercase ? (
                          <CheckCircle className="w-4 h-4 text-green-500" />
                        ) : (
                          <XCircle className="w-4 h-4 text-gray-300" />
                        )}
                        <span className={passwordStrength.hasUppercase ? "text-green-600" : "text-gray-500"}>
                          One uppercase letter
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-xs">
                        {passwordStrength.hasLowercase ? (
                          <CheckCircle className="w-4 h-4 text-green-500" />
                        ) : (
                          <XCircle className="w-4 h-4 text-gray-300" />
                        )}
                        <span className={passwordStrength.hasLowercase ? "text-green-600" : "text-gray-500"}>
                          One lowercase letter
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-xs">
                        {passwordStrength.hasNumber ? (
                          <CheckCircle className="w-4 h-4 text-green-500" />
                        ) : (
                          <XCircle className="w-4 h-4 text-gray-300" />
                        )}
                        <span className={passwordStrength.hasNumber ? "text-green-600" : "text-gray-500"}>
                          One number (recommended)
                        </span>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Photo URL Field */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Photo URL <span className="text-gray-400 text-xs">(Optional)</span>
                </label>
                <div className="relative">
                  <Camera className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="url"
                    name="photoURL"
                    value={formData.photoURL}
                    onChange={handleChange}
                    disabled={isSubmitting}
                    className={`w-full pl-10 pr-4 py-3 border-2 rounded-lg focus:outline-none focus:ring-2 transition-all ${
                      errors.photoURL
                        ? "border-red-300 focus:border-red-500 focus:ring-red-200"
                        : "border-gray-200 focus:border-purple-500 focus:ring-purple-200"
                    } ${isSubmitting ? "bg-gray-50 cursor-not-allowed" : ""}`}
                    placeholder="https://example.com/photo.jpg"
                  />
                </div>
                {errors.photoURL && (
                  <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                    <XCircle className="w-4 h-4" />
                    {errors.photoURL}
                  </p>
                )}
                <p className="mt-1 text-xs text-gray-500">
                  Add a profile picture URL (we'll use a default if you skip this)
                </p>
              </div>

              {/* Register Button */}
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
                    Creating Account...
                  </>
                ) : (
                  <>
                    <UserPlus className="w-5 h-5" />
                    Create Account
                  </>
                )}
              </button>

              {/* Divider */}
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-200"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-4 bg-white text-gray-500">Or continue with</span>
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
                  <path fill="#fbbc02" d="m90 341a208 200 0 010-171l63 49q-12 37 0 73" />
                  <path fill="#ea4335" d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55" />
                  <path fill="#34a853" d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341" />
                  <path fill="#4285f4" d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57" />
                </svg>
                Continue with Google
              </button>

              {/* Login Link */}
              <p className="text-center text-gray-600">
                Already have an account?{" "}
                <Link
                  to="/auth/login"
                  className="text-indigo-600 hover:text-indigo-700 font-semibold"
                >
                  Login here
                </Link>
              </p>
            </div>
          </div>
        </div>

        {/* Terms & Privacy */}
        <p className="text-center text-xs text-gray-500 mt-6">
          By registering, you agree to our{" "}
          <a href="#" className="text-indigo-600 hover:underline">
            Terms of Service
          </a>{" "}
          and{" "}
          <a href="#" className="text-indigo-600 hover:underline">
            Privacy Policy
          </a>
        </p>
      </div>
    </div>
  );
};

export default Register;