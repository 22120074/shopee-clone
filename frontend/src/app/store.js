import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import cartReducer from "../features/cart/cartSlice";
import shopReducer from "../features/shop/shopSlice";
import { authQuery } from "../features/api/authQuery";
import { cartQuery } from "../features/api/cartQuery";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    cart: cartReducer,
    shop: shopReducer,
    [authQuery.reducerPath]: authQuery.reducer,
    [cartQuery.reducerPath]: cartQuery.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authQuery.middleware, cartQuery.middleware),
});
