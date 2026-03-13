import ShopHeader from "../layouts/Header/shopHeader";
import Footer from "../layouts/Footer";
import { Outlet, useLocation } from "react-router-dom";
import ShopSideBar from "../components/sidebar/shopSidebar";

function ShopLayout() {
  const location = useLocation();
  const urlPath = location.pathname === "/shop/register" ? "register" : "";

  return (
    <div className="w-full min-h-screen flex flex-col justify-start">
      <ShopHeader />
      {urlPath === "register" ? (
        <Outlet />
      ) : (
        <div className="flex w-full">
          <ShopSideBar />
          <Outlet />
        </div>
      )}
      {/* <Footer /> */}
    </div>
  );
}

export default ShopLayout;
