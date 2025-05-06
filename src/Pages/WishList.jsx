import React, { useState } from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa"; // Icons for wishlist

const products = [
  {
    id: 1,
    name: "Product 1",
    description: "This is a sample product.",
    price: "$100",
    image: "https://via.placeholder.com/150",
  },
  {
    id: 2,
    name: "Product 2",
    description: "This is another sample product.",
    price: "$200",
    image: "https://via.placeholder.com/150",
  },
  {
    id: 3,
    name: "Product 3",
    description: "This is yet another sample product.",
    price: "$150",
    image: "https://via.placeholder.com/150",
  },
];

const WishList = () => {
  const [wishlist, setWishlist] = useState([]);

  // Toggle item in wishlist
  const toggleWishlist = (item) => {
    setWishlist((prevWishlist) =>
      prevWishlist.find((i) => i.id === item.id)
        ? prevWishlist.filter((i) => i.id !== item.id)
        : [...prevWishlist, item]
    );
  };

  return (
    <div className="py-16 px-4 max-w-7xl mx-auto">
      <h2 className="text-3xl md:text-4xl font-semibold mb-12">Wishlist Details : </h2>

      <div className="grid md:grid-cols-3 gap-6">
        {products.map((product) => (
          <div
            key={product.id}
            className="bg-white rounded-xl shadow-md overflow-hidden relative"
          >
            {/* Wishlist Icon */}
            <div className="absolute top-2 left-2 z-10 flex gap-3 text-xl">
              <button onClick={() => toggleWishlist(product)}>
                {wishlist.find((i) => i.id === product.id) ? (
                  <FaHeart className="text-red-600 text-4xl" />
                ) : (
                  <FaRegHeart className="text-gray-900 text-4xl" />
                )}
              </button>
            </div>

            {/* Product Image and Info */}
            <div className="relative h-72 w-full">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-4">
              <h3 className="text-xl font-bold capitalize">{product.name}</h3>
              <p className="text-gray-600 mt-2">{product.description}</p>
              <p className="text-xl mt-4 font-semibold">{product.price}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Wishlist Page */}
      <div className="mt-12">
        <h3 className="text-2xl font-semibold">Your Wishlist</h3>
        <div className="mt-4">
          {wishlist.length === 0 ? (
            <p>Your wishlist is empty!</p>
          ) : (
            <ul>
              {wishlist.map((item) => (
                <li key={item.id} className="flex justify-between py-2">
                  <span>{item.name}</span>
                  <button
                    onClick={() => toggleWishlist(item)}
                    className="text-red-600"
                  >
                    Remove
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default WishList;
