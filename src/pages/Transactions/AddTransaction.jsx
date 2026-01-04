
import React, { use, useEffect, useState } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";
import useTitle from "../../Hooks/useTitle";
import { 
  DollarSign, 
  TrendingUp, 
  TrendingDown, 
  Calendar, 
  FileText, 
  User, 
  Mail,
  ArrowRight,
  CheckCircle
} from "lucide-react";

const AddTransaction = () => {
  useTitle("Add Transaction");
  const { user } = use(AuthContext);
  const navigate = useNavigate();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});

  const incomeCategories = [
    "Salary",
    "Business",
    "Investment",
    "Freelance",
    "Gift",
    "Bonus",
    "Others",
  ];

  const expenseCategories = [
    "Food & Dining",
    "Transportation",
    "Rent",
    "Shopping",
    "Bills & Utilities",
    "Healthcare",
    "Entertainment",
    "Education",
    "Others"
  ];

  const [formData, setFormData] = useState({
    type: "",
    category: "",
    amount: "",
    description: "",
    date: "",
  });

  useEffect(() => {
    if (user) {
      setFormData((prev) => ({
        ...prev,
        date: prev.date || new Date().toISOString().split("T")[0],
      }));
    }
  }, [user]);

  const validateForm = () => {
    const newErrors = {};

    if (!formData.type) {
      newErrors.type = "Please select a transaction type";
    }

    if (!formData.category) {
      newErrors.category = "Please select a category";
    }

    if (!formData.amount) {
      newErrors.amount = "Amount is required";
    } else if (parseFloat(formData.amount) <= 0) {
      newErrors.amount = "Amount must be greater than 0";
    }

    if (!formData.date) {
      newErrors.date = "Date is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    // Clear error for this field
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: "" }));
    }

    // Reset category when type changes
    if (name === "type") {
      setFormData(prev => ({ ...prev, category: "" }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user) {
      toast.error("Please login to add transactions!");
      navigate("/auth/login");
      return;
    }

    if (!validateForm()) {
      toast.error("Please fill in all required fields correctly!");
      return;
    }

    setIsSubmitting(true);

    const payload = {
      ...formData,
      amount: parseFloat(formData.amount),
      userName: user.displayName,
      userEmail: user.email,
      date: formData.date || new Date().toISOString().split("T")[0],
    };

    try {
      const res = await fetch(
        "https://finease-personal-finance-management.vercel.app/transactions",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        }
      );

      const data = await res.json();

      if (res.ok) {
        toast.success("Transaction added successfully!");

        // Reset form
        setFormData({
          type: "",
          category: "",
          amount: "",
          description: "",
          date: new Date().toISOString().split("T")[0],
        });

        // Optional: Navigate to transactions page after 1 second
        setTimeout(() => {
          navigate("/transaction/my");
        }, 1500);
      } else {
        toast.error(data.message || "Failed to add transaction");
      }
    } catch (error) {
      console.error("Transaction error:", error);
      toast.error("Server error! Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    setFormData({
      type: "",
      category: "",
      amount: "",
      description: "",
      date: new Date().toISOString().split("T")[0],
    });
    setErrors({});
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 py-12 px-4">
      <div className="max-w-3xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-8">
          <div className="inline-block p-3 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full mb-4">
            <DollarSign className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-gray-800 mb-2">Add Transaction</h1>
          <p className="text-gray-600">Track your income and expenses efficiently</p>
        </div>

        {/* Main Form Card */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          {/* User Info Banner */}
          <div className="bg-gradient-to-r from-purple-600 to-blue-600 px-6 py-4">
            <div className="flex items-center justify-between text-white">
              <div className="flex items-center gap-3">
                <img
                  src={user?.photoURL || "/default-profile.png"}
                  alt={user?.displayName}
                  className="w-12 h-12 rounded-full border-2 border-white"
                  onError={(e) => {
                    e.target.src = "/default-profile.png";
                  }}
                />
                <div>
                  <p className="font-semibold">{user?.displayName || "User"}</p>
                  <p className="text-sm text-purple-100">{user?.email}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Form Content */}
          <div className="p-6 md:p-8">
            <div className="space-y-6">
              {/* Transaction Type */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  Transaction Type <span className="text-red-500">*</span>
                </label>
                <div className="grid grid-cols-2 gap-4">
                  <button
                    type="button"
                    onClick={() => handleChange({ target: { name: 'type', value: 'Income' }})}
                    className={`p-4 rounded-xl border-2 transition-all ${
                      formData.type === 'Income'
                        ? 'border-green-500 bg-green-50'
                        : 'border-gray-200 hover:border-green-300'
                    }`}
                  >
                    <div className="flex items-center justify-center gap-2">
                      <TrendingUp className={`w-6 h-6 ${formData.type === 'Income' ? 'text-green-600' : 'text-gray-400'}`} />
                      <span className={`font-semibold ${formData.type === 'Income' ? 'text-green-600' : 'text-gray-600'}`}>
                        Income
                      </span>
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={() => handleChange({ target: { name: 'type', value: 'Expense' }})}
                    className={`p-4 rounded-xl border-2 transition-all ${
                      formData.type === 'Expense'
                        ? 'border-red-500 bg-red-50'
                        : 'border-gray-200 hover:border-red-300'
                    }`}
                  >
                    <div className="flex items-center justify-center gap-2">
                      <TrendingDown className={`w-6 h-6 ${formData.type === 'Expense' ? 'text-red-600' : 'text-gray-400'}`} />
                      <span className={`font-semibold ${formData.type === 'Expense' ? 'text-red-600' : 'text-gray-600'}`}>
                        Expense
                      </span>
                    </div>
                  </button>
                </div>
                {errors.type && (
                  <p className="mt-2 text-sm text-red-600">{errors.type}</p>
                )}
              </div>

              {/* Category */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Category <span className="text-red-500">*</span>
                </label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  disabled={!formData.type}
                  className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none focus:ring-2 transition-all ${
                    errors.category
                      ? 'border-red-300 focus:border-red-500 focus:ring-red-200'
                      : 'border-gray-200 focus:border-purple-500 focus:ring-purple-200'
                  } ${!formData.type ? 'bg-gray-50 cursor-not-allowed' : ''}`}
                >
                  <option value="">
                    {formData.type ? "Select a category" : "Select type first"}
                  </option>
                  {(formData.type === "Income" ? incomeCategories : expenseCategories).map(
                    (cat, index) => (
                      <option key={index} value={cat}>
                        {cat}
                      </option>
                    )
                  )}
                </select>
                {errors.category && (
                  <p className="mt-1 text-sm text-red-600">{errors.category}</p>
                )}
              </div>

              {/* Amount and Date Row */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Amount */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Amount <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="number"
                      name="amount"
                      value={formData.amount}
                      onChange={handleChange}
                      placeholder="0.00"
                      step="0.01"
                      min="0"
                      className={`w-full pl-10 pr-4 py-3 border-2 rounded-lg focus:outline-none focus:ring-2 transition-all ${
                        errors.amount
                          ? 'border-red-300 focus:border-red-500 focus:ring-red-200'
                          : 'border-gray-200 focus:border-purple-500 focus:ring-purple-200'
                      }`}
                    />
                  </div>
                  {errors.amount && (
                    <p className="mt-1 text-sm text-red-600">{errors.amount}</p>
                  )}
                </div>

                {/* Date */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Date <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="date"
                      name="date"
                      value={formData.date}
                      onChange={handleChange}
                      max={new Date().toISOString().split("T")[0]}
                      className={`w-full pl-10 pr-4 py-3 border-2 rounded-lg focus:outline-none focus:ring-2 transition-all ${
                        errors.date
                          ? 'border-red-300 focus:border-red-500 focus:ring-red-200'
                          : 'border-gray-200 focus:border-purple-500 focus:ring-purple-200'
                      }`}
                    />
                  </div>
                  {errors.date && (
                    <p className="mt-1 text-sm text-red-600">{errors.date}</p>
                  )}
                </div>
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Description <span className="text-gray-400 text-xs">(Optional)</span>
                </label>
                <div className="relative">
                  <FileText className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    placeholder="Add notes about this transaction..."
                    rows="4"
                    className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:border-purple-500 focus:ring-purple-200 transition-all resize-none"
                  />
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 pt-4">
                <button
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                  className={`flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white py-3 px-6 rounded-lg font-semibold transition-all duration-300 ${
                    isSubmitting
                      ? 'opacity-50 cursor-not-allowed'
                      : 'hover:shadow-lg hover:scale-105'
                  }`}
                >
                  {isSubmitting ? (
                    <>
                      <span className="loading loading-spinner loading-sm"></span>
                      Adding...
                    </>
                  ) : (
                    <>
                      <CheckCircle className="w-5 h-5" />
                      Add Transaction
                    </>
                  )}
                </button>
                <button
                  onClick={handleCancel}
                  disabled={isSubmitting}
                  type="button"
                  className={`flex-1 bg-gray-200 text-gray-700 py-3 px-6 rounded-lg font-semibold transition-colors ${
                    isSubmitting
                      ? 'opacity-50 cursor-not-allowed'
                      : 'hover:bg-gray-300'
                  }`}
                >
                  Clear Form
                </button>
              </div>
            </div>
          </div>

          {/* Quick Stats Info */}
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 px-6 py-4 border-t border-gray-100">
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-600">Need help?</span>
              <button
                onClick={() => navigate("/transaction/my")}
                className="text-purple-600 hover:text-purple-700 font-semibold flex items-center gap-1"
              >
                View all transactions
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Quick Tips */}
        <div className="mt-6 bg-white rounded-xl p-6 shadow-md">
          <h3 className="font-bold text-gray-800 mb-3 flex items-center gap-2">
            <FileText className="w-5 h-5 text-purple-600" />
            Quick Tips
          </h3>
          <ul className="space-y-2 text-sm text-gray-600">
            <li className="flex items-start gap-2">
              <span className="text-purple-600 mt-1">•</span>
              <span>Choose the correct transaction type (Income or Expense) before selecting a category</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-purple-600 mt-1">•</span>
              <span>Add descriptions to remember important details about your transactions</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-purple-600 mt-1">•</span>
              <span>Regular tracking helps you understand your spending patterns better</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default AddTransaction;