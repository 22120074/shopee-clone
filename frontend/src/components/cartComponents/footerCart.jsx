import PrimaryButton from "../Button";
import { useDispatch } from "react-redux";
import { clearAllItem } from "../../features/cart/cartSlice";
import { useEffect, useRef, useState } from "react";

function FooterCart({ cartItems, isCheckedAll, setIsAllChecked, isChecked, totalPrice = 0 }) {
    const dispatch = useDispatch();
    // Sử dụng useRef để lưu isSticky
    const [isSticky, setIsSticky] = useState(false);
    const footerRef = useRef(null);

    const handleClearCart = () => {
        dispatch(clearAllItem());
    };

    useEffect(() => {
        const footerEl = footerRef.current;
        const observer = new IntersectionObserver(
            ([entry]) => {
                setIsSticky(!entry.isIntersecting);
            },
            { threshold: 0.1 }
        );
        if (footerEl) {
            observer.observe(footerEl);
        }
        return () => {
            if (footerEl) {
                observer.unobserve(footerEl);
            }
        };
    }, []);


    return (
        <>
        <div className={`sticky bottom-0 w-full h-20 bg-white mt-5 flex items-center justify-between px-10 
            ${isSticky ? 'shadow-[0_-10px_30px_-20px_rgba(0,0,0,0.3)] border-t' : 'border-b border-gray-200'}`}
        >
            <div className="flex items-center justify-center gap-10">
                {/* Checkbox */}
                <input type="checkbox" className="relative appearance-none w-[18px] h-[18px] border border-[#DBDBDB] rounded-sm 
                    checked:bg-primaryColor checked:border-primaryColor"
                    checked={isCheckedAll}
                    onChange={(e) => setIsAllChecked(e.target.checked)}
                />
                <div>
                    Chọn tất cả
                </div>
                <button onClick={handleClearCart}>
                    Xóa
                </button>
                <button>
                    Lưu vào mục yêu thích
                </button>            
            </div>
            <div className="flex items-center justify-center gap-10">
                <div className="flex items-center justify-center gap-3">
                    <div className="text-base">
                        Tổng cộng ({isChecked.filter(item => item).length} sản phẩm):
                    </div>
                    <div className='flex justify-center text-2xl font-normal text-primaryTextColor'>
                        <i className="fa-solid fa-dong-sign text-[14px] relative top-[8px] right-[2px]"></i>
                        {totalPrice.toLocaleString('vi-VN')}
                    </div>
                </div>
                <PrimaryButton height="40px" width="200px" text={"Mua Hàng"} />
            </div>
        </div>
        <div ref={footerRef} className="w-full h-0">

        </div>
        </>
    )
}
export default FooterCart;