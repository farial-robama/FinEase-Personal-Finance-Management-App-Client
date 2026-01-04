
import React, { use, useEffect, useState } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import Swal from "sweetalert2";
import TransactionCard from "./TransactionCard";
import Loader from "../../components/Loader";
import { Navigate } from "react-router";
import UpdateTransaction from "./UpdateTransaction";
import useTitle from "../../Hooks/useTitle";
import {
  Filter,
  SortAsc,
  SortDesc,
  Calendar,
  DollarSign,
  TrendingUp,
  TrendingDown,
  Search,
  FileText,
  AlertCircle,
  RefreshCw,
} from "lucide-react";

const MyTransactions = () => {
  useTitle("My Transactions");
  const { user, loading } = use(AuthContext);
  const [transactions, setTransactions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTransaction, setSelectedTransaction] = useState(null);
  const [sortOrder, setSortOrder] = useState("date-desc");
  const [filterType, setFilterType] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTransactions = async () => {
      if (!user) return;
      setIsLoading(true);
      setError(null);

      try {
        const res = await fetch(
          `https://finease-personal-finance-management.vercel.app/transactions/${user.email}`,
          {
            headers: { "Content-Type": "application/json" },
          }
        );

        if (!res.ok) {
          throw new Error("Failed to fetch transactions");
        }

        const data = await res.json();
        const transactionsArray = Array.isArray(data)
          ? data
          : data?.transactions || [];

        setTransactions(transactionsArray);
      } catch (err) {
        console.error("Error fetching transactions:", err);
        setError("Failed to load transactions. Please try again.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchTransactions();
  }, [user]);

  if (loading) {
    return <Loader />;
  }

  if (!user) {
    return <Navigate to="/auth/login" replace />;
  }

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "This transaction will be permanently deleted.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#8b5cf6",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel",
    });

    if (result.isConfirmed) {
      try {
        const res = await fetch(
          `https://finease-personal-finance-management.vercel.app/transactions/${id}`,
          {
            method: "DELETE",
          }
        );
        const data = await res.json();

        if (data.deletedCount > 0) {
          Swal.fire({
            title: "Deleted!",
            text: "Transaction removed successfully",
            icon: "success",
            confirmButtonColor: "#8b5cf6",
          });
          setTransactions(transactions.filter((t) => t._id !== id));
        }
      } catch (err) {
        console.error("Error deleting transaction:", err);
        Swal.fire({
          title: "Error!",
          text: "Failed to delete transaction",
          icon: "error",
          confirmButtonColor: "#8b5cf6",
        });
      }
    }
  };

  const handleUpdate = (transaction) => {
    setSelectedTransaction(transaction);
    setIsModalOpen(true);
  };

  const handleRefresh = () => {
    setIsLoading(true);
    setError(null);
    // Re-fetch by toggling a dependency
    const fetchTransactions = async () => {
      try {
        const res = await fetch(
          `https://finease-personal-finance-management.vercel.app/transactions/${user.email}`,
          {
            headers: { "Content-Type": "application/json" },
          }
        );

        if (!res.ok) {
          throw new Error("Failed to fetch transactions");
        }

        const data = await res.json();
        const transactionsArray = Array.isArray(data)
          ? data
          : data?.transactions || [];

        setTransactions(transactionsArray);
      } catch (err) {
        console.error("Error fetching transactions:", err);
        setError("Failed to load transactions. Please try again.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchTransactions();
  };

  // Filter transactions
  const filteredTransactions = transactions.filter((transaction) => {
    const matchesType =
      filterType === "all" || transaction.type === filterType;
    const matchesSearch =
      searchQuery === "" ||
      transaction.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      transaction.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      transaction.amount.toString().includes(searchQuery);

    return matchesType && matchesSearch;
  });

  // Sort transactions
  const sortedTransactions = [...filteredTransactions].sort((a, b) => {
    if (sortOrder === "date-asc") {
      return new Date(a.date) - new Date(b.date);
    } else if (sortOrder === "date-desc") {
      return new Date(b.date) - new Date(a.date);
    } else if (sortOrder === "amount-asc") {
      return a.amount - b.amount;
    } else if (sortOrder === "amount-desc") {
      return b.amount - a.amount;
    }
    return 0;
  });

  // Calculate summary stats
  const totalIncome = transactions
    .filter((t) => t.type === "Income")
    .reduce((sum, t) => sum + parseFloat(t.amount), 0);

  const totalExpense = transactions
    .filter((t) => t.type === "Expense")
    .reduce((sum, t) => sum + parseFloat(t.amount), 0);

  const balance = totalIncome - totalExpense;

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-800 mb-2">
                My Transactions
              </h1>
              <p className="text-gray-600">
                Track and manage all your financial transactions
              </p>
            </div>
            <button
              onClick={handleRefresh}
              className="flex items-center gap-2 px-4 py-2 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow"
            >
              <RefreshCw className="w-4 h-4" />
              Refresh
            </button>
          </div>

          {/* Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl p-6 text-white shadow-lg">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm opacity-90">Total Income</span>
                <TrendingUp className="w-5 h-5" />
              </div>
              <p className="text-3xl font-bold">${totalIncome.toFixed(2)}</p>
            </div>

            <div className="bg-gradient-to-br from-red-500 to-pink-600 rounded-xl p-6 text-white shadow-lg">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm opacity-90">Total Expense</span>
                <TrendingDown className="w-5 h-5" />
              </div>
              <p className="text-3xl font-bold">${totalExpense.toFixed(2)}</p>
            </div>

            <div className="bg-gradient-to-br from-purple-600 to-blue-600 rounded-xl p-6 text-white shadow-lg">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm opacity-90">Balance</span>
                <DollarSign className="w-5 h-5" />
              </div>
              <p className="text-3xl font-bold">${balance.toFixed(2)}</p>
            </div>
          </div>
        </div>

        {/* Filters and Search Section */}
        <div className="bg-white rounded-xl shadow-md p-6 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search transactions..."
                className="w-full pl-10 pr-4 py-2 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-purple-500"
              />
            </div>

            {/* Type Filter */}
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="px-4 py-2 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-purple-500"
            >
              <option value="all">All Types</option>
              <option value="Income">Income Only</option>
              <option value="Expense">Expense Only</option>
            </select>

            {/* Sort Options */}
            <select
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value)}
              className="px-4 py-2 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-purple-500"
            >
              <option value="date-desc">Newest First</option>
              <option value="date-asc">Oldest First</option>
              <option value="amount-desc">Highest Amount</option>
              <option value="amount-asc">Lowest Amount</option>
            </select>
          </div>

          {/* Active Filters Info */}
          <div className="mt-4 flex items-center justify-between text-sm">
            <span className="text-gray-600">
              Showing {sortedTransactions.length} of {transactions.length}{" "}
              transactions
            </span>
            {(filterType !== "all" || searchQuery !== "") && (
              <button
                onClick={() => {
                  setFilterType("all");
                  setSearchQuery("");
                }}
                className="text-purple-600 hover:text-purple-700 font-semibold"
              >
                Clear Filters
              </button>
            )}
          </div>
        </div>

        {/* Transactions List */}
        {error && (
          <div className="bg-red-50 border-2 border-red-200 rounded-xl p-4 mb-6 flex items-center gap-3">
            <AlertCircle className="w-6 h-6 text-red-600 flex-shrink-0" />
            <div>
              <p className="text-red-800 font-semibold">{error}</p>
              <button
                onClick={handleRefresh}
                className="text-red-600 hover:text-red-700 text-sm underline mt-1"
              >
                Try again
              </button>
            </div>
          </div>
        )}

        {isLoading ? (
          <Loader />
        ) : sortedTransactions.length === 0 ? (
          <div className="bg-white rounded-xl shadow-md p-12 text-center">
            <FileText className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-gray-800 mb-2">
              {transactions.length === 0
                ? "No transactions yet"
                : "No matching transactions"}
            </h3>
            <p className="text-gray-600 mb-6">
              {transactions.length === 0
                ? "Start by adding your first transaction to track your finances"
                : "Try adjusting your filters or search query"}
            </p>
            {transactions.length === 0 && (
              <a
                href="/transaction"
                className="inline-block bg-gradient-to-r from-purple-600 to-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:shadow-lg transition-all"
              >
                Add Transaction
              </a>
            )}
          </div>
        ) : (
          <div className="space-y-4">
            {sortedTransactions.map((transaction) => (
              <TransactionCard
                key={transaction._id}
                transaction={transaction}
                onDelete={handleDelete}
                onUpdate={handleUpdate}
              />
            ))}
          </div>
        )}

        {/* Update Modal */}
        {isModalOpen && selectedTransaction && (
          <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex justify-center items-center z-50 p-4">
            <div className="bg-white rounded-2xl w-full max-w-2xl shadow-2xl max-h-[90vh] overflow-y-auto">
              <UpdateTransaction
                transaction={selectedTransaction}
                onClose={async (updated) => {
                  setIsModalOpen(false);
                  if (updated) {
                    // Refresh the specific transaction
                    try {
                      const res = await fetch(
                        `https://finease-personal-finance-management.vercel.app/transactions/id/${selectedTransaction._id}`
                      );
                      const data = await res.json();
                      
                      // Update the transaction in the list
                      setTransactions((prev) =>
                        prev.map((t) =>
                          t._id === selectedTransaction._id ? data : t
                        )
                      );
                      setSelectedTransaction(null);
                    } catch (err) {
                      console.error("Error fetching updated transaction:", err);
                      // Refresh all transactions as fallback
                      handleRefresh();
                    }
                  }
                }}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyTransactions;