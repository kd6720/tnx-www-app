import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, MapPin, Phone } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <img src="/logo.svg" alt="TrustedNetworx Logo" className="h-8 w-8" />
              <h3 className="text-xl font-bold">TrustedNetworx</h3>
            </div>
            <p className="text-gray-400">Your trusted partner in telecommunications solutions.</p>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">Solutions</h4>
            <ul className="space-y-2">
              <li><Link to="/pots-replacement" className="text-gray-400 hover:text-white">POTS Replacement</Link></li>
              <li><Link to="/fleet-management" className="text-gray-400 hover:text-white">Fleet Management</Link></li>
              <li><Link to="/internet-connectivity" className="text-gray-400 hover:text-white">Internet Connectivity</Link></li>
              <li><Link to="/ip-pbx" className="text-gray-400 hover:text-white">IP PBX</Link></li>
              <li><Link to="/mobility-solutions" className="text-gray-400 hover:text-white">Mobility Solutions</Link></li>
              <li><Link to="/voice-solutions" className="text-gray-400 hover:text-white">Voice Solutions</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">Company</h4>
            <ul className="space-y-2">
              <li><Link to="/" className="text-gray-400 hover:text-white">Home</Link></li>
              <li><Link to="/about" className="text-gray-400 hover:text-white">About Us</Link></li>
              <li><Link to="/contact" className="text-gray-400 hover:text-white">Contact Us</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">Contact</h4>
            <ul className="space-y-2">
              <li className="flex items-center text-gray-400">
                <Phone size={16} className="mr-2" />
                <span>305-498-7530</span>
              </li>
              <li className="flex items-center text-gray-400">
                <Mail size={16} className="mr-2" />
                <span>carter@trustednetworx.com</span>
              </li>
              <li className="flex items-center text-gray-400">
                <MapPin size={16} className="mr-2" />
                <span>18001 Old Cutler Rd, Miami, FL 33157</span>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-gray-800 text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} TrustedNetworx. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
