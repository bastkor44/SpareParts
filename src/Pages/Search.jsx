import React from "react";
import { useNavigate } from "react-router-dom";

function Search() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-slate-200 flex flex-col items-center justify-center px-4 py-10 relative">
      {/* Background Image */}
      <div
        className="absolute top-0 left-0 w-full h-full bg-cover bg-center"
        style={{ backgroundImage: `url('/images/sparebackground.jpg')` }}
      ></div>

      {/* Content Wrapper */}
      <div className="relative z-10 text-center">
        <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-8">
          What Are You Looking For?
        </h2>

        {/* Button Section */}
        <div className="flex gap-6 flex-col sm:flex-row justify-center">
          <button
            onClick={() => navigate("/twowheeler")}
            className="bg-slate-500 border-2 border-slate-900 text-white px-8 py-4 rounded-lg shadow-md hover:bg-slate-700 transition-transform transform hover:scale-105 focus:outline-none"
          >
            TWO-WHEELER Parts
          </button>
          <button
            onClick={() => navigate("/fourwheeler")}
            className="bg-slate-500 border-2 text-white px-8 py-4 rounded-lg shadow-md hover:bg-slate-700 transition-transform transform hover:scale-105 focus:outline-none"
          >
            FOUR WHEELER Parts
          </button>
        </div>
      </div>
    </div>
  );
}

export default Search;
