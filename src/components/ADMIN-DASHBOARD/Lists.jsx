import { AiFillHome } from "react-icons/ai";
import { RiUserSettingsFill } from "react-icons/ri";
import { Link, useNavigate } from "react-router-dom";

function Lists() {
  const navigate = useNavigate();

  const handleLogout = () => {
    console.log("User logged out");
    navigate("/login");
  };

  // Demo data
  const demoListings = [
    {
      id: 1,
      image: "https://via.placeholder.com/100",
      name: "Brake Pad",
      description: "High-quality brake pad for two-wheelers.",
      vehicle_type: "Two-Wheeler",
      category: "Twowheeler",
      price: 120,
      stock: 35,
    },
    {
      id: 2,
      image: "https://via.placeholder.com/100",
      name: "Engine Oil",
      description: "Synthetic engine oil for all types of engines.",
      vehicle_type: "Four-Wheeler",
      category: "Fourwheeler",
      price: 80,
      stock: 60,
    },
    {
      id: 3,
      image: "https://via.placeholder.com/100",
      name: "Air Filter",
      description: "Air filter for various vehicle engines.",
      vehicle_type: "Two-Wheeler",
      category: "Twowheeler",
      price: 25,
      stock: 100,
    },
    {
      id: 4,
      image: "https://via.placeholder.com/100",
      name: "Tire",
      description: "Durable tire for four-wheelers.",
      vehicle_type: "Four-Wheeler",
      category: "Fourwheeler",
      price: 150,
      stock: 20,
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
        <h2 className="text-2xl font-bold text-gray-700 mb-6 text-center">
          Manage Listing
        </h2>

        {/* Create Listing & Add Category Buttons */}
        <div className="flex justify-center gap-4 mb-8">
          <button
            onClick={() => navigate("/adminboard/createlisting")}
            className="bg-slate-500 text-white px-6 py-3 rounded-md shadow hover:bg-slate-800 transition-all"
          >
            Create Listing
          </button>
          <button
            onClick={() => navigate("/adminboard/addcategory")}
            className="bg-slate-600 text-white px-6 py-3 rounded-md shadow hover:bg-slate-900 transition-all"
          >
            Add Category
          </button>
        </div>

        {/* Single Table for All Listings */}
        <div className="max-w-screen-xl mx-auto">
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white shadow-md rounded-xl overflow-hidden border border-gray-200">
              <thead className="bg-slate-100">
                <tr>
                  <th className="py-3 px-4 text-left text-gray-600 font-bold">
                    Product ID
                  </th>
                  <th className="py-3 px-4 text-left text-gray-600 font-bold">
                    Image
                  </th>
                  <th className="py-3 px-4 text-left text-gray-600 font-bold">
                    Name
                  </th>
                  <th className="py-3 px-4 text-left text-gray-600 font-bold">
                    Description
                  </th>
                  <th className="py-3 px-4 text-left text-gray-600 font-bold">
                    Vehicle Type
                  </th>
                  <th className="py-3 px-4 text-left text-gray-600 font-bold">
                    Category
                  </th>
                  <th className="py-3 px-4 text-left text-gray-600 font-bold">
                    Price
                  </th>
                  <th className="py-3 px-4 text-left text-gray-600 font-bold">
                    Stock
                  </th>
                  <th className="py-3 px-4 text-left text-gray-600 font-bold">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {demoListings.map((item) => (
                  <tr key={item.id} className="border-t border-gray-200">
                    <td className="py-3 px-4">{item.id}</td>
                    <td className="py-3 px-4">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-16 h-16 object-cover rounded"
                      />
                    </td>
                    <td className="py-3 px-4">{item.name}</td>
                    <td className="py-3 px-4">{item.description}</td>
                    <td className="py-3 px-4">{item.vehicle_type}</td>
                    <td className="py-3 px-4">{item.category}</td>
                    <td className="py-3 px-4">${item.price}</td>
                    <td className="py-3 px-4">{item.stock}</td>
                    <td className="py-3 px-4 flex gap-2">
                      <button
                        onClick={() => alert("Edit item " + item.id)}
                        className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-700"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => alert("Delete item " + item.id)}
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
        </div>
      </main>
    </div>
  );
}

export default Lists;
