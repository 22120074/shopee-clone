import { Route } from "react-router-dom";
import UserLayout from "../layouts/userLayout";
import UserOrder from "../pages/_user/_order/userOrder";
import UserProfile from "../pages/_user/_account/userProfile";
import UserUnknown from "../pages/_user/userUnknown";
import EmailVertify from "../pages/_user/_account/emailVertify";
import NoEmailUpdateCase from "../pages/_user/_account/no-emailUpdate";
import PhoneVertify from "../pages/_user/_account/phoneVertify";

export const userRoutes = (
    <>
    <Route element={<UserLayout />}>
        {/* Route /user/notifications/ ------------------------------------------------*/}
        <Route path="/user/notifications/orders" element={<UserUnknown />} />
        <Route path="/user/notifications/wallet" element={<UserUnknown />} />
        <Route path="/user/notifications/shopee" element={<UserUnknown />} />
        {/* Route /user/account/ ------------------------------------------------------*/}
        <Route path="/user/account/profile" element={<UserProfile />} />
        <Route path="/user/account/bank" element={<UserUnknown />} />
        <Route path="/user/account/address" element={<UserUnknown />} />
        <Route path="/user/account/password" element={<UserUnknown />} />
        <Route path="/user/account/privacy" element={<UserUnknown />} />
        {/* Route thay đổi Email, Phone */}
        <Route path="/user/account/email-vertify" element={<EmailVertify />} />
        <Route path="/user/account/phone-vertify" element={<PhoneVertify />} />
        <Route path="/user/account/no-email-update" element={<NoEmailUpdateCase />} />
        {/* Route /user/orders/ -------------------------------------------------------*/}
        <Route path="/user/orders" element={<UserOrder />} />
    </Route>
    </>
);