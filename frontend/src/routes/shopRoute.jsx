import { Route } from "react-router-dom";
import ShopLayout from "../layouts/shopLayout";
import SellerRegisterPage from "../pages/_shop/registerPage";

export const shopRoutes = (
    <>
    <Route element={<ShopLayout />}>
        {/* Route /shop/register/ ------------------------------------------------*/}
        <Route path="/shop/register" element={<SellerRegisterPage />} />
    </Route>
    </>
);