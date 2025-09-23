// src/routes/index.jsx
import { Route } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import CategoryLayout from "../layouts/CategoryLayout";
import ProductLayout from "../layouts/productLayout";
import TrendingProductLayout from "../layouts/TrendingProductLayout";
import CartLayout from "../layouts/cartLayout";
import Home from "../pages/home";

export const mainRoutes = (
  <>
    {/* Main layout */}
    <Route element={<MainLayout />}>
      <Route path="/" element={<Home />} />
    </Route>
    {/* Danh mục sản phẩm */}
    <Route element={<MainLayout />}>
      <Route path="/category/:categoryName" element={<CategoryLayout />} />
    </Route>
    <Route element={<MainLayout />}>
      <Route path="/product/TrendingProduct" element={<TrendingProductLayout />} />
      <Route path="/product/:productName" element={<ProductLayout />} />
    </Route>
    {/* Giỏ hàng */}
    <Route element={<MainLayout />}>
      <Route path="/cart" element={<CartLayout />} />
    </Route>
  </>
);