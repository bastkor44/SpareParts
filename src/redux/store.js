import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./cartSlice";
import wishlistReducer from "./wishlistSlice";
import userReducer from "./userSlice"; // import userSlice
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage"; // localStorage

// Persist configurations
const cartPersistConfig = {
  key: "cart",
  storage,
};

const wishlistPersistConfig = {
  key: "wishlist",
  storage,
};

// Optionally persist user if needed:
// const userPersistConfig = {
//   key: "user",
//   storage,
// };

const store = configureStore({
  reducer: {
    cart: persistReducer(cartPersistConfig, cartReducer),
    wishlist: persistReducer(wishlistPersistConfig, wishlistReducer),
    user: userReducer, // Add user reducer here (not persisted)
    // If you want to persist user too:
    // user: persistReducer(userPersistConfig, userReducer),
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);
export default store;
