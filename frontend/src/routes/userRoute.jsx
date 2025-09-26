import { Route } from "react-router-dom";
import UserLayout from "../layouts/userLayout";
import UserOrder from "../pages/_user/userOrder";
import UserProfile from "../pages/_user/userProfile";
import UserUnknown from "../pages/_user/userUnknown";

export const userRoutes = (
    <>
    <Route element={<UserLayout />}>
        {/* Route /user/notifications/ */}
        <Route path="/user/notifications" element={<UserUnknown />} />
        <Route path="/user/notifications/order" element={<UserUnknown />} />
        <Route path="/user/notifications/wallet" element={<UserUnknown />} />
        <Route path="/user/notifications/shopee" element={<UserUnknown />} />
        {/* Route /user/account/ */}
        <Route path="/user/account/profile" element={<UserProfile />} />
        <Route path="/user/account/bank" element={<UserUnknown />} />
        <Route path="/user/account/address" element={<UserUnknown />} />
        <Route path="/user/account/password" element={<UserUnknown />} />
        <Route path="/user/account/privacy" element={<UserUnknown />} />
        {/* Route /user/orders/ */}
        <Route path="/user/orders" element={<UserOrder />} />
    </Route>
    </>
);