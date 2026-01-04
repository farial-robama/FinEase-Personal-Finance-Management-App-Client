import React from 'react';

const Highlights = () => {
  const highlights = [
    {
      title: "Real-Time Sync",
      description: "Your data syncs across all devices instantly",
      color: "from-green-400 to-emerald-500"
    },
    {
      title: "AI-Powered Insights",
      description: "Get personalized recommendations based on your spending",
      color: "from-blue-400 to-indigo-500"
    },
    {
      title: "Export Reports",
      description: "Download detailed financial reports anytime",
      color: "from-purple-400 to-pink-500"
    }
  ];

  return (
    <div className="py-16">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold text-gray-800 mb-4">Why Choose FinEase?</h2>
        <p className="text-xl text-gray-600">Stand out features that make a difference</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {highlights.map((highlight, index) => (
          <div key={index} className={`p-8 rounded-xl bg-gradient-to-br ${highlight.color} text-white hover:scale-105 transition-transform`}>
            <h3 className="text-2xl font-bold mb-3">{highlight.title}</h3>
            <p className="text-lg opacity-95">{highlight.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Highlights;