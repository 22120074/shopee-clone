import { createApi, fakeBaseQuery } from "@reduxjs/toolkit/query/react";
import * as CartService from "../../services/cart.service";

const handleAxiosRequest = async (apiCall) => {
  try {
    const response = await apiCall();
    return { data: response.data.data };
  } catch (error) {
    const errorPayload = error.response?.data || { message: error.message };
    return { error: errorPayload };
  }
};

export const cartQuery = createApi({
  reducerPath: "cartQuery",
  baseQuery: fakeBaseQuery(),
  tagTypes: ["Cart", "User"],
  endpoints: (builder) => ({
    getCart: builder.query({
      queryFn: () => handleAxiosRequest(() => CartService.getCart()),
      providesTags: ["Cart", "User"],
    }),

    createOrupdateCart: builder.mutation({
      queryFn: (cartData) =>
        handleAxiosRequest(() => CartService.createOrupdateCart(cartData)),
      invalidatesTags: ["Cart"],
    }),
  }),
});

export const { useGetCartQuery, useCreateOrupdateCartMutation } = cartQuery;
