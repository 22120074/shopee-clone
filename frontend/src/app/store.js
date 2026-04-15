import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import cartReducer from "../features/cart/cartSlice";
import shopReducer from "../features/shop/shopSlice";
import { authQuery } from "../features/api/authQuery";
import { cartQuery } from "../features/api/cartQuery";
import { cartSyncConfig } from "../features/api/config/cartConfig";
import { shopQuery } from "../features/api/shopQuery";
import { userQuery } from "../features/api/userQuery";
import { productQuery } from "../features/api/productQuery";
import { mediaQuery } from "../features/api/mediaQuery";
import { shopProductQuery } from "../features/api/shopProductQuery";
import { orderQuery } from "../features/api/orderQuery";
import { notificationQuery } from "../features/api/notificationQuery";
import notificationReducer from "../features/notification/notificationSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    cart: cartReducer,
    shop: shopReducer,
    notification: notificationReducer,
    [authQuery.reducerPath]: authQuery.reducer,
    [cartQuery.reducerPath]: cartQuery.reducer,
    [shopQuery.reducerPath]: shopQuery.reducer,
    [userQuery.reducerPath]: userQuery.reducer,
    [productQuery.reducerPath]: productQuery.reducer,
    [mediaQuery.reducerPath]: mediaQuery.reducer,
    [shopProductQuery.reducerPath]: shopProductQuery.reducer,
    [orderQuery.reducerPath]: orderQuery.reducer,
    [notificationQuery.reducerPath]: notificationQuery.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      cartSyncConfig,
      authQuery.middleware,
      cartQuery.middleware,
      shopQuery.middleware,
      userQuery.middleware,
      productQuery.middleware,
      mediaQuery.middleware,
      shopProductQuery.middleware,
      orderQuery.middleware,
      notificationQuery.middleware,
    ),
});
