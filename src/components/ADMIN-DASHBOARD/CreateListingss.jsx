import React, { useState } from 'react';
import { AiFillHome } from 'react-icons/ai';
import { RiUserSettingsFill } from 'react-icons/ri';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const CreateListingss = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    console.log("User logged out");
    navigate("/login");
  };

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    category: '',
    price: '',
    image: null,
    quantity: '',
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'image') {
      setFormData({ ...formData, image: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = new FormData();
    for (const key in formData) {
      data.append(key, formData[key]);
    }
    console.log('Form submitted:', Object.fromEntries(data.entries()));
    toast.success("Listing created successfully!");
    setTimeout(() => {
      navigate("/adminboard/list");
    }, 2000);
  };

  return (
    <>
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

      <div className="max-w-xl mx-auto  p-6 bg-slate-100 rounded-xl shadow-md mt-24">
        <h2 className="text-2xl font-bold mb-6 text-center">Create New Listing</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="name"
            placeholder="Name"
            className="w-full p-2 border rounded"
            value={formData.name}
            onChange={handleChange}
            required
          />
          <textarea
            name="description"
            placeholder="Description"
            className="w-full p-2 border rounded"
            value={formData.description}
            onChange={handleChange}
            required
          />
          <select
            name="category"
            className="w-full p-2 border rounded"
            value={formData.category}
            onChange={handleChange}
            required
          >
            <option value="">Select Category</option>
            <option value="Fourwheeler">Fourwheeler</option>
            <option value="Twowheeler">Twowheeler</option>
          </select>
          <input
            type="text"
            name="price"
            placeholder="Price"
            className="w-full p-2 border rounded"
            value={formData.price}
            onChange={handleChange}
            required
          />
          <input
            type="file"
            name="image"
            accept="image/*"
            className="w-full p-2 border rounded"
            onChange={handleChange}
            required
          />
          <input
            type="number"
            name="quantity"
            placeholder="Quantity"
            className="w-full p-2 border rounded"
            value={formData.quantity}
            onChange={handleChange}
            min="1"
            required
          />
          <button
            type="submit"
            className="w-full bg-slate-600 text-white py-2 rounded hover:bg-slate-800"
          >
            Create Listing
          </button>
        </form>
      </div>
      <ToastContainer position="top-center" />
    </>
  );
};

export default CreateListingss;
