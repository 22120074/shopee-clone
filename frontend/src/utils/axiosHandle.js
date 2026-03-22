import * as AuthService from "../services/auth.service";

export const handleAxiosRequest = async (apiCall) => {
  try {
    const response = await apiCall();
    return { data: response.data.data };
  } catch (error) {
    if (error.response?.status === 401) {
      try {
        await AuthService.refreshToken();
        const retryRes = await apiCall();
        return { data: retryRes.data.data };
      } catch (refreshErr) {
        if (
          !window.location.pathname.includes("/auth/login") &&
          window.location.pathname !== "/"
        ) {
          window.location.href = "/auth/login";
        }
        return {
          error: {
            status: 401,
            data: refreshErr.response?.data || {
              message: "Phiên đăng nhập đã kết thúc",
            },
          },
        };
      }
    }
    return { error: error.response?.data };
  }
};
