
import React, { useState } from 'react';
import { Link } from 'react-router';
import { 
  TrendingUp, 
  TrendingDown, 
  Calendar, 
  Eye, 
  Edit3, 
  Trash2,
  Tag,
  MoreVertical,
  ArrowRight
} from 'lucide-react';
import { motion } from 'framer-motion';

const TransactionCard = ({ transaction, onDelete, onUpdate }) => {
  const { _id, category, type, amount, date, description } = transaction;
  const [showMenu, setShowMenu] = useState(false);
  
  const isIncome = type === "Income";
  const formattedAmount = parseFloat(amount || 0).toFixed(2);
  const formattedDate = new Date(date).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });

  // Category color mapping
  const categoryColors = {
    // Income categories
    Salary: "bg-blue-100 text-blue-700 border-blue-300",
    Business: "bg-purple-100 text-purple-700 border-purple-300",
    Investment: "bg-indigo-100 text-indigo-700 border-indigo-300",
    Freelance: "bg-cyan-100 text-cyan-700 border-cyan-300",
    Gift: "bg-pink-100 text-pink-700 border-pink-300",
    Bonus: "bg-teal-100 text-teal-700 border-teal-300",
    
    // Expense categories
    Food: "bg-orange-100 text-orange-700 border-orange-300",
    Transport: "bg-yellow-100 text-yellow-700 border-yellow-300",
    Rent: "bg-red-100 text-red-700 border-red-300",
    Shopping: "bg-rose-100 text-rose-700 border-rose-300",
    Bills: "bg-amber-100 text-amber-700 border-amber-300",
    Entertainment: "bg-fuchsia-100 text-fuchsia-700 border-fuchsia-300",
    Healthcare: "bg-emerald-100 text-emerald-700 border-emerald-300",
    Education: "bg-violet-100 text-violet-700 border-violet-300",
    
    // Default
    Others: "bg-gray-100 text-gray-700 border-gray-300"
  };

  const categoryColor = categoryColors[category] || categoryColors.Others;

  const handleDelete = (e) => {
    e.stopPropagation();
    onDelete(_id);
    setShowMenu(false);
  };

  const handleUpdate = (e) => {
    e.stopPropagation();
    onUpdate(transaction);
    setShowMenu(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      whileHover={{ y: -4 }}
      className="group relative bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border-2 border-gray-100"
    >
      {/* Colored accent bar */}
      <div className={`absolute top-0 left-0 right-0 h-1 ${isIncome ? 'bg-gradient-to-r from-emerald-500 to-teal-500' : 'bg-gradient-to-r from-rose-500 to-pink-500'}`}></div>
      
      <div className="p-6">
        <div className="flex flex-col md:flex-row gap-4 justify-between">
          {/* Left Section - Transaction Info */}
          <div className="flex-1">
            {/* Amount and Type */}
            <div className="flex items-start gap-3 mb-3">
              <div className={`p-3 rounded-xl ${isIncome ? 'bg-emerald-100' : 'bg-rose-100'} transition-transform group-hover:scale-110`}>
                {isIncome ? (
                  <TrendingUp className="text-emerald-600" size={24} />
                ) : (
                  <TrendingDown className="text-rose-600" size={24} />
                )}
              </div>
              
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className={`text-3xl font-bold ${isIncome ? 'text-emerald-700' : 'text-rose-700'}`}>
                    ${formattedAmount}
                  </h3>
                  <span className={`text-xs font-semibold px-2 py-1 rounded-full ${isIncome ? 'bg-emerald-100 text-emerald-700' : 'bg-rose-100 text-rose-700'}`}>
                    {type}
                  </span>
                </div>
                
                {/* Category Badge */}
                <div className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border ${categoryColor} text-sm font-medium`}>
                  <Tag size={14} />
                  {category}
                </div>
              </div>
            </div>

            {/* Description (if exists) */}
            {description && (
              <p className="text-sm text-gray-600 mb-3 line-clamp-2 pl-1">
                {description}
              </p>
            )}

            {/* Date */}
            <div className="flex items-center gap-2 text-gray-600 pl-1">
              <Calendar size={16} className="text-gray-400" />
              <span className="text-sm font-medium">{formattedDate}</span>
            </div>
          </div>

          {/* Right Section - Actions */}
          <div className="flex md:flex-col gap-2 md:items-end justify-end">
            {/* Desktop Actions */}
            <div className="hidden md:flex flex-col gap-2">
              <Link 
                to={`/transaction/details/${_id}`}
                className="flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-600 rounded-xl hover:bg-blue-100 transition-colors font-medium text-sm border border-blue-200"
              >
                <Eye size={16} />
                View
              </Link>
              <button
                onClick={handleUpdate}
                className="flex items-center gap-2 px-4 py-2 bg-emerald-50 text-emerald-600 rounded-xl hover:bg-emerald-100 transition-colors font-medium text-sm border border-emerald-200"
              >
                <Edit3 size={16} />
                Edit
              </button>
              <button
                onClick={handleDelete}
                className="flex items-center gap-2 px-4 py-2 bg-red-50 text-red-600 rounded-xl hover:bg-red-100 transition-colors font-medium text-sm border border-red-200"
              >
                <Trash2 size={16} />
                Delete
              </button>
            </div>

            {/* Mobile Actions - Dropdown Menu */}
            <div className="md:hidden relative">
              <button
                onClick={() => setShowMenu(!showMenu)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <MoreVertical size={20} className="text-gray-600" />
              </button>
              
              {showMenu && (
                <>
                  <div 
                    className="fixed inset-0 z-10" 
                    onClick={() => setShowMenu(false)}
                  ></div>
                  <div className="absolute right-0 top-10 z-20 bg-white rounded-xl shadow-xl border border-gray-200 py-2 min-w-[160px]">
                    <Link
                      to={`/transaction/details/${_id}`}
                      className="flex items-center gap-2 px-4 py-2 hover:bg-gray-50 transition-colors text-sm font-medium text-gray-700"
                      onClick={() => setShowMenu(false)}
                    >
                      <Eye size={16} />
                      View Details
                    </Link>
                    <button
                      onClick={handleUpdate}
                      className="w-full flex items-center gap-2 px-4 py-2 hover:bg-gray-50 transition-colors text-sm font-medium text-gray-700"
                    >
                      <Edit3 size={16} />
                      Edit
                    </button>
                    <button
                      onClick={handleDelete}
                      className="w-full flex items-center gap-2 px-4 py-2 hover:bg-gray-50 transition-colors text-sm font-medium text-red-600"
                    >
                      <Trash2 size={16} />
                      Delete
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Quick View Link (appears on hover) */}
        <Link
          to={`/transaction/details/${_id}`}
          className="hidden group-hover:flex items-center gap-2 mt-4 pt-4 border-t border-gray-100 text-blue-600 hover:text-blue-700 font-medium text-sm transition-colors"
        >
          View full details
          <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>

      {/* Subtle gradient overlay on hover */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-blue-50 opacity-0 group-hover:opacity-30 transition-opacity duration-300 pointer-events-none"></div>
    </motion.div>
  );
};

export default TransactionCard;