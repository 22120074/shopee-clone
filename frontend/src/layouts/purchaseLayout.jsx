import PurchaseHeader from "../layouts/Header/purchaseHeader";
import Footer from "../layouts/Footer";
import { Outlet } from "react-router-dom";

function PurchaseLayout() {
  return (
    <div className="w-full min-h-screen flex flex-col justify-start bg-backgroundGrayColor">
      <PurchaseHeader />
      <Outlet />
      <Footer />
    </div>
  );
}

export default PurchaseLayout;
