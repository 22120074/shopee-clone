import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import StepProgress from "../../components/StepProgress";
import PrimaryButton from "../../components/buttons/Button";
import Spinner from "../../components/skeletons/spinnerButton";
import { registerShop } from "../../services/shop.service";
import { set } from "../../features/shop/shopSlice";

function SellerRegisterPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const user = useSelector((state) => state.auth.currentUser);
  // State để quản lý bước hiện tại
  const [currentStep, setCurrentStep] = useState(1);
  const steps = [
    { number: 1, label: "Bắt đầu đăng ký" },
    { number: 2, label: "Cài đặt thông tin cửa hàng" },
    { number: 3, label: "Hoàn thành" },
  ];
  // State để quản lý trạng thái loading, nameShop
  const [isLoading, setIsLoading] = useState(false);
  const [nameShop, setNameShop] = useState(user?.name || "");
  const [address, setAddress] = useState([]);
  const [isAdding, setIsAdding] = useState(false);
  const [tempInput, setTempInput] = useState("");

  const handleOnclick = () => {
    setCurrentStep(currentStep + 1);
  };

  const handleGoBack = () => {
    setCurrentStep(currentStep - 1);
  };

  const handleAddAddress = () => {
    if (!tempInput.trim()) return;

    setAddress((prev) => [...prev, tempInput]);
    setTempInput("");
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    try {
      const response = await registerShop(
        user.userId || user.googleID,
        nameShop,
        address,
      );
      dispatch(set(response.data.data));
      navigate("/shop/dashboard");
    } catch (error) {
      console.log("Lỗi khi đăng ký Shop: ", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-backgroundGrayColor flex justify-center">
      <div
        className="h-auto min-h-[560px] w-[1000px] rounded-sm shadow-md px-[20px] mx-auto 
        mt-10 pb-8 flex flex-col items-center border-b border-gray-300 bg-white"
      >
        <StepProgress currentStep={currentStep} steps={steps} />
        <div className="w-[80%] border-b-2 border-lesslessgrayColor" />
        {currentStep === 1 ? (
          <div className="mt-10 flex flex-col items-center justify-center">
            <div
              className="bg-[url('https://deo.shopeesz.com/shopee/pap-admin-live-sg/upload/upload_9dab85081088531ee6d1aa958a90f55e.png')] bg-cover bg-center
                        w-[200px] h-[200px] cursor-pointer"
            ></div>
            <div className="mt-4 text-lg font-">Chào mừng đến với Shopee!</div>
            <div className="mt-1 mb-5 text-center text-sm text-gray-500 w-[400px]">
              Vui lòng cung cấp thông tin để thành lập tài khoản người bán trên
              Shopee
            </div>
            <PrimaryButton
              width="140px"
              height="36px"
              text="Bắt đầu đăng ký"
              onClick={handleOnclick}
            />
          </div>
        ) : currentStep === 2 ? (
          <div className="w-full md:px-20 mt-10 flex flex-col items-center justify-center">
            {/* Form */}
            <form
              action=""
              className="relative w-full grid grid-cols-[120px_1fr] gap-y-6 px-10"
              autoComplete="off"
            >
              {/* ------------- Tên Shop ------------- */}
              <label
                htmlFor="displayName"
                className="flex items-center justify-end gap-1 text-[15px] text-black"
              >
                <span className="text-red-500">*</span>
                Tên Shop
              </label>
              <input
                type="text"
                id="displayName"
                className="w-80 h-9 border border-gray-300 rounded-sm p-2 ml-4 focus:outline-none text-[15px]"
                value={nameShop}
                maxLength={30}
                onChange={(e) => setNameShop(e.target.value)}
              />
              <span className="absolute top-[6px] left-[512px] text-grayTextColor text-sm">
                {nameShop.length}/30
              </span>
              {/* ------------- Địa chỉ ------------- */}
              <label
                htmlFor="address"
                className="flex items-start justify-end gap-1 text-[15px] text-black pt-1"
              >
                <span className="text-red-500">*</span>
                Địa chỉ lấy hàng
              </label>
              <div className="flex flex-col gap-2 w-full ml-4">
                {address.length > 0 && (
                  <div className="flex flex-col gap-2">
                    {address.map((add, index) => (
                      <div
                        key={index}
                        className="flex flex-row items-center gap-2"
                      >
                        <div className="w-80 h-9 border border-gray-300 rounded-sm p-2 text-[15px] bg-gray-50">
                          {add}
                        </div>
                        <button
                          type="button"
                          onClick={() =>
                            setAddress(address.filter((_, i) => i !== index))
                          }
                          className="text-xs text-red-500 hover:underline"
                        >
                          Xóa
                        </button>
                      </div>
                    ))}
                  </div>
                )}
                {isAdding ? (
                  <div className="flex flex-row gap-2 w-full">
                    <input
                      autoFocus
                      type="text"
                      value={tempInput}
                      onChange={(e) => setTempInput(e.target.value)}
                      placeholder="Nhập địa chỉ chi tiết..."
                      className="w-80 h-9 border border-blue-400 rounded-sm p-2 focus:outline-none text-[15px]"
                    />
                    <div className="flex gap-2">
                      <button
                        type="button"
                        onClick={() => {
                          handleAddAddress();
                          setIsAdding(false);
                        }}
                        className="text-xs bg-blue-600 text-white px-3 py-1 rounded-sm"
                      >
                        Lưu
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          setIsAdding(false);
                          setTempInput("");
                        }}
                        className="text-xs bg-gray-200 text-gray-600 px-3 py-1 rounded-sm"
                      >
                        Hủy
                      </button>
                    </div>
                  </div>
                ) : (
                  <button
                    type="button"
                    onClick={() => setIsAdding(true)}
                    className="w-20 h-9 border border-gray-300 rounded-sm flex items-center justify-center text-sm hover:bg-gray-50"
                  >
                    + Thêm
                  </button>
                )}
              </div>
              {/* ------------- Email ------------- */}
              <label
                htmlFor="email"
                className="flex items-center justify-end gap-1 text-[15px] text-black"
              >
                <span className="text-red-500">*</span>
                Email
              </label>
              <div
                type="text"
                id="email"
                className="w-80 h-9 border border-gray-300 rounded-sm p-2 ml-4 focus:outline-none 
                            text-[15px] text-gray-400 cursor-not-allowed"
              >
                {user?.email}
              </div>
              {/* ------------- Số điện thoại ------------- */}
              <label
                htmlFor="phone"
                className="flex items-center justify-end gap-1 text-[15px] text-black"
              >
                <span className="text-red-500">*</span>
                Số điện thoại
              </label>
              <div
                type="text"
                id="email"
                className="w-80 h-9 border border-gray-300 rounded-sm p-2 ml-4 focus:outline-none 
                            text-[15px] text-gray-400 cursor-not-allowed"
              >
                {user?.phone}
              </div>
            </form>
            {/* ------------- Button điều hướng ------------- */}
            <div className="w-full flex items-center justify-center gap-6 mt-4">
              <button
                className="relative flex items-center justify-center gap-3 py-2 px-6 w-[180px] h-10
                            text-primaryTextColor bg-primaryRatingColor border border-primaryColor rounded-sm text-base"
                onClick={handleGoBack}
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-6 h-6"
                >
                  <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                  <g
                    id="SVGRepo_tracerCarrier"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  ></g>
                  <g id="SVGRepo_iconCarrier">
                    <path
                      d="M4 10L3.29289 10.7071L2.58579 10L3.29289 9.29289L4 10ZM21 18C21 18.5523 20.5523 19 20 19C19.4477 19 19 18.5523 19 18L21 18ZM8.29289 15.7071L3.29289 10.7071L4.70711 9.29289L9.70711 14.2929L8.29289 15.7071ZM3.29289 9.29289L8.29289 4.29289L9.70711 5.70711L4.70711 10.7071L3.29289 9.29289ZM4 9L14 9L14 11L4 11L4 9ZM21 16L21 18L19 18L19 16L21 16ZM14 9C17.866 9 21 12.134 21 16L19 16C19 13.2386 16.7614 11 14 11L14 9Z"
                      fill="currentColor"
                    ></path>
                  </g>
                </svg>
                Quay lại
              </button>
              <PrimaryButton
                width="180px"
                height="40px"
                text="Kế tiếp"
                onClick={handleOnclick}
              >
                <div
                  className={`absolute top-0 left-0 w-full h-full flex items-center justify-center
                                ${isLoading ? "bg-white/50" : "hidden"}`}
                >
                  <Spinner
                    size={"30px"}
                    stroke={"5px"}
                    _hidden={isLoading ? "" : "hidden"}
                    color={"white"}
                  />
                </div>
              </PrimaryButton>
            </div>
          </div>
        ) : (
          <div className="mt-10 flex flex-col items-center justify-center">
            <div
              className="bg-[url('https://deo.shopeesz.com/shopee/pap-admin-live-sg/upload/upload_9dab85081088531ee6d1aa958a90f55e.png')] bg-cover bg-center
                        w-[200px] h-[200px] cursor-pointer"
            ></div>
            <div className="mt-4 text-lg font-">
              Bước cuối trở thành Shopee Người Bán!
            </div>
            <div className="mt-1 mb-5 text-center text-sm text-gray-500 w-[400px]">
              Bạn đã xong các bước cơ bản, hãy nhấn Hoàn Thành để hoàn tất thủ
              tục lập tài khoản người bán
            </div>
            <PrimaryButton
              width="140px"
              height="36px"
              text="Hoàn thành"
              onClick={handleSubmit}
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default SellerRegisterPage;
