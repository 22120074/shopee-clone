export const getHeaderNotification = (type) => {
  switch (type) {
    case "NEW_PRODUCT":
      return "Một sản phẩm mới được đăng bán đã được gửi tới bạn!";
    default:
      return "Thông báo";
  }
};

export const getContentNotification = (type, content) => {
  switch (type) {
    case "NEW_PRODUCT":
      return (
        <span className="text-xs text-grayTextColor font-normal">
          Cửa hàng{" "}
          <span className="text-moregrayTextColor font-bold">
            {content.shopName}
          </span>{" "}
          đã đăng 1 sản phẩm{" "}
          <span className="text-moregrayTextColor font-bold">
            {content.name}
          </span>
        </span>
      );
    default:
      return "Thông báo";
  }
};
