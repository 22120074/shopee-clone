import { useLocation, useNavigate } from 'react-router-dom';
import { useState, useEffect, useMemo } from 'react';
import { useDispatch } from 'react-redux';
import HeaderProductList from '../../components/purchaseComponents/headerProductList';
import ProductList from '../../components/purchaseComponents/productList';
import FooterPurchase from '../../components/purchaseComponents/footerPurchase';
import useIsWindow from '../../hooks/useIsWindow';
import PurchaseSelection from '../../components/purchaseComponents/purchaseSelection';
import { removeListItem } from '../../features/cart/cartSlice';
import useToastQueue from '../../hooks/useToastQueue';
import StackBar from '../../components/StackBar';
import {
  useCreateOrderMutation,
  useCreateVnpayUrlMutation,
} from '../../features/api/orderQuery';

export default function PurchasePage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { toasts, addToast } = useToastQueue(3, 1500);
  const isPhone = useIsWindow('(max-width: 768px)');
  const [isOrdering, setIsOrdering] = useState(false);
  const location = useLocation();
  const buyItems = useMemo(() => location.state || [], [location.state]);
  const [paymentMethod, setPaymentMethod] = useState('cod');

  useEffect(() => {
    if (!buyItems || buyItems.length === 0) {
      navigate('/');
    }
  }, [navigate, buyItems]);

  const transformCartToOrderItems = (cartData) => {
    if (!cartData || !Array.isArray(cartData)) return [];

    return cartData.map((item) => {
      return {
        attributeId: item.selectedAttributes?.attribute?.id,
        quantity: item.quantity,
        fromStore: item.fromStore || 'Unknown Store',
      };
    });
  };

  const [createOrder] = useCreateOrderMutation();
  const [createVnpayUrl] = useCreateVnpayUrlMutation();

  const handlePurchase = async () => {
    try {
      setIsOrdering(true);
      const orderItems = transformCartToOrderItems(buyItems);
      if (paymentMethod === 'cod') {
        if (paymentMethod === 'cod') {
          const dataCod = await createOrder({ items: orderItems }).unwrap();
          if (dataCod) {
            dispatch(
              removeListItem(
                buyItems.map((item) => item.selectedAttributes.attribute.id)
              )
            );
            navigate('/');
          }
        }
      } else if (paymentMethod === 'vnpay') {
        const dataVnpay = await createOrder({ items: orderItems }).unwrap();
        const totalPrice = dataVnpay.totalPrice;
        const orderId = dataVnpay.id;

        localStorage.setItem(
          'pendingOrderItems',
          JSON.stringify(
            buyItems.map((item) => item.selectedAttributes.attribute.id)
          )
        );

        const payload = {
          amount: parseInt(totalPrice),
          orderId: orderId,
          bankCode: '',
        };

        const dataVnpayUrl = await createVnpayUrl({ payload }).unwrap();
        const paymentUrl = dataVnpayUrl.url;
        if (paymentUrl) {
          window.location.href = paymentUrl;
        }
      }
    } catch (error) {
      console.error('Lỗi tạo link thanh toán:', error);
      if (error.statusCode === 400) {
        addToast(
          'Một số sản phẩm trong giỏ hàng hiện đã hết hàng. Vui lòng kiểm tra lại!',
          'error',
          'warning'
        );
      } else if (error.statusCode === 404) {
        addToast(
          'Một số sản phẩm không tồn tại. Vui lòng kiểm tra lại!',
          'error',
          'warning'
        );
      }
      setTimeout(() => {
        navigate('/cart');
      }, 1500);
    } finally {
      setIsOrdering(false);
    }
  };

  return (
    <div className="w-full h-screen bg-backgroundGrayColor">
      <StackBar toasts={toasts} width={'300px'} />
      <HeaderProductList />
      <ProductList cartItems={buyItems} isPhone={isPhone} />
      <FooterPurchase cartItems={buyItems} />
      <PurchaseSelection
        paymentMethod={paymentMethod}
        setPaymentMethod={setPaymentMethod}
        onPurchase={() => handlePurchase()}
        isOrdering={isOrdering}
      />
    </div>
  );
}
