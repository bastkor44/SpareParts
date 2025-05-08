import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { RiUserSettingsFill } from "react-icons/ri";
import { IoMdMenu, IoMdClose, IoMdArrowDropdown } from "react-icons/io";
import { FaUserCircle } from "react-icons/fa";
import { VscSignIn } from "react-icons/vsc";

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  const navigate = useNavigate();

  const handleProductSelect = (product) => {
    setDropdownOpen(false);
    if (product === "Two Wheeler") {
      navigate("/twowheeler");
    } else if (product === "Four Wheeler") {
      navigate("/fourwheeler");
    }
  };

  return (
    <header className="bg-slate-200 shadow-md py-3">
      <div className="max-w-screen-xl mx-auto flex justify-between items-center px-4 sm:px-6 py-2 relative">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 sm:gap-3">
          <RiUserSettingsFill className="text-blue-900 text-4xl sm:text-5xl" />
          <h1 className="font-bold text-lg sm:text-xl flex flex-wrap">
            <span className="text-slate-400">Auto</span>
            <span className="text-slate-700">SpareX</span>
          </h1>
        </Link>

        {/* Toggle Button */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="sm:hidden text-slate-800 text-3xl focus:outline-none"
        >
          {menuOpen ? <IoMdClose /> : <IoMdMenu />}
        </button>

        {/* Menu Items */}
        <ul
          className={`absolute sm:relative top-16 sm:top-0 left-0 w-full sm:w-auto bg-slate-200 sm:bg-transparent shadow-md sm:shadow-none p-6 sm:p-0 transition-all duration-300 ease-in-out z-50 ${
            menuOpen ? "block" : "hidden sm:flex"
          } sm:flex sm:items-center sm:gap-6 text-slate-700 font-medium justify-center`}
        >
          <li>
            <Link to="/" className="block py-2 sm:py-0 hover:underline">
              Home
            </Link>
          </li>
          <li>
            <Link to="/about" className="block py-2 sm:py-0 hover:underline">
              About
            </Link>
          </li>

          {/* Products Dropdown */}
          <li className="relative">
            <button
              onClick={() => {
                setDropdownOpen(!dropdownOpen);
                setProfileOpen(false);
              }}
              className="flex items-center py-2 sm:py-0 hover:underline"
            >
              Products
              <IoMdArrowDropdown
                className={`ml-1 transition-transform duration-200 ${
                  dropdownOpen ? "rotate-180" : "rotate-0"
                }`}
              />
            </button>
            {dropdownOpen && (
              <div className="absolute left-0 top-full mt-2 bg-white shadow-lg rounded-lg w-48 z-50">
                <button
                  onClick={() => handleProductSelect("Two Wheeler")}
                  className="block px-4 py-2 text-slate-700 hover:bg-gray-100 w-full text-left"
                >
                  Two Wheeler
                </button>
                <button
                  onClick={() => handleProductSelect("Four Wheeler")}
                  className="block px-4 py-2 text-slate-700 hover:bg-gray-100 w-full text-left"
                >
                  Four Wheeler
                </button>
              </div>
            )}
          </li>

          {/* Profile Dropdown */}
          <li className="relative">
            <button
              onClick={() => {
                setProfileOpen(!profileOpen);
                setDropdownOpen(false);
              }}
              className="flex items-center gap-1 py-2 sm:py-0 hover:underline"
            >
              <FaUserCircle className="text-xl" />
              <span>Profile</span>
            </button>
            {profileOpen && (
              <div className="absolute right-0 top-full mt-2 bg-white shadow-lg rounded-lg w-48 z-50">
                <Link
                  to="/wishlist"
                  className="flex items-center px-4 py-2 text-slate-700 hover:bg-gray-100"
                >
                  <span className="mr-2">❤️</span> Wishlist
                </Link>
                <Link
                  to="/cart"
                  className="flex items-center px-4 py-2 text-slate-700 hover:bg-gray-100"
                >
                  <span className="mr-2">🛒</span> Cart
                </Link>
                <button
                  onClick={() => {
                    console.log("User logged out");
                    navigate("/login");
                  }}
                  className="flex items-center w-full px-4 py-2 text-slate-700 hover:bg-gray-100 text-left"
                >
                  <span className="mr-2">🚪</span> Logout
                </button>
              </div>
            )}
          </li>

          {/* Login Button */}
          <li className="mt-4 sm:mt-0">
            <Link
              to="/login"
              className="inline-flex items-center gap-2 text-sm sm:text-base text-white bg-slate-600 hover:bg-slate-900 px-4 py-2 rounded-full transition duration-300"
            >
              <span>Sign-in</span>
              <VscSignIn />
            </Link>
          </li>
        </ul>
      </div>
    </header>
  );
}

export default Header;
