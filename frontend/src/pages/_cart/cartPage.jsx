import '../../css/CartLayout.css';
import HeaderCart from '../../components/cartComponents/headerCart';
import useToastQueue from '../../hooks/useToastQueue';
import StackBar from '../../components/StackBar';
import ProductList from '../../components/cartComponents/productList';
import FooterCart from '../../components/cartComponents/footerCart';
import PrimaryButton from '../../components/buttons/Button';
import useIsWindow from '../../hooks/useIsWindow';
import { useSelector } from 'react-redux';
import emptyCart from '../../assets/Empty-bro.svg';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGetCartQuery } from '../../features/api/cartQuery';
import Spinner from '../../components/skeletons/spinnerButton';

function CartPage() {
  const isPhone = useIsWindow('(max-width: 768px)');
  // const isIPad = useIsWindow("(min-width: 769px) and (max-width: 1024px)");

  const navigate = useNavigate();
  // Lấy thông tin user từ Redux store
  const user = useSelector((state) => state.auth.currentUser);
  // Sử dụng hook useToastQueue để quản lí toast
  const { toasts, addToast } = useToastQueue(3, 1500);
  const { isLoading } = useGetCartQuery(undefined, {
    refetchOnMountOrArgChange: true,
    skip: !user,
  });
  // Lấy thông tin giỏ hàng từ Redux store
  const cartItems = useSelector((state) => state.cart.items);
  // Sử dụng useState để lưu isAllChecked
  const [isAllChecked, setIsAllChecked] = useState(false);
  // Sử dụng useState để lưu số checked của từng item, tổng tiền
  // Dùng useState để lưu isChecked của từng item
  const [isChecked, setIsChecked] = useState(cartItems.map(() => false));
  const [totalPrice, setTotalPrice] = useState(0);
  // Dùng useState để lưu trạng thái tùy chọn của footer
  const [isChangeFooter, setIsChangeFooter] = useState(false);

  return (
    <div className="w-full bg-backgroundGrayColor pt-5 h-screen md:h-auto pb-10">
      <StackBar toasts={toasts} width={'400px'} />

      {isLoading ? (
        <div
          className={`top-0 left-0 w-full h-[100px] flex items-center justify-center bg-red
            ${isLoading ? 'bg-backgroundGrayColor' : 'hidden'}`}
        >
          <Spinner
            size={'30px'}
            stroke={'6px'}
            _hidden={!isLoading ? 'hidden' : ''}
            color={'#ee4d2d'}
          />
        </div>
      ) : (
        <div className="max-w-[1200px] mx-auto px-2">
          {cartItems.length > 0 ? (
            <>
              <HeaderCart
                isAllChecked={isAllChecked}
                setIsAllChecked={setIsAllChecked}
                isChangeFooter={isChangeFooter}
                setIsChangeFooter={setIsChangeFooter}
              />
              <div className="relative w-full h-auto">
                <ProductList
                  cartItems={cartItems}
                  addToast={addToast}
                  isAllChecked={isAllChecked}
                  isChecked={isChecked}
                  setIsChecked={setIsChecked}
                  setTotalPrice={setTotalPrice}
                  isPhone={isPhone}
                />
                <FooterCart
                  isPhone={isPhone}
                  cartItems={cartItems}
                  isCheckedAll={isAllChecked}
                  setIsAllChecked={setIsAllChecked}
                  isChecked={isChecked}
                  totalPrice={totalPrice}
                  isChangeFooter={isChangeFooter}
                />
              </div>
            </>
          ) : (
            <div className="flex flex-col items-center justify-center py-20 w-full">
              <img
                src={emptyCart}
                alt="Giỏ hàng trống"
                className="w-60 h-60 object-contain"
              />
              <div className="text-base font-semibold text-gray-500 mb-5">
                {user
                  ? 'Giỏ hàng của bạn đang trống'
                  : 'Vui lòng đăng nhập để mua hàng'}
              </div>
              <PrimaryButton
                height="40px"
                width="200px"
                text={user ? 'Mua ngay' : 'Đăng nhập ngay'}
                onClick={() => navigate(user ? '/' : '/auth/login')}
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default CartPage;
