import React from "react";
import Link from "next/link";
import { Mail, Phone, Facebook, Twitter, Instagram } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-green-900 text-white pt-16 pb-8 w-full">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="flex flex-wrap justify-between gap-8 mb-12">
          {/* Brand Section */}
          <div className="w-full sm:w-72">
            <div className="flex items-center mb-4">
              <div className="mr-2 bg-green-100 text-green-800 p-2 rounded-full">
                <svg
                  className="w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12,2C6.48,2,2,6.48,2,12c0,5.52,4.48,10,10,10s10-4.48,10-10C22,6.48,17.52,2,12,2z M12,16.5 c-0.83,0-1.5-0.67-1.5-1.5h3C13.5,15.83,12.83,16.5,12,16.5z M12,7.5c0.83,0,1.5,0.67,1.5,1.5h-3C10.5,8.17,11.17,7.5,12,7.5z M7.5,12c0-0.83,0.67-1.5,1.5-1.5v3C8.17,13.5,7.5,12.83,7.5,12z M16.5,12c0,0.83-0.67,1.5-1.5,1.5v-3 C15.83,10.5,16.5,11.17,16.5,12z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-green-100">
                Barter Circle Connect
              </h3>
            </div>
            <p className="text-green-100 mb-6">
              Connecting people through skill and goods exchange in a
              sustainable community marketplace.
            </p>
            <div className="flex space-x-4">
              <a
                href="#"
                className="bg-green-800 hover:bg-green-700 p-2 rounded-full transition-colors duration-200"
              >
                <Facebook size={18} />
              </a>
              <a
                href="#"
                className="bg-green-800 hover:bg-green-700 p-2 rounded-full transition-colors duration-200"
              >
                <Twitter size={18} />
              </a>
              <a
                href="#"
                className="bg-green-800 hover:bg-green-700 p-2 rounded-full transition-colors duration-200"
              >
                <Instagram size={18} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="w-full sm:w-48">
            <h4 className="font-semibold text-lg mb-4 text-green-200">
              Quick Links
            </h4>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/"
                  className="text-green-100 hover:text-green-300 flex items-center transition-colors duration-200"
                >
                  <span className="mr-2">→</span> Home
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="text-green-100 hover:text-green-300 flex items-center transition-colors duration-200"
                >
                  <span className="mr-2">→</span> About Us
                </Link>
              </li>
              <li>
               
              </li>
              <li>
                <Link
                  href="/signup"
                  className="text-green-100 hover:text-green-300 flex items-center transition-colors duration-200"
                >
                  <span className="mr-2">→</span> Sign Up
                </Link>
              </li>
              <li>
                <Link
                  href="/login"
                  className="text-green-100 hover:text-green-300 flex items-center transition-colors duration-200"
                >
                  <span className="mr-2">→</span> Login
                </Link>
              </li>
            </ul>
          </div>

          {/* Services Section */}
          <div className="w-full sm:w-48">
            <h4 className="font-semibold text-lg mb-4 text-green-200">
              Our Services
            </h4>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/services/skill-exchange"
                  className="text-green-100 hover:text-green-300 flex items-center transition-colors duration-200"
                >
                  <span className="mr-2">→</span> Skill Exchange
                </Link>
              </li>
              <li>
                <Link
                  href="/services/goods-trading"
                  className="text-green-100 hover:text-green-300 flex items-center transition-colors duration-200"
                >
                  <span className="mr-2">→</span> Goods Trading
                </Link>
              </li>
              <li>
                <Link
                  href="/services/community-events"
                  className="text-green-100 hover:text-green-300 flex items-center transition-colors duration-200"
                >
                  <span className="mr-2">→</span> Community Events
                </Link>
              </li>
              <li>
                <Link
                  href="/services/sustainable-living"
                  className="text-green-100 hover:text-green-300 flex items-center transition-colors duration-200"
                >
                  <span className="mr-2">→</span> Sustainable Living
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Section */}
          <div className="w-full sm:w-56">
            <h4 className="font-semibold text-lg mb-4 text-green-200">
              Contact Us
            </h4>
            <ul className="space-y-3">
              <li className="flex items-center">
                <Mail size={18} className="mr-2 text-green-300" />
                <a
                  href="mailto:support@bartercircle.com"
                  className="text-green-100 hover:text-green-300 transition-colors duration-200"
                >
                  support@bartercircle.com
                </a>
              </li>
              <li className="flex items-center">
                <Phone size={18} className="mr-2 text-green-300" />
                <a
                  href="tel:+919876543210"
                  className="text-green-100 hover:text-green-300 transition-colors duration-200"
                >
                  +91-9876543210
                </a>
              </li>
              
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="pt-8 mt-8 border-t border-green-700 text-center text-green-300 text-sm">
          <p>© 2025 Barter Circle Connect. All rights reserved. 🌿</p>
          <div className="mt-2 flex justify-center space-x-4 text-xs">
            <Link
              href="/privacy"
              className="text-green-400 hover:text-green-200 transition-colors duration-200"
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms"
              className="text-green-400 hover:text-green-200 transition-colors duration-200"
            >
              Terms of Service
            </Link>
            <Link
              href="/cookies"
              className="text-green-400 hover:text-green-200 transition-colors duration-200"
            >
              Cookie Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
