'use client';

import React, { useState } from 'react';
import { HiMenu, HiX } from 'react-icons/hi';
import Image from 'next/image';
import Link from 'next/link';

interface NavLink {
  href: string;
  label: string;
}

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeLink, setActiveLink] = useState<string>('#home');

  const navLinks: NavLink[] = [
    { href: '#home', label: 'Home' },
    { href: '#about', label: 'About Us' },
    { href: '#process', label: 'How To Proceed' },
    { href: '#testimonials', label: 'Testimonials' },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 bg-white/90 backdrop-blur-sm z-50 border-b border-gray-100">
      <div className="w-full container mx-auto flex items-center justify-between px-4 sm:px-6 lg:px-8 md:h-20 h-16">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-1 cursor-pointer">
          <Image
            src="/Projectlogo.jpg"
            alt="Logo"
            width={70}
            height={50}
            priority
          />
        </Link>

        {/* Mobile Menu Toggle */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="md:hidden p-2"
        >
          {isMenuOpen ? <HiX className="size-6" /> : <HiMenu className="size-6" />}
        </button>

        {/* Nav Links (Desktop) */}
        <div className="hidden md:flex items-center gap-10">
          {navLinks.map((link, index) => (
            <a
              key={index}
              href={link.href}
              onClick={() => setActiveLink(link.href)}
              className={`text-sm font-medium relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 hover:after:w-full after:bg-blue-600 after:transition-all ${
                activeLink === link.href
                  ? 'text-blue-600 after:w-full'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* Login Button (Desktop) */}
        <Link
          href="/login"
          className="hidden md:block bg-blue-600 text-white px-6 py-2.5 rounded-lg hover:bg-blue-700 text-sm font-medium transition-all hover:shadow-lg hover:shadow-blue-100"
        >
          Log In
        </Link>
      </div>

      {/* Nav Links (Mobile) */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 py-4">
          <div className="container mx-auto px-4 space-y-3">
            {navLinks.map((link, index) => (
              <a
                key={index}
                onClick={() => {
                  setActiveLink(link.href);
                  setIsMenuOpen(false);
                }}
                className={`block text-sm font-medium py-2 ${
                  activeLink === link.href
                    ? 'text-blue-600'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
                href={link.href}
              >
                {link.label}
              </a>
            ))}

            <Link
              href="/login"
              className="block w-full text-center bg-blue-600 text-white px-6 py-2.5 rounded-lg hover:bg-blue-700 text-sm font-medium transition-all hover:shadow-lg hover:shadow-blue-100"
            >
              Log In
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
