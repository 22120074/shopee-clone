import { io } from "socket.io-client";

// const SOCKET_URL = "http://localhost:5000";
const SOCKET_URL =
  process.env.REACT_APP_SOCKET_URL || "https://api.duyshop.fatagram.dev";

const socket = io(SOCKET_URL, {
  autoConnect: false,
  transports: ["websocket"],
  withCredentials: true,
});

export default socket;
