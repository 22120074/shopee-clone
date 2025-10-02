import React, { useRef, useState } from "react";
import { gsap } from "gsap";
import { useSelector } from "react-redux";
import { sendOtpEmail } from "../../../services/auth.service";

function EmailVertify() {
    // Lấy thông tin user từ Redux store
    const user = useSelector((state) => state.auth.currentUser);
    // UseState để quản lý trạng thái hover
    const [isHovered, setIsHovered] = useState(false);
    // UseState để quản lý trạng thái gửi email
    const [isSent, setIsSent] = useState(false);
    // Refs để tham chiếu đến các phần tử DOM
    const btnRef = useRef(null);
    const iconRef = useRef(null);
    const lettersRef = useRef([]);

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

    const text = "Xác minh bằng mã OTP gửi qua Email";
    lettersRef.current = [];

    const handleOnclick = () => {
        try {
            sendOtpEmail(user.email);
            setIsSent(true);
        } catch (error) {
            console.error("Error sending OTP email:", error);
        }
    }

    return (
        <div className="flex flex-1 flex-col items-start justify-start bg-white mt-4 rounded-sm shadow-md py-4 px-8">
            <div className="w-full border-b border-lesslessgrayColor pb-4">
                <div className="text-xl text-black">Hồ sơ của tôi</div>
                <div className="text-base text-moregrayTextColor">Quản lí thông tin hồ sơ để bảo mật tài khoản</div>
            </div>
            { isSent ? (
                <div>

                </div>
            ) : (
            <div className="relative w-full flex flex-col items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="80" height="80" fill="none" stroke="#FA5130" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"
                    className="absolute top-20 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10"
                >
                    <path d="M12 2 3 5v6c0 5.25 3.75 9.74 9 11 5.25-1.26 9-5.75 9-11V5l-9-3z"/>
                    <path d="M9 12.5l1.8 1.8L15 10.1"/>
                </svg>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="80" height="80" aria-hidden="true"
                    className="absolute top-20 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
                >
                    <path d="M12 2v20c5.25-1.26 9-5.75 9-11V5l-9-3z" fill="#FFC7B3"/>
                </svg>
                <div className="text-lg text-black mt-32 mb-6 w-[420px]">
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
            )}
        </div>
    )
}  
export default EmailVertify;