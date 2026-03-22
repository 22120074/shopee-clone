import { createApi, fakeBaseQuery } from "@reduxjs/toolkit/query/react";
import * as AuthService from "../../services/auth.service";
import { handleAxiosRequest } from "../../utils/axiosHandle";

export const authQuery = createApi({
  reducerPath: "authQuery",
  baseQuery: fakeBaseQuery(),
  tagTypes: ["User"],
  endpoints: (builder) => ({
    getCurrentUser: builder.query({
      queryFn: () => handleAxiosRequest(AuthService.getCurrentUser),
      providesTags: ["User"],
    }),

    login: builder.mutation({
      queryFn: (credentials) =>
        handleAxiosRequest(() => AuthService.login(credentials)),
      invalidatesTags: ["User"],
    }),

    logout: builder.mutation({
      queryFn: () => handleAxiosRequest(AuthService.logout),
      invalidatesTags: ["User"],
    }),

    register: builder.mutation({
      queryFn: (userData) =>
        handleAxiosRequest(() => AuthService.register(userData)),
    }),

    loginGG: builder.mutation({
      queryFn: (codeResponse) =>
        handleAxiosRequest(() => AuthService.loginGG({ codeResponse })),
      invalidatesTags: ["User"],
    }),

    sendOtpEmail: builder.mutation({
      queryFn: (email) =>
        handleAxiosRequest(() => AuthService.sendOtpEmail(email)),
    }),

    verifyOtpEmail: builder.mutation({
      queryFn: ({ email, otp }) =>
        handleAxiosRequest(() => AuthService.veritfyOtpEmail(email, otp)),
    }),
  }),
});

export const {
  useGetCurrentUserQuery,
  useLoginMutation,
  useLogoutMutation,
  useRegisterMutation,
  useLoginGGMutation,
  useSendOtpEmailMutation,
  useVerifyOtpEmailMutation,
} = authQuery;
