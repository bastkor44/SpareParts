import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

function Upi() {
  const { state } = useLocation();
  const navigate = useNavigate();

  const items = state?.items || [];
  const totalAmount = state?.totalAmount || 0;

  // Load Razorpay script once
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const handleRazorpayPayment = () => {
    const options = {
      key: "rzp_test_YourApiKeyHere", // Replace with your Razorpay Test Key
      amount: totalAmount * 100, // Amount in paise
      currency: "INR",
      name: "AutoParts Store",
      description: "UPI Payment",
      image: "https://yourlogo.url/logo.png", // Optional logo
      handler: function (response) {
        // On payment success
        navigate("/upi-success", {
          state: {
            ...state,
            paymentId: response.razorpay_payment_id,
          },
        });
      },
      prefill: {
        name: "Customer Name",
        email: "customer@example.com",
        contact: "9999999999",
      },
      notes: {
        order_items: JSON.stringify(items),
      },
      theme: {
        color: "#3399cc",
      },
      method: {
        upi: true,
        card: false,
        netbanking: false,
      },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 border rounded shadow bg-white">
      <h2 className="text-2xl font-bold text-center mb-4">Pay with UPI</h2>
      <p className="text-center mb-6 text-gray-600">
        Total Amount: <span className="font-semibold">₹{totalAmount}</span>
      </p>

      <div className="text-left mb-4">
        <h3 className="font-semibold mb-2">Order Summary:</h3>
        <ul className="space-y-1">
          {items.map((item, index) => (
            <li key={index}>
              • {item.name} × {item.quantity} = ₹{item.total}
            </li>
          ))}
        </ul>
      </div>

      <div className="text-center">
        <button
          onClick={handleRazorpayPayment}
          className="bg-slate-600 text-white py-2 px-6 rounded hover:bg-slate-800"
        >
          Pay Now with Razorpay UPI
        </button>
      </div>
    </div>
  );
}

export default Upi;
