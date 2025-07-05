import React, { useState } from 'react';
import { FiMenu, FiX } from 'react-icons/fi';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleMenu = () => setIsOpen(!isOpen);

  const navLinks = ["Home", "About", "Contact"];

  return (
    <nav className="fixed top-0 left-0 w-full bg-gradient-to-b from-white/20 to-white/80 backdrop-blur-md shadow-md z-50">
      <div className="max-w-8xl mx-auto px-8 py-4 flex justify-between items-center">
        

        
        {/* Logo & Brand */}
        <div className="flex items-center space-x-3">
          <img
            src="/rlogo.png"
            alt="Logo"
            className="h-10 w-10 rounded-full object-cover shadow-md"
          />
          <h1 className="text-2xl font-extrabold tracking-wider text-gray-800">
            ResumeCrafter
          </h1>
        </div>

        {/* Desktop Nav Links */}
        <ul className="hidden md:flex space-x-10 text-lg">
          {navLinks.map((link, index) => (
            <li key={index}>
              <a
                href={`#${link.toLowerCase()}`}
                className="text-gray-700 hover:text-blue-600 transition duration-200"
              >
                {link}
              </a>
            </li>
          ))}
        </ul>

        {/* Mobile Menu Icon */}
        <div className="md:hidden text-3xl text-gray-700 cursor-pointer" onClick={toggleMenu}>
          {isOpen ? <FiX /> : <FiMenu />}
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <ul className="md:hidden bg-white bg-opacity-95 backdrop-blur-md px-4 py-6 space-y-4 text-lg text-center shadow-md">
          {navLinks.map((link, index) => (
            <li key={index}>
              <a
                href={`#${link.toLowerCase()}`}
                onClick={() => setIsOpen(false)}
                className="text-gray-700 hover:text-blue-600 transition duration-200 block"
              >
                {link}
              </a>
            </li>
          ))}
        </ul>
      )}
    </nav>
  );
};

export default Navbar;
