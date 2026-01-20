
import React, { use, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import Swal from "sweetalert2";
import Loader from "../../../components/Loader";
import { AuthContext } from "../../../contexts/AuthContext";
import { motion, AnimatePresence } from "framer-motion";
import UpdateTransaction from "./UpdateTransaction";
import useTitle from "../../../Hooks/useTitle";
import {
  Calendar,
  DollarSign,
  Tag,
  FileText,
  ArrowLeft,
  Edit3,
  Trash2,
  TrendingUp,
  TrendingDown,
  Clock,
  BarChart3,
  X
} from "lucide-react";

const TransactionDetails = () => {
  useTitle("Transaction Details");
  const { id } = useParams();
  const { user } = use(AuthContext);
  const [transaction, setTransaction] = useState(null);
  const [categoryStats, setCategoryStats] = useState({ total: 0, count: 0, average: 0 });
  const [similarTransactions, setSimilarTransactions] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTransactions = async () => {
      if (!user || !id) return;

      setIsLoading(true);
      try {
        const res = await fetch(
          `https://finease-personal-finance-management.vercel.app/transactions/id/${id}`,
          {
            headers: { "Content-Type": "application/json" },
          }
        );
        const data = await res.json();
        setTransaction(data);

        // Fetch all user transactions for statistics
        const allRes = await fetch(
          `https://finease-personal-finance-management.vercel.app/transactions/${user.email}`,
          {
            headers: { "Content-Type": "application/json" },
          }
        );
        const allData = await allRes.json();
        calculateCategoryStats(allData, data.category, data.type);
        findSimilarTransactions(allData, data);
      } catch (err) {
        console.error("Error fetching transaction", err);
        Swal.fire("Error", "Failed to load transaction details", "error");
      } finally {
        setIsLoading(false);
      }
    };
    fetchTransactions();
  }, [user, id]);

  const calculateCategoryStats = (allTransactions, category, type) => {
    const sameCategoryTransactions = allTransactions.filter(
      (tx) => tx.category === category && tx.type === type
    );

    const total = sameCategoryTransactions.reduce(
      (sum, tx) => sum + parseFloat(tx.amount || 0),
      0
    );
    const count = sameCategoryTransactions.length;
    const average = count > 0 ? total / count : 0;

    setCategoryStats({ total, count, average });
  };

  const findSimilarTransactions = (allTransactions, currentTx) => {
    const similar = allTransactions
      .filter(
        (tx) =>
          tx._id !== currentTx._id &&
          tx.category === currentTx.category &&
          tx.type === currentTx.type
      )
      .sort((a, b) => new Date(b.date) - new Date(a.date))
      .slice(0, 3);

    setSimilarTransactions(similar);
  };

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "This transaction will be permanently deleted.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#EF4444",
      cancelButtonColor: "#6B7280",
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel",
    });

    if (result.isConfirmed) {
      try {
        const res = await fetch(
          `https://finease-personal-finance-management.vercel.app/transactions/${id}`,
          {
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
          }
        );
        const data = await res.json();
        if (data.deletedCount > 0) {
          Swal.fire({
            title: "Deleted!",
            text: "Transaction removed successfully",
            icon: "success",
            timer: 2000,
            showConfirmButton: false,
          });
          navigate("/transaction/my");
        }
      } catch (err) {
        console.error("Error deleting transaction", err);
        Swal.fire("Error", "Failed to delete transaction", "error");
      }
    }
  };

  const refreshTransaction = async () => {
    try {
      const res = await fetch(
        `https://finease-personal-finance-management.vercel.app/transactions/id/${id}`,
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      const data = await res.json();
      setTransaction(data);
    } catch (err) {
      console.error("Error refreshing transaction", err);
    }
  };

  if (isLoading) {
    return <Loader />;
  }

  if (!transaction) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
        <p className="text-gray-500 font-bold text-xl">No Transaction Found</p>
        <button
          onClick={() => navigate("/transaction/my")}
          className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          Back to Transactions
        </button>
      </div>
    );
  }

  const isIncome = transaction.type === "Income";
  const typeColor = isIncome ? "emerald" : "rose";
  const TypeIcon = isIncome ? TrendingUp : TrendingDown;

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* Back Button */}
      <motion.button
        onClick={() => navigate("/transaction/my")}
        className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6 transition-colors"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        whileHover={{ x: -5 }}
      >
        <ArrowLeft size={20} />
        <span className="font-medium">Back to Transactions</span>
      </motion.button>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Transaction Card */}
        <motion.div
          className="lg:col-span-2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <div className="bg-white rounded-2xl shadow-lg border-2 border-gray-200 overflow-hidden">
            {/* Header */}
            <div className={`bg-gradient-to-r from-${typeColor}-500 to-${typeColor}-600 p-6 text-white`}>
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-white/20 rounded-xl backdrop-blur-sm">
                    <TypeIcon size={28} />
                  </div>
                  <div>
                    <p className="text-sm opacity-90">Transaction Type</p>
                    <h1 className="text-2xl font-bold">{transaction.type}</h1>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm opacity-90">Amount</p>
                  <p className="text-3xl font-bold">${parseFloat(transaction.amount).toFixed(2)}</p>
                </div>
              </div>
              
              {/* Transaction ID */}
              <div className="flex items-center gap-2 text-sm bg-white/10 rounded-lg px-3 py-2 backdrop-blur-sm">
                <span className="opacity-80">ID:</span>
                <span className="font-mono">{transaction._id?.slice(-8)}</span>
              </div>
            </div>

            {/* Details Grid */}
            <div className="p-6 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Category */}
                <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-xl border border-gray-200">
                  <div className={`p-2 bg-${typeColor}-100 rounded-lg`}>
                    <Tag className={`text-${typeColor}-600`} size={20} />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-gray-600 mb-1">Category</p>
                    <p className="font-semibold text-gray-900">{transaction.category}</p>
                  </div>
                </div>

                {/* Date */}
                <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-xl border border-gray-200">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <Calendar className="text-blue-600" size={20} />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-gray-600 mb-1">Date</p>
                    <p className="font-semibold text-gray-900">
                      {new Date(transaction.date).toLocaleDateString('en-US', {
                        weekday: 'short',
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </p>
                  </div>
                </div>
              </div>

              {/* Description */}
              {transaction.description && (
                <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-xl border border-gray-200">
                  <div className="p-2 bg-purple-100 rounded-lg">
                    <FileText className="text-purple-600" size={20} />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-gray-600 mb-1">Description</p>
                    <p className="text-gray-900">{transaction.description}</p>
                  </div>
                </div>
              )}

              {/* Created At */}
              {transaction.createdAt && (
                <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-xl border border-gray-200">
                  <div className="p-2 bg-amber-100 rounded-lg">
                    <Clock className="text-amber-600" size={20} />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-gray-600 mb-1">Created At</p>
                    <p className="text-gray-900">
                      {new Date(transaction.createdAt).toLocaleString()}
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* Action Buttons */}
            <div className="px-6 pb-6 flex gap-3">
              <button
                onClick={() => setIsModalOpen(true)}
                className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors font-medium"
              >
                <Edit3 size={18} />
                Edit Transaction
              </button>
              <button
                onClick={() => handleDelete(transaction._id)}
                className="flex items-center justify-center gap-2 px-4 py-3 bg-red-50 text-red-600 rounded-xl hover:bg-red-100 transition-colors font-medium border-2 border-red-200"
              >
                <Trash2 size={18} />
                Delete
              </button>
            </div>
          </div>
        </motion.div>

        {/* Sidebar */}
        <motion.div
          className="lg:col-span-1 space-y-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
        >
          {/* Category Statistics */}
          <div className="bg-white rounded-2xl shadow-lg border-2 border-gray-200 p-6">
            <div className="flex items-center gap-2 mb-4">
              <BarChart3 className="text-blue-600" size={20} />
              <h2 className="text-lg font-semibold text-gray-900">Category Stats</h2>
            </div>
            <div className="space-y-3">
              <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                <span className="text-sm text-gray-600">Total Amount</span>
                <span className="font-bold text-gray-900">${categoryStats.total.toFixed(2)}</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                <span className="text-sm text-gray-600">Transaction Count</span>
                <span className="font-bold text-gray-900">{categoryStats.count}</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                <span className="text-sm text-gray-600">Average Amount</span>
                <span className="font-bold text-gray-900">${categoryStats.average.toFixed(2)}</span>
              </div>
            </div>
          </div>

          {/* Similar Transactions */}
          {similarTransactions.length > 0 && (
            <div className="bg-white rounded-2xl shadow-lg border-2 border-gray-200 p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Similar Transactions</h2>
              <div className="space-y-3">
                {similarTransactions.map((tx) => (
                  <div
                    key={tx._id}
                    onClick={() => navigate(`/transaction/${tx._id}`)}
                    className="p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer border border-gray-200"
                  >
                    <div className="flex justify-between items-start mb-1">
                      <span className="font-medium text-gray-900">${parseFloat(tx.amount).toFixed(2)}</span>
                      <span className="text-xs text-gray-500">
                        {new Date(tx.date).toLocaleDateString()}
                      </span>
                    </div>
                    {tx.description && (
                      <p className="text-xs text-gray-600 truncate">{tx.description}</p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </motion.div>
      </div>

      {/* Update Modal */}
      <AnimatePresence>
        {isModalOpen && transaction && (
          <motion.div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm flex justify-center items-center z-50 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsModalOpen(false)}
          >
            <motion.div
              className="bg-white rounded-2xl p-6 w-full max-w-md shadow-2xl relative max-h-[90vh] overflow-y-auto"
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setIsModalOpen(false)}
                className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X size={20} className="text-gray-600" />
              </button>
              <UpdateTransaction
                transaction={transaction}
                onClose={async (updated) => {
                  setIsModalOpen(false);
                  if (updated) {
                    await refreshTransaction();
                  }
                }}
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default TransactionDetails;