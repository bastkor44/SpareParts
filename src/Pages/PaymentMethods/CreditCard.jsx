import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

function CreditCard() {
  const { state } = useLocation();
  const navigate = useNavigate();

  const items = state?.items || [];
  const totalAmount = state?.totalAmount || 0;

  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");
  const [error, setError] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);

  const handlePayment = () => {
    if (!cardNumber || !expiry || !cvv) {
      setError("Please fill in all card details.");
      return;
    }

    if (!/^\d{16}$/.test(cardNumber.replace(/\s+/g, ""))) {
      setError("Invalid card number.");
      return;
    }

    setError("");
    setIsProcessing(true);

    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false);
      navigate("/card-success", {
        state: {
          ...state,
          paymentMethod: "Credit Card",
          paymentStatus: "success",
        },
      });
    }, 2000);
  };

  return (
    <div className="max-w-lg mx-auto mt-10 p-6 border rounded shadow bg-white">
      <h2 className="text-2xl font-bold mb-4 text-center">Pay with Debit/Credit Card</h2>

      <div className="mb-6">
        <h3 className="font-semibold mb-2">Order Summary:</h3>
        <ul className="list-disc pl-5 space-y-1 text-gray-700">
          {items.map((item, index) => (
            <li key={index}>
              {item.name} × {item.quantity} = ₹{item.total}
            </li>
          ))}
        </ul>
        <p className="mt-4 font-bold text-lg text-right">Total: ₹{totalAmount}</p>
      </div>

      <div className="space-y-4">
        <input
          type="text"
          placeholder="Card Number"
          maxLength={19}
          value={cardNumber}
          onChange={(e) => setCardNumber(e.target.value)}
          className="w-full p-2 border rounded"
        />
        <input
          type="month"
          value={expiry}
          onChange={(e) => setExpiry(e.target.value)}
          className="w-full p-2 border rounded"
        />
        <input
          type="password"
          placeholder="CVV"
          maxLength={3}
          value={cvv}
          onChange={(e) => setCvv(e.target.value)}
          className="w-full p-2 border rounded"
        />
        {error && <p className="text-red-600 text-sm">{error}</p>}

        <button
          onClick={handlePayment}
          disabled={isProcessing}
          className="w-full bg-slate-600 text-white py-2 rounded hover:bg-slate-800 disabled:opacity-50"
        >
          {isProcessing ? "Processing..." : "Pay Now"}
        </button>
      </div>
    </div>
  );
}

export default CreditCard;
