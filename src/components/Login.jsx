import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch } from "react-redux";
import { setUser } from "../redux/userSlice";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:8000/api/login/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (res.ok) {
        dispatch(setUser(data)); // Save user to Redux
        toast.success("Login successful!", {
          position: "top-center",
          autoClose: 2000,
        });

        setTimeout(() => {
          // Redirect based on role
          if (data.role === "admin") {
            navigate("/adminboard");
          } else if (data.role === "manager") {
            navigate("/managerboard");
          } else {
            navigate("/home"); // Default for "user" or unknown roles
          }
        }, 2000);
      } else {
        setError(data.detail || "Invalid credentials");
      }
    } catch (err) {
      setError("Server error. Please try again.");
    }
  };

  return (
    <div className="p-3 max-w-lg mx-auto mt-[150px] mb-80">
      <ToastContainer />

      <h1 className="text-3xl text-center font-semibold my-7">Sign In</h1>

      {error && <p className="text-red-500 bg-red-100 p-2 rounded">{error}</p>}

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="email"
          placeholder="email@.com ..."
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border p-3 rounded-lg"
          required
        />
        <input
          type="password"
          placeholder="Enter your password..."
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border p-3 rounded-lg"
          required
        />
        <button
          type="submit"
          className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95"
        >
          Sign In
        </button>
      </form>

      <div className="text-center mt-3">
        <Link
          to="/forgotpassword"
          className="text-sm text-slate-800 hover:underline"
        >
          Forgot Password?
        </Link>
      </div>

      <div className="flex justify-center gap-2 mt-5">
        <p className="text-sm">Don't have an account?</p>
        <Link to="/register" className="text-slate-900 text-sm hover:underline">
          Sign Up
        </Link>
      </div>
    </div>
  );
}

export default Login;
