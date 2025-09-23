// src/routes/index.jsx
import { Route } from "react-router-dom";
import AuthPage from "../pages/_auth/authPage";
import Login from "../pages/_auth/login";
import Register from "../pages/_auth/register";

export const authRoutes = (
  <>
    {/* Auth layout */}
    <Route element={<AuthPage />}>
      <Route path="/auth/login" element={<Login />} />
      <Route path="/auth/register" element={<Register />} />
    </Route>
  </>
);