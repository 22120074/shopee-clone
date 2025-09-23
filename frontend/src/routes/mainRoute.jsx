// src/routes/index.jsx
import { Route } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import CategoryPage from "../pages/_catagory/categoryPage";
import ProductLayout from "../layouts/productLayout";
import TrendingProductLayout from "../layouts/TrendingProductLayout";
import CartPage from "../pages/_cart/cartPage";
import Home from "../pages/home";

export const mainRoutes = (
  <>
    {/* Main layout */}
    <Route element={<MainLayout />}>
      <Route path="/" element={<Home />} />
    </Route>
    {/* Danh mục sản phẩm */}
    <Route element={<MainLayout />}>
      <Route path="/category/:categoryName" element={<CategoryPage />} />
    </Route>
    <Route element={<MainLayout />}>
      <Route path="/product/TrendingProduct" element={<TrendingProductLayout />} />
      <Route path="/product/:productName" element={<ProductLayout />} />
    </Route>
    {/* Giỏ hàng */}
    <Route element={<MainLayout />}>
      <Route path="/cart" element={<CartPage />} />
    </Route>
  </>
);