import React, { useState } from 'react';
import { AiFillHome } from 'react-icons/ai';
import { RiUserSettingsFill } from 'react-icons/ri';
import { Link, useNavigate } from 'react-router-dom';

function ManageUserss() {
  const navigate = useNavigate();

  const handleLogout = () => {
    console.log("User logged out");
    navigate("/login");
  };

  const [users, setUsers] = useState([
    { id: 1, username: 'JohnDoe', email: 'john@example.com', phone: '9876543210', address: '123 Main St, Kochi' },
    { id: 2, username: 'JaneSmith', email: 'jane@example.com', phone: '9876543211', address: '456 Market Rd, Kochi' },
  ]);

  const handleEdit = (id) => {
    console.log(`Edit user with ID: ${id}`);
    // Implement edit functionality here
  };

  const handleDelete = (id) => {
    console.log(`Delete user with ID: ${id}`);
    setUsers(users.filter(user => user.id !== id));
  };

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
      <h2 className="text-2xl font-bold text-gray-700 mb-6 text-center">Manage Users</h2>

        {/* Users Table */}
        <div className="overflow-x-auto max-w-screen-xl mx-auto">
          <table className="min-w-full bg-white shadow-md rounded-xl overflow-hidden border border-gray-200">
            <thead className="bg-slate-100">
              <tr>
                <th className="py-3 px-4 text-left text-gray-600 font-bold">Username</th>
                <th className="py-3 px-4 text-left text-gray-600 font-bold">Email</th>
                <th className="py-3 px-4 text-left text-gray-600 font-bold">Phone No</th>
                <th className="py-3 px-4 text-left text-gray-600 font-bold">Address</th>
                <th className="py-3 px-4 text-left text-gray-600 font-bold">Action</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id} className="border-t border-gray-200">
                  <td className="py-3 px-4">{user.username}</td>
                  <td className="py-3 px-4">{user.email}</td>
                  <td className="py-3 px-4">{user.phone}</td>
                  <td className="py-3 px-4">{user.address}</td>
                  <td className="py-3 px-4 flex gap-2">
                    <button
                      onClick={() => handleEdit(user.id)}
                      className="bg-green-500 text-white px-3 py-1 rounded hover:bg-yellow-700"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(user.id)}
                      className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-700"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}

export default ManageUserss;
