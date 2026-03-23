import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import cartReducer from "../features/cart/cartSlice";
import shopReducer from "../features/shop/shopSlice";
import { authQuery } from "../features/api/authQuery";
import { cartQuery } from "../features/api/cartQuery";
import { cartSyncConfig } from "../features/api/config/cartConfig";
import { shopQuery } from "../features/api/shopQuery";
import { userQuery } from "../features/api/userQuery";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    cart: cartReducer,
    shop: shopReducer,
    [authQuery.reducerPath]: authQuery.reducer,
    [cartQuery.reducerPath]: cartQuery.reducer,
    [shopQuery.reducerPath]: shopQuery.reducer,
    [userQuery.reducerPath]: userQuery.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      cartSyncConfig,
      authQuery.middleware,
      cartQuery.middleware,
      shopQuery.middleware,
      userQuery.middleware,
    ),
});
