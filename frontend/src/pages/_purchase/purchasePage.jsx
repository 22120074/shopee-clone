import { useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import HeaderProductList from "../../components/purchaseComponents/headerProductList";
import ProductList from "../../components/purchaseComponents/productList";
import FooterPurchase from "../../components/purchaseComponents/footerPurchase";
import useIsWindow from "../../hooks/useIsWindow";
import PurchaseSelection from "../../components/purchaseComponents/purchaseSelection";
import { createOrder, createVnpayUrl } from "../../services/order.service";
import { removeListItem } from "../../features/cart/cartSlice";
import { createOrupdateCart } from "../../services/cart.service";
import useToastQueue from "../../hooks/useToastQueue";
import StackBar from "../../components/StackBar";

export default function PurchasePage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { toasts, addToast } = useToastQueue(3, 1500);
  const isPhone = useIsWindow("(max-width: 768px)");
  const [isOrdering, setIsOrdering] = useState(false);
  const location = useLocation();
  const buyItems = location.state || [];
  const [paymentMethod, setPaymentMethod] = useState("cod");
  // sử dụng useSelector để lấy thông tin người dùng
  const user = useSelector((state) => state.auth.currentUser);
  // sử dụng useSelector để lấy thông tin giỏ hàng
  const cartItems = useSelector((state) => state.cart.items);
  const totalQuantity = useSelector((state) => state.cart.totalQuantity);
  const totalPriceCart = useSelector((state) => state.cart.totalPrice);

  useEffect(() => {
    if (!buyItems || buyItems.length === 0) {
      navigate("/");
    }
  }, []);

  const transformCartToOrderItems = (cartData) => {
    if (!cartData || !Array.isArray(cartData)) return [];

    return cartData.map((item) => {
      return {
        attributeId: item.selectedAttributes?.attribute?.id,
        quantity: item.quantity,
        fromStore: item.fromStore || "Unknown Store",
      };
    });
  };

  useEffect(() => {
    const syncCart = async () => {
      await createOrupdateCart({
        userId: user.userId || user.googleID,
        items: cartItems,
        totalQuantity: totalQuantity,
        totalPrice: totalPriceCart,
      });
    };
    if (user?.userId || user?.googleID) {
      syncCart();
    }
  }, [cartItems]);

  const handlePurchase = async () => {
    try {
      setIsOrdering(true);
      const orderItems = transformCartToOrderItems(buyItems);
      console.log("Order Items: ", orderItems);
      if (paymentMethod === "cod") {
        if (paymentMethod === "cod") {
          const responseCod = await createOrder(orderItems);
          if (responseCod.data.success) {
            dispatch(
              removeListItem(
                buyItems.map((item) => item.selectedAttributes.attribute.id),
              ),
            );
            navigate("/");
          }
        }
      } else if (paymentMethod === "vnpay") {
        setIsOrdering(true);
        const responseVnpay = await createOrder(orderItems);
        const totalPrice = responseVnpay.data.data.totalPrice;
        const orderId = responseVnpay.data.data.orderId;

        const payload = {
          amount: parseInt(totalPrice),
          bankCode: "", // Bỏ trống để user tự chọn ngân hàng trên VNPAY, hoặc truyền 'VNBANK'
        };

        const responseVnpayUrl = await createVnpayUrl(payload);
        const paymentUrl = responseVnpayUrl.data.data.url;
        if (paymentUrl) {
          window.location.href = paymentUrl;
        }
      }
    } catch (error) {
      console.error("Lỗi tạo link thanh toán:", error);
      if (error.statusCode === 400) {
        addToast(
          "Một số sản phẩm trong giỏ hàng hiện đã hết hàng. Vui lòng kiểm tra lại!",
          "error",
          "warning",
        );
      } else if (error.statusCode === 404) {
        addToast(
          "Một số sản phẩm không tồn tại. Vui lòng kiểm tra lại!",
          "error",
          "warning",
        );
      }
      setTimeout(() => {
        navigate("/cart");
      }, 1500);
    } finally {
      setIsOrdering(false);
    }
  };

  return (
    <div className="w-full h-screen bg-backgroundGrayColor">
      <StackBar toasts={toasts} width={"300px"} height={"80px"} />
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
