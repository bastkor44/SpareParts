import React, { useState } from "react";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleForgotPassword = (e) => {
    e.preventDefault();
    if (email) {
      // Simulate sending a reset password link to the email
      alert(`Temporary password has been sent to ${email}`);
      setMessage("Password reset email sent!");
    } else {
      setMessage("Please enter a valid email.");
    }
  };

  return (
    <div className="p-3 max-w-lg mx-auto mt-[150px] mb-80">
      <h1 className="text-3xl text-center font-semibold my-7">Forgot Password</h1>

      {message && <p className="text-center text-sm text-gray-500">{message}</p>}

      <form className="flex flex-col gap-4" onSubmit={handleForgotPassword}>
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border p-3 rounded-lg"
          required
        />
        <button
          type="submit"
          className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95"
        >
          Reset Password
        </button>
      </form>

      {/* Back to login link */}
      <div className="mt-4 text-center">
        <a href="/login" className="text-slate-800 hover:underline">
          Back to Login
        </a>
      </div>
    </div>
  );
};

export default ForgotPassword;
