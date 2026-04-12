const socketIo = require("socket.io");

let io;
// Lưu trữ danh sách user online: { userId: socketId }
let onlineUsers = {};

const initSocket = (server) => {
  io = socketIo(server, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"],
      credentials: true,
    },
  });

  io.on("connection", (socket) => {
    socket.on("register-user", (userId) => {
      onlineUsers[userId] = socket.id;
      console.log(`User ${userId} đang online tại socket: ${socket.id}`);
    });

    socket.on("disconnect", () => {
      for (let userId in onlineUsers) {
        if (onlineUsers[userId] === socket.id) {
          delete onlineUsers[userId];
          break;
        }
      }
    });
  });

  return io;
};

const sendNotification = (receiverId, data) => {
  const socketId = onlineUsers[receiverId];
  if (socketId) {
    io.to(socketId).emit("get-notification", data);
  }
};

module.exports = { sendNotification, initSocket };
