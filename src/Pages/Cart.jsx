import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchCartItems } from "../redux/cartSlice";

function Cart() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { cartItems, loading, error } = useSelector((state) => state.cart);

  const [quantities, setQuantities] = useState({});
  const [selectedItems, setSelectedItems] = useState([]);
  const [showSummary, setShowSummary] = useState(false);

  // ✅ Fetch cart items from Redux (Django backend)
  useEffect(() => {
    dispatch(fetchCartItems());
  }, [dispatch]);

  // ✅ Select all on load when cartItems change
  useEffect(() => {
    const defaultSelected = cartItems.map((item) => item.id);
    setSelectedItems(defaultSelected);
  }, [cartItems]);

  useEffect(() => {
    setShowSummary(selectedItems.length > 0);
  }, [selectedItems]);

  const handleQuantityChange = (id, value) => {
    setQuantities({ ...quantities, [id]: value });
  };

  const toggleSelectItem = (id) => {
    setSelectedItems((prev) =>
      prev.includes(id)
        ? prev.filter((itemId) => itemId !== id)
        : [...prev, id]
    );
  };

  const getSelectedItemDetails = () => {
    return cartItems
      .filter((item) => selectedItems.includes(item.id))
      .map((item) => ({
        ...item,
        quantity: quantities[item.id] || 1,
        total: (quantities[item.id] || 1) * item.price,
      }));
  };

  return (
    <div className="max-w-5xl mx-auto p-4">
      <h2 className="text-3xl font-semibold mb-6 text-center">Your Cart</h2>

      {loading ? (
        <p className="text-center text-gray-600">Loading...</p>
      ) : error ? (
        <p className="text-center text-red-500">Error: {error}</p>
      ) : cartItems.length === 0 ? (
        <p className="text-center text-gray-600">Your cart is empty</p>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {cartItems.map((item) => (
              <div
                key={item.id}
                className="border rounded-xl shadow-md p-4 relative"
              >
                <input
                  type="checkbox"
                  checked={selectedItems.includes(item.id)}
                  onChange={() => toggleSelectItem(item.id)}
                  className="absolute top-4 right-4 w-6 h-6 accent-blue-600"
                />
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-40 object-cover rounded mb-3"
                />
                <h3 className="text-lg font-semibold">{item.name}</h3>
                <p className="text-gray-600">₹{item.price}</p>
                <div className="flex items-center gap-2 mt-2">
                  <label htmlFor={`qty-${item.id}`} className="text-sm">
                    Qty:
                  </label>
                  <input
                    type="number"
                    id={`qty-${item.id}`}
                    min="1"
                    value={quantities[item.id] || 1}
                    onChange={(e) =>
                      handleQuantityChange(item.id, parseInt(e.target.value))
                    }
                    className="w-16 border rounded px-2 py-1"
                  />
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      {showSummary && (
        <div className="mt-10 border-t pt-6">
          <h3 className="text-2xl font-bold mb-4">Purchase Summary</h3>
          <ul className="space-y-4">
            {getSelectedItemDetails().map((item) => (
              <li
                key={item.id}
                className="border p-4 rounded shadow flex justify-between items-center"
              >
                <div>
                  <p className="font-semibold">{item.name}</p>
                  <p>Quantity: {item.quantity}</p>
                  <p>Unit Price: ₹{item.price}</p>
                </div>
                <p className="font-bold text-lg text-slate-700">₹{item.total}</p>
              </li>
            ))}
          </ul>
          <div className="text-right mt-6">
            <p className="text-xl font-semibold">
              Total: ₹
              {getSelectedItemDetails()
                .reduce((sum, item) => sum + item.total, 0)
                .toFixed(2)}
            </p>
            <button
              className="mt-4 bg-slate-600 text-white px-6 py-3 rounded hover:bg-slate-800"
              onClick={() =>
                navigate("/payment", { state: { items: getSelectedItemDetails() } })
              }
            >
              Confirm Order
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Cart;
