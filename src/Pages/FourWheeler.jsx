import React, { useState, useEffect } from "react";
import { GiClick } from "react-icons/gi";
import { TbHandFingerDown } from "react-icons/tb";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

export default function FourWheeler() {
  const [data, setData] = useState([]);
  const [selected, setSelected] = useState(null);
  const [wishlist, setWishlist] = useState([]);
  const [showPaymentModal, setShowPaymentModal] = useState(false);

  const [priceFilter, setPriceFilter] = useState("");
  const [interiorFilter, setInteriorFilter] = useState("");
  const [exteriorFilter, setExteriorFilter] = useState("");

  // Fetch data from Django backend
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("http://localhost:8000/api/fourwheeler/");
        setData(res.data);
      } catch (error) {
        console.error("Failed to fetch data:", error);
      }
    };

    fetchData();
  }, []);

  const toggleWishlist = (item) => {
    setWishlist((prev) =>
      prev.find((i) => i.id === item.id)
        ? prev.filter((i) => i.id !== item.id)
        : [...prev, item]
    );
  };

  const handleAddToCart = () => {
    toast.success("Added to cart successfully!", {
      position: "top-center",
      autoClose: 2000,
    });
  };

  const handleBuyNow = () => {
    setShowPaymentModal(true);
  };

  const handlePaymentSuccess = () => {
    toast.success("Payment Successful!", {
      position: "top-center",
      autoClose: 2000,
    });
    setShowPaymentModal(false);
    setSelected(null);
  };

  // Filter logic
  const filteredCompanies = data.filter((item) => {
    const priceMatch =
      priceFilter === "" ||
      (priceFilter === "<200" && item.price < 200) ||
      (priceFilter === "200-300" && item.price >= 200 && item.price <= 300) ||
      (priceFilter === ">300" && item.price > 300);

    const interiorMatch =
      interiorFilter === "" || item.interior === interiorFilter;

    const exteriorMatch =
      exteriorFilter === "" || item.exterior === exteriorFilter;

    return priceMatch && interiorMatch && exteriorMatch;
  });

  return (
    <section className="py-16 px-4 max-w-7xl mx-auto relative">
      <ToastContainer />
      <h2 className="text-3xl md:text-4xl font-semibold mb-6">
        <span className="flex gap-1 items-center">
          Our SpareParts World <TbHandFingerDown />
        </span>
      </h2>

      {/* Filters */}
      <div className="mb-10 grid gap-4 md:grid-cols-3">
        <select
          onChange={(e) => setPriceFilter(e.target.value)}
          className="border p-2 rounded"
          defaultValue=""
        >
          <option value="">All Prices</option>
          <option value="<200">Below $200</option>
          <option value="200-300">$200 - $300</option>
          <option value=">300">Above $300</option>
        </select>

        <select
          onChange={(e) => setInteriorFilter(e.target.value)}
          className="border p-2 rounded"
          defaultValue=""
        >
          <option value="">Categories</option>
          <option value="leather">interior</option>
          <option value="fabric">exterior</option>
        </select>
      </div>

      {/* Product Details View */}
      {selected ? (
        <div className="bg-white p-6 rounded-xl shadow-md">
          <img
            src={selected.image}
            alt={selected.name}
            className="w-full h-80 object-cover rounded-lg mb-4"
          />
          <h3 className="text-2xl font-bold capitalize">{selected.name}</h3>
          <p className="text-gray-600 mt-2">{selected.description}</p>
          <p className="text-xl mt-4 font-semibold">Price: ${selected.price}</p>

          <div className="mt-6 flex flex-wrap gap-4">
            <button
              className="px-6 py-2 bg-slate-800 text-white rounded hover:bg-slate-600 transition"
              onClick={handleAddToCart}
            >
              Add To Cart
            </button>
            <button
              className="px-6 py-2 bg-slate-600 text-white rounded hover:bg-slate-800 transition"
              onClick={handleBuyNow}
            >
              Buy Now
            </button>
            <button
              className="px-6 py-2 border border-black text-black rounded hover:bg-gray-100 transition"
              onClick={() => setSelected(null)}
            >
              Back
            </button>
          </div>
        </div>
      ) : (
        <div className="grid md:grid-cols-3 gap-6">
          {filteredCompanies.map((company) => (
            <div
              key={company.id}
              className="bg-white rounded-xl shadow-md overflow-hidden relative"
            >
              <div className="absolute top-2 left-2 z-10 text-xl">
                <button onClick={() => toggleWishlist(company)}>
                  {wishlist.find((i) => i.id === company.id) ? (
                    <FaHeart className="text-red-600 text-4xl" />
                  ) : (
                    <FaRegHeart className="text-gray-900 text-3xl" />
                  )}
                </button>
              </div>
              <div className="relative h-72 w-full">
                <img
                  src={company.image}
                  alt={company.name}
                  className="w-full h-full object-cover"
                />
                <div
                  className="absolute bottom-[-12px] right-[-12px] w-24 h-24 bg-slate-700 rounded-tl-full shadow-md flex items-center justify-center cursor-pointer"
                  onClick={() => setSelected(company)}
                >
                  <div className="text-white rounded-full p-3 hover:scale-110 transition">
                    <GiClick className="text-xl" />
                  </div>
                </div>
              </div>
              <div className="p-4">
                <h3 className="text-xl font-bold capitalize">
                  {company.name}
                </h3>
                <p className="text-gray-600 mt-2">{company.description}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
