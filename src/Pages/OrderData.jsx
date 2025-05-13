import React from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaWallet } from "react-icons/fa"; // Importing the payment icon

function OrderData() {
  const orders = [
    {
      id: 1,
      productName: "Yamaha Brake Pads",
      status: "Shipped",
      date: "2025-05-10",
      paymentAmount: "$99.99", // payment amount
    },
    {
      id: 2,
      productName: "Car Engine Oil",
      status: "Delivered",
      date: "2025-05-08",
      paymentAmount: "$45.50", // payment amount
    },
    {
      id: 3,
      productName: "Scooter Headlight",
      status: "Pending",
      date: "2025-05-12",
      paymentAmount: "$29.99", // payment amount
    },
  ];

  const handleCancelOrder = () => {
    toast.success("Order Cancelled Successfully!", {
      position: "top-center", // position of the toast
      autoClose: 3000, // auto-close after 3 seconds
    });
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <h2 className="text-3xl font-extrabold text-slate-800 mb-8 border-b pb-2">
        Your Orders
      </h2>
      {orders.map((order) => (
        <div
          key={order.id}
          className="bg-white shadow-md rounded-lg p-4 mb-4 border border-gray-200"
        >
          <p className="font-bold text-lg text-slate-700 mb-2">
            {order.productName}
          </p>

          <div className="flex justify-between text-slate-600 text-sm sm:text-base">
            {/* Status, Payment Amount with Icon */}
            <div>
              <p>
                Status: <span className="font-medium">{order.status}</span>
              </p>
              <p className="mt-1 text-green-600 text-sm flex items-center">
                <FaWallet className="mr-1" /> {/* Payment icon */}
                Payment: {order.paymentAmount}
              </p>
            </div>

            {/* Date and Cancel Order Button */}
            <div className="text-right">
              <p>Date: {order.date}</p>
              {order.status !== "Delivered" && (
                <button
                  onClick={handleCancelOrder}
                  className="mt-1 bg-red-500 hover:bg-red-600 text-white text-xs px-3 py-1 rounded"
                >
                  Cancel Order
                </button>
              )}
            </div>
          </div>
        </div>
      ))}

      {/* Toast Container */}
      <ToastContainer />
    </div>
  );
}

export default OrderData;
