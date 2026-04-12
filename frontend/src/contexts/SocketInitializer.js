import React from "react";
import { useSelector } from "react-redux";
import { useSocketNotification } from "../hooks/useSocket";

const SocketInitializer = ({ children }) => {
  const user = useSelector((state) => state.auth?.currentUser);

  const userId = user?.userId || user?.googleID;

  useSocketNotification(userId);

  return <>{children}</>;
};

export default SocketInitializer;
