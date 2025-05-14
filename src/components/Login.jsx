import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch } from "react-redux";
import axios from "../lib/axios";
import { setUser } from "../redux/userSlice";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await axios.post("/api/users/login/", {
        username,
        password,
      });

      const data = res.data;

      dispatch(setUser(data));
      toast.success("Login successful!", {
        position: "top-center",
        autoClose: 2000,
      });

      setTimeout(() => {
        if (data.role === "admin") {
          navigate("/adminboard");
        } else if (data.role === "manager") {
          navigate("/managerboard");
        } else {
          navigate("/");
        }
      }, 2000);
    } catch (err) {
      if (err.response && err.response.data) {
        setError(err.response.data.detail || "Invalid credentials");
      } else {
        setError("Server error. Please try again.");
      }
    }
  };

  return (
    <div className="p-3 max-w-lg mx-auto mt-[150px] mb-80">
      <ToastContainer />
      <h1 className="text-3xl text-center font-semibold my-7">Sign In</h1>

      {error && <p className="text-red-500 bg-red-100 p-2 rounded">{error}</p>}

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="text"
          placeholder="Username..."
          value={username}
          onChange={(e) => setUsername(e.target.value)}
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
        <Link to="/forgotpassword" className="text-sm text-slate-800 hover:underline">
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
