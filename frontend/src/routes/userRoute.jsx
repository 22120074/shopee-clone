import { Route } from "react-router-dom";
import UserLayout from "../layouts/userLayout";
import UserOrder from "../pages/_user/userOrder";

export const userRoutes = (
    <>
    <Route element={<UserLayout />}>
        {/* <Route path="/user/profile" element={<UserProfile />} /> */}
        <Route path="/user/orders" element={<UserOrder />} />
    </Route>
    </>
);