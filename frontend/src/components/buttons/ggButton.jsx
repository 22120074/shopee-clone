import { useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { useGoogleLogin } from "@react-oauth/google";
import { useLoginGGMutation } from "../../features/api/authQuery";

function GGButton({ disabled, setLoadingSpecial, children }) {
  const navigate = useNavigate();
  const [loginGG] = useLoginGGMutation();

  const login = useGoogleLogin({
    flow: "auth-code",
    onSuccess: async (codeResponse) => {
      try {
        await loginGG({ codeResponse }).unwrap();
        navigate("/");
      } catch (err) {
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
    },
  });

  return (
    <button
      onClick={() => {
        setLoadingSpecial(true);
        login();
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
