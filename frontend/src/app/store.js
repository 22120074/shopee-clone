import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import cartReducer from "../features/cart/cartSlice";
import shopReducer from "../features/shop/shopSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    cart: cartReducer,
    shop: shopReducer,
  },
});
