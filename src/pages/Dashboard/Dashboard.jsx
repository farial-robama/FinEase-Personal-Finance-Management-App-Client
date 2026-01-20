// import React, { useContext, useEffect, useState } from "react";
// import { Link } from "react-router";
// import {
//   TrendingUp,
//   TrendingDown,
//   Wallet,
//   Plus,
//   ArrowUpRight,
//   DollarSign,
//   Calendar,
//   Activity,
//   AlertCircle,
//   RefreshCw,
//   CheckCircle,
//   Eye,
//   Edit,
//   Trash2,
// } from "lucide-react";

// // Mock AuthContext
// const AuthContext = React.createContext({
//   user: { email: "demo@finease.com", displayName: "Demo User" }
// });

// const Dashboard = () => {
//   const { user } = useContext(AuthContext);
//   const [stats, setStats] = useState({
//     totalIncome: 0,
//     totalExpense: 0,
//     balance: 0,
//     transactionCount: 0,
//   });
//   const [recentTransactions, setRecentTransactions] = useState([]);
//   const [monthlyData, setMonthlyData] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [categoryBreakdown, setCategoryBreakdown] = useState({
//     income: [],
//     expense: [],
//   });

//   useEffect(() => {
//     fetchDashboardData();
//   }, [user]);

//   const fetchDashboardData = async () => {
//     try {
//       setLoading(true);
//       setError(null);

//       const response = await fetch(
//         `https://finease-personal-finance-management.vercel.app/transactions/${user.email}`,
//         {
//           headers: { "Content-Type": "application/json" },
//         }
//       );
      
//       if (!response.ok) {
//         throw new Error("Failed to fetch transactions");
//       }

//       const transactions = await response.json();
//       const transactionsArray = Array.isArray(transactions) ? transactions : [];

//       // Calculate stats
//       const income = transactionsArray
//         .filter((t) => t.type === "Income")
//         .reduce((sum, t) => sum + parseFloat(t.amount || 0), 0);

//       const expense = transactionsArray
//         .filter((t) => t.type === "Expense")
//         .reduce((sum, t) => sum + parseFloat(t.amount || 0), 0);

//       setStats({
//         totalIncome: income,
//         totalExpense: expense,
//         balance: income - expense,
//         transactionCount: transactionsArray.length,
//       });

//       // Get recent 5 transactions
//       const sorted = transactionsArray
//         .sort((a, b) => new Date(b.createdAt || b.date) - new Date(a.createdAt || a.date))
//         .slice(0, 5);
//       setRecentTransactions(sorted);

//       // Prepare monthly data for chart
//       const monthlyStats = prepareMonthlyData(transactionsArray);
//       setMonthlyData(monthlyStats);

//       // Category breakdown
//       const incomeByCategory = transactionsArray
//         .filter((t) => t.type === "Income")
//         .reduce((acc, t) => {
//           acc[t.category] = (acc[t.category] || 0) + parseFloat(t.amount || 0);
//           return acc;
//         }, {});

//       const expenseByCategory = transactionsArray
//         .filter((t) => t.type === "Expense")
//         .reduce((acc, t) => {
//           acc[t.category] = (acc[t.category] || 0) + parseFloat(t.amount || 0);
//           return acc;
//         }, {});

//       setCategoryBreakdown({
//         income: Object.entries(incomeByCategory)
//           .map(([category, amount]) => ({ category, amount }))
//           .sort((a, b) => b.amount - a.amount)
//           .slice(0, 5),
//         expense: Object.entries(expenseByCategory)
//           .map(([category, amount]) => ({ category, amount }))
//           .sort((a, b) => b.amount - a.amount)
//           .slice(0, 5),
//       });
//     } catch (error) {
//       console.error("Error fetching dashboard data:", error);
//       setError("Failed to load dashboard data. Please try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const prepareMonthlyData = (transactions) => {
//     const last6Months = [];
//     const now = new Date();
    
//     for (let i = 5; i >= 0; i--) {
//       const date = new Date(now.getFullYear(), now.getMonth() - i, 1);
//       const monthName = date.toLocaleDateString("en-US", { month: "short" });
      
//       const monthTransactions = transactions.filter((t) => {
//         const transDate = new Date(t.createdAt || t.date);
//         return (
//           transDate.getMonth() === date.getMonth() &&
//           transDate.getFullYear() === date.getFullYear()
//         );
//       });

//       const income = monthTransactions
//         .filter((t) => t.type === "Income")
//         .reduce((sum, t) => sum + parseFloat(t.amount || 0), 0);

//       const expense = monthTransactions
//         .filter((t) => t.type === "Expense")
//         .reduce((sum, t) => sum + parseFloat(t.amount || 0), 0);

//       last6Months.push({
//         month: monthName,
//         income: income,
//         expense: expense,
//       });
//     }

//     return last6Months;
//   };

//   const formatCurrency = (amount) => {
//     return new Intl.NumberFormat("en-US", {
//       style: "currency",
//       currency: "USD",
//       minimumFractionDigits: 2,
//       maximumFractionDigits: 2,
//     }).format(amount);
//   };

//   const formatDate = (dateString) => {
//     const date = new Date(dateString);
//     return date.toLocaleDateString("en-US", {
//       month: "short",
//       day: "numeric",
//     });
//   };

//   const calculatePercentage = (amount, total) => {
//     if (total === 0) return 0;
//     return ((amount / total) * 100).toFixed(1);
//   };

//   const getMaxAmount = () => {
//     const amounts = monthlyData.flatMap(d => [d.income, d.expense]);
//     return Math.max(...amounts, 1000);
//   };

//   if (loading) {
//     return (
//       <div className="flex items-center justify-center min-h-[400px]">
//         <div className="text-center">
//           <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-green-500 mx-auto mb-4"></div>
//           <p className="text-gray-600 font-semibold">Loading dashboard...</p>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="space-y-6">
//       {/* Header */}
//       <div className="flex items-center justify-between">
//         <div>
//           <h1 className="text-3xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
//             Welcome back, {user?.displayName || "User"}! 👋
//           </h1>
//           <p className="text-gray-600 mt-1 flex items-center gap-2">
//             <Calendar className="w-4 h-4" />
//             {new Date().toLocaleDateString("en-US", { 
//               weekday: "long", 
//               year: "numeric", 
//               month: "long", 
//               day: "numeric" 
//             })}
//           </p>
//         </div>
//         <button
//           onClick={fetchDashboardData}
//           className="flex items-center gap-2 px-4 py-2 bg-white rounded-lg shadow-sm hover:shadow-md transition-all border border-gray-200"
//         >
//           <RefreshCw className="w-4 h-4" />
//           <span className="hidden sm:inline">Refresh</span>
//         </button>
//       </div>

//       {/* Error Message */}
//       {error && (
//         <div className="bg-red-50 border-2 border-red-200 rounded-xl p-4 flex items-center gap-3">
//           <AlertCircle className="w-6 h-6 text-red-600 flex-shrink-0" />
//           <div className="flex-1">
//             <p className="text-red-800 font-semibold">{error}</p>
//           </div>
//           <button
//             onClick={fetchDashboardData}
//             className="text-red-600 hover:text-red-700 font-semibold text-sm"
//           >
//             Retry
//           </button>
//         </div>
//       )}

//       {/* Overview Cards */}
//       <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//         <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-green-500 hover:shadow-lg transition-all">
//           <div className="flex items-center justify-between mb-4">
//             <div className="p-3 bg-green-100 rounded-lg">
//               <TrendingUp className="w-6 h-6 text-green-600" />
//             </div>
//             <CheckCircle className="w-5 h-5 text-green-500" />
//           </div>
//           <p className="text-sm text-gray-600 font-semibold uppercase tracking-wide">
//             Total Income
//           </p>
//           <p className="text-3xl font-bold text-gray-800 mt-2">
//             {formatCurrency(stats.totalIncome)}
//           </p>
//           <p className="text-xs text-green-600 mt-2">All-time earnings</p>
//         </div>

//         <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-red-500 hover:shadow-lg transition-all">
//           <div className="flex items-center justify-between mb-4">
//             <div className="p-3 bg-red-100 rounded-lg">
//               <TrendingDown className="w-6 h-6 text-red-600" />
//             </div>
//             <Activity className="w-5 h-5 text-red-500" />
//           </div>
//           <p className="text-sm text-gray-600 font-semibold uppercase tracking-wide">
//             Total Expense
//           </p>
//           <p className="text-3xl font-bold text-gray-800 mt-2">
//             {formatCurrency(stats.totalExpense)}
//           </p>
//           <p className="text-xs text-red-600 mt-2">
//             {stats.totalIncome > 0 
//               ? `${calculatePercentage(stats.totalExpense, stats.totalIncome)}% of income`
//               : "No income recorded"}
//           </p>
//         </div>

//         <div className="bg-gradient-to-br from-green-400 to-blue-500 rounded-xl shadow-md p-6 hover:shadow-lg transition-all text-white">
//           <div className="flex items-center justify-between mb-4">
//             <div className="p-3 bg-white/20 rounded-lg backdrop-blur-sm">
//               <Wallet className="w-6 h-6 text-white" />
//             </div>
//             <DollarSign className="w-5 h-5 text-white" />
//           </div>
//           <p className="text-sm font-semibold uppercase tracking-wide opacity-90">
//             Current Balance
//           </p>
//           <p className="text-3xl font-bold mt-2">
//             {formatCurrency(Math.abs(stats.balance))}
//           </p>
//           <p className="text-xs mt-2 opacity-90">
//             {stats.transactionCount} transaction{stats.transactionCount !== 1 ? 's' : ''}
//           </p>
//         </div>
//       </div>

//       {/* Charts Section */}
//       <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
//         {/* Monthly Trends Chart */}
//         <div className="bg-white rounded-xl shadow-md p-6">
//           <h3 className="text-xl font-bold text-gray-800 mb-6">
//             Monthly Trends (Last 6 Months)
//           </h3>
//           <div className="space-y-4">
//             {monthlyData.map((data, index) => {
//               const maxAmount = getMaxAmount();
//               const incomeWidth = (data.income / maxAmount) * 100;
//               const expenseWidth = (data.expense / maxAmount) * 100;

//               return (
//                 <div key={index}>
//                   <div className="flex items-center justify-between mb-2">
//                     <span className="text-sm font-semibold text-gray-700 w-12">
//                       {data.month}
//                     </span>
//                     <div className="flex-1 mx-4">
//                       <div className="space-y-1">
//                         <div className="flex items-center gap-2">
//                           <div className="w-full bg-gray-100 rounded-full h-4">
//                             <div
//                               className="bg-gradient-to-r from-green-400 to-green-500 h-4 rounded-full transition-all duration-500"
//                               style={{ width: `${incomeWidth}%` }}
//                             />
//                           </div>
//                           <span className="text-xs font-semibold text-green-600 w-20 text-right">
//                             {formatCurrency(data.income)}
//                           </span>
//                         </div>
//                         <div className="flex items-center gap-2">
//                           <div className="w-full bg-gray-100 rounded-full h-4">
//                             <div
//                               className="bg-gradient-to-r from-red-400 to-red-500 h-4 rounded-full transition-all duration-500"
//                               style={{ width: `${expenseWidth}%` }}
//                             />
//                           </div>
//                           <span className="text-xs font-semibold text-red-600 w-20 text-right">
//                             {formatCurrency(data.expense)}
//                           </span>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               );
//             })}
//           </div>
//           <div className="flex items-center justify-center gap-6 mt-6 pt-4 border-t border-gray-200">
//             <div className="flex items-center gap-2">
//               <div className="w-4 h-4 bg-gradient-to-r from-green-400 to-green-500 rounded"></div>
//               <span className="text-sm text-gray-600">Income</span>
//             </div>
//             <div className="flex items-center gap-2">
//               <div className="w-4 h-4 bg-gradient-to-r from-red-400 to-red-500 rounded"></div>
//               <span className="text-sm text-gray-600">Expense</span>
//             </div>
//           </div>
//         </div>

//         {/* Category Breakdown */}
//         <div className="bg-white rounded-xl shadow-md p-6">
//           <h3 className="text-xl font-bold text-gray-800 mb-6">
//             Top Categories
//           </h3>
          
//           {/* Top Expenses */}
//           <div className="mb-6">
//             <h4 className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
//               <TrendingDown className="w-4 h-4 text-red-600" />
//               Top Expenses
//             </h4>
//             {categoryBreakdown.expense.length === 0 ? (
//               <p className="text-sm text-gray-500 py-2">No expenses yet</p>
//             ) : (
//               <div className="space-y-2">
//                 {categoryBreakdown.expense.map((item, index) => (
//                   <div key={index} className="flex items-center justify-between">
//                     <div className="flex items-center gap-3 flex-1">
//                       <span className="text-xs font-bold text-gray-400 w-4">
//                         #{index + 1}
//                       </span>
//                       <span className="text-sm font-medium text-gray-700">
//                         {item.category}
//                       </span>
//                     </div>
//                     <div className="flex items-center gap-3">
//                       <div className="w-32 bg-gray-100 rounded-full h-2">
//                         <div
//                           className="bg-red-500 h-2 rounded-full"
//                           style={{
//                             width: `${calculatePercentage(item.amount, stats.totalExpense)}%`,
//                           }}
//                         />
//                       </div>
//                       <span className="text-sm font-bold text-red-600 w-20 text-right">
//                         {formatCurrency(item.amount)}
//                       </span>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             )}
//           </div>

//           {/* Top Income */}
//           <div>
//             <h4 className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
//               <TrendingUp className="w-4 h-4 text-green-600" />
//               Top Income Sources
//             </h4>
//             {categoryBreakdown.income.length === 0 ? (
//               <p className="text-sm text-gray-500 py-2">No income yet</p>
//             ) : (
//               <div className="space-y-2">
//                 {categoryBreakdown.income.map((item, index) => (
//                   <div key={index} className="flex items-center justify-between">
//                     <div className="flex items-center gap-3 flex-1">
//                       <span className="text-xs font-bold text-gray-400 w-4">
//                         #{index + 1}
//                       </span>
//                       <span className="text-sm font-medium text-gray-700">
//                         {item.category}
//                       </span>
//                     </div>
//                     <div className="flex items-center gap-3">
//                       <div className="w-32 bg-gray-100 rounded-full h-2">
//                         <div
//                           className="bg-green-500 h-2 rounded-full"
//                           style={{
//                             width: `${calculatePercentage(item.amount, stats.totalIncome)}%`,
//                           }}
//                         />
//                       </div>
//                       <span className="text-sm font-bold text-green-600 w-20 text-right">
//                         {formatCurrency(item.amount)}
//                       </span>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             )}
//           </div>
//         </div>
//       </div>

//       {/* Recent Transactions Table */}
//       <div className="bg-white rounded-xl shadow-md overflow-hidden">
//         <div className="p-6 border-b border-gray-200">
//           <div className="flex items-center justify-between">
//             <h3 className="text-xl font-bold text-gray-800">
//               Recent Transactions
//             </h3>
//             <Link
//               to="/dashboard/transactions/my"
//               className="text-blue-600 hover:text-blue-700 font-semibold text-sm flex items-center gap-1"
//             >
//               View All
//               <ArrowUpRight className="w-4 h-4" />
//             </Link>
//           </div>
//         </div>

//         {recentTransactions.length === 0 ? (
//           <div className="p-12 text-center">
//             <Activity className="w-16 h-16 text-gray-300 mx-auto mb-4" />
//             <p className="text-gray-600 font-semibold mb-2">No transactions yet</p>
//             <p className="text-gray-500 text-sm mb-4">
//               Start tracking your finances
//             </p>
//             <Link
//               to="/dashboard/transactions/add"
//               className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-green-400 to-blue-500 text-white rounded-lg font-semibold hover:shadow-lg transition-all"
//             >
//               <Plus className="w-4 h-4" />
//               Add Transaction
//             </Link>
//           </div>
//         ) : (
//           <div className="overflow-x-auto">
//             <table className="w-full">
//               <thead className="bg-gray-50">
//                 <tr>
//                   <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
//                     Date
//                   </th>
//                   <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
//                     Category
//                   </th>
//                   <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
//                     Description
//                   </th>
//                   <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
//                     Type
//                   </th>
//                   <th className="px-6 py-3 text-right text-xs font-semibold text-gray-600 uppercase tracking-wider">
//                     Amount
//                   </th>
//                 </tr>
//               </thead>
//               <tbody className="divide-y divide-gray-200">
//                 {recentTransactions.map((transaction) => (
//                   <tr key={transaction._id} className="hover:bg-gray-50 transition-colors">
//                     <td className="px-6 py-4 whitespace-nowrap">
//                       <span className="text-sm text-gray-600">
//                         {formatDate(transaction.createdAt || transaction.date)}
//                       </span>
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap">
//                       <span className="text-sm font-medium text-gray-800">
//                         {transaction.category}
//                       </span>
//                     </td>
//                     <td className="px-6 py-4">
//                       <span className="text-sm text-gray-600">
//                         {transaction.description || "No description"}
//                       </span>
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap">
//                       <span
//                         className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold ${
//                           transaction.type === "Income"
//                             ? "bg-green-100 text-green-800"
//                             : "bg-red-100 text-red-800"
//                         }`}
//                       >
//                         {transaction.type === "Income" ? (
//                           <TrendingUp className="w-3 h-3 mr-1" />
//                         ) : (
//                           <TrendingDown className="w-3 h-3 mr-1" />
//                         )}
//                         {transaction.type}
//                       </span>
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap text-right">
//                       <span
//                         className={`text-sm font-bold ${
//                           transaction.type === "Income"
//                             ? "text-green-600"
//                             : "text-red-600"
//                         }`}
//                       >
//                         {transaction.type === "Income" ? "+" : "-"}
//                         {formatCurrency(transaction.amount)}
//                       </span>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         )}
//       </div>

//       {/* Quick Action */}
//       <div className="bg-gradient-to-r from-green-400 to-blue-500 rounded-xl p-8 text-center text-white shadow-lg">
//         <h3 className="text-2xl font-bold mb-2">Ready to add more?</h3>
//         <p className="mb-6 opacity-90">Keep your finances up to date</p>
//         <Link
//           to="/dashboard/transactions/add"
//           className="inline-flex items-center gap-2 bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:shadow-xl transition-all transform hover:scale-105"
//         >
//           <Plus className="w-5 h-5" />
//           Add New Transaction
//         </Link>
//       </div>
//     </div>
//   );
// };

// export default Dashboard;


import React, { use, useState, useEffect } from 'react';
import { Link } from 'react-router';
import { AuthContext } from '../../contexts/AuthContext';
import { 
  TrendingUp, 
  TrendingDown, 
  Wallet, 
  ArrowRight, 
  Calendar,
  DollarSign,
  PieChart,
  CreditCard
} from 'lucide-react';


const Dashboard = () => {
  const { user } = use(AuthContext);
  const [transactions, setTransactions] = useState([]);
  const [summary, setSummary] = useState({ income: 0, expense: 0, balance: 0 });
  const [recentTransactions, setRecentTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [monthlyComparison, setMonthlyComparison] = useState({ current: 0, previous: 0 });

  useEffect(() => {
    if (!user?.email) {
      setLoading(false); 
      return;
    }
    
    setLoading(true);
    fetch(`https://finease-personal-finance-management.vercel.app/transactions/${user.email}`)
      .then((res) => res.json())
      .then((data) => {
        setTransactions(data);
        calculateSummary(data);
        getRecentTransactions(data);
        calculateMonthlyComparison(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error:", err);
        setLoading(false);
      });
  }, [user]);

  const calculateSummary = (data) => {
    const income = data
      .filter((t) => t.type === "Income")
      .reduce((acc, curr) => acc + parseFloat(curr.amount || 0), 0);

    const expense = data
      .filter((t) => t.type === "Expense")
      .reduce((acc, curr) => acc + parseFloat(curr.amount || 0), 0);
    
    const balance = income - expense;
    setSummary({ income, expense, balance });
  };

  const getRecentTransactions = (data) => {
    const sorted = [...data].sort((a, b) => {
      const dateA = new Date(a.date || a.createdAt);
      const dateB = new Date(b.date || b.createdAt);
      return dateB - dateA;
    });
    setRecentTransactions(sorted.slice(0, 5));
  };

  const calculateMonthlyComparison = (data) => {
    const now = new Date();
    const currentMonth = now.getMonth();
    const currentYear = now.getFullYear();

    const currentMonthBalance = data
      .filter((t) => {
        const txDate = new Date(t.date || t.createdAt);
        return txDate.getMonth() === currentMonth && txDate.getFullYear() === currentYear;
      })
      .reduce((acc, curr) => {
        const amount = parseFloat(curr.amount || 0);
        return curr.type === "Income" ? acc + amount : acc - amount;
      }, 0);

    const previousMonthBalance = data
      .filter((t) => {
        const txDate = new Date(t.date || t.createdAt);
        const prevMonth = currentMonth === 0 ? 11 : currentMonth - 1;
        const prevYear = currentMonth === 0 ? currentYear - 1 : currentYear;
        return txDate.getMonth() === prevMonth && txDate.getFullYear() === prevYear;
      })
      .reduce((acc, curr) => {
        const amount = parseFloat(curr.amount || 0);
        return curr.type === "Income" ? acc + amount : acc - amount;
      }, 0);

    setMonthlyComparison({ current: currentMonthBalance, previous: previousMonthBalance });
  };

  const calculatePercentageChange = () => {
    if (monthlyComparison.previous === 0) return 0;
    return ((monthlyComparison.current - monthlyComparison.previous) / Math.abs(monthlyComparison.previous)) * 100;
  };

  const percentageChange = calculatePercentageChange();
  const isPositiveChange = percentageChange >= 0;

  const cards = [
    {
      title: "Total Income",
      value: summary.income,
      icon: TrendingUp,
      color: "from-emerald-500 to-teal-600",
      bgColor: "bg-emerald-50",
      iconColor: "text-emerald-600",
      borderColor: "border-emerald-200"
    },
    {
      title: "Total Expense",
      value: summary.expense,
      icon: TrendingDown,
      color: "from-rose-500 to-pink-600",
      bgColor: "bg-rose-50",
      iconColor: "text-rose-600",
      borderColor: "border-rose-200"
    },
    {
      title: "Net Balance",
      value: summary.balance,
      icon: Wallet,
      color: summary.balance >= 0 ? "from-blue-500 to-indigo-600" : "from-orange-500 to-red-600",
      bgColor: summary.balance >= 0 ? "bg-blue-50" : "bg-orange-50",
      iconColor: summary.balance >= 0 ? "text-blue-600" : "text-orange-600",
      borderColor: summary.balance >= 0 ? "border-blue-200" : "border-orange-200"
    }
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="w-12 h-12 border-4  border-indigo-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading overview...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 min-h-screen bg-gradient-to-br from-purple-50 to-blue-50">
      {/* Header with Monthly Comparison */}
      <div className="mb-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-4">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">Financial Overview</h2>
            <p className="text-gray-600 flex items-center gap-2">
              <Calendar size={18} />
              {new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
            </p>
          </div>
          
          {monthlyComparison.current !== 0 && (
            <div className={`px-4 py-3 rounded-xl ${isPositiveChange ? 'bg-green-100' : 'bg-red-100'} border ${isPositiveChange ? 'border-green-300' : 'border-red-300'}`}>
              <div className="flex items-center gap-2">
                {isPositiveChange ? (
                  <TrendingUp className="text-green-700" size={20} />
                ) : (
                  <TrendingDown className="text-red-700" size={20} />
                )}
                <div>
                  <p className={`text-sm font-medium ${isPositiveChange ? 'text-green-700' : 'text-red-700'}`}>
                    {isPositiveChange ? '+' : ''}{percentageChange.toFixed(1)}% vs last month
                  </p>
                  <p className={`text-xs ${isPositiveChange ? 'text-green-600' : 'text-red-600'}`}>
                    ${Math.abs(monthlyComparison.current - monthlyComparison.previous).toFixed(2)}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {cards.map((card, index) => {
          const Icon = card.icon;
          return (
            <div
              key={index}
              className={`relative overflow-hidden rounded-2xl bg-white border-2 ${card.borderColor} shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1`}
            >
              {/* Background gradient effect */}
              <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${card.color} opacity-10 rounded-full -mr-16 -mt-16`}></div>
              
              <div className="relative p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className={`p-3 rounded-xl ${card.bgColor}`}>
                    <Icon className={card.iconColor} size={24} />
                  </div>
                  <DollarSign className="text-gray-400" size={20} />
                </div>
                
                <h3 className="text-sm font-medium text-gray-600 mb-1">{card.title}</h3>
                <p className="text-3xl font-bold text-gray-900">${card.value.toFixed(2)}</p>
                
                {/* Mini progress bar */}
                <div className="mt-4 h-1 bg-gray-200 rounded-full overflow-hidden">
                  <div 
                    className={`h-full bg-gradient-to-r ${card.color} transition-all duration-1000`}
                    style={{ width: '75%' }}
                  ></div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Quick Stats & Recent Transactions */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* Quick Stats */}
        <div className="lg:col-span-1 bg-gradient-to-br from-purple-50 to-indigo-50 rounded-2xl p-6 border-2 border-purple-200">
          <div className="flex items-center gap-2 mb-4">
            <PieChart className="text-purple-600" size={20} />
            <h3 className="text-lg font-semibold text-gray-900">Quick Stats</h3>
          </div>
          
          <div className="space-y-4">
            <div className="flex justify-between items-center p-3 bg-white rounded-lg">
              <span className="text-sm text-gray-600">Total Transactions</span>
              <span className="font-bold text-gray-900">{transactions.length}</span>
            </div>
            
            <div className="flex justify-between items-center p-3 bg-white rounded-lg">
              <span className="text-sm text-gray-600">Avg. Transaction</span>
              <span className="font-bold text-gray-900">
                ${transactions.length > 0 ? ((summary.income + summary.expense) / transactions.length).toFixed(2) : '0.00'}
              </span>
            </div>
            
            <div className="flex justify-between items-center p-3 bg-white rounded-lg">
              <span className="text-sm text-gray-600">Savings Rate</span>
              <span className={`font-bold ${summary.income > 0 ? 'text-green-600' : 'text-gray-900'}`}>
                {summary.income > 0 ? ((summary.balance / summary.income) * 100).toFixed(1) : '0.0'}%
              </span>
            </div>
          </div>
        </div>

        {/* Recent Transactions */}
        <div className="lg:col-span-2 bg-white rounded-2xl p-6 border-2 border-gray-200 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <CreditCard className="text-blue-600" size={20} />
              <h3 className="text-lg font-semibold text-gray-900">Recent Transactions</h3>
            </div>
            <Link 
              to="/transaction/my" 
              className="text-blue-600 hover:text-blue-700 text-sm font-medium flex items-center gap-1"
            >
              View All
              <ArrowRight size={16} />
            </Link>
          </div>
          
          <div className="space-y-3">
            {recentTransactions.length > 0 ? (
              recentTransactions.map((tx, idx) => (
                <div 
                  key={idx}
                  className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-lg ${tx.type === 'Income' ? 'bg-green-100' : 'bg-red-100'}`}>
                      {tx.type === 'Income' ? (
                        <TrendingUp className="text-green-600" size={16} />
                      ) : (
                        <TrendingDown className="text-red-600" size={16} />
                      )}
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">{tx.category || 'Uncategorized'}</p>
                      <p className="text-xs text-gray-500">
                        {new Date(tx.date || tx.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  <span className={`font-bold ${tx.type === 'Income' ? 'text-green-600' : 'text-red-600'}`}>
                    {tx.type === 'Income' ? '+' : '-'}${parseFloat(tx.amount || 0).toFixed(2)}
                  </span>
                </div>
              ))
            ) : (
              <p className="text-center text-gray-500 py-8">No transactions yet</p>
            )}
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Link 
          to="/dashboard/transactions/add" 
          className="px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold rounded-xl hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center gap-2 group"
        >
          Add Transactions
          <ArrowRight className="group-hover:translate-x-1 transition-transform" size={20} />
        </Link>
        
        <Link 
          to="/dashboard/reports" 
          className="px-8 py-4 bg-white border-2 border-gray-300 text-gray-700 font-semibold rounded-xl hover:border-gray-400 hover:bg-gray-50 transition-all duration-300 shadow-sm hover:shadow-md flex items-center justify-center gap-2"
        >
          <PieChart size={20} />
          View Reports
        </Link>
      </div>
    </div>
  );
};

export default Dashboard;