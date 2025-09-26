import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

function SideBar() {
    const navigate = useNavigate();
    // Lấy thông tin user từ Redux store
    const user = useSelector((state) => state.auth.currentUser);
    // State để quản lý việc mở rộng mục Summary
    const [open, setOpen] = useState([false, false, false]);


    return (
    <div className="flex flex-col w-52 items-center justify-start bg-backgroundGrayColor h-screen">
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
            <details className='select-none w-full' open={open[0]}>
                <summary className='flex items-center justify-start w-full relative pl-8 text-base cursor-pointer hover:text-primaryTextColor'
                    onClick={(e) => {
                        e.preventDefault();
                        if (!open[0]) { 
                                setOpen([true, false, false]);
                                navigate('/user/notifications');
                            }
                    }}
                >
                    <i className="absolute left-0 top-1/2 transform -translate-y-1/2 fa-regular fa-bell text-primaryTextColor"></i>
                    Thông báo
                </summary>
                <div className='flex flex-col items-start justify-center w-full gap-2 mt-2'>
                    <div className='pl-8 pr-2 text-base w-full cursor-pointer hover:text-primaryTextColor' onClick={() => navigate('/user/notifications/')}>
                        Cập nhật đơn hàng
                    </div>
                    <div className='pl-8 pr-2 text-base w-full cursor-pointer hover:text-primaryTextColor' onClick={() => navigate('/user/notifications/')}>
                        Cập nhật ví
                    </div>
                    <div className='pl-8 pr-2 text-base w-full cursor-pointer hover:text-primaryTextColor' onClick={() => navigate('/user/notifications/')}>
                        Cập nhật Shopee
                    </div>
                </div>
            </details>
            <details className='select-none w-full' open={open[1]}>
                <summary className='flex items-center justify-start w-full relative pl-8 text-base cursor-pointer hover:text-primaryTextColor'
                    onClick={(e) => {
                        e.preventDefault();
                        if (!open[1]) { 
                            setOpen([false, true, false]);
                            navigate('/user/account/profile');
                    }}}
                >
                    <i className="absolute left-0 top-1/2 transform -translate-y-1/2 fa-regular fa-user text-blue-500"></i>
                    Tài khoản của tôi
                </summary>
                <div className='flex flex-col items-start justify-center w-full gap-2 mt-2 '>
                    <div className='pl-8 pr-2 text-base w-full cursor-pointer hover:text-primaryTextColor' 
                        onClick={() => navigate('/user/account/profile')}>Hồ sơ
                    </div>
                    <div className='pl-8 pr-2 text-base w-full cursor-pointer hover:text-primaryTextColor' 
                        onClick={() => navigate('/user/account/bank')}>Ngân hàng
                    </div>
                    <div className='pl-8 pr-2 text-base w-full cursor-pointer hover:text-primaryTextColor' 
                        onClick={() => navigate('/user/account/address')}>Địa chỉ
                    </div>
                    <div className='pl-8 pr-2 text-base w-full cursor-pointer hover:text-primaryTextColor' 
                        onClick={() => navigate('/user/account/password')}>Đổi mật khẩu
                    </div>
                    <div className='pl-8 pr-2 text-base w-full cursor-pointer hover:text-primaryTextColor' 
                        onClick={() => navigate('/user/account/privacy')}>Những thiết lập riêng tư
                    </div>
                </div>
            </details>
            <div className='flex items-center justify-start w-full relative pl-8 text-base cursor-pointer hover:text-primaryTextColor'
                onClick={() => {
                    if (!open[2]) {
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