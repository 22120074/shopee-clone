function HeaderCart({
  isAllChecked,
  setIsAllChecked,
  isChangeFooter,
  setIsChangeFooter,
}) {
  return (
    <div
      className="grid items-center [grid-template-columns:1fr_150px] pl-2 pr-3 bg-white 
        md:[grid-template-columns:1fr_100px_100px_100px_70px] md:px-2 md:gap-2
        lg:[grid-template-columns:5.2fr_4.8fr] lg:px-10 lg:gap-0
        xl:[grid-template-columns:4.4fr_5.6fr]
        h-10 md:h-[56px] max-w-[1200px] mx-auto border-b border-gray-200"
    >
      <div className="flex items-center h-full gap-4">
        <input
          type="checkbox"
          className="flex-shrink-0 relative appearance-none w-[18px] h-[18px] border border-[#DBDBDB] rounded-sm 
                    checked:bg-primaryColor checked:border-primaryColor"
          checked={isAllChecked}
          onChange={(e) => setIsAllChecked(e.target.checked)}
        />
        <div className="text-sm md:text-base">Sản Phẩm</div>
      </div>
      <div className="hidden md:flex lg:hidden justify-center capitalize text-grayTextColor">
        đơn giá
      </div>
      <div className="hidden md:flex lg:hidden justify-center capitalize text-grayTextColor">
        số lượng
      </div>
      <div className="hidden md:flex lg:hidden justify-center capitalize text-grayTextColor">
        số tiền
      </div>
      <div className="hidden md:flex lg:hidden justify-center capitalize text-grayTextColor">
        thao tác
      </div>
      <button
        className="md:hidden flex justify-end capitalize text-grayTextColor"
        onClick={() => setIsChangeFooter(!isChangeFooter)}
      >
        Sửa
      </button>
      <div className="hidden lg:grid grid-cols-4">
        <div className="hidden md:flex justify-center capitalize text-grayTextColor mx-auto w-full">
          đơn giá
        </div>
        <div className="hidden md:flex justify-center capitalize text-grayTextColor mx-auto w-full">
          số lượng
        </div>
        <div className="hidden md:flex justify-center capitalize text-grayTextColor mx-auto w-full">
          số tiền
        </div>
        <div className="hidden md:flex justify-center capitalize text-grayTextColor mx-auto w-full">
          thao tác
        </div>
      </div>
    </div>
  );
}
export default HeaderCart;
