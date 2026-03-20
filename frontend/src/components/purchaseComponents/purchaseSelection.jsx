import NormalButton from "../buttons/NormalButton";
import PrimaryButton from "../buttons/Button";
import Spinner from "../skeletons/spinnerButton";

export default function PurchaseSelection({
  paymentMethod,
  setPaymentMethod,
  onPurchase,
  isOrdering,
}) {
  return (
    <div className="bg-white p-6 mt-4 max-w-[1200px] mx-auto border-b border-dashed border-grayTextColor/30">
      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-8">
          <span className="capitalize text-sm font-normal text-grayTextColor">
            Phương thức thanh toán
          </span>
          <div className="flex items-center gap-4">
            <NormalButton
              text="VNPay"
              typeSort="vnpay"
              sortOption={paymentMethod}
              onClick={(type) => setPaymentMethod(type)}
              height="36px"
              className="!text-base !relative"
            >
              {paymentMethod === "vnpay" && (
                <div
                  className="absolute bottom-0 right-0 w-0 h-0 border-b-[14px] border-l-[14px] 
                border-b-primaryColor border-l-transparent"
                >
                  <i className="fa-solid fa-check text-white text-[9px] absolute right-[0px] top-[5px]"></i>
                </div>
              )}
            </NormalButton>
            <NormalButton
              text="Thanh toán khi nhận hàng"
              typeSort="cod"
              sortOption={paymentMethod}
              onClick={(type) => setPaymentMethod(type)}
              height="36px"
              className="!text-base !relative"
            >
              {paymentMethod === "cod" && (
                <div
                  className="absolute bottom-0 right-0 w-0 h-0 border-b-[14px] border-l-[14px] 
                border-b-primaryColor border-l-transparent"
                >
                  <i className="fa-solid fa-check text-white text-[9px] absolute right-[0px] top-[5px]"></i>
                </div>
              )}
            </NormalButton>
          </div>
        </div>
      </div>
      <div className="flex items-center justify-between mt-12 pt-8 border-t border-gray-100">
        <div className="text-sm text-grayTextColor font-normal">
          Nhấn "Đặt hàng" đồng nghĩa với việc bạn đồng ý tuân theo{" "}
          <span className="text-hoverTextColorHeader cursor-pointer hover:underline">
            Điều khoản
          </span>
        </div>
        <PrimaryButton
          text="Đặt hàng"
          width="210px"
          height="40px"
          onClick={onPurchase}
        >
          <div
            className={`absolute top-0 left-0 w-full h-full flex items-center justify-center
              ${isOrdering ? "bg-white/50" : "hidden"}`}
          >
            <Spinner
              size={"30px"}
              stroke={"5px"}
              _hidden={isOrdering ? "" : "hidden"}
              color={"white"}
            />
          </div>
        </PrimaryButton>
      </div>
    </div>
  );
}
