import React, { useState } from "react";
import { GiClick } from "react-icons/gi";
import { TbHandFingerDown } from "react-icons/tb";
import { FaHeart, FaRegHeart, FaShoppingCart } from "react-icons/fa";

const companies = [
  {
    id: 1,
    name: "trust & co.",
    description: "Fill out the form and the algorithm will offer the right team of experts",
    price: "$250",
    image: "https://images.unsplash.com/photo-1601049676869-702ea24cfd58?q=80&w=2073",
  },
  {
    id: 2,
    name: "tonic",
    description: "Fill out the form and the algorithm will offer the right team of experts",
    price: "$300",
    image: "https://images.unsplash.com/photo-1613235788366-270e7ac489f3?q=80&w=2070",
  },
  {
    id: 3,
    name: "shower gel",
    description: "Fill out the form and the algorithm will offer the right team of experts",
    price: "$150",
    image: "https://images.unsplash.com/photo-1673847401561-fcd75a7888c5?q=80&w=2070",
  },
];

export default function Twowheeler() {
  const [selected, setSelected] = useState(null);
  const [wishlist, setWishlist] = useState([]);
  const [cart, setCart] = useState([]);

  const toggleWishlist = (item) => {
    setWishlist((prev) =>
      prev.find((i) => i.id === item.id)
        ? prev.filter((i) => i.id !== item.id)
        : [...prev, item]
    );
  };

  const toggleCart = (item) => {
    setCart((prev) =>
      prev.find((i) => i.id === item.id)
        ? prev.filter((i) => i.id !== item.id)
        : [...prev, item]
    );
  };

  return (
    <section className="py-16 px-4 max-w-7xl mx-auto">
      <h2 className="text-3xl md:text-4xl font-semibold mb-12">
        <span className="flex gap-1 items-center">
          Our SpareParts World <TbHandFingerDown />
        </span>
      </h2>

      {selected ? (
        <div className="bg-white p-6 rounded-xl shadow-md">
          <img src={selected.image} alt={selected.name} className="w-full h-80 object-cover rounded-lg mb-4" />
          <h3 className="text-2xl font-bold capitalize">{selected.name}</h3>
          <p className="text-gray-600 mt-2">{selected.description}</p>
          <p className="text-xl mt-4 font-semibold">Price: {selected.price}</p>
          <button className="mt-6 px-6 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition">
            Order Now
          </button>
          <button
            className="mt-4 ml-4 px-6 py-2 border border-black text-black rounded hover:bg-gray-100 transition"
            onClick={() => setSelected(null)}
          >
            Back
          </button>
        </div>
      ) : (
        <div className="grid md:grid-cols-3 gap-6">
          {companies.map((company) => (
            <div key={company.id} className="bg-white rounded-xl shadow-md overflow-hidden relative">
              {/* Wishlist & Cart Icons */}
              <div className="absolute top-2 left-2 z-10 flex gap-3 text-xl">
                <button onClick={() => toggleWishlist(company)}>
                  {wishlist.find((i) => i.id === company.id) ? (
                    <FaHeart className="text-red-600 text-4xl" />
                  ) : (
                    <FaRegHeart className="text-gray-900 text-3xl" />
                  )}
                </button>
                <button onClick={() => toggleCart(company)}>
                  <FaShoppingCart
                    className={
                      cart.find((i) => i.id === company.id)
                        ? "text-red-600 text-4xl" // Red when it's in the cart
                        : "text-gray-900 text-3xl"
                    }
                  />
                </button>
              </div>

              {/* Image & Click */}
              <div className="relative h-72 w-full">
                <img src={company.image} alt={company.name} className="w-full h-full object-cover" />
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
                <h3 className="text-xl font-bold capitalize">{company.name}</h3>
                <p className="text-gray-600 mt-2">{company.description}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
