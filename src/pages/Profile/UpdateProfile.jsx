
import React, { use, useState } from 'react';
import toast from 'react-hot-toast';
import { AuthContext } from '../../contexts/AuthContext';
import { Link, useNavigate } from 'react-router';
import useTitle from '../../Hooks/useTitle';
import { User, Mail, Camera, ArrowLeft, Edit } from 'lucide-react';

const UpdateProfile = () => {
  useTitle("Update Profile");

  const { user, setUser, updateUserProfile } = use(AuthContext);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: user?.displayName || "",
    photoURL: user?.photoURL || ""
  });

  const [previewImage, setPreviewImage] = useState(user?.photoURL || "");
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    } else if (formData.name.trim().length < 3) {
      newErrors.name = "Name must be at least 3 characters";
    }

    if (!formData.photoURL.trim()) {
      newErrors.photoURL = "Photo URL is required";
    } else if (!isValidURL(formData.photoURL)) {
      newErrors.photoURL = "Please enter a valid URL";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const isValidURL = (string) => {
    try {
      new URL(string);
      return true;
    } catch (_) {
      return false;
    }
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error for this field when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: "" }));
    }
  };

  const handlePhotoURLChange = (value) => {
    handleInputChange('photoURL', value);
    if (isValidURL(value)) {
      setPreviewImage(value);
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      await updateUserProfile({ 
        displayName: formData.name, 
        photoURL: formData.photoURL 
      });
      
      setUser({ 
        ...user, 
        displayName: formData.name, 
        photoURL: formData.photoURL 
      });
      
      toast.success("Profile updated successfully!");
      navigate("/my-profile");
    } catch (err) {
      console.error("Update error:", err);
      toast.error("Failed to update profile. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 py-12 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Back Button */}
        <Link 
          to="/my-profile" 
          className="flex items-center gap-2 text-gray-600 hover:text-gray-800 mb-6 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          Back to Profile
        </Link>

        {/* Update Form Card */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-purple-600 to-blue-600 px-6 py-8 text-white">
            <div className="flex items-center gap-3">
              <Edit className="w-8 h-8" />
              <div>
                <h2 className="text-3xl font-bold">Update Profile</h2>
                <p className="text-purple-100">Keep your information up to date</p>
              </div>
            </div>
          </div>

          {/* Form Content */}
          <div className="p-6 md:p-8">
            {/* Profile Preview */}
            <div className="flex justify-center mb-8">
              <div className="relative">
                <img
                  src={previewImage || "/default-profile.png"}
                  alt="Profile Preview"
                  className="w-32 h-32 rounded-full border-4 border-purple-200 shadow-lg object-cover"
                  onError={(e) => {
                    e.target.src = "/default-profile.png";
                  }}
                />
                <div className="absolute bottom-0 right-0 bg-purple-600 p-2 rounded-full border-2 border-white">
                  <Camera className="w-5 h-5 text-white" />
                </div>
              </div>
            </div>

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
                    value={formData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    disabled={isSubmitting}
                    className={`w-full pl-10 pr-4 py-3 border-2 rounded-lg focus:outline-none focus:ring-2 transition-all ${
                      errors.name 
                        ? 'border-red-300 focus:border-red-500 focus:ring-red-200' 
                        : 'border-gray-200 focus:border-purple-500 focus:ring-purple-200'
                    } ${isSubmitting ? 'bg-gray-50 cursor-not-allowed' : ''}`}
                    placeholder="Enter your full name"
                  />
                </div>
                {errors.name && (
                  <p className="mt-1 text-sm text-red-600">{errors.name}</p>
                )}
              </div>

              {/* Photo URL Field */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Photo URL <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <Camera className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="url"
                    value={formData.photoURL}
                    onChange={(e) => handlePhotoURLChange(e.target.value)}
                    disabled={isSubmitting}
                    className={`w-full pl-10 pr-4 py-3 border-2 rounded-lg focus:outline-none focus:ring-2 transition-all ${
                      errors.photoURL 
                        ? 'border-red-300 focus:border-red-500 focus:ring-red-200' 
                        : 'border-gray-200 focus:border-purple-500 focus:ring-purple-200'
                    } ${isSubmitting ? 'bg-gray-50 cursor-not-allowed' : ''}`}
                    placeholder="https://example.com/photo.jpg"
                  />
                </div>
                {errors.photoURL && (
                  <p className="mt-1 text-sm text-red-600">{errors.photoURL}</p>
                )}
                <p className="mt-1 text-xs text-gray-500">
                  Enter a valid image URL for your profile picture
                </p>
              </div>

              {/* Email Display (Read-only) */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="email"
                    value={user?.email || ""}
                    disabled
                    className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-lg bg-gray-50 text-gray-500 cursor-not-allowed"
                  />
                </div>
                <p className="mt-1 text-xs text-gray-500">
                  Email cannot be changed
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 pt-4">
                <button
                  onClick={handleUpdate}
                  disabled={isSubmitting}
                  className={`flex-1 bg-gradient-to-r from-purple-600 to-blue-600 text-white py-3 px-6 rounded-lg font-semibold transition-all duration-300 ${
                    isSubmitting 
                      ? 'opacity-50 cursor-not-allowed' 
                      : 'hover:shadow-lg hover:scale-105'
                  }`}
                >
                  {isSubmitting ? (
                    <span className="flex items-center justify-center gap-2">
                      <span className="loading loading-spinner loading-sm"></span>
                      Updating...
                    </span>
                  ) : (
                    "Save Changes"
                  )}
                </button>
                <Link to="/my-profile" className="flex-1">
                  <button 
                    disabled={isSubmitting}
                    className={`w-full bg-gray-200 text-gray-700 py-3 px-6 rounded-lg font-semibold transition-colors ${
                      isSubmitting 
                        ? 'opacity-50 cursor-not-allowed' 
                        : 'hover:bg-gray-300'
                    }`}
                  >
                    Cancel
                  </button>
                </Link>
              </div>
            </div>

            {/* Help Text */}
            <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
              <p className="text-sm text-blue-800">
                <strong>Tips:</strong> Use a clear, professional photo. Make sure the URL is accessible and points to a valid image format (JPG, PNG, etc.).
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateProfile;