import { Outlet } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import SideBar from '../components/SideBar';
import useToastQueue from '../hooks/useToastQueue';
import StackBar from '../components/StackBar';

function UserLayout() {
    // Sử dụng useToastQueue để hiển thị thông báo
    const { toasts, addToast } = useToastQueue(3, 1500);

    return (
        <div className="UserLayout bg-backgroundGrayColor">
            <StackBar toasts={toasts} width={"300px"} height={"80px"} />
            <Header />
            <div className="flex max-w-7xl mx-auto px-10">
                <SideBar />
                <Outlet context={{ addToast }} />
            </div>
            <Footer />
        </div>
    );
}

export default UserLayout;