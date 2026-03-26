import { createApi, fakeBaseQuery } from "@reduxjs/toolkit/query/react";
import * as ProductService from "../../services/product.service";
import { getUserRating } from "../../services/cart.service";
import {
  handleAxiosRequest,
  handleAxiosRequestWithLoginNavigate,
} from "../../utils/axiosHandle";

export const productQuery = createApi({
  reducerPath: "productQuery",
  baseQuery: fakeBaseQuery(),
  tagTypes: ["Product", "Review", "Like"],
  endpoints: (builder) => ({
    getAllProducts: builder.query({
      queryFn: () => handleAxiosRequest(ProductService.getAllProducts),
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ _id }) => ({ type: "Product", id: _id })),
              { type: "Product", id: "LIST" },
            ]
          : [{ type: "Product", id: "LIST" }],
    }),

    getOneProduct: builder.query({
      queryFn: (productID) =>
        handleAxiosRequest(() => ProductService.getOneProduct(productID)),
      providesTags: (result, error, productID) => [
        { type: "Product", id: productID },
      ],
    }),

    isLikedProduct: builder.query({
      queryFn: (productID) =>
        handleAxiosRequest(() => ProductService.isLikedProduct(productID)),
      providesTags: (result, error, productID) => [
        { type: "Like", id: productID },
      ],
    }),

    likeProduct: builder.mutation({
      queryFn: ({ productID, userID }) =>
        handleAxiosRequestWithLoginNavigate(() =>
          ProductService.likeProduct(productID, userID),
        ),
      invalidatesTags: (result, error, { productID }) => [
        { type: "Like", id: productID },
      ],
    }),

    unlikeProduct: builder.mutation({
      queryFn: ({ productID, userID }) =>
        handleAxiosRequestWithLoginNavigate(() =>
          ProductService.unlikeProduct(productID, userID),
        ),
      invalidatesTags: (result, error, { productID }) => [
        { type: "Like", id: productID },
      ],
    }),

    getProductReviews: builder.query({
      queryFn: ({ productID, limit, page, typeSort }) =>
        handleAxiosRequest(() =>
          ProductService.getProductReviews(productID, limit, page, typeSort),
        ),
      providesTags: (result, error, { productID }) => [
        { type: "Review", id: productID },
      ],
    }),

    getEachNumofTypeRating: builder.query({
      queryFn: (productID) =>
        handleAxiosRequest(() =>
          ProductService.getEachNumofTypeRating(productID),
        ),
      providesTags: (result, error, productID) => [
        { type: "Product", id: productID },
      ],
    }),

    getUserRating: builder.query({
      queryFn: (userIds) =>
        handleAxiosRequest(() => getUserRating({ data: userIds })),
      providesTags: (result, error, userIds) => [
        { type: "Review", id: userIds },
      ],
    }),
  }),
});

export const {
  useGetAllProductsQuery,
  useGetOneProductQuery,
  useIsLikedProductQuery,
  useLikeProductMutation,
  useUnlikeProductMutation,
  useGetProductReviewsQuery,
  useGetEachNumofTypeRatingQuery,
  useGetUserRatingQuery,
} = productQuery;
