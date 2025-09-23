import { Outlet } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import SideBar from '../components/SideBar';

function UserLayout() {
    return (
        <div className="UserLayout">
            <Header />
            <div>
                <SideBar />
                <Outlet />
            </div>
            <Footer />
        </div>
    );
}

export default UserLayout;