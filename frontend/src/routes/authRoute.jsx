// src/routes/index.jsx
import { Route } from "react-router-dom";
import AuthPage from "../pages/_authPage/authPage";
import Login from "../pages/_authPage/login";
import Register from "../pages/_authPage/register";

export const authRoutes = (
  <>
    {/* Auth layout */}
    <Route element={<AuthPage />}>
      <Route path="/auth/login" element={<Login />} />
      <Route path="/auth/register" element={<Register />} />
    </Route>
  </>
);