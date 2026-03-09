import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

function ShopSideBar() {
  const navigate = useNavigate();
  // Lấy thông tin user từ Redux store
  const shop = useSelector((state) => state.shop.currentUser);

  let path = window.location.pathname; // Lấy đường dẫn hiện tại
  // let mainSegment = path.split("/")[1]; // Lấy phần đầu tiên sau dấu '/'
  let firstSegment = path.split("/")[2]; // Lấy phần đầu hai sau dấu '/'
  let secondSegment = path.split("/")[3]; // Lấy phần thứ ba sau dấu '/'

  // State để quản lý việc mở rộng mục Summary
  const [lastOpen, setLastOpen] = useState([false, false]);
  const [open, setOpen] = useState([
    false || firstSegment === "orders",
    false || firstSegment === "products",
  ]);

  useEffect(() => {
    if (firstSegment || secondSegment) {
      setOpen([
        false || firstSegment === "orders",
        false || firstSegment === "products",
      ]);
    }
  }, [firstSegment, secondSegment]);

  return (
    <div className="flex flex-col w-52 items-center justify-start gap-2 bg-white min-h-[600px] select-none p-4">
      <div className="select-none w-full">
        <div
          className="flex items-center justify-start w-full relative pl-8 text-base cursor-pointer hover:text-primaryTextColor"
          onClick={(e) => {
            e.preventDefault();
            if (!open[0]) {
              setLastOpen(open);
              setOpen([true, false]);
              navigate("/shop/orders/all");
            }
          }}
        >
          <i className="absolute left-0 top-1/2 transform -translate-y-1/2 fa-solid fa-cart-arrow-down text-primaryTextColor"></i>
          Quản lý đơn hàng
        </div>
        <div
          className={`flex flex-col items-start justify-center w-full gap-2 mt-2 overflow-hidden
                    ${open[0] ? "animate-expandingHeight" : lastOpen[0] ? "animate-collapsingHeight" : "hidden"}`}
        >
          <div
            className={`pl-8 pr-2 text-base w-full cursor-pointer hover:text-primaryTextColor 
                            ${secondSegment === "all" ? "text-primaryTextColor" : ""}
                        `}
            onClick={() => navigate("/shop/orders/all")}
          >
            Tất cả
          </div>
          <div
            className={`pl-8 pr-2 text-base w-full cursor-pointer hover:text-primaryTextColor 
                            ${secondSegment === "rejected" ? "text-primaryTextColor" : ""}
                        `}
            onClick={() => navigate("/shop/orders/rejected")}
          >
            Đơn hủy
          </div>
          <div
            className={`pl-8 pr-2 text-base w-full cursor-pointer hover:text-primaryTextColor 
                            ${secondSegment === "return" ? "text-primaryTextColor" : ""}
                        `}
            onClick={() => navigate("/shop/orders/return")}
          >
            Trả tiền/Hoàn tiền
          </div>
        </div>
      </div>
      <div className="select-none w-full">
        <div
          className="flex items-center justify-start w-full relative pl-8 text-base cursor-pointer hover:text-primaryTextColor"
          onClick={(e) => {
            e.preventDefault();
            if (!open[1]) {
              setLastOpen(open);
              setOpen([false, true]);
              navigate("/shop/products/all");
            }
          }}
        >
          <i className="absolute left-0 top-1/2 transform -translate-y-1/2 fa-brands fa-trello text-blue-500"></i>
          Quản lý sản phẩm
        </div>
        <div
          className={`flex flex-col items-start justify-center w-full gap-2 mt-2 overflow-hidden
                    ${open[1] ? "animate-expandingHeight" : lastOpen[0] ? "animate-collapsingHeight" : "hidden"}`}
        >
          <div
            className={`pl-8 pr-2 text-base w-full cursor-pointer hover:text-primaryTextColor
                    ${secondSegment === "all" ? "text-primaryTextColor" : ""}
            `}
            onClick={() => navigate("/shop/products/all")}
          >
            Tất cả
          </div>
          <div
            className={`pl-8 pr-2 text-base w-full cursor-pointer hover:text-primaryTextColor 
                            ${secondSegment === "add" ? "text-primaryTextColor" : ""}
                        `}
            onClick={() => navigate("/shop/products/add")}
          >
            Thêm
          </div>
          <div
            className={`pl-8 pr-2 text-base w-full cursor-pointer hover:text-primaryTextColor 
                            ${secondSegment === "settings" ? "text-primaryTextColor" : ""}
                        `}
            onClick={() => navigate("/shop/products/settings")}
          >
            Cài đặt
          </div>
        </div>
      </div>
    </div>
  );
}

export default ShopSideBar;
