import React from "react";
import { Menu, User } from "lucide-react";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  return (
    <div className=" flex flex-col ">
      {/* Navbar */}
      <nav className="bg-white shadow-md lg:px-[100px] md:px-[40px] px-0">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between h-16 items-center">
            {/* Logo */}
            <div className="flex items-center">
              <span className="text-xl font-bold text-blue-600">
                BookingPro
              </span>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <a href="/" className="text-gray-700 hover:text-blue-600">
                Home
              </a>
              <a href="/bookings" className="text-gray-700 hover:text-blue-600">
                Bookings
              </a>
              <a href="/about" className="text-gray-700 hover:text-blue-600">
                About
              </a>
              <a href="/contact" className="text-gray-700 hover:text-blue-600">
                Contact
              </a>
            </div>

            {/* Auth Buttons */}
            <div className="hidden md:flex items-center space-x-4">
              <button className="px-4 py-2 text-gray-700 hover:text-blue-600 flex items-center">
                <User className="h-4 w-4 mr-2" />
                Login
              </button>
              <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
                Register
              </button>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-gray-700 hover:text-blue-600"
              >
                <Menu className="h-6 w-6" />
              </button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <div className="md:hidden py-4">
              <div className="flex flex-col space-y-4">
                <a href="/" className="text-gray-700 hover:text-blue-600">
                  Home
                </a>
                <a
                  href="/bookings"
                  className="text-gray-700 hover:text-blue-600"
                >
                  Bookings
                </a>
                <a href="/about" className="text-gray-700 hover:text-blue-600">
                  About
                </a>
                <a
                  href="/contact"
                  className="text-gray-700 hover:text-blue-600"
                >
                  Contact
                </a>
                <button className="text-gray-700 hover:text-blue-600 flex items-center">
                  <User className="h-4 w-4 mr-2" />
                  Login
                </button>
                <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 w-full">
                  Register
                </button>
              </div>
            </div>
          )}
        </div>
      </nav>
    </div>
  );
};

export default Header;
