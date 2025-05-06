import React, { useState } from "react";
import { IoCartOutline, IoCart } from "react-icons/io5";

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

const Cart = () => {
  const [cart, setCart] = useState([]);

  const toggleCart = (item) => {
    setCart((prev) =>
      prev.find((i) => i.id === item.id)
        ? prev.filter((i) => i.id !== item.id)
        : [...prev, item]
    );
  };

  return (
    <div className="py-16 px-4 max-w-7xl mx-auto">
      <h2 className="text-3xl md:text-4xl font-semibold mb-12">Cart Details : </h2>

      {/* Products Grid */}
      <div className="grid md:grid-cols-3 gap-6">
        {products.map((product) => (
          <div key={product.id} className="bg-white rounded-xl shadow-md overflow-hidden relative">
            {/* Cart Icon */}
            <div className="absolute top-2 left-2 z-10 text-2xl">
              <button onClick={() => toggleCart(product)}>
                {cart.find((i) => i.id === product.id) ? (
                  <IoCart className="text-red-600 text-4xl" />
                ) : (
                  <IoCartOutline className="text-gray-900 text-4xl" />
                )}
              </button>
            </div>

            {/* Product Details */}
            <div className="relative h-72 w-full">
              <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
            </div>
            <div className="p-4">
              <h3 className="text-xl font-bold capitalize">{product.name}</h3>
              <p className="text-gray-600 mt-2">{product.description}</p>
              <p className="text-xl mt-4 font-semibold">{product.price}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Cart Section */}
      <div className="mt-12">
        <h3 className="text-2xl font-semibold">Your Cart</h3>
        <div className="mt-4">
          {cart.length === 0 ? (
            <p>Your cart is empty!</p>
          ) : (
            <ul>
              {cart.map((item) => (
                <li key={item.id} className="flex justify-between py-2">
                  <span>{item.name}</span>
                  <button
                    onClick={() => toggleCart(item)}
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

export default Cart;
