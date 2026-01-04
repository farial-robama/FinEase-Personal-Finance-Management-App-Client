
import React, { use, useEffect, useState } from 'react';
import { AuthContext } from '../../contexts/AuthContext';
import { Bar, Pie, Line } from 'react-chartjs-2';
import { 
  Chart as ChartJS, 
  ArcElement, 
  BarElement, 
  CategoryScale, 
  Legend, 
  LinearScale, 
  Tooltip,
  LineElement,
  PointElement
} from 'chart.js';
import useTitle from '../../Hooks/useTitle';
import { TrendingUp, TrendingDown, DollarSign, Calendar } from 'lucide-react';

ChartJS.register(
  ArcElement, 
  Tooltip, 
  Legend, 
  CategoryScale, 
  LinearScale, 
  BarElement,
  LineElement,
  PointElement
);

const Reports = () => {
  useTitle("Reports");
  
  const { user } = use(AuthContext);
  const [transactions, setTransactions] = useState([]);
  const [month, setMonth] = useState("");
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState('overview'); // 'overview' or 'detailed'

  useEffect(() => {
    if (!user) return;
    
    setLoading(true);
    fetch(`https://finease-personal-finance-management.vercel.app/transactions/${user.email}`)
      .then((res) => res.json())
      .then((data) => {
        setTransactions(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching transactions:", err);
        setLoading(false);
      });
  }, [user]);

  const filteredTransactions = transactions.filter((transaction) => {
    if (!month) return true;
    const txDate = transaction.date ? new Date(transaction.date) : new Date(transaction.createdAt || null);
    return txDate.getMonth() + 1 === parseInt(month);
  });

  const incomeTransactions = filteredTransactions.filter(tx => tx.type === "Income");
  const expenseTransactions = filteredTransactions.filter(tx => tx.type === "Expense");

  const totalIncome = incomeTransactions.reduce((sum, tx) => sum + parseFloat(tx.amount || 0), 0);
  const totalExpense = expenseTransactions.reduce((sum, tx) => sum + parseFloat(tx.amount || 0), 0);
  const netBalance = totalIncome - totalExpense;

  const calculateCategoryTotals = (txArray) => {
    return txArray.reduce((acc, tx) => {
      const amt = parseFloat(tx.amount || 0);
      if (!acc[tx.category]) acc[tx.category] = 0;
      acc[tx.category] += amt;
      return acc;
    }, {});
  };

  const incomeCategoryTotals = calculateCategoryTotals(incomeTransactions);
  const expenseCategoryTotals = calculateCategoryTotals(expenseTransactions);

  const chartColors = {
    income: ['#10B981', '#34D399', '#6EE7B7', '#A7F3D0', '#D1FAE5'],
    expense: ['#EF4444', '#F87171', '#FCA5A5', '#FECACA', '#FEE2E2']
  };

  const incomePieData = {
    labels: Object.keys(incomeCategoryTotals).length ? Object.keys(incomeCategoryTotals) : ["No data"],
    datasets: [{
      label: "Income Distribution",
      data: Object.keys(incomeCategoryTotals).length ? Object.values(incomeCategoryTotals) : [1],
      backgroundColor: chartColors.income,
      borderWidth: 2,
      borderColor: '#fff'
    }]
  };

  const expensePieData = {
    labels: Object.keys(expenseCategoryTotals).length ? Object.keys(expenseCategoryTotals) : ["No data"],
    datasets: [{
      label: "Expense Distribution",
      data: Object.keys(expenseCategoryTotals).length ? Object.values(expenseCategoryTotals) : [1],
      backgroundColor: chartColors.expense,
      borderWidth: 2,
      borderColor: '#fff'
    }]
  };

  const calculateMonthlyTotals = (txArray) => {
    return txArray.reduce((acc, tx) => {
      const txDate = tx.date ? new Date(tx.date) : new Date(tx.createdAt);
      const monthNum = txDate.getMonth() + 1;
      if (!acc[monthNum]) acc[monthNum] = 0;
      acc[monthNum] += parseFloat(tx.amount || 0);
      return acc;
    }, {});
  };

  const monthlyIncomeTotals = calculateMonthlyTotals(incomeTransactions);
  const monthlyExpenseTotals = calculateMonthlyTotals(expenseTransactions);

  const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  const combinedBarData = {
    labels: monthNames,
    datasets: [
      {
        label: "Income",
        data: Array.from({ length: 12 }, (_, i) => monthlyIncomeTotals[i + 1] || 0),
        backgroundColor: '#10B981',
        borderRadius: 6
      },
      {
        label: "Expense",
        data: Array.from({ length: 12 }, (_, i) => monthlyExpenseTotals[i + 1] || 0),
        backgroundColor: '#EF4444',
        borderRadius: 6
      }
    ]
  };

  const trendData = {
    labels: monthNames,
    datasets: [
      {
        label: "Net Balance",
        data: Array.from({ length: 12 }, (_, i) => {
          const income = monthlyIncomeTotals[i + 1] || 0;
          const expense = monthlyExpenseTotals[i + 1] || 0;
          return income - expense;
        }),
        borderColor: '#3B82F6',
        backgroundColor: 'rgba(59, 130, 246, 0.1)',
        tension: 0.4,
        fill: true,
        pointRadius: 4,
        pointHoverRadius: 6
      }
    ]
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          padding: 15,
          font: { size: 12 }
        }
      },
      tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        padding: 12,
        titleFont: { size: 14 },
        bodyFont: { size: 13 },
        callbacks: {
          label: function(context) {
            return `${context.dataset.label}: $${context.parsed.y?.toFixed(2) || context.parsed || 0}`;
          }
        }
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: { color: 'rgba(0, 0, 0, 0.05)' }
      },
      x: {
        grid: { display: false }
      }
    }
  };

  const pieOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          padding: 12,
          font: { size: 11 }
        }
      },
      tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        padding: 12,
        callbacks: {
          label: function(context) {
            const total = context.dataset.data.reduce((a, b) => a + b, 0);
            const percentage = ((context.parsed / total) * 100).toFixed(1);
            return `${context.label}: $${context.parsed.toFixed(2)} (${percentage}%)`;
          }
        }
      }
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading reports...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Financial Reports</h1>
        <p className="text-gray-600">Comprehensive overview of your financial activity</p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-6 border border-green-200">
          <div className="flex items-center justify-between mb-3">
            <span className="text-green-700 font-medium">Total Income</span>
            <TrendingUp className="text-green-600" size={24} />
          </div>
          <p className="text-3xl font-bold text-green-900">${totalIncome.toFixed(2)}</p>
          <p className="text-sm text-green-600 mt-2">{incomeTransactions.length} transactions</p>
        </div>

        <div className="bg-gradient-to-br from-red-50 to-red-100 rounded-xl p-6 border border-red-200">
          <div className="flex items-center justify-between mb-3">
            <span className="text-red-700 font-medium">Total Expense</span>
            <TrendingDown className="text-red-600" size={24} />
          </div>
          <p className="text-3xl font-bold text-red-900">${totalExpense.toFixed(2)}</p>
          <p className="text-sm text-red-600 mt-2">{expenseTransactions.length} transactions</p>
        </div>

        <div className={`bg-gradient-to-br ${netBalance >= 0 ? 'from-blue-50 to-blue-100 border-blue-200' : 'from-orange-50 to-orange-100 border-orange-200'} rounded-xl p-6 border`}>
          <div className="flex items-center justify-between mb-3">
            <span className={`${netBalance >= 0 ? 'text-blue-700' : 'text-orange-700'} font-medium`}>Net Balance</span>
            <DollarSign className={netBalance >= 0 ? 'text-blue-600' : 'text-orange-600'} size={24} />
          </div>
          <p className={`text-3xl font-bold ${netBalance >= 0 ? 'text-blue-900' : 'text-orange-900'}`}>
            ${Math.abs(netBalance).toFixed(2)}
          </p>
          <p className={`text-sm mt-2 ${netBalance >= 0 ? 'text-blue-600' : 'text-orange-600'}`}>
            {netBalance >= 0 ? 'Surplus' : 'Deficit'}
          </p>
        </div>
      </div>

      {/* Filter and View Toggle */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 mb-8 flex flex-col sm:flex-row justify-between items-center gap-4">
        <div className="flex items-center gap-3">
          <Calendar className="text-gray-600" size={20} />
          <label className="font-medium text-gray-700">Filter by month:</label>
          <select
            value={month}
            onChange={(e) => setMonth(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
          >
            <option value="">All Months</option>
            {monthNames.map((name, idx) => (
              <option key={idx} value={idx + 1}>{name}</option>
            ))}
          </select>
        </div>

        <div className="flex gap-2">
          <button
            onClick={() => setViewMode('overview')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              viewMode === 'overview'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Overview
          </button>
          <button
            onClick={() => setViewMode('detailed')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              viewMode === 'detailed'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Detailed
          </button>
        </div>
      </div>

      {/* Charts Section */}
      {viewMode === 'overview' ? (
        <>
          {/* Trend Line */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Monthly Net Balance Trend</h2>
            <div className="h-80">
              <Line data={trendData} options={chartOptions} />
            </div>
          </div>

          {/* Combined Bar Chart */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Income vs Expense Comparison</h2>
            <div className="h-80">
              <Bar data={combinedBarData} options={chartOptions} />
            </div>
          </div>
        </>
      ) : (
        <>
          {/* Category Distribution */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Income by Category</h2>
              <div className="h-80">
                <Pie data={incomePieData} options={pieOptions} />
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Expense by Category</h2>
              <div className="h-80">
                <Pie data={expensePieData} options={pieOptions} />
              </div>
            </div>
          </div>

          {/* Top Categories */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Top Income Categories</h2>
              <div className="space-y-3">
                {Object.entries(incomeCategoryTotals)
                  .sort((a, b) => b[1] - a[1])
                  .slice(0, 5)
                  .map(([category, amount], idx) => (
                    <div key={idx} className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                      <span className="font-medium text-gray-700">{category}</span>
                      <span className="text-green-700 font-semibold">${amount.toFixed(2)}</span>
                    </div>
                  ))}
                {Object.keys(incomeCategoryTotals).length === 0 && (
                  <p className="text-gray-500 text-center py-4">No income data available</p>
                )}
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Top Expense Categories</h2>
              <div className="space-y-3">
                {Object.entries(expenseCategoryTotals)
                  .sort((a, b) => b[1] - a[1])
                  .slice(0, 5)
                  .map(([category, amount], idx) => (
                    <div key={idx} className="flex items-center justify-between p-3 bg-red-50 rounded-lg">
                      <span className="font-medium text-gray-700">{category}</span>
                      <span className="text-red-700 font-semibold">${amount.toFixed(2)}</span>
                    </div>
                  ))}
                {Object.keys(expenseCategoryTotals).length === 0 && (
                  <p className="text-gray-500 text-center py-4">No expense data available</p>
                )}
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Reports;