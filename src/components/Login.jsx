import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    const storedUser = JSON.parse(localStorage.getItem("user"));

    if (
      storedUser &&
      storedUser.email === email &&
      storedUser.password === password
    ) {
      setError("");
      toast.success("Login successful!", {
        position: "top-center",
        autoClose: 2000,
      });

      setTimeout(() => {
        navigate("/");
      }, 2000); // Wait for toast to show
    } else {
      setError("Invalid email or password");
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

      <div className="flex gap-2 mt-5">
        <p>Don't have an account?</p>
        <Link to={"/register"}>
          <span className="text-blue-700 hover:underline">Sign Up</span>
        </Link>
      </div>
    </div>
  );
}

export default Login;
