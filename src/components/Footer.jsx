import React from "react";
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaPhoneAlt,
  FaEnvelope,
} from "react-icons/fa";
import { MdLocationOn } from "react-icons/md";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="bg-slate-200 text-white py-10 px-6 mt-10">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 text-sm">
        {/* Brand Info */}
        <div>
          <h2 className="text-2xl font-bold mb-4 text-slate-800">AutoSpareX</h2>
          <p className="text-slate-700">
            Your one-stop shop for premium Two-Wheeler and Four-Wheeler spare
            parts. Quality. Durability. Reliability.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-xl font-semibold mb-4 text-slate-800">
            Quick Links
          </h3>
          <ul className="space-y-2 text-slate-700">
            <li>
              <Link to="/" className="hover:text-slate-900">
                Home
              </Link>
            </li>
            <li>
              <Link to="/about" className="hover:text-slate-900">
                About Us
              </Link>
            </li>
            <li>
              <Link to="/product" className="hover:text-slate-900">
                Explore Parts
              </Link>
            </li>
          </ul>
        </div>

        {/* Products */}
        <div>
          <h3 className="text-xl font-semibold mb-4 text-slate-800">
            Products
          </h3>
          <ul className="space-y-2 text-slate-700">
            <li>
              <Link to="/twowheeler" className="hover:text-slate-900">
                Two Wheeler Parts
              </Link>
            </li>
            <li>
              <Link to="/fourwheeler" className="hover:text-slate-900">
                Four Wheeler Parts
              </Link>
            </li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="text-xl font-semibold mb-4 text-slate-800">
            Contact Us
          </h3>
          <ul className="text-slate-700 space-y-3">
            <li className="flex items-center gap-2">
              <MdLocationOn /> 123 Auto St, Motor City
            </li>
            <li className="flex items-center gap-2">
              <FaPhoneAlt /> +91 98765 43210
            </li>
            <li className="flex items-center gap-2">
              <FaEnvelope /> support@autosparex.com
            </li>
          </ul>
          <div className="flex gap-4 mt-4 text-xl">
            <div className="flex gap-4 mt-4 text-xl">
              <a
                href="#"
                className="bg-blue-100 p-2 rounded-full text-blue-800 hover:text-blue-500 transition-colors duration-300"
                aria-label="Facebook"
              >
                <FaFacebookF />
              </a>
              <a
                href="#"
                className="bg-pink-100 p-2 rounded-full text-pink-800 hover:text-pink-500 transition-colors duration-300"
                aria-label="Instagram"
              >
                <FaInstagram />
              </a>
              <a
                href="#"
                className="bg-blue-100 p-2 rounded-full text-blue-700 hover:text-blue-400 transition-colors duration-300"
                aria-label="LinkedIn"
              >
                <FaLinkedinIn />
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-slate-700 mt-10 pt-4 text-center text-sm text-slate-900">
        &copy; {new Date().getFullYear()} AutoSpareX. All rights reserved.
      </div>
    </footer>
  );
}

export default Footer;
