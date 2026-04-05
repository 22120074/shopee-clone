import { createApi, fakeBaseQuery } from "@reduxjs/toolkit/query/react";
import * as ShopProductService from "../../services/shopProduct.service";
import { handleAxiosRequestWithLoginNavigate } from "../../utils/axiosHandle";

export const shopProductQuery = createApi({
  reducerPath: "shopProductQuery",
  baseQuery: fakeBaseQuery(),
  tagTypes: ["shopProduct"],
  endpoints: (builder) => ({
    createProduct: builder.mutation({
      queryFn: ({ payload }) =>
        handleAxiosRequestWithLoginNavigate(() =>
          ShopProductService.createProduct(payload),
        ),
      invalidatesTags: ["shopProduct"],
    }),
  }),
});

export const { useCreateProductMutation } = shopProductQuery;
