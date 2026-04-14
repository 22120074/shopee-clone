const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const http = require("http");
const dbPostgre = require("./models/PostgreSql/index");
const { errorHandler } = require("./middleware/errorHandle");
const { initSocket } = require("./config/socketConfig");

dotenv.config();

const app = express();

app.set("trust proxy", 1);

// Đọc cookie từ request
app.use(cookieParser());
// Đọc body JSON
app.use(express.json());

// 1. CORS: cho phép frontend (http://localhost:3000) gửi cookie
// app.use(
//   cors({
//     origin: ["http://localhost:3000", "http://192.168.137.1:3000"],
//     credentials: true,
//   }),
// );

app.use(
  cors({
    origin: true, // Cho phép mọi nguồn (vì lúc này Proxy đã làm trung gian)
    credentials: true,
  }),
);

// Test API
app.get("/", (req, res) => {
  res.send("API is running...");
});

const authRoute = require("./routes/authRoute");
app.use("/auth", authRoute);

const productRoute = require("./routes/productRoute");
app.use("/product", productRoute);

const cartRoute = require("./routes/cartRoute");
app.use("/cart", cartRoute);

const userRoute = require("./routes/userRoute");
app.use("/user", userRoute);

const shopRoute = require("./routes/shopRoute");
app.use("/shop", shopRoute);

const mediaRoute = require("./routes/mediaRoute");
app.use("/media", mediaRoute);

const orderRoute = require("./routes/orderRoute");
app.use("/order", orderRoute);

const notificationRoute = require("./routes/notificationRoute");
app.use("/notification", notificationRoute);

app.use(errorHandler);

const PORT = process.env.PORT || 5000;

const server = http.createServer(app);

Promise.all([
  mongoose.connect(process.env.MONGO_URI),
  dbPostgre.sequelize.sync({ force: false }),
])
  .then(() => {
    console.log("✅ All databases connected");

    initSocket(server);

    server.listen(PORT, "0.0.0.0", () =>
      console.log(`Server running on port ${PORT}`),
    );
  })
  .catch((err) => console.error("❌ Database connection failed:", err));
