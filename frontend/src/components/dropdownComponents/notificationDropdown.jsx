import "../../css/header.css";
import clsx from "clsx";
import { useNavigate } from "react-router-dom";
import { userImageUrlFormat } from "../../utils/stringFormat";
import { useSelector } from "react-redux";
import NotificationContent from "../others/notificationContent";

export default function NotificationDropdown({ openNotificationDropdown }) {
  const navigate = useNavigate();

  const notifications = useSelector((state) => state.notification.list);
  console.log("Notifications in dropdown:", notifications);

  const handleClick = (type, notification) => {
    if (type === "NEW_PRODUCT") {
      console.log(JSON.parse(notification.content).id);
      navigate(`/product/${JSON.parse(notification.content).id}`);
    }
  };

  return (
    <div
      className={`notification_dropdown w-auto min-w-max absolute ${openNotificationDropdown}`}
    >
      <h1 className="text-grayTextColor capitalize text-md font-normal p-2">
        Thông báo mới nhận
      </h1>
      {/* Notification Container */}
      <div className={clsx("w-full flex flex-col items-start justify-start")}>
        {notifications.length === 0 ? (
          <div className="w-full p-2 text-center text-grayTextColor">
            Không có thông báo mới
          </div>
        ) : (
          notifications.map((notification, index) => (
            <div
              key={index}
              className={clsx(
                "w-full p-2 flex items-start justify-start gap-2 cursor-pointer",
                notification.isRead
                  ? "bg-primaryRatingColor"
                  : "bg-notificationBg",
                "hover:bg-primaryRatingColor",
              )}
              onClick={() => handleClick(notification.type, notification)}
            >
              {/* Image Preview */}
              <div className="w-10 h-10 rounded-full overflow-hidden">
                <img
                  src={
                    userImageUrlFormat(notification?.avatarUrl) ||
                    "https://as1.ftcdn.net/v2/jpg/07/24/59/76/1000_F_724597608_pmo5BsVumFcFyHJKlASG2Y2KpkkfiYUU.jpg"
                  }
                  alt="avatar"
                  className="user_avatar w-10 h-10 object-cover"
                />
              </div>
              <NotificationContent notification={notification} />
            </div>
          ))
        )}
      </div>
    </div>
  );
}
