import "../../css/auth.css";
import { useState } from "react";
import PrimaryButton from "../../components/Button";
import StretchSpinner from "../../components/skeletons/spinnerButton";
import GGButton from "../../components/ggButton";
import FBButton from "../../components/fbButton";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "../../features/auth/authSlice";
import { loadItem } from "../../features/cart/cartSlice";
import { login as loginService, getCurrentUser, refreshToken } from "../../services/auth.service";
import { getCart } from "../../services/cart.service";
import { isValidPhone } from "../../utils/numberCheck";

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // State để quản lý loading bình thường và loading khi đăng nhập GG, lỗi server
  const [isLoadingNormal, setLoadingNormal] = useState(false);
  const [isLoadingSpecial, setLoadingSpecial] = useState(false);
  const [serverError, setServerError] = useState("");
  // State để quản lý form và lỗi form
  const [formData, setFormData] = useState({
    phone: "",
    password: "",
  });
  const [errors, setErrors] = useState({
    phone: "",
    password: "",
  });
  // State để quản lí ẩn hiện lỗi form
  const [showErrors, setShowErrors] = useState(false);

  const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  // Hàm xử lý post của form
  const handleChange = (e) => {
    setShowErrors(false);
    setServerError("");
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    let errorMessage = "";
    if (name === "phone" && !isValidPhone(value)) {
      errorMessage = "Số điện thoại không hợp lệ";
    }
    if (name === "password" && value.length < 8) {
      errorMessage = "Mật khẩu phải có ít nhất 8 ký tự";
    }
    setErrors((prev) => ({
      ...prev,
      [name]: errorMessage,
    }));
  };

  // const API_URL = process.env.REACT_APP_API_URL; // giờ sẽ là 'http://localhost:5000'

  const handleSubmit = async (e) => {
    e.preventDefault();
    setShowErrors(true);
    let isLogin = false;
    if (errors.phone === '' && errors.password === '') {
      try {
        setLoadingNormal(true);
        // Gọi API đăng nhập
        await loginService({
          phone: formData.phone,
          password: formData.password,
        });
        // Nếu đăng nhập thành công, sẽ trả về thông tin người dùng
        isLogin = true;
        const currentUser = await getCurrentUser();
        // Nếu không có lỗi, cập nhật state auth
        if (currentUser) {
          dispatch(login(currentUser.data.dataUser));
          // Lấy giỏ hàng của user
          const cart = await getCart(currentUser.data.dataUser.userId);
          if (cart) {
            dispatch(loadItem(cart.data));
          }
        } 
        // Chuyển hướng về trang chủ
        await delay(1000);
        navigate("/");
      } catch (err) {
        if (err.response?.status === 401 && isLogin) {
          try {
            // Gọi API refresh
            await refreshToken();
            // Refresh thành công → gọi lại /me
            const refreshedUser = await getCurrentUser();
            dispatch(login(refreshedUser.data.dataUser));
            // Chuyển hướng về trang chủ
            await delay(1000);
            navigate("/");
            return; // Không navigate về login nữa
          } catch (refreshErr) {
            const msg = refreshErr.response?.data?.message || "Lỗi kết nối. Vui lòng thử lại.";
            setServerError(msg);
            return;
          }
        }
        // Lỗi khác 401
        console.error("Lỗi khi lấy user:", err);
        const msg = err.response.data.message || "Lỗi kết nối. Vui lòng thử lại.";
        setServerError(msg);
      } finally {
        setLoadingNormal(false);
      }
    }
  };

  return (
    <div className="auth_container">
      {/* Phần tiêu đề */}
      <div className="self-start mb-4" style={{ fontSize: "20px" }}>
        Đăng nhập
      </div>
      {/* Phần form */}
      <form onSubmit={handleSubmit} className="auth_form">
        {/* Input số điện thoại */}
        <input
          type="tel"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          placeholder="Số điện thoại"
          className="border border-gray-300 px-4 py-2 mb-4 w-full rounded"
          required
        />
        {/* Input mật khẩu */}
        <div className="relative w-full">
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Mật khẩu"
            className="border border-gray-300 px-4 py-2 mb-5 w-full rounded"
            required
          />
          {/* Hiển thị lỗi nếu có */}
          { serverError && errors.phone === '' && errors.password === '' && (
            <p className="absolute text-red-500 text-xs mt-1 left-0" style={{ top: "calc(39px)", left: "0" }}>
              {serverError}
            </p>
          )}
          { errors && showErrors && (
            <p className="absolute text-red-500 text-xs mt-1 left-0" style={{ top: "calc(39px)", left: "0" }}>
              {errors.phone || errors.password}
            </p>
          )}
        </div>
        {/* Nút đăng nhập */}
        <PrimaryButton 
          height="40px" 
          width="100%" 
          text={isLoadingNormal ? "" : "Đăng nhập"} 
          type="submit" 
          disabled={isLoadingSpecial}
        >
          <div className={`absolute top-0 left-0 w-full h-full flex items-center justify-center
            ${isLoadingNormal ? "" : `${isLoadingSpecial ? "bg-white/50" : "hidden"}`}`}
          >
            <StretchSpinner 
              size={"30px"} 
              stroke={"5px"}  
              _hidden={isLoadingSpecial ? "hidden" : ""}
              color={"white"}
            />
          </div>
        </PrimaryButton>
        <span className="block text-left w-full">
          <Link to="/" className="text-xs" style={{ color: "#0055AA" }}>
            Quên mật khẩu
          </Link>
        </span>
      </form>
      {/* Phần đường kẻ ngăn cách */}
      <div className="flex items-center justify-center w-full" style={{ margin: "32px 0" }}>
        <div className="line"></div>
        <div className="text-[12px] text-[#DBDBDB] px-4 py-0">
          Hoặc
        </div>
        <div className="line"></div>
      </div>
      {/* Phần đăng nhập bằng tài khoản khác */}
      <div className="flex items-center justify-between w-full gap-4">
        <FBButton setLoadingSpecial={setLoadingSpecial} disabled={isLoadingNormal}>
          <div className={`absolute top-0 left-0 w-full h-full flex items-center justify-center
            ${isLoadingSpecial || isLoadingNormal ? "bg-white/50" : "hidden"}`}
          >
            <StretchSpinner 
              size={"30px"} 
              stroke={"6px"}  
              _hidden={isLoadingNormal ? "hidden" : ""}
              color={"#ee4d2d"}
            />
          </div>        
        </FBButton>
        <GGButton 
          disabled={isLoadingNormal} 
          setLoadingSpecial={setLoadingSpecial} 
          dispatch={dispatch} 
          navigate={navigate}
        >
          <div className={`absolute top-0 left-0 w-full h-full flex items-center justify-center
            ${isLoadingSpecial || isLoadingNormal ? "bg-white/50" : "hidden"}`}
          >
            <StretchSpinner 
              size={"30px"} 
              stroke={"6px"}  
              _hidden={isLoadingNormal ? "hidden" : ""}
              color={"#ee4d2d"}
            />
          </div>
        </GGButton>
      </div>
      {/* Phần chưa có tài khoản */}
      <div className="text-sm text-[#BDBDBD] mt-4">
        Bạn mới biết đến Shopee?
        <Link to="/auth/register" className="text-[#FA5130] font-semibold">
          {" "}
          Đăng ký
        </Link>
      </div>
    </div>
  );
}

export default Login;
