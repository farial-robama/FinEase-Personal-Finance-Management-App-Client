
import React from "react";
import { Link } from "react-router";
import { motion } from "framer-motion";
import {
  TrendingUp,
  Target,
  Shield,
  CheckCircle2,
  ArrowRight,
  Sparkles,
  PiggyBank,
  Calculator,
  LineChart,
  Lightbulb
} from "lucide-react";

const SmartFinance = () => {
  const budgetingTips = [
    {
      text: "Track every expense, no matter how small",
      icon: Calculator,
      color: "from-blue-500 to-cyan-500"
    },
    {
      text: "Set monthly spending limits for each category",
      icon: Target,
      color: "from-purple-500 to-pink-500"
    },
    {
      text: "Always pay yourself first - save before you spend",
      icon: PiggyBank,
      color: "from-emerald-500 to-teal-500"
    },
    {
      text: "Review and adjust your budget regularly",
      icon: LineChart,
      color: "from-orange-500 to-red-500"
    },
    {
      text: "Use tools like FinEase to automate tracking and gain insights",
      icon: Sparkles,
      color: "from-indigo-500 to-purple-500"
    }
  ];

  const benefits = [
    {
      icon: TrendingUp,
      title: "Smart Tracking",
      description: "Monitor your income and expenses in real-time",
      color: "bg-blue-50 border-blue-200 text-blue-600"
    },
    {
      icon: Target,
      title: "Goal Setting",
      description: "Set and achieve your financial milestones",
      color: "bg-emerald-50 border-emerald-200 text-emerald-600"
    },
    {
      icon: Shield,
      title: "Secure & Private",
      description: "Your financial data is encrypted and protected",
      color: "bg-purple-50 border-purple-200 text-purple-600"
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      {/* Hero Section - Why Financial Planning Matters */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="flex flex-col-reverse lg:flex-row gap-12 items-center mb-20"
      >
        <div className="flex-1 space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 border border-blue-200 rounded-full text-blue-600 font-medium text-sm">
            <Lightbulb size={16} />
            <span>Financial Planning Made Simple</span>
          </div>
          
          <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
            Why Financial Planning
            <span className="block bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              Matters?
            </span>
          </h1>
          
          <p className="text-lg text-gray-600 leading-relaxed">
            Every financial decision shapes your future. 
            <span className="font-semibold text-blue-600"> FinEase</span> empowers you to plan, 
            track, and achieve financial goals with ease and confidence.
          </p>

          {/* Benefits Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4">
            {benefits.map((benefit, index) => {
              const Icon = benefit.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 + 0.3 }}
                  className={`p-4 rounded-xl border-2 ${benefit.color} transition-transform hover:scale-105`}
                >
                  <Icon size={28} className="mb-2" />
                  <h3 className="font-semibold text-gray-900 mb-1">{benefit.title}</h3>
                  <p className="text-sm text-gray-600">{benefit.description}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
        
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex-1"
        >
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-indigo-400 rounded-2xl blur-2xl opacity-20"></div>
            <img
              className="relative rounded-2xl shadow-2xl w-full object-cover"
              src="/finance2.png"
              alt="Financial Planning"
            />
          </div>
        </motion.div>
      </motion.div>

      {/* Budgeting Tips Section */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="flex flex-col lg:flex-row gap-12 items-center mb-20"
      >
        <motion.div
          variants={itemVariants}
          className="flex-1 order-2 lg:order-1"
        >
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-emerald-400 to-teal-400 rounded-2xl blur-2xl opacity-20"></div>
            <img
              className="relative rounded-2xl shadow-2xl w-full object-cover"
              src="/finance1.png"
              alt="Budgeting Tips"
            />
          </div>
        </motion.div>

        <motion.div variants={itemVariants} className="flex-1 space-y-8 order-1 lg:order-2">
          <div>
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-50 border border-emerald-200 rounded-full text-emerald-600 font-medium text-sm mb-4">
              <CheckCircle2 size={16} />
              <span>Pro Tips</span>
            </div>
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Essential Budgeting Tips
            </h2>
            <p className="text-gray-600">
              Master your finances with these proven strategies that successful savers use every day.
            </p>
          </div>

          <div className="space-y-4">
            {budgetingTips.map((tip, index) => {
              const Icon = tip.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="group flex items-start gap-4 p-4 rounded-xl bg-white border-2 border-gray-100 hover:border-blue-200 hover:shadow-lg transition-all duration-300"
                >
                  <div className={`p-3 rounded-xl bg-gradient-to-br ${tip.color} flex-shrink-0`}>
                    <Icon className="text-white" size={24} />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-sm font-bold text-gray-400">#{index + 1}</span>
                      <div className="h-px flex-1 bg-gradient-to-r from-gray-200 to-transparent"></div>
                    </div>
                    <p className="text-gray-700 font-medium leading-relaxed">
                      {tip.text}
                    </p>
                  </div>
                  <ArrowRight 
                    className="text-gray-400 group-hover:text-blue-600 group-hover:translate-x-1 transition-all flex-shrink-0" 
                    size={20} 
                  />
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </motion.div>

      {/* Call to Action Section */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 p-12 text-center"
      >
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-72 h-72 bg-white rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl"></div>
        </div>

        <div className="relative z-10 max-w-3xl mx-auto space-y-6">
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, type: "spring" }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-sm border border-white/30 rounded-full text-white font-medium text-sm"
          >
            <Sparkles size={16} />
            <span>Start Your Financial Journey Today</span>
          </motion.div>

          <h2 className="text-4xl lg:text-5xl font-bold text-white">
            Ready to Take Control of Your Finances?
          </h2>
          
          <p className="text-xl text-blue-100">
            Join thousands of users who've transformed their financial lives with FinEase
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
            <Link
              to="/transaction"
              className="group flex items-center gap-3 px-8 py-4 bg-white text-blue-600 rounded-xl hover:bg-blue-50 transition-all font-semibold text-lg shadow-xl hover:shadow-2xl hover:scale-105"
            >
              Add Your First Transaction
              <ArrowRight className="group-hover:translate-x-1 transition-transform" size={20} />
            </Link>
            
            <Link
              to="/reports"
              className="flex items-center gap-3 px-8 py-4 bg-white/10 backdrop-blur-sm border-2 border-white/30 text-white rounded-xl hover:bg-white/20 transition-all font-semibold text-lg"
            >
              <LineChart size={20} />
              View Sample Reports
            </Link>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-8 pt-8 border-t border-white/20">
            <div>
              <p className="text-3xl font-bold text-white">10K+</p>
              <p className="text-blue-100 text-sm">Active Users</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-white">$2M+</p>
              <p className="text-blue-100 text-sm">Money Tracked</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-white">99%</p>
              <p className="text-blue-100 text-sm">Satisfaction</p>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default SmartFinance;