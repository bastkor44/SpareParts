import React, { useState } from "react";
import { RiUserSettingsFill } from "react-icons/ri";
import { IoMdMenu, IoMdClose, IoMdArrowDropdown } from "react-icons/io";
import { useNavigate } from "react-router-dom"; // import useNavigate from react-router-dom

function Header() {
  // State for menu toggle, dropdown, and selected product
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const navigate = useNavigate(); // Hook to navigate programmatically

  // Function to handle product selection
  const handleProductSelect = (product) => {
    setSelectedProduct(product);
    setDropdownOpen(false); // Close dropdown after selection

    // Redirect the user to the appropriate page for the selected product
    if (product === "Two Wheeler") {
      navigate("/twowheeler"); // Redirect to /twowheeler
    } else if (product === "Four Wheeler") {
      navigate("/fourwheeler"); // Redirect to /fourwheeler
    }
  };

  return (
    <header className="bg-slate-200 shadow-md py-4">
      <div className="flex justify-between items-center max-w-6xl mx-auto px-6">

        {/* Logo */}

        <a href="/" className="flex items-center gap-2">
          <RiUserSettingsFill className="text-blue-900 text-3xl" />
          <h1 className="font-bold text-lg sm:text-xl flex flex-wrap">
            <span className="text-slate-600"></span>
            <span className="text-slate-800">Estate</span>
          </h1>
        </a>

        
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="sm:hidden text-slate-800 text-2xl focus:outline-none"
        >
          {menuOpen ? (
            <IoMdClose className="text-2xl" />
          ) : (
            <IoMdMenu className="text-2xl" />
          )}
        </button>

        {/* NAV */}

        <ul
          className={`sm:flex sm:gap-6 items-center text-slate-700 font-medium absolute sm:relative top-16 sm:top-0 left-0 w-full sm:w-auto bg-slate-200 sm:bg-transparent shadow-md sm:shadow-none p-6 sm:p-0 ${
            menuOpen ? "block" : "hidden"
          }`}
        >
          <a href="/" className="block sm:inline hover:underline">
            <li>Home</li>
          </a>
          <a href="/about" className="block sm:inline hover:underline">
            <li>About</li>
          </a>

          {/* PRODUCTS */}

          <li className="relative block sm:inline">
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
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
              <div className="absolute left-0 top-full bg-white shadow-lg rounded-lg w-48 mt-2">
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

          <a href="/profile" className="block sm:inline hover:underline">
            <li>Profile</li>
          </a>
        </ul>
      </div>

     
    </header>
  );
}

export default Header;
