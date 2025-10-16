import ShopHeader from '../layouts/Header/shopHeader';
import Footer from '../layouts/Footer';
import { Outlet } from 'react-router-dom';

function ShopLayout() {
    return (
        <div className='w-full min-h-screen flex flex-col justify-between'>
            <ShopHeader />
            <Outlet />
            <Footer />
        </div>
    );
}

export default ShopLayout;