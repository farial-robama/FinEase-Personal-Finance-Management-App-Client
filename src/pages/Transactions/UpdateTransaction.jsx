
import { use, useState } from "react";
import toast from "react-hot-toast";
import { AuthContext } from "../../contexts/AuthContext";
import useTitle from "../../Hooks/useTitle";
import { 
  DollarSign, 
  Calendar, 
  FileText, 
  Tag, 
  TrendingUp, 
  TrendingDown,
  Save,
  X,
  AlertCircle
} from "lucide-react";

const UpdateTransaction = ({ transaction, onClose }) => {
  useTitle("Update Transaction");

  const { user } = use(AuthContext);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});

  const categoryData = {
    Income: {
      categories: ["Salary", "Business", "Investment", "Freelance", "Gift", "Bonus", "Others"],
      icon: TrendingUp,
      color: "emerald"
    },
    Expense: {
      categories: ["Food", "Transport", "Rent", "Shopping", "Bills", "Entertainment", "Healthcare", "Education", "Others"],
      icon: TrendingDown,
      color: "rose"
    }
  };

  if (!transaction) return null;

  const [formData, setFormData] = useState({
    type: transaction.type || "Income",
    category: transaction.category || "",
    amount: transaction.amount || "",
    description: transaction.description || "",
    date: transaction.date ? transaction.date.slice(0, 10) : new Date().toISOString().slice(0, 10),
  });

  const validateForm = () => {
    const newErrors = {};

    if (!formData.type) {
      newErrors.type = "Transaction type is required";
    }

    if (!formData.category) {
      newErrors.category = "Category is required";
    }

    if (!formData.amount || parseFloat(formData.amount) <= 0) {
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
    
    // Reset category when type changes
    if (name === "type") {
      setFormData({ 
        ...formData, 
        type: value,
        category: "" // Reset category when type changes
      });
    } else {
      setFormData({ ...formData, [name]: value });
    }

    // Clear error for this field
    if (errors[name]) {
      setErrors({ ...errors, [name]: "" });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      toast.error("Please fix the errors in the form");
      return;
    }

    setIsSubmitting(true);
    
    try {
      const res = await fetch(
        `https://finease-personal-finance-management.vercel.app/transactions/${transaction._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );
      const data = await res.json();

      if (res.ok) {
        toast.success("Transaction updated successfully!", {
          duration: 3000,
          icon: "✅",
        });
        onClose(true);
      } else {
        toast.error(data.message || "Failed to update transaction");
      }
    } catch (err) {
      console.error("Error updating transaction:", err);
      toast.error("Server error! Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const currentCategoryData = categoryData[formData.type] || categoryData.Income;
  const TypeIcon = currentCategoryData.icon;
  const colorClass = currentCategoryData.color;

  return (
    <div className="w-full">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Update Transaction</h1>
        <p className="text-gray-600 text-sm">Modify the details of your transaction</p>
      </div>

      <div className="space-y-5">
        {/* Transaction Type */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Transaction Type *
          </label>
          <div className="grid grid-cols-2 gap-3">
            {["Income", "Expense"].map((type) => {
              const isSelected = formData.type === type;
              const Icon = categoryData[type].icon;
              const color = categoryData[type].color;
              
              return (
                <button
                  key={type}
                  type="button"
                  onClick={() => handleChange({ target: { name: "type", value: type } })}
                  className={`relative p-4 rounded-xl border-2 transition-all ${
                    isSelected
                      ? color === "emerald" 
                        ? "border-emerald-500 bg-emerald-50"
                        : "border-rose-500 bg-rose-50"
                      : "border-gray-200 bg-white hover:border-gray-300"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-lg ${
                      isSelected 
                        ? color === "emerald" ? "bg-emerald-100" : "bg-rose-100"
                        : "bg-gray-100"
                    }`}>
                      <Icon className={
                        isSelected 
                          ? color === "emerald" ? "text-emerald-600" : "text-rose-600"
                          : "text-gray-600"
                      } size={20} />
                    </div>
                    <span className={`font-semibold ${
                      isSelected 
                        ? color === "emerald" ? "text-emerald-700" : "text-rose-700"
                        : "text-gray-700"
                    }`}>
                      {type}
                    </span>
                  </div>
                  {isSelected && (
                    <div className={`absolute top-2 right-2 w-2 h-2 rounded-full ${
                      color === "emerald" ? "bg-emerald-500" : "bg-rose-500"
                    }`}></div>
                  )}
                </button>
              );
            })}
          </div>
          {errors.type && (
            <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
              <AlertCircle size={14} />
              {errors.type}
            </p>
          )}
        </div>

        {/* Category */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            <div className="flex items-center gap-2">
              <Tag size={16} />
              Category *
            </div>
          </label>
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none focus:ring-2 ${
              colorClass === "emerald" 
                ? "focus:ring-emerald-500" 
                : "focus:ring-rose-500"
            } focus:border-transparent transition-all ${
              errors.category ? "border-red-300" : "border-gray-300"
            }`}
          >
            <option value="" disabled>
              Select a category
            </option>
            {currentCategoryData.categories.map((cat, index) => (
              <option key={index} value={cat}>
                {cat}
              </option>
            ))}
          </select>
          {errors.category && (
            <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
              <AlertCircle size={14} />
              {errors.category}
            </p>
          )}
        </div>

        {/* Amount */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            <div className="flex items-center gap-2">
              <DollarSign size={16} />
              Amount *
            </div>
          </label>
          <div className="relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 font-semibold">
              $
            </span>
            <input
              type="number"
              name="amount"
              value={formData.amount}
              onChange={handleChange}
              placeholder="0.00"
              step="0.01"
              min="0"
              className={`w-full pl-10 pr-4 py-3 border-2 rounded-xl focus:outline-none focus:ring-2 ${
                colorClass === "emerald" 
                  ? "focus:ring-emerald-500" 
                  : "focus:ring-rose-500"
              } focus:border-transparent transition-all ${
                errors.amount ? "border-red-300" : "border-gray-300"
              }`}
            />
          </div>
          {errors.amount && (
            <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
              <AlertCircle size={14} />
              {errors.amount}
            </p>
          )}
        </div>

        {/* Date */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            <div className="flex items-center gap-2">
              <Calendar size={16} />
              Date *
            </div>
          </label>
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            max={new Date().toISOString().split('T')[0]}
            className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none focus:ring-2 ${
              colorClass === "emerald" 
                ? "focus:ring-emerald-500" 
                : "focus:ring-rose-500"
            } focus:border-transparent transition-all ${
              errors.date ? "border-red-300" : "border-gray-300"
            }`}
          />
          {errors.date && (
            <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
              <AlertCircle size={14} />
              {errors.date}
            </p>
          )}
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            <div className="flex items-center gap-2">
              <FileText size={16} />
              Description (Optional)
            </div>
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Add notes about this transaction..."
            rows={3}
            className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none"
          />
          <p className="mt-1 text-xs text-gray-500">
            {formData.description.length}/200 characters
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3 pt-4 border-t border-gray-200">
          <button
            type="button"
            onClick={handleSubmit}
            disabled={isSubmitting}
            className={`flex-1 flex items-center justify-center gap-2 px-6 py-3 ${
              colorClass === "emerald"
                ? "bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700"
                : "bg-gradient-to-r from-rose-500 to-rose-600 hover:from-rose-600 hover:to-rose-700"
            } text-white rounded-xl transition-all font-semibold shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed`}
          >
            {isSubmitting ? (
              <>
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                Updating...
              </>
            ) : (
              <>
                <Save size={18} />
                Update Transaction
              </>
            )}
          </button>
          <button
            type="button"
            onClick={() => onClose(false)}
            disabled={isSubmitting}
            className="px-6 py-3 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition-all font-semibold border-2 border-gray-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
          >
            <X size={18} />
            Cancel
          </button>
        </div>
      </div>

      {/* Info Note */}
      <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-xl">
        <div className="flex items-start gap-3">
          <AlertCircle className="text-blue-600 flex-shrink-0 mt-0.5" size={18} />
          <div className="text-sm text-blue-800">
            <p className="font-medium mb-1">Update Tips:</p>
            <ul className="list-disc list-inside space-y-1 text-xs">
              <li>Changing the type will reset your category selection</li>
              <li>Make sure the amount is accurate to track your finances correctly</li>
              <li>You can't select future dates</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateTransaction;