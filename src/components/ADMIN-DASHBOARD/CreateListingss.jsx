import React, { useState, useEffect } from 'react';
import { AiFillHome } from 'react-icons/ai';
import { RiUserSettingsFill } from 'react-icons/ri';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from "../../lib/axios"; // your configured axios instance

const CreateListingss = () => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    vehicle_type: '',
    category: '',
    price: '',
    picture: null,
    quantity: '',
  });

  // Fetch categories from backend
  useEffect(() => {
    axios.get("/api/products/categories/", { withCredentials: true })
      .then(res => setCategories(res.data))
      .catch(err => console.error("Failed to load categories", err));
  }, []);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'picture') {
      setFormData({ ...formData, picture: files[0] });
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
      const res = await axios.post("/api/products/add/", data, {
        withCredentials: true,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      toast.success("Listing created successfully!");
      setTimeout(() => {
        navigate("/adminboard/list");
      }, 2000);
    } catch (error) {
      console.error("Error creating listing:", error.response?.data || error.message);
      const errMsg = error.response?.data?.error || error.response?.data?.detail || "An error occurred.";
      toast.error(`Error: ${errMsg}`);
    }
  };

  const handleLogout = () => {
    navigate("/login");
  };

  return (
    <>
      <header className="bg-slate-200 shadow-md py-3">
        <div className="max-w-screen-xl mx-auto flex justify-between items-center px-4 sm:px-6 py-2">
          <Link to="/managerboard" className="flex items-center gap-2">
            <RiUserSettingsFill className="text-blue-900 text-4xl" />
            <h1 className="font-bold text-lg sm:text-xl">
              <span className="text-slate-400">Auto</span>
              <span className="text-slate-700">SpareX</span>
            </h1>
          </Link>
          <div className="flex items-center gap-4">
            <Link to="/adminboard" className="text-slate-500 hover:text-slate-900 text-2xl">
              <AiFillHome />
            </Link>
            <button onClick={handleLogout} className="bg-slate-600 text-white px-5 py-2 rounded hover:bg-slate-900">
              Logout
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-xl mx-auto p-6 bg-slate-100 rounded-xl shadow-md mt-24">
        <h2 className="text-2xl font-bold mb-6 text-center">Create New Listing</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input type="text" name="name" placeholder="Name" className="w-full p-2 border rounded"
            value={formData.name} onChange={handleChange} required />
          
          <textarea name="description" placeholder="Description" className="w-full p-2 border rounded"
            value={formData.description} onChange={handleChange} required />

          <select name="vehicle_type" className="w-full p-2 border rounded" value={formData.vehicle_type} onChange={handleChange} required>
            <option value="">Select type</option>
            <option value="two wheeler">Two Wheeler</option>
            <option value="four wheeler">Four Wheeler</option>
          </select>

          <select name="category" className="w-full p-2 border rounded" value={formData.category} onChange={handleChange} required>
            <option value="">Select category</option>
            {categories.map(cat => (
              <option key={cat.category_id} value={cat.category_id}>
                {cat.category_name}
              </option>
            ))}
          </select>

          <input type="text" name="price" placeholder="Price" className="w-full p-2 border rounded"
            value={formData.price} onChange={handleChange} required />

          <div className="w-full p-2 border rounded">
            <label className="block">Upload Image</label>
            <input type="file" name="picture" accept="image/*" className="w-full p-2" onChange={handleChange} required />
            {formData.picture && (
              <div className="mt-4 flex flex-col items-center">
                <img src={URL.createObjectURL(formData.picture)} alt="Selected" className="w-32 h-32 object-cover rounded" />
                <button type="button" onClick={() => setFormData({ ...formData, picture: null })} className="mt-2 text-red-600 hover:text-red-800">
                  Change Image
                </button>
              </div>
            )}
          </div>

          <input type="number" name="quantity" placeholder="Quantity" className="w-full p-2 border rounded"
            value={formData.quantity} onChange={handleChange} min="1" required />

          <button type="submit" className="w-full bg-slate-600 text-white py-2 rounded hover:bg-slate-800">
            Create Listing
          </button>
        </form>
      </div>
      <ToastContainer position="top-center" />
    </>
  );
};

export default CreateListingss;
