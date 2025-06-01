// src/routes/index.jsx
import { Route, Navigate } from "react-router-dom";

import MainLayout from "../layouts/MainLayout";
import CategoryLayout from "../layouts/CategoryLayout";

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



  </>
);