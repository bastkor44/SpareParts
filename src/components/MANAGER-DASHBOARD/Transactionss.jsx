import React from 'react';
import { AiFillHome } from 'react-icons/ai';
import { RiUserSettingsFill } from 'react-icons/ri';
import { Link, useNavigate } from 'react-router-dom';

function Transactionss() {
  const navigate = useNavigate();

  const handleLogout = () => {
    console.log("User logged out");
    navigate("/login");
  };

  // Demo transaction data
  const demoTransactions = [
    {
      id: 1,
      username: 'JohnDoe',
      email: 'john@example.com',
      contactNo: '9876543210',
      paymentMethod: 'Credit Card',
      paymentStatus: 'Completed',
    },
    {
      id: 2,
      username: 'JaneSmith',
      email: 'jane@example.com',
      contactNo: '9876543211',
      paymentMethod: 'PayPal',
      paymentStatus: 'Pending',
    },
    {
      id: 3,
      username: 'BobJohnson',
      email: 'bob@example.com',
      contactNo: '9876543212',
      paymentMethod: 'Bank Transfer',
      paymentStatus: 'Failed',
    },
  ];

  return (
    <div>
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

      {/* Content Section */}
      <main className="px-4 md:px-8 py-10">
      <h2 className="text-2xl font-bold text-gray-700 mb-6 text-center">Transactions</h2>

        {/* Transactions Table */}
        <div className="overflow-x-auto max-w-screen-xl mx-auto">
          <table className="min-w-full bg-white shadow-md rounded-xl overflow-hidden border border-gray-200">
            <thead className="bg-slate-100">
              <tr>
                <th className="py-3 px-4 text-left text-gray-600 font-bold">Username</th>
                <th className="py-3 px-4 text-left text-gray-600 font-bold">Email</th>
                <th className="py-3 px-4 text-left text-gray-600 font-bold">Contact No</th>
                <th className="py-3 px-4 text-left text-gray-600 font-bold">Payment Method</th>
                <th className="py-3 px-4 text-left text-gray-600 font-bold">Payment Status</th>
              </tr>
            </thead>
            <tbody>
              {demoTransactions.map((transaction) => (
                <tr key={transaction.id} className="border-t border-gray-200">
                  <td className="py-3 px-4">{transaction.username}</td>
                  <td className="py-3 px-4">{transaction.email}</td>
                  <td className="py-3 px-4">{transaction.contactNo}</td>
                  <td className="py-3 px-4">{transaction.paymentMethod}</td>
                  <td className="py-3 px-4">{transaction.paymentStatus}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}

export default Transactionss;
