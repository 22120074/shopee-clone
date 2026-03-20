function HeaderProductList({}) {
  return (
    <div
      className="grid [grid-template-columns:1fr_150px] 
      md:[grid-template-columns:1fr_150px_150px_150px] bg-white 
      h-auto max-w-[1200px] mx-auto pl-2 pr-3 md:px-10 md:pt-10 grid items-center mt-4"
    >
      <div className="flex items-center h-full gap-4">Sản Phẩm</div>
      <div className="hidden md:flex justify-center capitalize text-grayTextColor">
        đơn giá
      </div>
      <div className="hidden md:flex justify-center capitalize text-grayTextColor">
        số lượng
      </div>
      <div className="hidden md:flex justify-center capitalize text-grayTextColor">
        số tiền
      </div>
    </div>
  );
}
export default HeaderProductList;
