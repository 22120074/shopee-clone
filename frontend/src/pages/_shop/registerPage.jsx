import { useState } from "react";
import StepProgress from "../../components/StepProgress";
import PrimaryButton from "../../components/buttons/Button";
import Spinner from "../../components/skeletons/spinnerButton";

function SellerRegisterPage() {
    // State để quản lý bước hiện tại
    const [currentStep, setCurrentStep] = useState(1);
    const steps = [
        { number: 1, label: 'Bắt đầu đăng ký' },
        { number: 2, label: 'Cài đặt thông tin cửa hàng' },
        { number: 3, label: 'Hoàn thành' },
    ];
    // State để quản lý trạng thái loading
    const [isLoading, setIsLoading] = useState(false);

    const handleOnclick = () => {
        setCurrentStep(currentStep + 1);
    }

    const handleGoBack = () => {
        setCurrentStep(currentStep - 1);
    }

    const handleSubmit = () => {
        // Xử lý khi nhấn nút Kế tiếp ở bước 2
        console.log("Submitting step 2 data...");
        // Chuyển sang bước tiếp theo
        setCurrentStep(currentStep + 1);
    }
        
    return (
    <div className="bg-backgroundGrayColor h-screen flex justify-center">
        <div className="h-[560px] w-[1000px] rounded-sm shadow-md px-[20px] mx-auto mt-10 flex flex-col items-center border-b border-gray-300 bg-white">
            <StepProgress currentStep={currentStep} steps={steps} />
            <div className="w-[80%] border-b-2 border-lesslessgrayColor" />
            { currentStep === 1 ? (
                <div className="mt-10 flex flex-col items-center justify-center">
                    <div className="bg-[url('https://deo.shopeesz.com/shopee/pap-admin-live-sg/upload/upload_9dab85081088531ee6d1aa958a90f55e.png')] bg-cover bg-center
                        w-[200px] h-[200px] cursor-pointer"
                    >
                    </div>
                    <div className="mt-4 text-lg font-">
                        Chào mừng đến với Shopee!
                    </div>
                    <div className="mt-1 mb-5 text-center text-sm text-gray-500 w-[400px]">
                        Vui lòng cung cấp thông tin để thành lập tài khoản người bán trên Shopee
                    </div>
                    <PrimaryButton width="140px" height="36px" text="Bắt đầu đăng ký" onClick={handleOnclick} />
                </div>
            ) : currentStep === 2 ? (
                <div className="mt-10 flex flex-col items-center justify-center">
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div className="w-full flex items-center justify-center gap-6 mt-4">
                        <button className="relative flex items-center justify-center gap-3 py-2 px-6 w-[180px] h-10
                            text-primaryTextColor bg-primaryRatingColor border border-primaryColor rounded-sm text-base"
                            onClick={handleGoBack}
                        >
                            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"
                                className="w-6 h-6"
                            >
                                <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                                <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
                                <g id="SVGRepo_iconCarrier"> 
                                    <path d="M4 10L3.29289 10.7071L2.58579 10L3.29289 9.29289L4 10ZM21 18C21 18.5523 20.5523 19 20 19C19.4477 19 19 18.5523 19 18L21 18ZM8.29289 15.7071L3.29289 10.7071L4.70711 9.29289L9.70711 14.2929L8.29289 15.7071ZM3.29289 9.29289L8.29289 4.29289L9.70711 5.70711L4.70711 10.7071L3.29289 9.29289ZM4 9L14 9L14 11L4 11L4 9ZM21 16L21 18L19 18L19 16L21 16ZM14 9C17.866 9 21 12.134 21 16L19 16C19 13.2386 16.7614 11 14 11L14 9Z" fill="currentColor"></path> 
                                </g>
                            </svg>
                            Quay lại
                        </button>
                        <PrimaryButton width="180px" height="40px" text="Kế tiếp" onClick={() => handleSubmit()}>
                            <div className={`absolute top-0 left-0 w-full h-full flex items-center justify-center
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
                    Step 3 Content
                </div>
            )
            }
        </div>
    </div>
    )
}

export default SellerRegisterPage;