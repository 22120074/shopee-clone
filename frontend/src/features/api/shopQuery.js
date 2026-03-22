import { createApi, fakeBaseQuery } from "@reduxjs/toolkit/query/react";
import * as ShopService from "../../services/shop.service";
import { handleAxiosRequest } from "../../utils/axiosHandle";

export const shopQuery = createApi({
  reducerPath: "shopQuery",
  baseQuery: fakeBaseQuery(),
  tagTypes: ["Shop"],
  endpoints: (builder) => ({
    checkShop: builder.query({
      queryFn: (userId) =>
        handleAxiosRequest(() => ShopService.checkShop(userId)),
      providesTags: ["Shop"],
    }),
    registerShop: builder.mutation({
      queryFn: (shopData) =>
        handleAxiosRequest(() => ShopService.registerShop(shopData)),
      invalidatesTags: ["Shop"],
    }),
  }),
});

export const { useCheckShopQuery, useRegisterShopMutation } = shopQuery;
