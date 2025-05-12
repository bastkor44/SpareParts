import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

function Payment() {
  const location = useLocation();
  const navigate = useNavigate();
  const items = location.state?.items || [];
  const [paymentMethod, setPaymentMethod] = useState("UPI");

  const totalAmount = items.reduce((sum, item) => sum + item.total, 0);

  const handlePlaceOrder = () => {
    if (paymentMethod === "Cash on Delivery") {
      navigate("/cashondelivery", { state: { items, totalAmount } });
    } else if (paymentMethod === "UPI") {
      navigate("/upi", { state: { items, totalAmount } }); // Navigates to UPI payment page
    } else if (paymentMethod === "Debit Card") {
      navigate("/debitcard", { state: { items, totalAmount } }); // Navigates to Debit Card page
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-3xl font-bold mb-6 text-center">Confirm Your Order</h2>

      {/* Ordered Items */}
      <div className="space-y-4">
        {items.map((item) => (
          <div key={item.id} className="border p-4 rounded shadow flex justify-between">
            <div>
              <p className="font-semibold">{item.name}</p>
              <p>Qty: {item.quantity}</p>
              <p>Price: ₹{item.price}</p>
            </div>
            <p className="font-bold text-lg text-slate-700">₹{item.total}</p>
          </div>
        ))}
      </div>

      {/* Total */}
      <div className="mt-6 border-t pt-4 text-right">
        <p className="text-xl font-bold">Total Amount: ₹{totalAmount.toFixed(2)}</p>
      </div>

      {/* Payment Method */}
      <div className="mt-8">
        <h3 className="text-xl font-semibold mb-4">Choose Payment Method</h3>
        <div className="flex gap-4 mb-6">
          {["UPI", "Debit Card", "Cash on Delivery"].map((method) => (
            <label key={method} className="flex items-center gap-2">
              <input
                type="radio"
                name="paymentMethod"
                value={method}
                checked={paymentMethod === method}
                onChange={() => setPaymentMethod(method)}
                className="accent-blue-600"
              />
              {method}
            </label>
          ))}
        </div>
      </div>

      {/* Place Order Button */}
      <div className="mt-6 text-center">
        <button
          onClick={handlePlaceOrder}
          className="bg-green-600 text-white px-6 py-3 rounded hover:bg-green-800"
        >
          Place Order
        </button>
      </div>
    </div>
  );
}

export default Payment;
