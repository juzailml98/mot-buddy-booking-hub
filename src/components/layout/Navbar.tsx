
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Car } from "lucide-react";

const Navbar = () => {
  return (
    <nav className="bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center">
              <Car className="h-8 w-8 text-mot" />
              <span className="ml-2 text-xl font-bold text-mot">MOT Buddy</span>
            </Link>
          </div>
          
          <div className="flex items-center">
            <div className="hidden md:ml-6 md:flex md:space-x-4">
              <Link to="/" className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-mot hover:bg-gray-50">
                Home
              </Link>
              <Link to="/booking" className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-mot hover:bg-gray-50">
                Book MOT
              </Link>
              <Link to="/my-bookings" className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-mot hover:bg-gray-50">
                My Bookings
              </Link>
            </div>
            
            <div className="ml-6">
              <Button asChild variant="outline" className="mr-2 hidden md:inline-flex">
                <Link to="/dashboard">Staff Login</Link>
              </Button>
              <Button asChild className="mot-btn-gradient">
                <Link to="/booking">Book Now</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
