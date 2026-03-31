import { Outlet, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useSelector } from "react-redux";
import clsx from "clsx";
import GlitchText from "../components/animations/GlitchText";
import PrimaryButton from "../components/buttons/Button";
import Header from "./Header/Header";
import Footer from "../layouts/Footer";
import SideBar from "../components/sidebar/SideBar";
import useToastQueue from "../hooks/useToastQueue";
import StackBar from "../components/StackBar";
import SidebarPopupButton from "../components/userComponents/sidebarPopupButton";

function UserLayout() {
  const navigate = useNavigate();
  // Sử dụng useSelector để lấy thông tin người dùng từ Redux store
  const user = useSelector((state) => state.auth.currentUser);
  // Sử dụng useToastQueue để hiển thị thông báo
  const { toasts, addToast } = useToastQueue(3, 1500);

  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="UserLayout bg-backgroundGrayColor">
      <StackBar toasts={toasts} width={"300px"} height={"80px"} />
      <Header />
      <div className="relative flex max-w-7xl mx-auto px-4 md:px-10 min-h-[600px] md:min-h-0">
        {user ? (
          <>
            <SidebarPopupButton isOpen={isOpen} setIsOpen={setIsOpen} />
            <SideBar isOpen={isOpen} />
            <Outlet context={{ addToast }} />
            {isOpen && (
              <div
                className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 z-40 cursor-pointer md:hidden"
                onClick={() => setIsOpen(false)}
              />
            )}
          </>
        ) : (
          <div
            className={clsx(
              "flex flex-col items-center justify-start gap-10 bg-backgroundGrayColor bg-white",
              "min-h-[580px] w-full mt-4 rounded-sm shadow-md py-4 px-8",
            )}
          >
            <div className="w-full relative flex flex-col items-start">
              <div className="absolute top-[100px] left-[220px]">
                <GlitchText
                  speed={1}
                  enableShadows={true}
                  enableOnHover={true}
                  className="custom-class"
                >
                  Bạn cần đăng nhập
                </GlitchText>
              </div>
              <div className="absolute top-[160px] right-[50px]">
                <GlitchText
                  speed={1}
                  enableShadows={true}
                  enableOnHover={true}
                  className="custom-class"
                >
                  để sử dụng tính năng này.
                </GlitchText>
              </div>
            </div>
            <div className="h-[200px]" />
            <PrimaryButton
              width="200px"
              height="40px"
              text={"Đăng nhập"}
              onClick={() => navigate("/auth/login")}
            />
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}

export default UserLayout;
