import '../css/CartLayout.css'
import HeaderCart from '../components/cartComponents/headerCart';
import useToastQueue from '../hooks/useToastQueue';
import ToastQueue from '../components/cartComponents/toastQueue';
import ProductList from '../components/cartComponents/productList'
import FooterCart from '../components/cartComponents/footerCart';
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
  // Sử dụng useState để lưu số checked của từng item, tổng tiền
  // Dùng useState để lưu isChecked của từng item
  const [isChecked, setIsChecked] = useState(cartItems.map(() => false));
  // const [totalPrice, setTotalPrice] = useState(0);

  return (
    <div className="w-full bg-[#F5F5F5] h-screen pt-5">
      {/* Toast Queue để hiển thị từng thông báo */}
      <ToastQueue toasts={toasts} />
      {/* Thanh ngang phân cột trong giỏ hàng đại diện cho Header */}
      <HeaderCart isAllChecked={isAllChecked} setIsAllChecked={setIsAllChecked} />
      <div className='relative w-full h-auto max-w-[1200px] mx-auto'>
        {/* Nội dung giỏ hàng sẽ được hiển thị ở đây */}
        <ProductList cartItems={cartItems} addToast={addToast} isAllChecked={isAllChecked} isChecked={isChecked} setIsChecked={setIsChecked} />
        <FooterCart cartItems={cartItems} isCheckedAll={isAllChecked} setIsAllChecked={setIsAllChecked} 
          isChecked={isChecked}  
        />
      </div>
    </div>
  );
}

export default CartLayout;
