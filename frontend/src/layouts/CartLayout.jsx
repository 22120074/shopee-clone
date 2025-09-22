import "../css/CartLayout.css";
import HeaderCart from "../components/cartComponents/headerCart";
import useToastQueue from "../hooks/useToastQueue";
import ToastQueue from "../components/cartComponents/toastQueueCart";
import ProductList from "../components/cartComponents/productList";
import FooterCart from "../components/cartComponents/footerCart";
import PrimaryButton from "../components/Button";
import { useSelector } from "react-redux";
import emptyCart from "../assets/Empty-bro.svg";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function CartLayout() {
  const navigate = useNavigate();
  // Sử dụng hook useToastQueue để quản lí toast
  const { toasts, addToast } = useToastQueue(3, 1500);
  // Lấy thông tin giỏ hàng từ Redux store
  const cartItems = useSelector((state) => state.cart.items);
  // Sử dụng useState để lưu isAllChecked
  const [isAllChecked, setIsAllChecked] = useState(false);
  // Sử dụng useState để lưu số checked của từng item, tổng tiền
  // Dùng useState để lưu isChecked của từng item
  const [isChecked, setIsChecked] = useState(cartItems.map(() => false));
  const [totalPrice, setTotalPrice] = useState(0);

  return (
    <div className="w-full bg-[#F5F5F5] pt-5">
      {/* Toast Queue để hiển thị từng thông báo */}
      <ToastQueue toasts={toasts} />
      {cartItems.length > 0 ? (
        <>
          {/* Thanh ngang phân cột trong giỏ hàng đại diện cho Header */}
          <HeaderCart
            isAllChecked={isAllChecked}
            setIsAllChecked={setIsAllChecked}
          />
          <div className="relative w-full h-auto max-w-[1200px] mx-auto">
            {/* Nội dung giỏ hàng sẽ được hiển thị ở đây */}
            <ProductList
              cartItems={cartItems}
              addToast={addToast}
              isAllChecked={isAllChecked}
              isChecked={isChecked}
              setIsChecked={setIsChecked}
              setTotalPrice={setTotalPrice}
            />
            <FooterCart
              cartItems={cartItems}
              isCheckedAll={isAllChecked}
              setIsAllChecked={setIsAllChecked}
              isChecked={isChecked}
              totalPrice={totalPrice}
            />
          </div>
        </>
      ) : (
        <div className="relative flex flex-col items-center justify-center h-auto w-full">
          <img
            src={emptyCart}
            alt="Giỏ hàng trống"
            className="w-60 h-60 object-contain"
          />
          <div className="text-base font-semibold text-grayTextColor mb-5">
            Giỏ hàng của bạn đang trống
          </div>
          <PrimaryButton
            height="40px"
            width="200px"
            text={"Mua ngay"}
            onClick={() => navigate("/")}
          />
        </div>
      )}
    </div>
  );
}

export default CartLayout;
