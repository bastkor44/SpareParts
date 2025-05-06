import React from "react";
import { Link } from "react-router-dom";

function Login() {
  return (
    <div className="p-3 max-w-lg mx-auto mt-[150px] mb-80">
      <h1 className="text-3xl text-center font-semibold my-7">Sign In</h1>
      
      {/* Static Error Placeholder */}
      {/* <p className="text-red-500">Invalid email or password</p> */}

      <form className="flex flex-col gap-4">
        <input
          type="email"
          placeholder="email@.com ..."
          className="border p-3 rounded-lg"
          required
        />
        <input
          type="password"
          placeholder="Enter your password..."
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
        <p>Have an Account?</p>
        <Link to={"/register"}>
          <span className="text-blue-700 hover:underline">Sign Up</span>
        </Link>
      </div>
    </div>
  );
}

export default Login;
