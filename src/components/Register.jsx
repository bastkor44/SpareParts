import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Register() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    contact: "",
    address: "",
  });

  const navigate = useNavigate(); 
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    localStorage.setItem("user", JSON.stringify(formData));

    setSuccess(true);

    setTimeout(() => {
      navigate("/login");
    }, 1500);
  };

  return (
    <div className="p-3 max-w-lg mx-auto mt-[120px] mb-80">
      <h1 className="text-3xl text-center font-semibold my-7">Sign Up</h1>

      {success && (
        <p className="text-green-600 bg-green-100 p-3 rounded-lg">
          Successfully registered! Redirecting to login...
        </p>
      )}

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="text"
          name="username"
          value={formData.username}
          onChange={handleChange}
          placeholder="Username..."
          className="border p-3 rounded-lg"
          required
        />
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="email@.com..."
          className="border p-3 rounded-lg"
          required
        />
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="Enter your password..."
          className="border p-3 rounded-lg"
          required
        />
        <input
          type="text"
          name="contact"
          value={formData.contact}
          onChange={handleChange}
          placeholder="Contact number..."
          className="border p-3 rounded-lg"
          required
        />
        <input
          type="text"
          name="address"
          value={formData.address}
          onChange={handleChange}
          placeholder="Your address..."
          className="border p-3 rounded-lg"
          required
        />

        <button
          type="submit"
          className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-70"
        >
          Sign Up
        </button>
      </form>

      <div className="flex gap-2 mt-5">
        <p>Have an account?</p>
        <Link to={"/login"}>
          <span className="text-blue-700 hover:underline">Sign In</span>
        </Link>
      </div>
    </div>
  );
}

export default Register;
