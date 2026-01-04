import { ChevronRight } from 'lucide-react';
import React from 'react';

const FAQ = () => {
  const faqs = [
    {
      question: "Is FinEase free to use?",
      answer: "Yes! FinEase offers a free tier with essential features. Premium plans are available for advanced analytics."
    },
    {
      question: "How secure is my financial data?",
      answer: "We use bank-level encryption and never store sensitive information like bank credentials."
    },
    {
      question: "Can I use FinEase on multiple devices?",
      answer: "Absolutely! Your data syncs seamlessly across all your devices in real-time."
    },
    {
      question: "Do you offer customer support?",
      answer: "Yes, our support team is available 24/7 via email and chat to help with any questions."
    }
  ];

  return (
    <div className="py-16">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold text-gray-800 mb-4">Frequently Asked Questions</h2>
        <p className="text-xl text-gray-600">Got questions? We've got answers</p>
      </div>
      
      <div className="max-w-3xl mx-auto space-y-4">
        {faqs.map((faq, index) => (
          <details key={index} className="bg-white rounded-lg shadow-md p-6 group">
            <summary className="font-bold text-lg text-gray-800 cursor-pointer list-none flex justify-between items-center">
              {faq.question}
              <ChevronRight className="group-open:rotate-90 transition-transform" />
            </summary>
            <p className="text-gray-600 mt-4">{faq.answer}</p>
          </details>
        ))}
      </div>
    </div>
  );
};

export default FAQ;