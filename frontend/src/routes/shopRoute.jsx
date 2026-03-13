import { Route } from "react-router-dom";
import ShopLayout from "../layouts/shopLayout";
import SellerRegisterPage from "../pages/_shop/registerPage";
import Dashboard from "../pages/_shop/dashboard";
import ShopUnknown from "../pages/_shop/shopUnknown";
import AddProduct from "../pages/_shop/_products/_add/addProduct";

export const shopRoutes = (
  <>
    <Route element={<ShopLayout />}>
      {/* Route /shop/register/ ------------------------------------------------*/}
      <Route path="/shop/register" element={<SellerRegisterPage />} />
      {/* Route /shop/dashboard/ ------------------------------------------------*/}
      <Route path="/shop/dashboard" element={<Dashboard />} />
      {/* Route /shop/orders/ ------------------------------------------------*/}
      <Route path="/shop/orders/all" element={<ShopUnknown />} />
      <Route path="/shop/orders/rejected" element={<ShopUnknown />} />
      <Route path="/shop/orders/return" element={<ShopUnknown />} />
      {/* Route /shop/products/ ------------------------------------------------*/}
      <Route path="/shop/products/all" element={<ShopUnknown />} />
      <Route path="/shop/products/add" element={<AddProduct />} />
      <Route path="/shop/products/settings" element={<ShopUnknown />} />
    </Route>
  </>
);
