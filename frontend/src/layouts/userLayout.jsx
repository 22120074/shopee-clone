import { Outlet } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import SideBar from '../components/SideBar';

function UserLayout() {
    return (
        <div className="UserLayout bg-backgroundGrayColor">
            <Header />
            <div className="flex max-w-7xl mx-auto px-10">
                <SideBar />
                <Outlet />
            </div>
            <Footer />
        </div>
    );
}

export default UserLayout;