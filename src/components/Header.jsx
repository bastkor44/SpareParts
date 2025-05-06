import React, { useState } from "react";
import { RiUserSettingsFill } from "react-icons/ri";
import { IoMdMenu, IoMdClose, IoMdArrowDropdown } from "react-icons/io";
import { FaUserCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

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
      <div className="flex justify-between items-center w-full px-2 sm:px-4 py-2 relative">
        <a href="/" className="flex items-center gap-2 sm:gap-3 ml-18">
          <RiUserSettingsFill className="text-blue-900 text-4xl sm:text-5xl" />
          <h1 className="font-bold text-lg sm:text-xl flex flex-wrap">
            <span className="text-slate-400">Auto</span>
            <span className="text-slate-700">SpareX</span>
          </h1>
        </a>

        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="sm:hidden text-slate-800 text-2xl focus:outline-none"
        >
          {menuOpen ? <IoMdClose /> : <IoMdMenu />}
        </button>

        <ul
          className={`sm:flex sm:gap-6 items-center text-slate-700 font-medium absolute sm:relative top-16 sm:top-0 left-0 w-full sm:w-auto bg-slate-200 sm:bg-transparent mr-90 shadow-md sm:shadow-none p-6 sm:p-0 ${
            menuOpen ? "block" : "hidden"
          } z-50`}  // Added z-50 to ensure it stays above other content
        >
          <a href="/" className="block sm:inline hover:underline">
            <li>Home</li>
          </a>
          <a href="/about" className="block sm:inline hover:underline">
            <li>About</li>
          </a>

          {/* PRODUCTSS */}
          <li className="relative block sm:inline">
            <button
              onClick={() => {
                setDropdownOpen(!dropdownOpen);
                setProfileOpen(false); 
              }}
              className="flex items-center text-slate-700 hover:underline cursor-pointer"
            >
              Products
              <IoMdArrowDropdown

              
                className={`ml-2 transition-transform duration-200 ease-in-out ${
                  dropdownOpen ? "rotate-180" : "rotate-0"
                }`}
              />
            </button>

            {dropdownOpen && (
              <div className="absolute left-0 top-full bg-white shadow-lg rounded-lg w-48 mt-2 z-50">
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

          {/* PROFILEEEE */}
          <li className="relative block sm:inline">
            <button
              onClick={() => {
                setProfileOpen(!profileOpen);
                setDropdownOpen(false);
              }}
              className="flex items-center gap-1 text-slate-700 hover:underline cursor-pointer"
            >
              <FaUserCircle className="text-xl" />
              <span>Profile</span>
            </button>

            {profileOpen && (
              <div className="absolute right-0 top-full mt-2 bg-white shadow-lg rounded-lg w-48 z-50">
                <a
                  href="/wishlist"
                  className="flex items-center px-4 py-2 text-slate-700 hover:bg-gray-100"
                >
                  <span className="mr-2">❤️</span> Wishlist
                </a>
                <a
                  href="/cart"
                  className="flex items-center px-4 py-2 text-slate-700 hover:bg-gray-100"
                >
                  <span className="mr-2">🛒</span> Cart
                </a>
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
          {/* LOGIN / REGISTER */}
<li className="block sm:inline mt-2 sm:mt-0">
  <a
    href="/login"
    className="inline-block text-sm sm:text-base text-white bg-slate-600 hover:bg-slate-800 px-4 py-2 rounded-full transition duration-300 mr-2"
  >
    Login
  </a>
  <a
    href="/register"
    className="inline-block text-sm sm:text-base text-slate-800 border border-slate-800 hover:bg-slate-800 hover:text-white px-4 py-2 rounded-full transition duration-300"
  >
    Register
  </a>
</li>

        </ul>
      </div>
    </header>
  );
}

export default Header;
