import { Mail } from 'lucide-react';
import React, { useState } from 'react';

const Newsletter = () => {
  const [email, setEmail] = useState('');

  const handleSubmit = () => {
    if (email && email.includes('@')) {
      alert(`Thanks for subscribing with: ${email}`);
      setEmail('');
    }
  };

  return (
    <div className="py-16 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl my-10">
      <div className="text-center text-white">
        <Mail className="w-16 h-16 mx-auto mb-4" />
        <h2 className="text-4xl font-bold mb-4">Stay Updated</h2>
        <p className="text-xl mb-8 opacity-95">Get financial tips and product updates delivered to your inbox</p>
        
        <div className="max-w-md mx-auto flex gap-3">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            className="flex-1 px-6 py-3 rounded-lg text-gray-800"
          />
          <button onClick={handleSubmit} className="px-8 py-3 bg-white text-purple-600 font-bold rounded-lg hover:bg-gray-100 transition-colors">
            Subscribe
          </button>
        </div>
      </div>
    </div>
  );
};


export default Newsletter;