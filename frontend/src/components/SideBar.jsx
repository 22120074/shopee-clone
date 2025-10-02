import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

function SideBar() {
    const navigate = useNavigate();
    // Lấy thông tin user từ Redux store
    const user = useSelector((state) => state.auth.currentUser);
    
    let path = window.location.pathname; // Lấy đường dẫn hiện tại
    let mainSegment = path.split('/')[1]; // Lấy phần đầu tiên sau dấu '/'
    let firstSegment = path.split('/')[2]; // Lấy phần đầu hai sau dấu '/'
    let secondSegment = path.split('/')[3]; // Lấy phần thứ ba sau dấu '/'

    // State để quản lý việc mở rộng mục Summary
    const [lastOpen, setLastOpen] = useState([false, false, false]);
    const [open, setOpen] = useState([
        false || firstSegment === 'notifications', 
        false || firstSegment === 'account', 
        false || firstSegment === 'orders'
    ]);

    useEffect(() => {
        if (firstSegment || secondSegment) {
            setOpen([
                false || firstSegment === 'notifications', 
                false || firstSegment === 'account', 
                false || firstSegment === 'orders'
            ]);
        }
    }, [firstSegment, secondSegment]);   

    return (
    <div className="flex flex-col w-52 items-center justify-start bg-backgroundGrayColor">
        { user && 
        <>
        <div className='flex items-center justify-start gap-2 w-full h-28'>
            <div className='w-14 h-14 rounded-full overflow-hidden mr-2 border cursor-pointer' 
                onClick={() => navigate('/user/account/profile')}
            >
                <img src={user?.avatarUrl || "https://as1.ftcdn.net/v2/jpg/07/24/59/76/1000_F_724597608_pmo5BsVumFcFyHJKlASG2Y2KpkkfiYUU.jpg"} alt="avatar" className="user_avatar" />
            </div>
            <div className='max-w-[100px] overflow-hidden font-semibold text-sm'> 
                {user.name || user.phone || user._id}
                <div className='text-moregrayTextColor font-normal text-base flex items-center cursor-pointer' 
                    onClick={() => navigate('/user/account/profile')}
                >
                    <i className="fa-solid fa-pen-to-square"></i>
                    Sửa hồ sơ
                </div>
            </div>
        </div>
        <div className='h-0 w-[90%] border-b border-lesslessgrayColor mx-auto mb-9' />
        <div className='flex flex-col items-center justify-start w-full h-auto gap-2'>
            <div className='select-none w-full'>
                <div className='flex items-center justify-start w-full relative pl-8 text-base cursor-pointer hover:text-primaryTextColor'
                    onClick={(e) => {
                        e.preventDefault();
                        if (!open[0]) { 
                                setLastOpen(open);
                                setOpen([true, false, false]);
                                navigate('/user/notifications/orders');
                            }
                    }}
                >
                    <i className="absolute left-0 top-1/2 transform -translate-y-1/2 fa-regular fa-bell text-primaryTextColor"></i>
                    Thông báo
                </div>
                <div className={`flex flex-col items-start justify-center w-full gap-2 mt-2 overflow-hidden
                    ${open[0] ? 'animate-expandingHeight' : lastOpen[0] ? 'animate-collapsingHeight' : 'hidden' }`}
                >
                    <div className={`pl-8 pr-2 text-base w-full cursor-pointer hover:text-primaryTextColor 
                            ${secondSegment === 'orders' ? 'text-primaryTextColor' : ''}
                        `} 
                        onClick={() => navigate('/user/notifications/orders')}
                    >
                        Cập nhật đơn hàng
                    </div>
                    <div className={`pl-8 pr-2 text-base w-full cursor-pointer hover:text-primaryTextColor 
                            ${secondSegment === 'wallet' ? 'text-primaryTextColor' : ''}
                        `} 
                        onClick={() => navigate('/user/notifications/wallet')}
                    >
                        Cập nhật ví
                    </div>
                    <div className={`pl-8 pr-2 text-base w-full cursor-pointer hover:text-primaryTextColor 
                            ${secondSegment === 'shopee' ? 'text-primaryTextColor' : ''}
                        `} 
                        onClick={() => navigate('/user/notifications/shopee')}
                    >
                        Cập nhật Shopee
                    </div>
                </div>
            </div>
            <div className='select-none w-full'>
                <div className='flex items-center justify-start w-full relative pl-8 text-base cursor-pointer hover:text-primaryTextColor'
                    onClick={(e) => {
                        e.preventDefault();
                        if (!open[1]) { 
                            setLastOpen(open);
                            setOpen([false, true, false]);
                            navigate('/user/account/profile');
                    }}}
                >
                    <i className="absolute left-0 top-1/2 transform -translate-y-1/2 fa-regular fa-user text-blue-500"></i>
                    Tài khoản của tôi
                </div>
                <div className={`flex flex-col items-start justify-center w-full gap-2 mt-2 overflow-hidden
                    ${open[1] ? 'animate-expandingHeight' : lastOpen[0] ? 'animate-collapsingHeight' : 'hidden' }`}
                >
                    <div className={`pl-8 pr-2 text-base w-full cursor-pointer hover:text-primaryTextColor 
                            ${secondSegment === 'profile' 
                                || secondSegment === 'email-vertify' 
                                || secondSegment === 'phone-vertify' 
                                ? 'text-primaryTextColor' : ''}
                        `} 
                        onClick={() => navigate('/user/account/profile')}
                    >
                        Hồ sơ
                    </div>
                    <div className={`pl-8 pr-2 text-base w-full cursor-pointer hover:text-primaryTextColor 
                            ${secondSegment === 'bank' ? 'text-primaryTextColor' : ''}
                        `} 
                        onClick={() => navigate('/user/account/bank')}
                    >
                        Ngân hàng
                    </div>
                    <div className={`pl-8 pr-2 text-base w-full cursor-pointer hover:text-primaryTextColor 
                            ${secondSegment === 'address' ? 'text-primaryTextColor' : ''}
                        `} 
                        onClick={() => navigate('/user/account/address')}
                    >
                        Địa chỉ
                    </div>
                    <div className={`pl-8 pr-2 text-base w-full cursor-pointer hover:text-primaryTextColor 
                            ${secondSegment === 'password' ? 'text-primaryTextColor' : ''}
                        `} 
                        onClick={() => navigate('/user/account/password')}
                    >
                        Đổi mật khẩu
                    </div>
                    <div className={`pl-8 pr-2 text-base w-full cursor-pointer hover:text-primaryTextColor 
                            ${secondSegment === 'privacy' ? 'text-primaryTextColor' : ''}
                        `} 
                        onClick={() => navigate('/user/account/privacy')}
                    >
                        Những thiết lập riêng tư
                    </div>
                </div>
            </div>
            <div className={`flex items-center justify-start w-full relative pl-8 text-base cursor-pointer hover:text-primaryTextColor 
                    ${open[2] ? 'text-primaryTextColor' : ''}
                `}
                onClick={() => {
                    if (!open[2]) {
                        setLastOpen(open);
                        setOpen([false, false, true]);
                        navigate('/user/orders');
                    }
                }}
            >
                <i className="absolute left-[1px] top-1/2 transform -translate-y-1/2 fa-regular fa-clipboard text-gray-500"></i>
                Đơn hàng
            </div>

        </div>
        </>
        }
    </div>
    );
}

export default SideBar;