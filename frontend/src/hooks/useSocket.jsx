import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { addNotification } from "../features/notification/notificationSlice";
import socket from "../config/socket.config";

export const useSocketNotification = (userId) => {
  const dispatch = useDispatch();

  useEffect(() => {
    if (!userId) return;

    // 1. Kích hoạt kết nối (vì autoConnect đang là false)
    socket.connect();
    console.log("Socket connected for user:", userId);

    // 2. Đăng ký user với backend
    socket.emit("register-user", userId);

    // 3. Lắng nghe thông báo
    socket.on("get-notification", (data) => {
      dispatch(addNotification(data));
      console.log("New notification received!", data);
    });

    // 4. Cleanup function
    return () => {
      socket.off("get-notification");
      socket.disconnect();
    };
  }, [userId, dispatch]);
};
