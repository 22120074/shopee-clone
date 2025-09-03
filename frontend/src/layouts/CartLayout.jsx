import '../css/CartLayout.css'
import HeaderCart from '../components/cartComponents/headerCart';
import useToastQueue from '../hooks/useToastQueue';
import ToastQueue from '../components/cartComponents/toastQueue';
import ProductList from '../components/cartComponents/productList'
import { useSelector } from 'react-redux';
import '../assets/Animation.css'
import { useState } from 'react';


function CartLayout() {
  // Sử dụng hook useToastQueue để quản lí toast
  const { toasts, addToast } = useToastQueue(3, 1500);
  // Lấy thông tin giỏ hàng từ Redux store
  const cartItems = useSelector((state) => state.cart.items);
  // Sử dụng useState để lưu isAllChecked
  const [isAllChecked, setIsAllChecked] = useState(false);
  console.log(isAllChecked);
  return (
    <div className="w-full bg-[#F5F5F5] h-screen pt-5">
      {/* Toast Queue để hiển thị từng thông báo */}
      <ToastQueue toasts={toasts} />
      {/* Thanh ngang phân cột trong giỏ hàng đại diện cho Header */}
      <HeaderCart isAllChecked={isAllChecked} setIsAllChecked={setIsAllChecked} />
      {/* Nội dung giỏ hàng sẽ được hiển thị ở đây */}
      <ProductList cartItems={cartItems} addToast={addToast} isAllChecked={isAllChecked} />
    </div>
  );
}

export default CartLayout;
