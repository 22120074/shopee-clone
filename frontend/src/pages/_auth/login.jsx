import "../../css/auth.css";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { isValidPhone } from "../../utils/numberCheck";
import PrimaryButton from "../../components/buttons/Button";
import Spinner from "../../components/skeletons/spinnerButton";
import GGButton from "../../components/buttons/ggButton";
import FBButton from "../../components/buttons/fbButton";
import { useLoginMutation } from "../../features/api/authQuery";

function Login() {
  const navigate = useNavigate();
  // State để quản lý loading bình thường và loading khi đăng nhập GG, lỗi server
  const [login, { isLoading: isLoadingNormal }] = useLoginMutation();
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setShowErrors(true);
    if (errors.phone === "" && errors.password === "") {
      try {
        await login({
          phone: formData.phone,
          password: formData.password,
        }).unwrap();
        navigate("/");
      } catch (err) {
        const msg =
          err?.message || "Số điện thoại hoặc mật khẩu không chính xác.";
        setServerError(msg);
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
          {serverError && errors.phone === "" && errors.password === "" && (
            <p
              className="absolute text-red-500 text-xs mt-1 left-0"
              style={{ top: "calc(39px)", left: "0" }}
            >
              {serverError}
            </p>
          )}
          {errors && showErrors && (
            <p
              className="absolute text-red-500 text-xs mt-1 left-0"
              style={{ top: "calc(39px)", left: "0" }}
            >
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
          <div
            className={`absolute top-0 left-0 w-full h-full flex items-center justify-center
            ${isLoadingNormal ? "" : `${isLoadingSpecial ? "bg-white/50" : "hidden"}`}`}
          >
            <Spinner
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
      <div
        className="flex items-center justify-center w-full"
        style={{ margin: "32px 0" }}
      >
        <div className="line"></div>
        <div className="text-[12px] text-[#DBDBDB] px-4 py-0">Hoặc</div>
        <div className="line"></div>
      </div>
      {/* Phần đăng nhập bằng tài khoản khác */}
      <div className="flex items-center justify-between w-full gap-4">
        <FBButton
          setLoadingSpecial={setLoadingSpecial}
          disabled={isLoadingNormal}
        >
          <div
            className={`absolute top-0 left-0 w-full h-full flex items-center justify-center
            ${isLoadingSpecial || isLoadingNormal ? "bg-white/50" : "hidden"}`}
          >
            <Spinner
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
        >
          <div
            className={`absolute top-0 left-0 w-full h-full flex items-center justify-center
            ${isLoadingSpecial || isLoadingNormal ? "bg-white/50" : "hidden"}`}
          >
            <Spinner
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
