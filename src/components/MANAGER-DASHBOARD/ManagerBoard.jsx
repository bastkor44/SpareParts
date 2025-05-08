import React from "react";
import { useNavigate, Link } from "react-router-dom";
import { RiUserSettingsFill } from "react-icons/ri";
import { FaClipboardList, FaMoneyBillWave } from "react-icons/fa";
import { AiFillHome } from "react-icons/ai"; // Home icon

function ManagerBoard({ totalListings = 0, totalOrders = 0, totalTransactions = 0 }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    console.log("User logged out");
    navigate("/login");
  };

  return (
    <>
      {/* Header */}
      <header className="bg-slate-200 shadow-md py-3">
        <div className="max-w-screen-xl mx-auto flex justify-between items-center px-4 sm:px-6 py-2">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <Link to="/managerboard" className="flex items-center gap-2">
              <RiUserSettingsFill className="text-blue-900 text-4xl" />
              <h1 className="font-bold text-lg sm:text-xl flex flex-wrap">
                <span className="text-slate-400">Auto</span>
                <span className="text-slate-700">SpareX</span>
              </h1>
            </Link>
          </div>

          {/* Home Icon & Logout Button */}
          <div className="flex items-center gap-4">
            <Link
              to="/managerboard"
              className="text-slate-500 hover:text-slate-900 text-2xl"
              title="Dashboard Home"
            >
              <AiFillHome />
            </Link>
            <button
              onClick={handleLogout}
              className="bg-slate-600 text-white font-semibold uppercase px-5 py-2 rounded-md shadow-md hover:bg-slate-900 transition duration-200"
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="min-h-screen mt-[50px] flex flex-col items-center px-4 py-10 md:px-8">
        {/* Welcome */}
        <div className="text-center max-w-3xl mb-8 flex flex-col items-center">
          <h1 className="text-gray-700 font-bold text-3xl lg:text-4xl">
            Welcome to <span className="text-slate-500">ManagerBoard</span>
          </h1>
        </div>

        {/* Stats */}
        <div className="max-w-4xl grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 w-full mt-6">
          {/* Total Listings Card */}
          <Link
            to="/managerboard/list"
            className="bg-slate-200 p-5 rounded-xl shadow-md flex flex-col items-center justify-center text-center hover:scale-105 transition-all duration-300 border border-slate-300 cursor-pointer"
          >
            <FaClipboardList className="text-gray-500 text-5xl mb-2" />
            <h2 className="text-gray-600 text-lg font-bold">Listings</h2>
            <p className="text-gray-800 text-2xl font-extrabold mt-1">{totalListings}</p>
          </Link>

          {/* Total Orders Card */}
          <Link
            to="/managerboard/order"
            className="bg-slate-200 p-5 rounded-xl shadow-md flex flex-col items-center justify-center text-center hover:scale-105 transition-all duration-300 border border-slate-300 cursor-pointer"
          >
            <FaClipboardList className="text-gray-500 text-5xl mb-2" />
            <h2 className="text-gray-600 text-lg font-bold"> Orders</h2>
            <p className="text-gray-800 text-2xl font-extrabold mt-1">{totalOrders}</p>
          </Link>

          {/* Total Transactions Card */}
          <Link
            to="/managerboard/transaction"
            className="bg-slate-200 p-5 rounded-xl shadow-md flex flex-col items-center justify-center text-center hover:scale-105 transition-all duration-300 border border-slate-300 cursor-pointer"
          >
            <FaMoneyBillWave className="text-gray-500 text-5xl mb-2" />
            <h2 className="text-gray-600 text-lg font-bold"> Transactions</h2>
            <p className="text-gray-800 text-2xl font-extrabold mt-1">{totalTransactions}</p>
          </Link>
        </div>

        {/* Quick Actions */}
        <div className="max-w-3xl mt-10 text-center flex flex-col items-center">
          <h3 className="text-slate-700 text-lg font-bold mb-4">Quick Actions</h3>
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <button
              className="bg-slate-700 text-white py-3 px-6 rounded-lg text-sm font-semibold hover:bg-slate-800 transition-all shadow-md transform hover:scale-105"
              onClick={() => navigate("/managerboard/user")}
            >
              Manage Users
            </button>
          
          </div>
        </div>
      </div>
    </>
  );
}

export default ManagerBoard;
