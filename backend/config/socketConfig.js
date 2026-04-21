const socketIo = require("socket.io");

let io;
// Lưu trữ danh sách user online: { userId: [socketId1, socketId2, ...] }
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
      if (!onlineUsers[userId]) {
        onlineUsers[userId] = [];
      }
      if (!onlineUsers[userId].includes(socket.id)) {
        onlineUsers[userId].push(socket.id);
      }
      console.log(`User ${userId} kết nối thêm thiết bị: ${socket.id}`);
    });

    socket.on("disconnect", () => {
      for (let userId in onlineUsers) {
        onlineUsers[userId] = onlineUsers[userId].filter(
          (id) => id !== socket.id,
        );
        if (onlineUsers[userId].length === 0) {
          delete onlineUsers[userId];
        }
      }
    });
  });

  return io;
};

const sendNotification = (receiverId, data) => {
  const socketIds = onlineUsers[receiverId];

  if (socketIds && socketIds.length > 0) {
    socketIds.forEach((id) => {
      io.to(id).emit("get-notification", data);
    });
  }
};

module.exports = { sendNotification, initSocket };
