import React from "react";
import { Link } from "react-router-dom";

function Register() {
  return (
    <div className="p-3 max-w-lg mx-auto mt-[120px] mb-80">
      <h1 className="text-3xl text-center font-semibold my-7">Sign Up</h1>

      {/* Static placeholders for messages (optional) */}
      {/* <p className="text-red-500 bg-red-100 p-3 rounded-lg">Something went wrong</p> */}
      {/* <p className="text-green-600 bg-green-100 p-3 rounded-lg">Successfully registered</p> */}

      <form className="flex flex-col gap-4">
        <input
          type="text"
          placeholder="Username..."
          className="border p-3 rounded-lg"
          required
        />
        <input
          type="email"
          placeholder="email@.com..."
          className="border p-3 rounded-lg"
          required
        />
        <input
          type="password"
          placeholder="Enter your password..."
          className="border p-3 rounded-lg"
          required
        />
        <input
          type="text"
          placeholder="Contact number..."
          className="border p-3 rounded-lg"
          required
        />
        <input
          type="text"
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
