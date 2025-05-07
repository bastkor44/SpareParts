import React from "react";
import { useSelector } from "react-redux";

function Cart() {
  const cartItems = useSelector((state) => state.cart.cartItems);

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Your Cart</h2>
      {cartItems.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {cartItems.map((item) => (
            <div key={item.id} className="p-4 border rounded shadow">
              <img src={item.image} alt={item.name} className="w-full h-48 object-cover mb-2" />
              <h3 className="text-xl font-bold">{item.name}</h3>
              <p>{item.price}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Cart;
