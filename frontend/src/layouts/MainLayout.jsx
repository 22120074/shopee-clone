import { Outlet } from 'react-router-dom';
import Header from './Header/Header';
import Footer from '../layouts/Footer';

function MainLayout() {
    return (
        <div className="MainLayout">
            <Header />
            <Outlet />
            <Footer />
        </div>
    );
}

export default MainLayout;