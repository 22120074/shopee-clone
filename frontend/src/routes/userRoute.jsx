import { Route } from "react-router-dom";
import UserLayout from "../layouts/userLayout";
import UserOrder from "../pages/_user/userOrder";
import UserProfile from "../pages/_user/userProfile";

export const userRoutes = (
    <>
    <Route element={<UserLayout />}>

        <Route path="/user/account/profile" element={<UserProfile />} />

        <Route path="/user/orders" element={<UserOrder />} />
    </Route>
    </>
);