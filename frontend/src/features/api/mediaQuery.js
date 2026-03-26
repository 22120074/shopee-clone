import { createApi, fakeBaseQuery } from "@reduxjs/toolkit/query/react";
import * as MediaService from "../../services/media.service";
import { handleAxiosRequest } from "../../utils/axiosHandle";

export const mediaQuery = createApi({
  reducerPath: "mediaQuery",
  baseQuery: fakeBaseQuery(),
  tagTypes: ["Media"],
  endpoints: (builder) => ({
    uploadMultipleImages: builder.mutation({
      queryFn: ({ imgs }) =>
        handleAxiosRequest(() => MediaService.uploadMultipleImages(imgs)),
      invalidatesTags: ["Media"],
    }),
  }),
});

export const { useUploadMultipleImagesMutation } = mediaQuery;
