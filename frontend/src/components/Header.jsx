import '../css/header.css';
import { Link, useLocation, useNavigate  } from "react-router-dom";
import { logout } from '../features/auth/authSlice';
import { clearAllItem } from '../features/cart/cartSlice';
import { useDispatch, useSelector } from 'react-redux';
import emptyCart from '../assets/Empty-bro.svg';
import PrimaryButton from './Button';
import { createOrupdateCart } from '../services/cart.service';
import { useEffect, useState } from 'react';
import useIsWindow from '../hooks/useIsWindow';

function Header() {
    const isDesktop = useIsWindow("(min-width: 1024px)");
    const location = useLocation();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    // Lấy thông tin người dùng từ Redux store
    const user = useSelector((state) => state.auth.currentUser);
    const isSticky = useLocation().pathname === '/';

    // Lấy thông tin giỏ hàng từ Redux store
    const items = useSelector((state) => state.cart.items);
    const totalQuantity = useSelector((state) => state.cart.totalQuantity);
    const totalPrice = useSelector((state) => state.cart.totalPrice);

    // Lấy thông tin location từ URL
    const urlPath = location.pathname === "/cart" ? "cart" : "";

    // dùng useState để quản lí animation 
    const [openUserDropdown, setOpenUserDropdown] = useState("closed");
    const [openCartDropdown, setOpenCartDropdown] = useState("closed");

    const handleLogout = async () => {
        try {
            if(items.length > 0) {
                await createOrupdateCart({
                    userId: user.userId,
                    items: items,
                    totalQuantity: totalQuantity,
                    totalPrice: totalPrice
                });
                dispatch(clearAllItem());
            }
            dispatch(logout());
        } catch (error) {
            console.error('Logout failed:', error);
        }
    };

    // dùng useEffect để quản lí đóng mở dropdown
    useEffect(() => {
        let timer;
        if (openUserDropdown === "close") {
            timer = setTimeout(() => { setOpenUserDropdown("closed"); }, 200);
        }
        return () => clearTimeout(timer);
    }, [openUserDropdown]);

    useEffect(() => {
        let timer;
        if (openCartDropdown === "close") {
            timer = setTimeout(() => { setOpenCartDropdown("closed"); }, 200);
        }
        return () => clearTimeout(timer);
    }, [openCartDropdown]);

    // console.log(items)

    // Dùng useEffect để fix lỗi tự open dropdown khi từ /cart quay về trang chủ
    useEffect(() => {
        // Mỗi khi đổi trang thì đóng dropdown
        setOpenCartDropdown("closed");
        setOpenUserDropdown("closed");
    }, [location.pathname]);


    return (
        <header className={`${isSticky ? 'sticky top-0 z-[30]' : 'relative'} Web-header flex flex-col bg-primaryColor min-w-0 w-full
                ${urlPath === "cart" ? 'lg:h-[140px]' : 'lg:h-[120px]'} h-[56px]`} 
        >
            {/* Phần 1 của Navbar */}
            <div className={`navbar flex items-center justify-between pl-4 lg:pl-0 py-2 lg:py-0 w-full max-w-[1200px] mx-auto
                ${urlPath === "cart" ? 'lg:h-[56px]' : 'lg:h-[32px] lg:mt-[2px]'} h-full gap-6 lg:gap-0`} 
            >
                {/* Hỗ trợ của web */}
                <ul className="flex-row items-center hidden lg:flex">
                    <li className="text-sm text-white li_borderleft pr-[9px] pl-[8px] relative">Kênh Người bán</li>
                    <li className="text-sm text-white li_borderleft pr-[9px] pl-[8px] relative">Trờ thành Người bán Shoppe</li>
                    <li className="text-sm text-white li_borderleft pr-[9px] pl-[8px] relative">Tải ứng dụng</li>
                    <li className="text-sm text-white relative pr-[9px] pl-[8px] mr-[50px]">
                        Kết nối
                        <i className="fa-brands fa-facebook absolute right-[-10px] top-[calc(50%-6px)]"></i>
                        <i className="fa-brands fa-instagram absolute right-[-30px] top-[calc(50%-6px)]"></i>                    
                    </li>
                </ul>
                {/* Thanh tìm kiếm ở mobile */}
                <div className="navbar_input-wrapper flex items-center lg:hidden max-w-[400px] md:max-w-[600px] lg:max-w-none w-full h-[32px] bg-white pl-[10px]" >
                    <input type="text" className='navbar_input w-full h-[32px] flex-1 text-sm placeholder:text-xs md:placeholder:text-sm' 
                        placeholder='Shopee bao ship 0Đ - Đăng kí ngay!' 
                    />
                    <button className="w-[60px] h-[calc(100%-6px)] bg-primaryColor flex items-center justify-center m-[3px] rounded-sm">
                        <i className="fa-solid fa-magnifying-glass text-white"></i>
                    </button>
                </div>
                {/* Hỗ trợ cho người dùng */}
                <ul className="flex flex-row items-center">
                    <Link to="/cart" className='flex lg:hidden items-center h-full justify-center mr-8'>
                        <i className="cursor-pointer w-[30%] flex items-center justify-center relative 
                            fa-solid fa-cart-shopping text-white">
                        </i>
                    </Link>
                    <li className="lg:text-sm text-xl text-white relative mx-[6px]">
                        <i className="lg:top-[calc(50%-6px)] top-[calc(50%-9px)] fa-regular fa-bell absolute left-[-18px]"></i>
                        <span className='hidden lg:inline-block'>
                            Thông Báo
                        </span>
                    </li>
                    <li className="hidden lg:block relative mx-[18px] my-0 text-sm text-white">
                        <i className="absolute fa-regular fa-question top-[calc(50%-6px)] left-[-14px]"></i>
                        Hỗ Trợ
                    </li>
                    <li className="hidden lg:block text-sm text-white relative ml-[16px]">
                        <i className="fa-sharp fa-solid fa-globe absolute top-[calc(50%-6px)] left-[-20px]"></i>
                        Tiếng Việt
                    </li>
                    <li className="text-sm text-white mr-2 ml-4">
                        <ul className="flex flex-row items-center">
                            {/* Kiểm tra xem người dùng đã đăng nhập hay chưa */}
                            {!user ? (
                                <>
                                    <li className="li_borderleft pr-[9px] relative">
                                        <Link to="/register">Đăng Kí</Link>
                                    </li>
                                    <li className="pl-2">
                                        <Link to="/login">Đăng Nhập</Link>
                                    </li>
                                </>
                            ) : (
                                <>
                                    <li className="user_wrapper pr-[9px] relative"
                                        onMouseEnter={isDesktop ? () => setOpenUserDropdown("open") : undefined}
                                        onMouseLeave={isDesktop ? () => setOpenUserDropdown("close") : undefined}   
                                    >
                                        <Link to="/user" >
                                            <div className='flex items-center'>
                                                <div className='w-8 h-8 rounded-full overflow-hidden mr-2'>
                                                    <img src={user.avatarUrl || "https://as1.ftcdn.net/v2/jpg/07/24/59/76/1000_F_724597608_pmo5BsVumFcFyHJKlASG2Y2KpkkfiYUU.jpg"} alt="avatar" className="user_avatar" />
                                                </div>
                                                <div className='max-w-[100px] overflow-hidden'> 
                                                    {user.name || user.phone || user._id}
                                                </div>
                                            </div>
                                        </Link>
                                        {/* Dropdown menu người dùng*/}
                                        <div className={`user_dropdown w-auto min-w-max absolute ${openUserDropdown}`}>
                                            <ul className='flex flex-col text-black'>
                                                <li className='user_dropdown-item hover:bg-gray-100 hover:text-hoverTextColorHeader'>
                                                    <Link to="/" className='user_dropdown-item_link'>Tài khoản của tôi</Link>
                                                </li>
                                                <li className='user_dropdown-item hover:bg-gray-100 hover:text-hoverTextColorHeader'>
                                                    <Link to="/" className='user_dropdown-item_link'>Đơn mua</Link>
                                                </li>
                                                <li className='user_dropdown-item hover:bg-gray-100 hover:text-hoverTextColorHeader'
                                                    onClick={handleLogout}
                                                    >
                                                    <span  className='user_dropdown-item_link'>Đăng xuất</span>
                                                </li>
                                            </ul>
                                        </div>
                                    </li>
                                </>
                            )}
                        </ul>
                    </li>
                </ul>
            </div>
            {/* Phần 2 của Navbar */}  
            { urlPath === "cart" ? (
                <div className='bg-white w-full h-full border-b border-gray-200'>
                    <div className='flex items-center justify-between h-full mx-auto max-w-[1200px]'>
                        {/* Phần Logo */}
                        <div className='flex h-full w-auto items-center '>
                            <Link to="/" className="flex items-center text-primaryColor no-underline h-full text-2xl font-normal">
                                <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"
                                    className="text-primaryColor translate-y-[-6px] h-[47px] w-[50px]">
                                    <title>Shopee</title><path fill="currentColor" d="M15.9414 17.9633c.229-1.879-.981-3.077-4.1758-4.0969-1.548-.528-2.277-1.22-2.26-2.1719.065-1.056 1.048-1.825 2.352-1.85a5.2898 5.2898 0 0 1 2.8838.89c.116.072.197.06.263-.039.09-.145.315-.494.39-.62.051-.081.061-.187-.068-.281-.185-.1369-.704-.4149-.983-.5319a6.4697 6.4697 0 0 0-2.5118-.514c-1.909.008-3.4129 1.215-3.5389 2.826-.082 1.1629.494 2.1078 1.73 2.8278.262.152 1.6799.716 2.2438.892 1.774.552 2.695 1.5419 2.478 2.6969-.197 1.047-1.299 1.7239-2.818 1.7439-1.2039-.046-2.2878-.537-3.1278-1.19l-.141-.11c-.104-.08-.218-.075-.287.03-.05.077-.376.547-.458.67-.077.108-.035.168.045.234.35.293.817.613 1.134.775a6.7097 6.7097 0 0 0 2.8289.727 4.9048 4.9048 0 0 0 2.0759-.354c1.095-.465 1.8029-1.394 1.9449-2.554zM11.9986 1.4009c-2.068 0-3.7539 1.95-3.8329 4.3899h7.6657c-.08-2.44-1.765-4.3899-3.8328-4.3899zm7.8516 22.5981-.08.001-15.7843-.002c-1.074-.04-1.863-.91-1.971-1.991l-.01-.195L1.298 6.2858a.459.459 0 0 1 .45-.494h4.9748C6.8448 2.568 9.1607 0 11.9996 0c2.8388 0 5.1537 2.5689 5.2757 5.7898h4.9678a.459.459 0 0 1 .458.483l-.773 15.5883-.007.131c-.094 1.094-.979 1.9769-2.0709 2.0059z"/></svg>
                                    Shopee
                                <div className='relative mx-4'>
                                    <div className='absolute border border-primaryColor top-0 left-1/2 h-[30px] translate-y-[-50%]'></div>
                                </div>
                                <div className='font-normal text-[22px] flex items-center h-full'>
                                    Giỏ Hàng
                                </div>
                            </Link>
                        </div>
                        {/* Phần tìm kiếm */}
                        <div className="h-full w-full max-w-[600px] flex items-center">
                            <div className="navbar_input-wrapper_cart relative flex items-center w-full h-[40px] bg-white 
                                    border-2 border-primaryColor rounded-sm">
                                <input type="text" className='navbar_input text-sm w-full h-[20px] px-2'
                                    placeholder='Đặt thêm hàng vào Shopee Cart ngay!' />
                                <button className="w-[80px] h-[calc(100%)] bg-primaryColor flex items-center justify-center">
                                    <i className="fa-solid fa-magnifying-glass text-white"></i>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="main_navbar hidden lg:flex items-center justify-center w-full max-w-[1200px] my-0 mx-auto">
                    {/* Phần Logo */}
                    <div className='h-full mr-[50px] '>
                        <Link to="/" className="flex items-center no-underline text-white h-full text-3xl font-normal">
                            <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className="text-white h-[47px] w-[50px] mb-3"><title>Shopee</title><path fill="currentColor" d="M15.9414 17.9633c.229-1.879-.981-3.077-4.1758-4.0969-1.548-.528-2.277-1.22-2.26-2.1719.065-1.056 1.048-1.825 2.352-1.85a5.2898 5.2898 0 0 1 2.8838.89c.116.072.197.06.263-.039.09-.145.315-.494.39-.62.051-.081.061-.187-.068-.281-.185-.1369-.704-.4149-.983-.5319a6.4697 6.4697 0 0 0-2.5118-.514c-1.909.008-3.4129 1.215-3.5389 2.826-.082 1.1629.494 2.1078 1.73 2.8278.262.152 1.6799.716 2.2438.892 1.774.552 2.695 1.5419 2.478 2.6969-.197 1.047-1.299 1.7239-2.818 1.7439-1.2039-.046-2.2878-.537-3.1278-1.19l-.141-.11c-.104-.08-.218-.075-.287.03-.05.077-.376.547-.458.67-.077.108-.035.168.045.234.35.293.817.613 1.134.775a6.7097 6.7097 0 0 0 2.8289.727 4.9048 4.9048 0 0 0 2.0759-.354c1.095-.465 1.8029-1.394 1.9449-2.554zM11.9986 1.4009c-2.068 0-3.7539 1.95-3.8329 4.3899h7.6657c-.08-2.44-1.765-4.3899-3.8328-4.3899zm7.8516 22.5981-.08.001-15.7843-.002c-1.074-.04-1.863-.91-1.971-1.991l-.01-.195L1.298 6.2858a.459.459 0 0 1 .45-.494h4.9748C6.8448 2.568 9.1607 0 11.9996 0c2.8388 0 5.1537 2.5689 5.2757 5.7898h4.9678a.459.459 0 0 1 .458.483l-.773 15.5883-.007.131c-.094 1.094-.979 1.9769-2.0709 2.0059z"/></svg>
                            Shopee
                        </Link>
                    </div>
                    {/* Phần tìm kiếm */}
                    <div className="flex items-center flex-col min-w-0 flex-1 h-full">
                        <div className="navbar_input-wrapper flex items-center mt-4 w-full h-[40px] bg-white pl-[10px]" >
                            <input type="text" className='navbar_input text-sm w-full h-10 flex-1' placeholder='Shopee bao ship 0Đ - Đăng kí ngay!' />
                            <button className="w-[60px] h-[calc(100%-6px)] bg-primaryColor flex items-center justify-center m-[3px] rounded-sm">
                                <i className="fa-solid fa-magnifying-glass text-white"></i>
                            </button>
                        </div>
                        <ul className='flex flex-row gap-3 justify-start max-w-full overflow-x-hidden whitespace-nowrap py-[8px] w-full'>
                            <li className='text-xs text-white'>Máy quạt cầm tay</li>
                            <li className='text-xs text-white'>Áo thun trơn ôm</li>
                            <li className='text-xs text-white'>Dép</li>
                            <li className='text-xs text-white'>Đồ ngủ Hello Kitty nữ</li>
                            <li className='text-xs text-white'>Kẹp tóc 50 cái</li>
                            <li className='text-xs text-white'>Quần Dsquared Nam size 24</li>
                            <li className='text-xs text-white'>Ốp Iphone xinh cute</li>
                        </ul>
                    </div>
                    {/* Phần giỏ hàng */}
                    <div className='navbar_cart relative'
                        onMouseEnter={() => setOpenCartDropdown("open")}
                        onMouseLeave={() => setOpenCartDropdown("close")}
                    >
                        <Link to="/cart" className='flex items-center w-[30%] h-full justify-center'>
                            <i className="cursor-pointer w-[30%] flex items-center justify-center relative 
                                fa-solid fa-cart-shopping text-white">
                            </i>
                        </Link>
                        {/* Layout sản phẩm trong giỏ hàng */}
                        <div className={`cart_dropdown absolute bg-white shadow-lg rounded-sm w-[400px] z-40
                            ${items.length === 0 ? "h-[300px]" : "h-auto"}
                            ${openCartDropdown}`}
                        >
                            {/* Nội dung giỏ hàng */}
                            {/* Nếu giỏ hàng trống */}
                            {items.length === 0 ? (
                                <div className='relative flex flex-col items-center justify-center h-full w-full'>
                                    <img src={emptyCart} alt="Giỏ hàng trống" className="w-60 h-60 object-contain" />
                                    <div className="absolute bottom-[32px] text-[16px] text-gray-400 text-center capitalize">chưa có sản phẩm nào</div>
                                </div>
                            ) : (
                                <div className='relative flex flex-col items-start justify-center h-full w-full pt-2 pb-3 px-3'>
                                    <h3 className='text-gray-400 text-[16px] mb-5'>Sản Phẩm Mới Thêm</h3>
                                    <ul className='flex flex-col w-full h-full overflow-y-auto gap-4'>
                                        {items.slice(0, 5).map((item) => (
                                            <li key={item.selectedAttributes.attribute.id} className='flex flex-row items-start justify-between w-full'>
                                                <div className='flex items-start gap-2'>
                                                    <div className=''
                                                        style={{
                                                            width: '36px',
                                                            height: '36px',
                                                            backgroundImage: `url(${item.selectedAttributes.attribute.imageUrl})`,
                                                            backgroundSize: 'cover',
                                                            backgroundPosition: 'center'
                                                        }}>
                                                    </div>
                                                    <p className='text-[14px] leading-5 max-w-[250px] line-clamp-1'>{item.name}</p>
                                                </div>
                                                <div className='text-[16px] font-normal text-[#ee4d2d] flex items-center'>
                                                    <i className="fa-solid fa-dong-sign text-[11px] relative top-[0px]"></i>
                                                    {(item.selectedAttributes.attribute.price * ((100 - item.discount) / 100)).toLocaleString('vi-VN')}
                                                </div>
                                            </li>
                                        ))}
                                    </ul>
                                    <div className={`flex flex-row items-center w-full mt-5 order-last
                                            ${items.length > 5 ? "justify-between" : "justify-end"}`}>
                                        { items.length > 5 && (
                                            <p className='text-xs text-gray-400 text-center capitalize'>
                                                {items.length - 5} sản phẩm khác trong giỏ hàng
                                            </p>
                                        )
                                        }
                                        <PrimaryButton height='36px' width='136px' text='Xem Giỏ Hàng' onClick={() => navigate("/cart")} type='button' />
                                    </div>
                                </div>
                            )
                            }
                        </div>
                    </div>
                </div>
            )

            }

        </header>
    );

}

export default Header;
