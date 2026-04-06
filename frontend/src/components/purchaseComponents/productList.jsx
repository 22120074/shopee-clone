function ProductList({ cartItems, addToast, isPhone }) {
  return cartItems.map((attribute, index) => (
    <div
      key={index}
      className={`bg-white h-auto max-w-[1200px] mx-auto items-center
    ${
      isPhone
        ? "w-full flex h-full pl-2 pr-3 py-3 gap-3"
        : "grid [grid-template-columns:1fr_150px_150px_150px] px-10"
    }`}
    >
      {isPhone ? (
        <>
          {/* Ảnh sản phẩm */}
          <div
            className="flex-shrink-0 rounded-sm"
            style={{
              width: "80px",
              height: "80px",
              backgroundImage: `url(${attribute.selectedAttributes.attribute.imageUrl || attribute.imageUrl})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          ></div>
          {/* Tên sản phẩm, phân loại sản phẩm, ( giá tiền, điều chỉnh số lượng ) */}
          <div className="flex-1 flex flex-col items-start h-[80px] justify-between">
            <div className="relative flex items-start w-full justify-between">
              <div className="w-[180px] line-clamp-1 text-sm font-normal text-start">
                {attribute.name}
              </div>
              <div className="absolute w-auto top-4 left-0">
                <div
                  className="inline-flex text-sm capitalize text-moregrayTextColor 
                  font-medium items-center gap-2 bg-lessgrayColor px-1 rounded-sm"
                >
                  <div className="text-xs capitalize text-grayTextColor w-auto whitespace-normal">
                    {attribute.selectedAttributes.color}
                    {attribute.selectedAttributes.size !== null ? ", " : ""}
                    {attribute.selectedAttributes.size}
                  </div>
                </div>
              </div>
            </div>
            <div className="flex items-end w-full justify-between">
              <div className="flex items-center justify-start text-sm font-normal gap-1 mt-5">
                <div className="whitespace-nowrap text-primaryTextColor font-medium">
                  <i className="fa-solid fa-dong-sign text-[10px] relative top-[-4px]"></i>
                  {(
                    (attribute.selectedAttributes.attribute.price *
                      (100 - (attribute.discount || 0))) /
                    100
                  ).toLocaleString("vi-VN")}
                </div>
                {attribute.discount > 0 && (
                  <div className="relative text-[#929292] whitespace-nowrap">
                    <i className="fa-solid fa-dong-sign text-[10px] relative top-[-4px]"></i>
                    {attribute.selectedAttributes.attribute.price.toLocaleString(
                      "vi-VN",
                    )}
                    <div className="absolute top-[50%] right-0 w-full h-[1px] bg-[#929292]"></div>
                  </div>
                )}
              </div>
              <div className="flex justify-end items-center h-4 text-inherit w-full rounded-sm overflow-hidden text-sm">
                <div
                  className={`flex-1 h-full text-center [appearance:textfield] max-w-[50px]
                    [&::-webkit-outer-spin-button]:appearance-none 
                    [&::-webkit-inner-spin-button]:appearance-none
                    focus:outline-none bg-transparent border-y border-[#CCCCCC]`}
                ></div>
              </div>
            </div>
          </div>
        </>
      ) : (
        <>
          {/* Bên trái: checkbox, ảnh, tên, phân loại */}
          <div className="flex items-center h-full md:gap-6 lg:gap-10 my-[36px]">
            {/* Ảnh và tên sản phẩm */}
            <div className="flex items-center h-full gap-2">
              {/* Ảnh sản phẩm */}
              <div
                className="rounded-sm"
                style={{
                  width: "40px",
                  height: "40px",
                  backgroundImage: `url(${attribute.selectedAttributes.attribute.imageUrl || attribute.imageUrl})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              ></div>
              {/* Tên sản phẩm */}
              <div className="flex flex-1 min-w-0 items-start justify-center h-auto">
                <div className="w-full line-clamp-1 max-w-[300px] text-sm font-normal text-start">
                  {attribute.name}
                </div>
              </div>
            </div>
            {/* Phân loại sản phẩm */}
            <div className="relative flex gap-1 text-grayTextColor flex-wrap">
              <div className="text-sm capitalize text-inherit">phân loại:</div>
              <div className="text-sm capitalize text-inherit w-auto whitespace-normal">
                {attribute.selectedAttributes.color}
                {attribute.selectedAttributes.size !== null ? ", " : ""}
                {attribute.selectedAttributes.size}
              </div>
            </div>
          </div>
          {/* Bên phải: 3 thông tin sản phẩm */}
          {/* Đơn giá */}
          <div className="flex flex-col justify-center items-center text-sm font-normal">
            <div className="whitespace-nowrap font-medium">
              {(
                (attribute.selectedAttributes.attribute.price *
                  (100 - (attribute.discount || 0))) /
                100
              ).toLocaleString("vi-VN")}
              <i className="fa-solid fa-dong-sign text-grayTextColor text-[10px] relative top-[-4px]"></i>
            </div>
            {attribute.discount > 0 && (
              <div className="relative text-grayTextColor whitespace-nowrap text-xs">
                {attribute.selectedAttributes.attribute.price.toLocaleString(
                  "vi-VN",
                )}
                <i className="fa-solid fa-dong-sign text-grayTextColor text-[10px] relative top-[-4px]"></i>
                <div className="absolute top-[50%] bg-grayTextColor right-0 w-full h-[1px]"></div>
              </div>
            )}
          </div>
          {/* Số lượng */}
          <div className="flex justify-center items-center h-8  text-inherit w-full">
            <div
              className={`flex-1 h-full text-center max-w-[50px] bg-transparent`}
            >
              {attribute.quantity}
            </div>
          </div>
          {/* Số tiền */}
          <div className="flex justify-center text-sm font-medium">
            {(
              attribute.quantity *
              ((attribute.selectedAttributes.attribute.price *
                (100 - (attribute.discount || 0))) /
                100)
            ).toLocaleString("vi-VN")}
            <i className="fa-solid fa-dong-sign text-[10px] text-grayTextColor relative top-[7px] right-[1px]"></i>
          </div>
        </>
      )}
    </div>
  ));
}

export default ProductList;
