// src/routes/index.jsx
import { Route } from "react-router-dom";

// import MainLayout from "../layouts/MainLayout";
import AuthLayout from "../layouts/authLayout";

// import Home from "../pages/home";
import Login from "../pages/login";
import Register from "../pages/register";

export const authRoutes = (
  <>
    {/* Auth layout */}
    <Route element={<AuthLayout />}>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
    </Route>
  </>
);