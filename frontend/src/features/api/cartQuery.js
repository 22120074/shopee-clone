import { createApi, fakeBaseQuery } from "@reduxjs/toolkit/query/react";
import * as CartService from "../../services/cart.service";
import { handleAxiosRequestWithLoginNavigate } from "../../utils/axiosHandle";

export const cartQuery = createApi({
  reducerPath: "cartQuery",
  baseQuery: fakeBaseQuery(),
  tagTypes: ["Cart", "User"],
  endpoints: (builder) => ({
    getCart: builder.query({
      queryFn: () => handleAxiosRequestWithLoginNavigate(CartService.getCart),
      providesTags: ["Cart", "User"],
    }),

    createOrupdateCart: builder.mutation({
      queryFn: (cartData) =>
        handleAxiosRequestWithLoginNavigate(() =>
          CartService.createOrupdateCart(cartData),
        ),
      invalidatesTags: ["Cart"],
    }),
  }),
});

export const { useGetCartQuery, useCreateOrupdateCartMutation } = cartQuery;
