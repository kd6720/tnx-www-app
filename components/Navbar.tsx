import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <nav className="bg-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <Link to="/" className="flex-shrink-0 flex items-center space-x-2">
              <img src="/logo.svg" alt="TrustedNetworx Logo" className="h-8 w-8" />
              <span className="text-2xl font-bold text-blue-600">TrustedNetworx</span>
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex md:items-center md:space-x-8">
            <Link to="/" className="text-gray-700 hover:text-blue-600">Home</Link>
            <div className="relative">
              <button 
                className="text-gray-700 hover:text-blue-600"
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                onMouseEnter={() => setIsDropdownOpen(true)}
              >
                Solutions
              </button>
              {isDropdownOpen && (
                <div 
                  className="absolute left-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50 animate-fadeIn"
                  onMouseLeave={() => setIsDropdownOpen(false)}
                >
                  <Link to="/pots-replacement" className="block px-4 py-2 text-gray-700 hover:bg-blue-50">POTS Replacement</Link>
                  <Link to="/fleet-management" className="block px-4 py-2 text-gray-700 hover:bg-blue-50">Fleet & Fuel Management</Link>
                  <Link to="/internet-connectivity" className="block px-4 py-2 text-gray-700 hover:bg-blue-50">Internet Connectivity</Link>
                  <Link to="/ip-pbx" className="block px-4 py-2 text-gray-700 hover:bg-blue-50">IP PBX</Link>
                  <Link to="/mobility-solutions" className="block px-4 py-2 text-gray-700 hover:bg-blue-50">Mobility Solutions</Link>
                  <Link to="/voice-solutions" className="block px-4 py-2 text-gray-700 hover:bg-blue-50">Voice Solutions</Link>
                </div>
              )}
            </div>
            <Link to="/about" className="text-gray-700 hover:text-blue-600">About</Link>
            <Link to="/contact" className="text-gray-700 hover:text-blue-600">Contact</Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button onClick={toggleMenu} className="text-gray-700">
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link to="/" className="block px-3 py-2 text-gray-700 hover:bg-blue-50">Home</Link>
            <Link to="/about" className="block px-3 py-2 text-gray-700 hover:bg-blue-50">About</Link>
            <Link to="/pots-replacement" className="block px-3 py-2 text-gray-700 hover:bg-blue-50">POTS Replacement</Link>
            <Link to="/fleet-management" className="block px-3 py-2 text-gray-700 hover:bg-blue-50">Fleet Management</Link>
            <Link to="/internet-connectivity" className="block px-3 py-2 text-gray-700 hover:bg-blue-50">Internet Connectivity</Link>
            <Link to="/ip-pbx" className="block px-3 py-2 text-gray-700 hover:bg-blue-50">IP PBX</Link>
            <Link to="/mobility-solutions" className="block px-3 py-2 text-gray-700 hover:bg-blue-50">Mobility Solutions</Link>
            <Link to="/voice-solutions" className="block px-3 py-2 text-gray-700 hover:bg-blue-50">Voice Solutions</Link>
            <Link to="/contact" className="block px-3 py-2 text-gray-700 hover:bg-blue-50">Contact</Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
