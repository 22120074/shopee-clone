export default function FooterPurchase({ cartItems }) {
  const totalMoney = cartItems.reduce((total, item) => {
    const discount = item.discount || 0;
    return (
      total +
      ((item.selectedAttributes.attribute.price * (100 - discount)) / 100) *
        item.quantity
    );
  }, 0);
  return (
    <div
      className="w-full h-auto flex justify-end items-center bg-white max-w-[1200px] mx-auto
        px-24 py-4 gap-4"
    >
      <div className="text-grayTextColor capitalize text-sm">
        tổng số tiền({cartItems.length} sản phẩm):
      </div>
      <div className="text-primaryColor font-medium relative text-lg">
        {totalMoney.toLocaleString("vi-VN")}{" "}
        <i className="fa-solid fa-dong-sign text-[10px] absolute top-[6px] right-[-9px]"></i>
      </div>
    </div>
  );
}
