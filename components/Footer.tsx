'use client';

import React from 'react';
import { FaFacebookF, FaTwitter, FaLinkedinIn } from 'react-icons/fa';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-100 text-gray-700 px-6 py-10">
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-8">
        {/* Logo & Description */}
        <div className="space-y-4">
          <div className="flex items-center space-x-2">
            <h2 className="text-lg font-bold">RootVenture</h2>
          </div>
          <p className="text-sm text-gray-600">
            The copy warned the Little Blind Text, that where it came from it would have been rewritten a thousand times.
          </p>
          <div className="flex space-x-4 mt-2">
            <FaFacebookF className="hover:text-blue-600 cursor-pointer" />
            <FaTwitter className="hover:text-blue-400 cursor-pointer" />
            <FaLinkedinIn className="hover:text-blue-700 cursor-pointer" />
          </div>
        </div>

        {/* Company */}
        <div>
          <h3 className="font-semibold mb-3">Company</h3>
          <ul className="space-y-2 text-sm">
            <li>About</li>
            <li>Terms of Use</li>
            <li>Privacy Policy</li>
            <li>How it Works</li>
            <li>Contact Us</li>
          </ul>
        </div>

        {/* Get Help */}
        <div>
          <h3 className="font-semibold mb-3">Get Help</h3>
          <ul className="space-y-2 text-sm">
            <li>Support Career</li>
            <li>24h Service</li>
            <li>Quick Chat</li>
          </ul>
        </div>

        {/* Support */}
        <div>
          <h3 className="font-semibold mb-3">Support</h3>
          <ul className="space-y-2 text-sm">
            <li>FAQ</li>
            <li>Policy</li>
            <li>Business</li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="font-semibold mb-3">Contact</h3>
          <ul className="space-y-2 text-sm">
            <li>WhatsApp</li>
            <li>Support 24</li>
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
