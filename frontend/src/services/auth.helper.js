import { login } from "../features/auth/authSlice";
import { getCurrentUser, refreshToken } from "./auth.service";

export const handlexpiredToken = async (error, navigate, dispatch) => {
  if (error.response && error.response.status === 401) {
    try {
      await refreshToken();
      const refreshedUser = await getCurrentUser();
      dispatch(login(refreshedUser.data.data));
      return;
    } catch (refreshErr) {
      navigate("/auth/login");
    }
  }
};
