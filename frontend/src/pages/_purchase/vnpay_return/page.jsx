import clsx from "clsx";
import { formatPayDate } from "../../../utils/stringFormat";
import NormalButton from "../../../components/buttons/NormalButton";
import PrimaryButton from "../../../components/buttons/Button";
import { useVnpayReturnUrlQuery } from "../../../features/api/orderQuery";
import Spinner from "../../../components/skeletons/spinnerButton";
import { useEffect } from "react";
import { removeListItem } from "../../../features/cart/cartSlice";
import { useDispatch } from "react-redux";

export default function VnPayReturnPage() {
  const dispatch = useDispatch();
  const queryParams = new URLSearchParams(window.location.search);

  const { data, isLoading } = useVnpayReturnUrlQuery({
    queryParams: window.location.search,
  });

  const paymentData = {
    amount: Number(queryParams.get("vnp_Amount")) / 100, // VNPay nhân 100 số tiền gốc
    bankCode: queryParams.get("vnp_BankCode"),
    orderInfo: queryParams.get("vnp_OrderInfo"),
    payDate: queryParams.get("vnp_PayDate"),
    responseCode: queryParams.get("vnp_ResponseCode"),
    transactionNo: queryParams.get("vnp_TransactionNo"),
    txnRef: queryParams.get("vnp_TxnRef"),
  };
  const isSuccess =
    paymentData.responseCode === "00" &&
    paymentData.responseCode === data?.vnp_ResponseCode;
  //   const isSuccess = false;

  useEffect(() => {
    if (isSuccess) {
      const items = JSON.parse(localStorage.getItem("pendingOrderItems")) || [];
      dispatch(removeListItem(items));
      localStorage.removeItem("pendingOrderItems");
    }
  }, [isSuccess, dispatch]);

  if (isLoading) {
    return (
      <div className="relative w-full h-[378px]">
        <div
          className={`absolute top-10 left-0 w-full h-full flex items-start justify-center`}
        >
          <Spinner size={"40px"} stroke={"5px"} color={"#FA5130"} />
        </div>
      </div>
    );
  }

  return (
    <div className="w-full bg-backgroundGrayColor py-8">
      {isSuccess ? (
        <div
          className={clsx(
            "w-full h-auto bg-white mx-auto max-w-[1200px]",
            "grid grid-cols-1 lg:grid-cols-2 items-center justify-center gap-x-16 gap-y-10 lg:gap-y-0",
            "py-10 px-8 relative",
          )}
        >
          <div className="flex flex-col items-center justify-center gap-6 select-none">
            <div className="w-24 h-24 rounded-full bg-backgroundSuccessColor flex items-center justify-center">
              <i className="fa-regular fa-circle-check text-successColor text-6xl"></i>
            </div>
            <div className="flex flex-col items-center justify-center gap-1">
              <h2 className="text-2xl font-medium text-gray-800">
                Thanh toán thành công
              </h2>
              <p className="text-2xl font-bold text-primaryTextColor">
                {paymentData.amount.toLocaleString("vi-VN")} VND
              </p>
              <p className="text-grayTextColor">Cảm ơn bạn đã mua sắm!</p>
            </div>
            <div className="w-full flex flex-col md:flex-row items-center justify-center gap-4">
              <NormalButton
                text="Quay lại trang chủ"
                onClick={() => (window.location.href = "/")}
                icon={<i class="fa-solid fa-house mr-2 text-base" />}
                height="40px"
                min_width="180px"
              />
              <PrimaryButton
                text="Xem đơn hàng"
                onClick={() => (window.location.href = "/")}
                height="40px"
                width="180px"
              />
            </div>
          </div>
          <div className="absolute left-1/2 top-0 bottom-0 w-[2px] h-full bg-backgroundGrayColor hidden lg:block" />
          <div className="flex flex-col items-center lg:items-start justify-start">
            <div className="w-full border-b border-lesslessgrayColor pb-4 select-none text-xl text-black text-center lg:text-left">
              Chi tiết giao dịch
            </div>
            <div className="grid grid-cols-[1fr_1fr] gap-y-4 mt-4 text-base">
              <div className="font-semibold">Mã tham chiếu (Đơn hàng):</div>
              <p>{paymentData.txnRef}</p>
              <div className="font-semibold">Phương thức thanh toán:</div>
              <p>{paymentData.bankCode}</p>
              <div className="font-semibold">Mã giao dịch VNPay:</div>
              <p>{paymentData.transactionNo}</p>
              <div className="font-semibold">Thời gian thanh toán:</div>
              <p>{formatPayDate(paymentData.payDate)}</p>
              <div className="font-semibold">Nội dung:</div>
              <p>{paymentData.orderInfo}</p>
            </div>
          </div>
        </div>
      ) : (
        <div
          className={clsx(
            "flex flex-col items-center justify-center gap-6 select-none",
            "w-full h-auto bg-white mx-auto max-w-[1200px]",
            "py-10 px-8 relative",
          )}
        >
          <div className="w-24 h-24 rounded-full bg-backgroundFailColor flex items-center justify-center">
            <i className="fa-regular fa-circle-xmark text-failColor text-6xl"></i>
          </div>
          <h2 className="text-2xl font-medium text-gray-800">
            Thanh toán thất bại
          </h2>
          <p className="text-grayTextColor text-center">
            Có lỗi xảy ra trong quá trình thanh toán. Vui lòng thử lại.
          </p>
          <NormalButton
            text="Quay lại trang chủ"
            onClick={() => (window.location.href = "/")}
            icon={<i class="fa-solid fa-house mr-2 text-base" />}
            height="40px"
          />
        </div>
      )}
    </div>
  );
}
