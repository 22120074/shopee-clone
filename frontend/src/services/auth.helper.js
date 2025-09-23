import { login } from "../features/auth/authSlice";
import { getCurrentUser, refreshToken } from "./user.service";

export const handelexpiredToken = async (error, navigate, dispatch) => {
    if (error.response && error.response.status === 401) {
        try {
            await refreshToken();
            const refreshedUser = await getCurrentUser();
            dispatch(login(refreshedUser.data.dataUser));
            return; // Không navigate về login nữa
        } catch (refreshErr) {
            navigate("/auth/login");
        }
    }
};
