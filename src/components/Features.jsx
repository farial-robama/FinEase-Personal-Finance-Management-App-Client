import React, { useState } from 'react';
import { TrendingUp, PieChart, Bell, Shield, Target, Users, ChevronRight, Star, Calendar, Mail } from 'lucide-react';

const Features = () => {
  const features = [
    {
      icon: <TrendingUp className="w-8 h-8" />,
      title: "Track Expenses",
      description: "Monitor your spending patterns and identify where your money goes with detailed analytics."
    },
    {
      icon: <PieChart className="w-8 h-8" />,
      title: "Budget Planning",
      description: "Set realistic budgets and stay on track with smart alerts and visual insights."
    },
    {
      icon: <Bell className="w-8 h-8" />,
      title: "Smart Alerts",
      description: "Get notified about upcoming bills, unusual spending, and budget limits."
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Secure & Private",
      description: "Your financial data is encrypted and protected with bank-level security."
    },
    {
      icon: <Target className="w-8 h-8" />,
      title: "Goal Setting",
      description: "Define financial goals and track your progress with milestone celebrations."
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "Multi-Account",
      description: "Manage multiple accounts and get a complete picture of your finances."
    }
  ];

  return (
    <div className="py-16 bg-base-100">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold text-gray-800 mb-4">Powerful Features</h2>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Everything you need to take control of your financial future
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {features.map((feature, index) => (
          <div key={index} className="p-6 rounded-xl bg-gradient-to-br from-purple-50 to-blue-50 hover:shadow-xl transition-all duration-300 group">
            <div className="text-purple-600 mb-4 group-hover:scale-110 transition-transform">
              {feature.icon}
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">{feature.title}</h3>
            <p className="text-gray-600">{feature.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Features;