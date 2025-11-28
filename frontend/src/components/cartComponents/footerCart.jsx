import PrimaryButton from "../buttons/Button";
import { useDispatch } from "react-redux";
import { removeItem } from "../../features/cart/cartSlice";
import { useEffect, useRef, useState } from "react";

function FooterCart({ isPhone, cartItems, isCheckedAll, setIsAllChecked, isChecked, totalPrice = 0, isChangeFooter }) {
    const dispatch = useDispatch();
    // Sử dụng useRef để lưu isSticky
    const [isSticky, setIsSticky] = useState(false);
    const footerRef = useRef(null);

    const handleClearCart = () => {
        isChecked.forEach((checked, index) => {
            if (checked) {
                dispatch(removeItem(cartItems[index].selectedAttributes.attribute.id));
            }
        });
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
        <div className={`fixed md:sticky bottom-0 w-full h-20 bg-white mt-5 flex items-center justify-between px-2 md:px-10 
            ${isSticky ? 'shadow-[0_-10px_30px_-20px_rgba(0,0,0,0.3)] border-t' : 'border-b border-gray-200'}`}
        >
            <div className="flex items-center justify-between w-full md:w-auto gap-2 md:gap-10">
                {/* Checkbox */}
                <div className="flex items-center justify-center gap-2 md:gap-10">
                    <input type="checkbox" className="flex-shrink-0 relative appearance-none w-[18px] h-[18px] border border-[#DBDBDB] rounded-sm 
                        checked:bg-primaryColor checked:border-primaryColor"
                        checked={isCheckedAll}
                        onChange={(e) => setIsAllChecked(e.target.checked)}
                    />
                    <div className="white-space-nowrap text-sm md:text-base">
                        Chọn tất cả
                    </div>
                </div>
                <div className="flex gap-2 md:gap-10">
                    <button className={`${isPhone ? ((isChangeFooter === true && isPhone) ? 'block' : 'hidden') : ''} text-sm md:text-base`} 
                        onClick={handleClearCart}
                    >
                        Xóa
                    </button>
                    <button className={`${isPhone ? ((isChangeFooter === true && isPhone) ? 'block' : 'hidden') : ''} text-base 
                        text-primaryTextColor md:text-black font-semibold md:font-normal`
                    }>
                        Lưu vào mục yêu thích
                    </button>            
                </div>
            </div>
            <div className={`flex-1 flex items-center justify-end gap-2 md:gap-10 ${isChangeFooter === true ? 'hidden' : 'block'}`}>
                <div className="flex flex-col md:flex-row items-end md:items-center justify-center md:gap-3">
                    <div className="text-sm md:text-base self-end block md:flex">
                        Tổng cộng
                        {isPhone ? 
                            <div className="whitespace-nowrap">
                                ({isChecked.filter(item => item).length} sản phẩm):
                            </div> 
                        :
                            <>
                                {" "}({isChecked.filter(item => item).length} sản phẩm):
                            </>
                        }
                    </div>
                    <div className='flex justify-center text-base md:text-2xl font-normal text-primaryTextColor'>
                        <i className="fa-solid fa-dong-sign text-xs md:text-[14px] relative top-0 md:top-[8px] right-[2px]"></i>
                        {totalPrice.toLocaleString('vi-VN')}
                    </div>
                </div>
                <PrimaryButton height="40px" width={isPhone ? "120px" : "200px"} text={"Mua Hàng"} />
            </div>
        </div>
        <div ref={footerRef} className="w-full h-0 hidden md:block">

        </div>
        </>
    )
}
export default FooterCart;