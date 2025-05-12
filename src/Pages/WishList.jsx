import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchWishlistItems } from "../redux/wishlistSlice";

function WishList() {
  const dispatch = useDispatch();
  const { wishlistItems, loading, error } = useSelector((state) => state.wishlist);

  useEffect(() => {
    dispatch(fetchWishlistItems());
  }, [dispatch]);

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-3xl font-semibold text-center mb-8 text-gray-800">
        Your Wishlist
      </h2>

      {loading ? (
        <p className="text-center text-gray-500">Loading...</p>
      ) : error ? (
        <p className="text-center text-red-500">Error: {error}</p>
      ) : wishlistItems.length === 0 ? (
        <div className="text-center text-gray-500">
          <p>Your wishlist is empty</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {wishlistItems.map((item) => (
            <div
              key={item.id}
              className="group relative bg-white rounded-lg shadow-lg overflow-hidden transform transition-all hover:scale-105"
            >
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-56 object-cover group-hover:opacity-75 transition-opacity duration-300"
              />
              <div className="p-4">
                <h3 className="text-xl font-semibold text-gray-800 group-hover:text-primary transition-colors duration-300">
                  {item.name}
                </h3>
                <p className="text-lg text-gray-600 mt-2">₹{item.price}</p>
                <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <button className="bg-red-500 text-white p-2 rounded-full shadow hover:bg-red-600">
                    <i className="fas fa-heart"></i>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default WishList;
