import { Route } from "react-router-dom";
import userLayout from "../layouts/userLayout";

export const userRoutes = (
    <>
    <Route element={<userLayout />}>
        {/* <Route path="/user/profile" element={<UserProfile />} />
        <Route path="/user/orders" element={<UserOrders />} /> */}
    </Route>
    </>
);