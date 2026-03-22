import { createApi, fakeBaseQuery } from "@reduxjs/toolkit/query/react";
import * as AuthService from "../../services/auth.service";
import { login } from "../auth/authSlice";

const handleAxiosRequest = async (apiCall) => {
  try {
    const response = await apiCall();
    return { data: response.data.data };
  } catch (error) {
    const errorPayload = error.response?.data || { message: error.message };
    return { error: errorPayload };
  }
};

export const authQuery = createApi({
  reducerPath: "authQuery",
  baseQuery: fakeBaseQuery(),
  tagTypes: ["User"],
  endpoints: (builder) => ({
    getCurrentUser: builder.query({
      queryFn: async (arg, api) => {
        try {
          const res = await AuthService.getCurrentUser();
          return { data: res.data.data };
        } catch (error) {
          if (error.response?.status === 401) {
            try {
              await AuthService.refreshToken();
              const retryRes = await AuthService.getCurrentUser();

              api.dispatch(login(retryRes.data.data));

              return { data: retryRes.data.data };
            } catch (refreshErr) {
              return { error: error.response?.data };
            }
          }
          return { error: error.response?.data };
        }
      },
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
