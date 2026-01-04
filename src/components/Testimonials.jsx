import { Star } from 'lucide-react';
import React from 'react';

const Testimonials = () => {
  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Small Business Owner",
      image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
      rating: 5,
      text: "FinEase transformed how I manage my business finances. I can now track every dollar and make informed decisions."
    },
    {
      name: "Michael Chen",
      role: "Freelance Designer",
      image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Michael",
      rating: 5,
      text: "The budgeting tools are incredible! I've saved 30% more since I started using FinEase three months ago."
    },
    {
      name: "Emily Rodriguez",
      role: "Teacher",
      image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Emily",
      rating: 5,
      text: "Simple, intuitive, and powerful. FinEase helps me stay on top of my expenses without the complexity."
    }
  ];

  return (
    <div className="py-16 bg-base-200 rounded-2xl">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold text-gray-800 mb-4">What Our Users Say</h2>
        <p className="text-xl text-gray-600">Join thousands of satisfied users</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {testimonials.map((testimonial, index) => (
          <div key={index} className="bg-white p-6 rounded-xl shadow-lg hover:shadow-2xl transition-shadow">
            <div className="flex items-center mb-4">
              <img src={testimonial.image} alt={testimonial.name} className="w-16 h-16 rounded-full mr-4" />
              <div>
                <h4 className="font-bold text-gray-800">{testimonial.name}</h4>
                <p className="text-sm text-gray-600">{testimonial.role}</p>
              </div>
            </div>
            <div className="flex mb-3">
              {[...Array(testimonial.rating)].map((_, i) => (
                <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
              ))}
            </div>
            <p className="text-gray-700 italic">"{testimonial.text}"</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Testimonials;