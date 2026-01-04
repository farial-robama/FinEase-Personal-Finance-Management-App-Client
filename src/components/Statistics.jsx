import React from 'react';

const Statistics = () => {
  const stats = [
    { number: "50K+", label: "Active Users" },
    { number: "$10M+", label: "Money Managed" },
    { number: "100K+", label: "Transactions Tracked" },
    { number: "4.9/5", label: "User Rating" }
  ];

  return (
    <div className="py-16 bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl my-10">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
        {stats.map((stat, index) => (
          <div key={index} className="text-white">
            <h3 className="text-4xl md:text-5xl font-bold mb-2">{stat.number}</h3>
            <p className="text-lg opacity-90">{stat.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Statistics;