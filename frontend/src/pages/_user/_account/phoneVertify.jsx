import { useState } from "react";
import { useSelector } from "react-redux";
import { useRef } from "react";
import { gsap } from "gsap";
import { updatePhone } from "../../../services/user.service";
import { useDispatch } from "react-redux";
import { updatePhone_Redux } from "../../../features/auth/authSlice";
import { useNavigate } from "react-router-dom";
import StepProgress from "../../../components/StepProgress";
import PrimaryButton from "../../../components/Button";
import Spinner from "../../../components/skeletons/spinnerButton";

function PhoneVertify() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    // Lấy thông tin user từ Redux store
    const user = useSelector((state) => state.auth.currentUser);
    // UseState để quản lí bước hiện tại
    const [currentStep, setCurrentStep] = useState(1);
    // Steps cho Thanh tiến độ
    const steps = [
        { number: 1, label: 'Gửi mã xác nhận' },
        { number: 2, label: 'Thay đổi số điện thoại' },
        { number: 3, label: 'Hoàn thành' },
    ];
    // UseState để quản lý trạng thái hover
    const [isHovered, setIsHovered] = useState(false);
    // Refs để tham chiếu đến các phần tử DOM
    const btnRef = useRef(null);
    const iconRef = useRef(null);
    const lettersRef = useRef([]);
    // UseState để quản lý trạng thái loading đặc biệt (khi submit OTP)
    const [isLoading, setIsLoading] = useState(false);
    // UseState để quản lý số điện thoại mới
    const [phone, setPhone] = useState("");
    // Ref tham chiếu đến input OTP đầu tiên, form
    const formRef = useRef(null);
    
    const handleMouseEnter = () => {
        if (isHovered) return;
        setIsHovered(true);
        const tl = gsap.timeline();

        // 1. Icon dịch 10px → nảy lại
        tl.to(iconRef.current, { x: 10, duration: 0.2, ease: "power1.out" })
        .to(iconRef.current, { x: 0, duration: 0.3, ease: "bounce.out" }, ">");

        // 2. Text: mỗi chữ lần lượt nhảy lên → xoay 360 → rơi xuống
        lettersRef.current.forEach((letter, i) => {
            tl.fromTo(
                letter,
                { y: 0, rotation: 0 },
                {
                    y: -16,
                    rotation: 360,
                    duration: 0.5,
                    ease: "power2.out",
                    yoyo: true,
                    repeat: 1,
                    delay: i * 0, // lần lượt
                },
                0 // start cùng lúc với timeline
            );
        });
        setTimeout(() => setIsHovered(false), 1000); // sau 1s + 0.5s mới cho hover lại
    };

    const text = "Cập nhật số điện thoại";
    lettersRef.current = [];

    // Xử lý khi click xác nhận muốn đổi số điện thoại
    const handleOnclick = () => {
        setCurrentStep(2);
    };
    
    // Xử lý quay lại bước trước
    const handleGoBack = () => {
        if (currentStep > 1) {
            setCurrentStep(currentStep - 1);
            if (formRef.current) {
                const inputs = formRef.current.querySelectorAll("input");
                inputs.forEach(input => {
                    input.value = "";
                });
            }
        }
    };

    // Xử lý cập nhật số điện thoại
    const handleUpdatePhone = async () => {
        try {
            setIsLoading(true);
            if (!phone || phone.length < 10) {
                alert("Vui lòng nhập số điện thoại hợp lệ.");
                return;
            }
            const response = await updatePhone(user?.userId || user?.googleID, phone);
            if (response) {
                // Cập nhật phone trong Redux
                dispatch(updatePhone_Redux(phone));
                // Chuyển sang bước 3
                setCurrentStep(3);
                const timer = setTimeout(() => {
                    navigate("/user/account/profile");
                }, 1500);
                return () => clearTimeout(timer);
            }
        } catch (error) {
            console.error("Error updating phone:", error);
        } finally {
            setIsLoading(false);
        }
    };



    return (
        <div className="flex flex-1 flex-col items-start justify-start bg-white mt-4 rounded-sm shadow-md py-4 px-8">
            {/* Thanh tiến độ */}
            <div className="w-full border-b border-lesslessgrayColor pb-4 select-none">
                <div className="text-xl text-black">Hồ sơ của tôi</div>
                <div className="text-base text-moregrayTextColor">Quản lí thông tin hồ sơ để bảo mật tài khoản</div>
            </div>
            <StepProgress currentStep={currentStep} steps={steps} />
            {/* Nội dung từng bước */}
            { currentStep === 1 ? (
                <div className="relative w-full flex flex-col items-center justify-start min-h-[350px]">
                    {/* Tấm khiên */}
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="80" height="80" fill="none" stroke="#FA5130" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"
                        className="absolute top-10 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10"
                    >
                        <path d="M12 2 3 5v6c0 5.25 3.75 9.74 9 11 5.25-1.26 9-5.75 9-11V5l-9-3z"/>
                        <path d="M9 12.5l1.8 1.8L15 10.1"/>
                    </svg>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="80" height="80" aria-hidden="true"
                        className="absolute top-10 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
                    >
                        <path d="M12 2v20c5.25-1.26 9-5.75 9-11V5l-9-3z" fill="#FFC7B3"/>
                    </svg>
                    <div className="text-lg text-black mt-24 mb-6 w-[420px]">
                        Để tăng cường bảo mật cho tài khoản của bạn, hãy xác minh thông tin bằng một trong những cách sau.
                    </div>
                    <button ref={btnRef} className="flex items-center justify-center gap-3 py-2 px-6 text-primaryTextColor rounded-sm text-base
                        border border-primaryTextColor hover:bg-primaryRatingColor"
                        onMouseEnter={handleMouseEnter}
                        onClick={handleOnclick}
                    >
                        <i ref={iconRef} className="fa-regular fa-envelope text-lg"></i> 
                        <span className="flex gap-1"> {/* gap giữa các từ */}
                            {text.split(" ").map((word, wIdx) => (
                                <span key={wIdx} className="flex gap-0"> {/* chữ trong từ sát nhau */}
                                    {word.split("").map((char, cIdx) => (
                                        <span
                                            key={cIdx}
                                            ref={(el) => lettersRef.current.push(el)}
                                            className="inline-block"
                                        >
                                            {char}
                                        </span>
                                    ))}
                                </span>
                            ))}
                        </span>
                    </button>
                </div>
            ) : currentStep === 2 ? (
                <div className="w-full flex flex-col items-center justify-center gap-8 py-0 select-none">
                    <div className="text-xl">
                        Nhập Số điện thoại mới
                    </div>
                    <form action="" className="w-full flex flex-col items-center justify-center max-w-[300px]" ref={formRef}>
                        <input placeholder="Nhập Số điện thoại mới của bạn" autoFocus
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            className="w-full h-10 text-center text-base rounded-md border border-gray-300 focus:outline-none" 
                        />
                    </form>
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
                        <PrimaryButton width="180px" height="40px" text="Kế tiếp" 
                            onClick={() => handleUpdatePhone()}
                        >
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
                <div className="w-full flex flex-col items-center justify-center gap-8 py-10">
                    <div className="text-xl text-green-600">Xác minh số điện thoại thành công!</div>
                    <div className="text-base text-center">
                        Số điện thoại của bạn đã được cập nhật thành công.
                    </div>
                </div>            
            )}
        </div>
    )
}
export default PhoneVertify;