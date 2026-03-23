import { createApi, fakeBaseQuery } from "@reduxjs/toolkit/query/react";
import * as UserService from "../../services/user.service";
import { handleAxiosRequest } from "../../utils/axiosHandle";

export const userQuery = createApi({
  reducerPath: "userQuery",
  baseQuery: fakeBaseQuery(),
  tagTypes: ["Profile"],
  endpoints: (builder) => ({
    updateEmail: builder.mutation({
      queryFn: ({ userId, newEmail }) =>
        handleAxiosRequest(() => UserService.updateEmail(userId, newEmail)),
      invalidatesTags: ["Profile"],
    }),
    updatePhone: builder.mutation({
      queryFn: ({ userId, newPhone }) =>
        handleAxiosRequest(() => UserService.updatePhone(userId, newPhone)),
      invalidatesTags: ["Profile"],
    }),
    updateProfile: builder.mutation({
      queryFn: ({ userId, displayName, name, gender, date }) =>
        handleAxiosRequest(() =>
          UserService.updateUserProfile(
            userId,
            displayName,
            name,
            gender,
            date,
          ),
        ),
      invalidatesTags: ["Profile"],
    }),
    updateAvatar: builder.mutation({
      queryFn: (avatar) =>
        handleAxiosRequest(() => UserService.updateUserAvatar(avatar)),
      invalidatesTags: ["Profile"],
    }),
  }),
});

export const {
  useUpdateEmailMutation,
  useUpdatePhoneMutation,
  useUpdateProfileMutation,
  useUpdateAvatarMutation,
} = userQuery;
