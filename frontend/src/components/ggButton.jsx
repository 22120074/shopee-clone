import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loadItem } from "../features/cart/cartSlice";
import { FcGoogle } from "react-icons/fc";
import { useGoogleLogin } from "@react-oauth/google";
import { loginGG, getCurrentUser, refreshToken } from "../services/auth.service";
import { getCart } from "../services/cart.service";
import { login as loginRedux } from "../features/auth/authSlice";

function GGButton({ disabled, setLoadingSpecial, children }) {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    
    const login = useGoogleLogin({
        flow: "auth-code",
        onSuccess: async (codeResponse) => {
            try {
                await loginGG({ codeResponse });
                // Nếu đăng nhập thành công, sẽ trả về thông tin người dùng
                const currentUser = await getCurrentUser();
                // Nếu không có lỗi, cập nhật state auth
                if (currentUser && currentUser.data?.dataUser) {
                    dispatch(loginRedux(currentUser.data.dataUser));
                    const cart = await getCart(currentUser.data.dataUser.userId || currentUser.data.dataUser.googleID);
                    if (cart) {
                        dispatch(loadItem(cart.data));
                    }
                }
                // Chuyển hướng về trang chủ
                navigate("/");
            } catch (err) {
                if (err.response?.status === 401) {
                    try {
                        // Gọi API refresh
                        await refreshToken();
                        // Refresh thành công → gọi lại /me
                        const refreshedUser = await getCurrentUser();
                        dispatch(loginRedux(refreshedUser.data.dataUser));
                        return; // Không navigate về login nữa
                    } catch (refreshErr) {
                        // Refresh thất bại → quay về login
                        navigate("/auth/login");
                        return;
                    }
                }
                console.error("Login failed:", err.response?.data || err.message);
            } finally {
                setLoadingSpecial(false);
            }
        },
        onError: (err) => {
            console.error("Đăng nhập bằng Google thất bại:", err);
            setLoadingSpecial(false);
        },    
        onNonOAuthError: (err) => {
            console.error("Popup đã bị đóng hoặc có sự cố mạng:", err);
            setLoadingSpecial(false);
        }
    });

    return (
        <button onClick={() => { 
                setLoadingSpecial(true);
                login() 
            }}
            disabled={disabled}
            className="relative flex items-center border border-gray-300 rounded px-4 py-2 flex-1 justify-center"
        >
            <FcGoogle className="w-5 h-5 mr-2" />
            <span>Google</span>
            {children}
        </button>
    );
}
export default GGButton;