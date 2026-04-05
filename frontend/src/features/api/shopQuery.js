import { createApi, fakeBaseQuery } from "@reduxjs/toolkit/query/react";
import * as ShopService from "../../services/shop.service";
import {
  handleAxiosRequest,
  handleAxiosRequestWithLoginNavigate,
} from "../../utils/axiosHandle";

export const shopQuery = createApi({
  reducerPath: "shopQuery",
  baseQuery: fakeBaseQuery(),
  tagTypes: ["Shop"],
  endpoints: (builder) => ({
    checkShop: builder.query({
      queryFn: (userId) =>
        handleAxiosRequestWithLoginNavigate(() =>
          ShopService.checkShop(userId),
        ),
      providesTags: ["Shop"],
    }),
    registerShop: builder.mutation({
      queryFn: (shopData) =>
        handleAxiosRequestWithLoginNavigate(() =>
          ShopService.registerShop(shopData),
        ),
      invalidatesTags: ["Shop"],
    }),
    getShop: builder.query({
      queryFn: (shopId) =>
        handleAxiosRequest(() => ShopService.getShop(shopId)),
      providesTags: (result, error, shopId) => [{ type: "Shop", id: shopId }],
    }),
  }),
});

export const { useCheckShopQuery, useRegisterShopMutation, useGetShopQuery } =
  shopQuery;
