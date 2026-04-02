import { createApi, fakeBaseQuery } from "@reduxjs/toolkit/query/react";
import * as OrderService from "../../services/order.service";
import {
  handleAxiosRequest,
  handleAxiosRequestWithLoginNavigate,
} from "../../utils/axiosHandle";

export const orderQuery = createApi({
  reducerPath: "orderQuery",
  baseQuery: fakeBaseQuery(),
  tagTypes: ["Order"],
  endpoints: (builder) => ({
    createOrder: builder.mutation({
      queryFn: ({ items }) =>
        handleAxiosRequest(() => OrderService.createOrder(items)),
      invalidatesTags: ["Order"],
    }),
    createVnpayUrl: builder.mutation({
      queryFn: ({ payload }) =>
        handleAxiosRequest(() => OrderService.createVnpayUrl(payload)),
      invalidatesTags: ["Order"],
    }),
    vnpayReturnUrl: builder.query({
      queryFn: ({ queryParams }) =>
        handleAxiosRequest(() => OrderService.vnpayReturnUrl(queryParams)),
      invalidatesTags: ["Order"],
    }),
  }),
});

export const {
  useCreateOrderMutation,
  useCreateVnpayUrlMutation,
  useVnpayReturnUrlQuery,
} = orderQuery;
