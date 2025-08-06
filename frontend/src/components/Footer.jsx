import React from 'react';
import { FaTwitter, FaGithub, FaLinkedin } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-white border-t border-gray-200 text-gray-600 py-6 mt-auto shadow-sm">
      <div className="max-w-screen-xl mx-auto px-4 grid gap-6 sm:flex sm:items-center sm:justify-between">
        
        {/* Branding + Author */}
        <div className="text-center sm:text-left">
          <p className="text-sm text-gray-500">
            © {new Date().getFullYear()} <span className="font-semibold">Foodie App</span>. All rights reserved.
          </p>
          <p className="text-sm text-gray-500">
            Made with ❤️ by{' '}
            <a
              href="https://github.com/anshumanat"
              className="text-blue-500 hover:underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              Anshuman Tiwari
            </a>
          </p>
        </div>

        {/* Navigation Links */}
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-6 items-center">
          <Link to="/" className="hover:text-gray-800 transition">Home</Link>
          <Link to="/cart" className="hover:text-gray-800 transition">Cart</Link>
          <Link to="/contact" className="hover:text-gray-800 transition">Contact</Link>
        </div>

        {/* Social Media Icons */}
        <div className="flex gap-4 justify-center sm:justify-end">
          <a
            href="https://twitter.com/myprofile"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-blue-400 transition"
          >
            <FaTwitter size={20} />
          </a>
          <a
            href="https://github.com/anshumanat"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-gray-800 transition"
          >
            <FaGithub size={20} />
          </a>
          <a
            href="https://www.linkedin.com/in/anshuman-tiwari2005/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-blue-600 transition"
          >
            <FaLinkedin size={20} />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;