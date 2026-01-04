import React, { use, useState, useEffect } from 'react';
import { Link } from 'react-router';
import { AuthContext } from '../contexts/AuthContext';
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

const Overview = () => {
  const { user } = use(AuthContext);
  const [transactions, setTransactions] = useState([]);
  const [summary, setSummary] = useState({ income: 0, expense: 0, balance: 0 });
  const [recentTransactions, setRecentTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [monthlyComparison, setMonthlyComparison] = useState({ current: 0, previous: 0 });

  useEffect(() => {
    if (!user?.email) return;
    
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
          <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading overview...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
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
          to="/transaction/my" 
          className="px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold rounded-xl hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center gap-2 group"
        >
          View All Transactions
          <ArrowRight className="group-hover:translate-x-1 transition-transform" size={20} />
        </Link>
        
        <Link 
          to="/reports" 
          className="px-8 py-4 bg-white border-2 border-gray-300 text-gray-700 font-semibold rounded-xl hover:border-gray-400 hover:bg-gray-50 transition-all duration-300 shadow-sm hover:shadow-md flex items-center justify-center gap-2"
        >
          <PieChart size={20} />
          View Reports
        </Link>
      </div>
    </div>
  );
};

export default Overview;