
import React, { use } from 'react';
import { User, Mail, Camera, Edit, Home, Shield, Calendar } from 'lucide-react';
import useTitle from '../../Hooks/useTitle';
import { useNavigate, Link } from 'react-router';
import { AuthContext } from '../../contexts/AuthContext';

const MyProfile = () => {
  useTitle("Profile");
  
  const { user } = use(AuthContext);
  const navigate = useNavigate();

  // Format the creation date if available
  const formatMemberSince = () => {
    if (user?.metadata?.creationTime) {
      const date = new Date(user.metadata.creationTime);
      return date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
    }
    return "2024";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Profile Card */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          {/* Header Banner */}
          <div className="h-32 bg-gradient-to-r from-purple-600 to-blue-600"></div>
          
          {/* Profile Content */}
          <div className="relative px-6 pb-8">
            {/* Profile Picture */}
            <div className="flex justify-center -mt-16 mb-4">
              <div className="relative">
                <img
                  src={user?.photoURL || "/default-profile.png"}
                  alt={user?.displayName || "User"}
                  className="w-32 h-32 rounded-full border-4 border-white shadow-lg object-cover"
                  onError={(e) => {
                    e.target.src = "/default-profile.png";
                  }}
                />
                <div className="absolute bottom-2 right-2 bg-green-500 w-6 h-6 rounded-full border-2 border-white"></div>
              </div>
            </div>

            {/* User Info */}
            <div className="text-center mb-6">
              <h2 className="text-3xl font-bold text-gray-800 mb-2">
                {user?.displayName || "User Name"}
              </h2>
              <p className="text-gray-600 flex items-center justify-center gap-2">
                <Mail className="w-4 h-4" />
                {user?.email || "user@example.com"}
              </p>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
              <div className="bg-gradient-to-br from-purple-100 to-purple-50 p-4 rounded-xl text-center">
                <div className="flex justify-center mb-2">
                  <Shield className="w-6 h-6 text-purple-600" />
                </div>
                <p className="text-sm text-gray-600">Account Status</p>
                <p className="text-lg font-bold text-purple-600">
                  {user?.emailVerified ? "Verified" : "Active"}
                </p>
              </div>

              <div className="bg-gradient-to-br from-blue-100 to-blue-50 p-4 rounded-xl text-center">
                <div className="flex justify-center mb-2">
                  <Calendar className="w-6 h-6 text-blue-600" />
                </div>
                <p className="text-sm text-gray-600">Member Since</p>
                <p className="text-lg font-bold text-blue-600">{formatMemberSince()}</p>
              </div>

              <div className="bg-gradient-to-br from-green-100 to-green-50 p-4 rounded-xl text-center">
                <div className="flex justify-center mb-2">
                  <User className="w-6 h-6 text-green-600" />
                </div>
                <p className="text-sm text-gray-600">Profile</p>
                <p className="text-lg font-bold text-green-600">
                  {user?.displayName && user?.photoURL ? "Complete" : "Incomplete"}
                </p>
              </div>
            </div>

            {/* Account Details */}
            <div className="bg-gray-50 rounded-xl p-6 mb-6">
              <h3 className="text-lg font-bold text-gray-800 mb-4">Account Details</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between py-2 border-b border-gray-200">
                  <span className="text-gray-600">Full Name</span>
                  <span className="font-semibold text-gray-800">{user?.displayName || "Not set"}</span>
                </div>
                <div className="flex items-center justify-between py-2 border-b border-gray-200">
                  <span className="text-gray-600">Email Address</span>
                  <span className="font-semibold text-gray-800">{user?.email || "Not set"}</span>
                </div>
                <div className="flex items-center justify-between py-2">
                  <span className="text-gray-600">Profile Photo</span>
                  <span className="font-semibold text-gray-800">
                    {user?.photoURL ? "Uploaded" : "Default"}
                  </span>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={() => navigate("/update-profile")}
                className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:shadow-lg transition-all duration-300 hover:scale-105"
              >
                <Edit className="w-5 h-5" />
                Update Profile
              </button>
              <Link to="/" className="flex-1">
                <button className="w-full flex items-center justify-center gap-2 bg-gray-200 text-gray-700 py-3 px-6 rounded-lg font-semibold hover:bg-gray-300 transition-colors">
                  <Home className="w-5 h-5" />
                  Go Home
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyProfile;