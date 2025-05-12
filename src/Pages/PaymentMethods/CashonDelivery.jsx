import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

function CashonDelivery() {
  const { state } = useLocation();
  const navigate = useNavigate();

  const items = state?.items || [];
  const totalAmount = state?.totalAmount || 0;

  const [customer, setCustomer] = useState({
    name: "",
    address: "",
    phone: "",
  });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setCustomer({ ...customer, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const { name, address, phone } = customer;
    if (!name || !address || !phone) {
      setError("Please fill in all fields.");
      return;
    }

    setError("");
    navigate("/cod-success", {
      state: {
        ...state,
        customer,
        paymentMethod: "Cash on Delivery",
      },
    });
  };

  return (
    <div className="max-w-lg mx-auto mt-10 p-6 border rounded shadow bg-white">
      <h2 className="text-2xl font-bold mb-4 text-center">Cash on Delivery</h2>

      <div className="mb-6">
        <h3 className="font-semibold mb-2">Order Summary:</h3>
        <ul className="list-disc pl-5 text-gray-700 space-y-1">
          {items.map((item, idx) => (
            <li key={idx}>
              {item.name} × {item.quantity} = ₹{item.total}
            </li>
          ))}
        </ul>
        <p className="mt-4 font-bold text-right text-lg">Total: ₹{totalAmount}</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="name"
          placeholder="Full Name"
          value={customer.name}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />
        <textarea
          name="address"
          placeholder="Delivery Address"
          value={customer.address}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />
        <input
          type="tel"
          name="phone"
          placeholder="Phone Number"
          value={customer.phone}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />
        {error && <p className="text-red-600 text-sm">{error}</p>}

        <button
          type="submit"
          className="w-full bg-slate-600 text-white py-2 rounded hover:bg-slate-800"
        >
          Confirm Order
        </button>
      </form>
    </div>
  );
}

export default CashonDelivery;
