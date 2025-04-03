
import React from "react";
import { Car, Phone, Mail, MapPin } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-mot text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center">
              <Car className="h-8 w-8" />
              <span className="ml-2 text-xl font-bold">MOT Buddy</span>
            </div>
            <p className="mt-4 text-gray-300 text-sm">
              Your reliable partner for MOT testing and vehicle maintenance.
              We make booking your MOT test simple and stress-free.
            </p>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-300 hover:text-white transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/booking" className="text-gray-300 hover:text-white transition-colors">
                  Book MOT
                </Link>
              </li>
              <li>
                <Link to="/my-bookings" className="text-gray-300 hover:text-white transition-colors">
                  My Bookings
                </Link>
              </li>
              <li>
                <Link to="/dashboard" className="text-gray-300 hover:text-white transition-colors">
                  Staff Portal
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <div className="space-y-3">
              <div className="flex items-center">
                <Phone size={16} className="mr-2" />
                <span className="text-gray-300">+44 1234 567890</span>
              </div>
              <div className="flex items-center">
                <Mail size={16} className="mr-2" />
                <span className="text-gray-300">info@motbuddy.com</span>
              </div>
              <div className="flex items-center">
                <MapPin size={16} className="mr-2" />
                <span className="text-gray-300">123 Garage Street, London, UK</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t border-gray-700">
          <p className="text-center text-gray-300 text-sm">
            © {new Date().getFullYear()} MOT Buddy. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
