import { useState } from "react";
import StepProgress from "../../components/StepProgress";
import PrimaryButton from "../../components/buttons/Button";

function SellerRegisterPage() {
    // State để quản lý bước hiện tại
    const [currentStep, setCurrentStep] = useState(1);
    const steps = [
        { number: 1, label: 'Bắt đầu đăng ký' },
        { number: 2, label: 'Cài đặt thông tin cửa hàng' },
        { number: 3, label: 'Hoàn thành' },
    ];

    const handleOnclick = () => {
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
                <div>Step 2 Content</div>
            ) : (
                <div>Step 3 Content</div>
            )
            }
        </div>
    </div>
    )
}

export default SellerRegisterPage;