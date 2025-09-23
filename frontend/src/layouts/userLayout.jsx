import { Outlet } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import SideBar from '../components/SideBar';

function MainLayout() {
    return (
        <div className="MainLayout">
            <Header />
            <div>
                <SideBar />
                <Outlet />
            </div>
            <Footer />
        </div>
    );
}

export default MainLayout;