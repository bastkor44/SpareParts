import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setUser, clearUser } from "../redux/userSlice";
import { MdPerson, MdDelete } from "react-icons/md";
import { ToastContainer, toast, Slide } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

const Profile = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    phno: "",
    address: "",
  });

  // Fetch user profile data from Django on mount
  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/user/profile/", {
          withCredentials: true, // Include cookies if using session auth
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`, // If using JWT
          },
        });

        dispatch(setUser(response.data));
        setFormData({
          username: response.data.username || "",
          email: response.data.email || "",
          phno: response.data.phno || "",
          address: response.data.address || "",
        });
      } catch (error) {
        console.error("Failed to fetch user:", error);
        toast("Error fetching profile", { type: "error" });
      }
    };

    fetchUserProfile();
  }, [dispatch]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.put("http://localhost:8000/api/user/profile/", formData, {
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      dispatch(setUser(response.data));
      toast("Profile updated successfully", {
        type: "success",
        position: "top-center",
        autoClose: 2000,
        theme: "colored",
      });
    } catch (error) {
      console.error("Failed to update:", error);
      toast("Error updating profile", { type: "error" });
    }
  };

  const handleDeleteProfile = async () => {
    try {
      await axios.delete("http://localhost:8000/api/user/profile/", {
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      dispatch(clearUser());
      toast("Deleted successfully", {
        type: "error",
        position: "top-center",
        autoClose: 2000,
        theme: "colored",
      });
    } catch (error) {
      console.error("Failed to delete:", error);
      toast("Error deleting profile", { type: "error" });
    }
  };

  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl font-semibold text-center my-7">Profile</h1>

      <div className="flex justify-center mb-4">
        <div className="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center">
          <MdPerson size={40} className="text-gray-500" />
        </div>
      </div>

      {user ? (
        <div className="mb-6">
          <h2 className="text-2xl font-semibold">User Info</h2>
          <div className="space-y-2">
            <p><strong>Username:</strong> {user.username}</p>
            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>Phone Number:</strong> {user.phno}</p>
            <p><strong>Address:</strong> {user.address}</p>
          </div>
        </div>
      ) : (
        <p className="text-center">No user data available</p>
      )}

      <form className="flex flex-col gap-4" onSubmit={handleUpdate}>
        <input
          type="text"
          id="username"
          placeholder="Username"
          value={formData.username}
          onChange={handleChange}
          className="border p-3 rounded-lg"
        />
        <input
          type="email"
          id="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          className="border p-3 rounded-lg"
        />
        <input
          type="text"
          id="phno"
          placeholder="Phone Number"
          value={formData.phno}
          onChange={handleChange}
          className="border p-3 rounded-lg"
        />
        <input
          type="text"
          id="address"
          placeholder="Address"
          value={formData.address}
          onChange={handleChange}
          className="border p-3 rounded-lg"
        />

        <div className="flex justify-between items-center mt-4">
          <button
            type="submit"
            className="bg-slate-700 text-white px-6 py-3 rounded-lg hover:bg-slate-900 uppercase"
          >
            Save Profile
          </button>
          <button
            onClick={handleDeleteProfile}
            title="Delete Profile"
            className="bg-red-600 px-4 py-3 rounded-lg hover:bg-red-800 text-white flex items-center gap-2"
          >
            <MdDelete size={20} />
            Delete
          </button>
        </div>
      </form>

      <ToastContainer transition={Slide} />
    </div>
  );
};

export default Profile;
