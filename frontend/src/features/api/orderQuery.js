import { createApi, fakeBaseQuery } from "@reduxjs/toolkit/query/react";
import * as OrderService from "../../services/order.service";
import { handleAxiosRequestWithLoginNavigate } from "../../utils/axiosHandle";

export const orderQuery = createApi({
  reducerPath: "orderQuery",
  baseQuery: fakeBaseQuery(),
  tagTypes: ["Order"],
  endpoints: (builder) => ({
    createOrder: builder.mutation({
      queryFn: ({ items }) =>
        handleAxiosRequestWithLoginNavigate(() =>
          OrderService.createOrder(items),
        ),
      invalidatesTags: ["Order"],
    }),
    createVnpayUrl: builder.mutation({
      queryFn: ({ payload }) =>
        handleAxiosRequestWithLoginNavigate(() =>
          OrderService.createVnpayUrl(payload),
        ),
      invalidatesTags: ["Order"],
    }),
    vnpayReturnUrl: builder.query({
      queryFn: ({ queryParams }) =>
        handleAxiosRequestWithLoginNavigate(() =>
          OrderService.vnpayReturnUrl(queryParams),
        ),
      invalidatesTags: ["Order"],
    }),
    getListOrderItemsWithDetails: builder.query({
      queryFn: ({ statusFilter, cursor }) =>
        handleAxiosRequestWithLoginNavigate(() =>
          OrderService.getListOrderItemsWithDetails(statusFilter, cursor),
        ),
      invalidatesTags: ["Order"],
    }),
  }),
});

export const {
  useCreateOrderMutation,
  useCreateVnpayUrlMutation,
  useVnpayReturnUrlQuery,
  useGetListOrderItemsWithDetailsQuery,
  useLazyGetListOrderItemsWithDetailsQuery,
} = orderQuery;
