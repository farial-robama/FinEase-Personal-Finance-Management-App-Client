
import React from 'react';
import { Facebook, Twitter, Youtube, Instagram, Linkedin, Mail, Phone, MapPin } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <div className="mt-20">
      <footer className="bg-[#1A3D64] text-white">
        {/* Main Footer Content */}
        <div className="max-w-7xl mx-auto px-6 py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            
            {/* About Section */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <img src="/logo.png" alt="FinEase Logo" className="w-10 h-10" />
                <h3 className="text-2xl font-bold">FinEase</h3>
              </div>
              <p className="text-gray-300 mb-4">
                Your trusted partner in personal finance management. Track, plan, and achieve your financial goals with ease.
              </p>
              <div className="flex gap-3">
                <a 
                  href="https://facebook.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="hover:text-blue-400 transition-colors"
                  aria-label="Visit our Facebook page"
                >
                  <Facebook className="w-5 h-5" />
                </a>
                <a 
                  href="https://twitter.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="hover:text-blue-400 transition-colors"
                  aria-label="Visit our Twitter page"
                >
                  <Twitter className="w-5 h-5" />
                </a>
                <a 
                  href="https://youtube.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="hover:text-red-400 transition-colors"
                  aria-label="Visit our YouTube channel"
                >
                  <Youtube className="w-5 h-5" />
                </a>
                <a 
                  href="https://instagram.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="hover:text-pink-400 transition-colors"
                  aria-label="Visit our Instagram page"
                >
                  <Instagram className="w-5 h-5" />
                </a>
                <a 
                  href="https://linkedin.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="hover:text-blue-400 transition-colors"
                  aria-label="Visit our LinkedIn page"
                >
                  <Linkedin className="w-5 h-5" />
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h6 className="text-lg font-bold mb-4">Quick Links</h6>
              <ul className="space-y-2">
                <li>
                  <a href="/" className="text-gray-300 hover:text-white transition-colors">
                    Home
                  </a>
                </li>
                <li>
                  <a href="/transaction" className="text-gray-300 hover:text-white transition-colors">
                    Add Transaction
                  </a>
                </li>
                <li>
                  <a href="/transaction/my" className="text-gray-300 hover:text-white transition-colors">
                    My Transactions
                  </a>
                </li>
                <li>
                  <a href="/reports" className="text-gray-300 hover:text-white transition-colors">
                    Reports
                  </a>
                </li>
              </ul>
            </div>

            {/* Resources */}
            <div>
              <h6 className="text-lg font-bold mb-4">Resources</h6>
              <ul className="space-y-2">
                <li>
                  <a 
                    href="https://docs.finease.com" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-gray-300 hover:text-white transition-colors"
                  >
                    Documentation
                  </a>
                </li>
                <li>
                  <a 
                    href="https://support.finease.com" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-gray-300 hover:text-white transition-colors"
                  >
                    Help Center
                  </a>
                </li>
                <li>
                  <a 
                    href="https://blog.finease.com" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-gray-300 hover:text-white transition-colors"
                  >
                    Blog
                  </a>
                </li>
                <li>
                  <a 
                    href="https://community.finease.com" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-gray-300 hover:text-white transition-colors"
                  >
                    Community
                  </a>
                </li>
              </ul>
            </div>

            {/* Contact Info */}
            <div>
              <h6 className="text-lg font-bold mb-4">Contact Us</h6>
              <ul className="space-y-3">
                <li className="flex items-start gap-2">
                  <Mail className="w-5 h-5 mt-0.5 flex-shrink-0" />
                  <a 
                    href="mailto:info@finease.com" 
                    className="text-gray-300 hover:text-white transition-colors"
                  >
                    info@finease.com
                  </a>
                </li>
                <li className="flex items-start gap-2">
                  <Mail className="w-5 h-5 mt-0.5 flex-shrink-0" />
                  <a 
                    href="mailto:support@finease.com" 
                    className="text-gray-300 hover:text-white transition-colors"
                  >
                    support@finease.com
                  </a>
                </li>
                <li className="flex items-start gap-2">
                  <Phone className="w-5 h-5 mt-0.5 flex-shrink-0" />
                  <a 
                    href="tel:+8801234567890" 
                    className="text-gray-300 hover:text-white transition-colors"
                  >
                    +880 123 456 7890
                  </a>
                </li>
                <li className="flex items-start gap-2">
                  <MapPin className="w-5 h-5 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-300">
                    123 Finance Street<br />
                    Dhaka 1000, Bangladesh
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-600">
          <div className="max-w-7xl mx-auto px-6 py-6">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <p className="text-gray-300 text-sm text-center md:text-left">
                © {currentYear} FinEase. All rights reserved. | Personal Finance Management App
              </p>
              <div className="flex gap-6 text-sm">
                <a 
                  href="https://finease.com/privacy" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Privacy Policy
                </a>
                <a 
                  href="https://finease.com/terms" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Terms of Service
                </a>
                <a 
                  href="https://finease.com/cookies" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Cookie Policy
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Footer;