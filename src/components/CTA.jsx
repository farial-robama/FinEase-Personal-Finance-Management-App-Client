import React from 'react';

const CTA = () => {
  return (
    <div className="py-16 bg-gradient-to-br from-green-400 to-blue-500 rounded-2xl text-center text-white">
      <h2 className="text-4xl md:text-5xl font-bold mb-4">Ready to Take Control?</h2>
      <p className="text-xl mb-8 opacity-95">Start your journey to financial freedom today</p>
      <div className="flex gap-4 justify-center flex-wrap">
        <button className="px-8 py-4 bg-white text-blue-600 font-bold rounded-lg hover:bg-gray-100 transition-colors text-lg">
          Get Started Free
        </button>
        <button className="px-8 py-4 border-2 border-white text-white font-bold rounded-lg hover:bg-white/10 transition-colors text-lg">
          Watch Demo
        </button>
      </div>
    </div>
  );
};


export default CTA;