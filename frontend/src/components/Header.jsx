import './header.css';
import React, { useContext } from 'react';
import { Link, useNavigate, useLocation } from "react-router-dom";
import { AuthContext  } from '../contexts/AuthMode';

function Header() {
    const { user, logout } = useContext(AuthContext);
    const navigate = useNavigate();
    const isSticky = useLocation().pathname === '/';

    const handleLogout = async () => {
        try {
            await logout();      // gọi hàm logout từ context
            navigate('/');       // chuyển về trang /login sau khi đăng xuất
        } catch (error) {
            console.error('Logout failed:', error);
        }
    };

    return (
        <header className={`${isSticky ? 'sticky top-0 z-[100]' : 'relative'} Web-header flex flex-col`} style={{ backgroundColor: "#FA5130", height: "120px", width: "100%" }}>
            {/* Phần 1 của Navbar */}
            <div className="navbar flex items-center justify-between" style={{ height: "32px", width: "100%", maxWidth: "1200px", margin: "0 auto", marginTop: '2px' }}>
                {/* Hỗ trợ của web */}
                <ul className="flex flex-row items-center">
                    <li className="text-sm text-white li_borderleft" style={{ padding: "0 9px 0 8px", position: "relative"  }}>Kênh Người bán</li>
                    <li className="text-sm text-white li_borderleft" style={{ padding: "0 9px 0 8px", position: "relative"  }}>Trờ thành Người bán Shoppe</li>
                    <li className="text-sm text-white li_borderleft" style={{ padding: "0 9px 0 8px", position: "relative"  }}>Tải ứng dụng</li>
                    <li className="text-sm text-white " style={{ padding: "0 9px 0 8px", position: "relative", marginRight: "50px" }}>
                        Kết nối
                        <i className="fa-brands fa-facebook" style={{ position: "absolute", top: "calc(50% - 6px)", right: "-10px"}}></i>
                        <i className="fa-brands fa-instagram" style={{ position: "absolute", top: "calc(50% - 6px)", right: "-30px" }}></i>                    
                    </li>
                </ul>
                {/* Hỗ trợ cho người dùng */}
                <ul className="flex flex-row items-center">
                    <li className="text-sm text-white" style={{ position: "relative", margin: "0 6px" }}>
                        <i className="fa-regular fa-bell" style={{ position: "absolute", top: "calc(50% - 5px)", left: "-18px"}}></i>
                        Thông Báo
                    </li>
                    <li className="text-sm text-white" style={{ position: "relative", margin: "0 18px" }}>
                        <i className="fa-regular fa-question" style={{ position: "absolute", top: "calc(50% - 6px)", left: "-14px"}}></i>
                        Hỗ Trợ
                    </li>
                    <li className="text-sm text-white" style={{ position: "relative", marginLeft: "16px"}}>
                        <i className="fa-sharp fa-solid fa-globe" style={{ position: "absolute", top: "calc(50% - 6px)", left: "-20px"}}></i>
                        Tiếng Việt
                    </li>
                    <li className="text-sm text-white" style={{ margin: "0 8px 0 16px"}}>
                        <ul className="flex flex-row items-center">
                            {/* Kiểm tra xem người dùng đã đăng nhập hay chưa */}
                            {!user ? (
                                <>
                                    <li className="li_borderleft" style={{ padding: "0 9px 0 0", position: "relative"}}>
                                        <Link to="/register">Đăng Kí</Link>
                                    </li>
                                    <li className="" style={{ padding: "0 0 0 8px" }}>
                                        <Link to="/login">Đăng Nhập</Link>
                                    </li>
                                </>
                            ) : (
                                <>
                                    <li className="user_wrapper" style={{ padding: "0 9px 0 0", position: "relative"}}>
                                        <Link to="/user">
                                            <div className='flex items-center ' style={{ alignItems: "center" }}>
                                                <div className='' 
                                                    style={{ width: "32px", height: "32px", borderRadius: "50%", 
                                                        overflow: "hidden", marginRight: "8px" }}
                                                >
                                                    <img src={user.avatarUrl || "https://as1.ftcdn.net/v2/jpg/07/24/59/76/1000_F_724597608_pmo5BsVumFcFyHJKlASG2Y2KpkkfiYUU.jpg"} alt="avatar" className="user_avatar" />
                                                </div>
                                                <div className='user_name'> 
                                                    {user.name || user.phone || user._id}
                                                </div>
                                            </div>
                                        </Link>
                                        {/* Dropdown menu người dùng*/}
                                        <div className='user_dropdown w-auto min-w-max' style={{ position: "absolute" }}>
                                            <ul className='flex flex-col text-black'>
                                                <li className='user_dropdown-item hover:bg-gray-100 hover:text-[#00b9c7]'>
                                                    <Link to="/" className='user_dropdown-item_link'>Tài khoản của tôi</Link>
                                                </li>
                                                <li className='user_dropdown-item hover:bg-gray-100 hover:text-[#00b9c7]'>
                                                    <Link to="/" className='user_dropdown-item_link'>Đơn mua</Link>
                                                </li>
                                                <li className='user_dropdown-item hover:bg-gray-100 hover:text-[#00b9c7]'
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
            <div className="main_navbar flex items-center justify-center" style={{ height: "", width: "100%", maxWidth: "1200px", margin: "0 auto" }}>
                {/* Phần Logo */}
                <div style={{ marginRight: "50px", height: "100%" }}>
                    <Link to="/" className="flex items-center" style={{ textDecoration: "none", color: "white", height: "100%", fontSize: "32px", fontWeight: "400" }}>
                        <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className="text-white" style={{ height: "47px", width: "50px", marginBottom: "12px" }}><title>Shopee</title><path fill="currentColor" d="M15.9414 17.9633c.229-1.879-.981-3.077-4.1758-4.0969-1.548-.528-2.277-1.22-2.26-2.1719.065-1.056 1.048-1.825 2.352-1.85a5.2898 5.2898 0 0 1 2.8838.89c.116.072.197.06.263-.039.09-.145.315-.494.39-.62.051-.081.061-.187-.068-.281-.185-.1369-.704-.4149-.983-.5319a6.4697 6.4697 0 0 0-2.5118-.514c-1.909.008-3.4129 1.215-3.5389 2.826-.082 1.1629.494 2.1078 1.73 2.8278.262.152 1.6799.716 2.2438.892 1.774.552 2.695 1.5419 2.478 2.6969-.197 1.047-1.299 1.7239-2.818 1.7439-1.2039-.046-2.2878-.537-3.1278-1.19l-.141-.11c-.104-.08-.218-.075-.287.03-.05.077-.376.547-.458.67-.077.108-.035.168.045.234.35.293.817.613 1.134.775a6.7097 6.7097 0 0 0 2.8289.727 4.9048 4.9048 0 0 0 2.0759-.354c1.095-.465 1.8029-1.394 1.9449-2.554zM11.9986 1.4009c-2.068 0-3.7539 1.95-3.8329 4.3899h7.6657c-.08-2.44-1.765-4.3899-3.8328-4.3899zm7.8516 22.5981-.08.001-15.7843-.002c-1.074-.04-1.863-.91-1.971-1.991l-.01-.195L1.298 6.2858a.459.459 0 0 1 .45-.494h4.9748C6.8448 2.568 9.1607 0 11.9996 0c2.8388 0 5.1537 2.5689 5.2757 5.7898h4.9678a.459.459 0 0 1 .458.483l-.773 15.5883-.007.131c-.094 1.094-.979 1.9769-2.0709 2.0059z"/></svg>
                        Shopee
                    </Link>
                </div>
                {/* Phần tìm kiếm */}
                <div className="flex items-center flex-col" style={{ flex: "1", height: "100%" }}>
                    <div className="navbar_input-wrapper flex items-center" style={{ width: "100%", height: "40px", backgroundColor: "white", padding: "0 0 0 10px" }}>
                        <input type="text" className='navbar_input text-sm' style={{width: "100%", height: "40px", flex: "1"}} placeholder='Shopee bao ship 0Đ - Đăng kí ngay!' />
                        <button className="navbar_input-search-icon">
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
                {/* Phần giở hàng */}
                <div className='navbar_cart'>
                    <i className="fa-solid fa-cart-shopping text-white navbar_cart-icon"></i>
                </div>
            </div>

        </header>
    );

}

export default Header;
