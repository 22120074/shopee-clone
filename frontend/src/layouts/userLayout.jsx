import { Outlet, useNavigate } from 'react-router-dom';
import { useSelector } from "react-redux";
import GlitchText from '../components/animations/GlitchText';
import PrimaryButton from '../components/Button';
import Header from '../components/Header';
import Footer from '../components/Footer';
import SideBar from '../components/SideBar';
import useToastQueue from '../hooks/useToastQueue';
import StackBar from '../components/StackBar';

function UserLayout() {
    const navigate = useNavigate();
    // Sử dụng useSelector để lấy thông tin người dùng từ Redux store
    const user = useSelector((state) => state.auth.currentUser);
    // Sử dụng useToastQueue để hiển thị thông báo
    const { toasts, addToast } = useToastQueue(3, 1500);

    return (
        <div className="UserLayout bg-backgroundGrayColor">
            <StackBar toasts={toasts} width={"300px"} height={"80px"} />
            <Header />
            <div className="flex max-w-7xl mx-auto px-10">
                { user ? (
                <>
                    <SideBar />
                    <Outlet context={{ addToast, user }} />                    
                </>
                ) : (
                    <div className='flex flex-col w-full items-center justify-start bg-backgroundGrayColor min-h-[580px]
                        bg-white mt-4 rounded-sm shadow-md py-4 px-8 gap-10
                    '>
                        <div className='w-full relative flex flex-col items-start'>
                            <div className='absolute top-[100px] left-[220px]'>
                                <GlitchText
                                    speed={1}
                                    enableShadows={true}
                                    enableOnHover={true}
                                    className='custom-class'
                                >
                                    Bạn cần đăng nhập
                                </GlitchText>
                            </div>
                            <div className='absolute top-[160px] right-[50px]'>
                                <GlitchText
                                    speed={1}
                                    enableShadows={true}
                                    enableOnHover={true}
                                    className='custom-class'
                                >
                                    để sử dụng tính năng này.
                                </GlitchText>
                            </div>
                        </div>
                        <div className='h-[200px]' />
                        <PrimaryButton width='200px' height='40px' text={'Đăng nhập'}  onClick={() => navigate('/auth/login')} />
                    </div>
                )}
            </div>
            <Footer />
        </div>
    );
}

export default UserLayout;