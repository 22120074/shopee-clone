// src/routes/index.jsx
import { Route } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import CategoryPage from "../pages/_catagory/categoryPage";
import ProductPage from "../pages/_product/productPage";
import TrendingProductPage from "../pages/_product/TrendingProductLayout";
import CartPage from "../pages/_cart/cartPage";
import Home from "../pages/home";
import PurchaseLayout from "../layouts/purchaseLayout";
import PurchasePage from "../pages/_purchase/purchasePage";

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
    {/* Sản phẩm */}
    <Route element={<MainLayout />}>
      <Route
        path="/product/TrendingProduct"
        element={<TrendingProductPage />}
      />
      <Route path="/product/:productName" element={<ProductPage />} />
    </Route>
    {/* Giỏ hàng */}
    <Route element={<MainLayout />}>
      <Route path="/cart" element={<CartPage />} />
    </Route>

    {/* Mua hàng */}
    <Route element={<PurchaseLayout />}>
      <Route path="/purchase" element={<PurchasePage />} />
    </Route>
  </>
);
