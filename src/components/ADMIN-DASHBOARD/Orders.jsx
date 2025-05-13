import { AiFillHome } from 'react-icons/ai';
import { RiUserSettingsFill } from 'react-icons/ri';
import { FaEdit } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';

function Orders() {
  const navigate = useNavigate();

  const handleLogout = () => {
    console.log("User logged out");
    navigate("/login");
  };

  // Demo data
  const demoOrders = [
    {
      id: 1,
      orderId: 'ORD12345',
      username: 'JohnDoe',
      email: 'john@example.com',
      address: '123 Main St, Kochi',
      phone: '9876543210',
      productName: 'Brake Pad',
      quantity: 2,
      price: 120,
      status: 'Pending',
    },
    {
      id: 2,
      orderId: 'ORD12346',
      username: 'JaneSmith',
      email: 'jane@example.com',
      address: '456 Market Rd, Kochi',
      phone: '9876543211',
      productName: 'Engine Oil',
      quantity: 1,
      price: 80,
      status: 'Shipped',
    },
  ];

  return (
    <div>
      {/* Header */}
      <header className="bg-slate-200 shadow-md py-3">
        <div className="max-w-screen-xl mx-auto flex justify-between items-center px-4 sm:px-6 py-2">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <Link to="/adminboard" className="flex items-center gap-2">
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
              to="/adminboard"
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
        <h2 className="text-2xl font-bold text-gray-700 mb-6 text-center">Manage Orders</h2>

        {/* Orders Table */}
        <div className="overflow-x-auto max-w-screen-xl mx-auto">
          <table className="min-w-full bg-white shadow-md rounded-xl overflow-hidden border border-gray-200">
            <thead className="bg-slate-100">
              <tr>
                <th className="py-3 px-4 text-left text-gray-600 font-bold">Sl. No</th>
                <th className="py-3 px-4 text-left text-gray-600 font-bold">Order ID</th>
                <th className="py-3 px-4 text-left text-gray-600 font-bold">Username</th>
                <th className="py-3 px-4 text-left text-gray-600 font-bold">Email</th>
                <th className="py-3 px-4 text-left text-gray-600 font-bold">Address</th>
                <th className="py-3 px-4 text-left text-gray-600 font-bold">Phone No</th>
                <th className="py-3 px-4 text-left text-gray-600 font-bold">Product Name</th>
                <th className="py-3 px-4 text-left text-gray-600 font-bold">Quantity</th>
                <th className="py-3 px-4 text-left text-gray-600 font-bold">Price</th>
                <th className="py-3 px-4 text-left text-gray-600 font-bold">Status</th>
                <th className="py-3 px-4 text-left text-gray-600 font-bold">Action</th>
              </tr>
            </thead>
            <tbody>
              {demoOrders.map((order, index) => (
                <tr key={order.id} className="border-t border-gray-200">
                  <td className="py-3 px-4">{index + 1}</td>
                  <td className="py-3 px-4">{order.orderId}</td>
                  <td className="py-3 px-4">{order.username}</td>
                  <td className="py-3 px-4">{order.email}</td>
                  <td className="py-3 px-4">{order.address}</td>
                  <td className="py-3 px-4">{order.phone}</td>
                  <td className="py-3 px-4">{order.productName}</td>
                  <td className="py-3 px-4">{order.quantity}</td>
                  <td className="py-3 px-4">${order.price}</td>
                  <td className="py-3 px-4 flex items-center gap-2">
                    {order.status}
                    <button
                      onClick={() => alert(`Edit status for order ${order.id}`)}
                      className="text-blue-500 hover:text-blue-700"
                    >
                      <FaEdit />
                    </button>
                  </td>
                  <td className="py-3 px-4">
                    <button
                      onClick={() => alert(`Cancel order ${order.id}`)}
                      className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-700"
                    >
                      Cancel
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

export default Orders;
