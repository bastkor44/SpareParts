import React, { useState } from 'react';
import { AiFillHome } from 'react-icons/ai';
import { RiUserSettingsFill } from 'react-icons/ri';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const CreateListing = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    console.log("User logged out");
    navigate("/login");
  };

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    type: '',
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    for (const key in formData) {
      data.append(key, formData[key]);
    }

    try {
      const response = await fetch('http://localhost:8000/api/listings/', {
        method: 'POST',
        body: data,
        credentials: 'include', // important if using session auth or JWT with cookies
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || 'Failed to create listing');
      }

      toast.success("Listing created successfully!");
      setTimeout(() => {
        navigate("/adminboard/list");
      }, 2000);
    } catch (error) {
      console.error("Error creating listing:", error.message);
      toast.error(`Error: ${error.message}`);
    }
  };

  return (
    <>
      <header className="bg-slate-200 shadow-md py-3">
        <div className="max-w-screen-xl mx-auto flex justify-between items-center px-4 sm:px-6 py-2">
          <div className="flex items-center gap-2">
            <Link to="/managerboard" className="flex items-center gap-2">
              <RiUserSettingsFill className="text-blue-900 text-4xl" />
              <h1 className="font-bold text-lg sm:text-xl flex flex-wrap">
                <span className="text-slate-400">Auto</span>
                <span className="text-slate-700">SpareX</span>
              </h1>
            </Link>
          </div>

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

      <div className="max-w-xl mx-auto p-6 bg-slate-100 rounded-xl shadow-md mt-24">
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
            name="type"
            className="w-full p-2 border rounded"
            value={formData.type}
            onChange={handleChange}
            required
          >
            <option value="">Select type</option>
            <option value="Fourwheeler">Fourwheeler</option>
            <option value="Twowheeler">Twowheeler</option>
          </select>
          <select
            name="category"
            className="w-full p-2 border rounded"
            value={formData.category}
            onChange={handleChange}
            required
          >
            <option value="">Select category</option>
            <option value="Interior parts">Interior parts</option>
            <option value="Exterior parts">Exterior parts</option>
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
          <div className="w-full p-2 border rounded">
            <label className="block">Upload Image</label>
            <input
              type="file"
              name="image"
              accept="image/*"
              className="w-full p-2"
              onChange={handleChange}
              required
            />
            {formData.image && (
              <div className="mt-4 flex flex-col items-center">
                <img
                  src={URL.createObjectURL(formData.image)}
                  alt="Selected"
                  className="w-32 h-32 object-cover rounded"
                />
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, image: null })}
                  className="mt-2 text-red-600 hover:text-red-800"
                >
                  Change Image
                </button>
              </div>
            )}
          </div>
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

export default CreateListing;
