import React, { useState } from "react";
import { AiFillHome } from "react-icons/ai";
import { RiUserSettingsFill } from "react-icons/ri";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AddCategoryy = () => {
  const [categoryName, setCategoryName] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!categoryName.trim()) {
      toast.error("Category name is required");
      return;
    }

    try {
      const response = await fetch("http://localhost:8000/api/categories/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name: categoryName }),
        credentials: "include",
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.detail || "Failed to add category");
      }

      toast.success("New category added!");
      setTimeout(() => {
        navigate("/adminboard/list");
      }, 2000);

    } catch (error) {
      console.error("Error adding category:", error.message);
      toast.error(`Error: ${error.message}`);
    }
  };

  return (
    <>
      <header className="bg-slate-200 shadow-md py-3">
        <div className="max-w-screen-xl mx-auto flex justify-between items-center px-4 sm:px-6 py-2">
          <div className="flex items-center gap-2">
            <Link to="/adminboard" className="flex items-center gap-2">
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
          </div>
        </div>
      </header>

      <div className="max-w-xl mx-auto p-6 bg-slate-100 rounded-xl shadow-md mt-24">
        <h2 className="text-2xl font-bold mb-6 text-center">Add New Category</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="category"
            placeholder="Category name"
            className="w-full p-2 border rounded"
            value={categoryName}
            onChange={(e) => setCategoryName(e.target.value)}
            required
          />
          <button
            type="submit"
            className="w-full bg-slate-600 text-white py-2 rounded hover:bg-slate-800 transition duration-200"
          >
            Submit
          </button>
        </form>
      </div>

      <ToastContainer position="top-center" />
    </>
  );
};

export default AddCategoryy;
