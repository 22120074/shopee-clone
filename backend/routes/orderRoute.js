const express = require("express");
const router = express.Router();
const {
  createOrder,
  createVNPayUrl,
  vnpayReturn,
  vnpayIpn,
} = require("../controllers/orderController");
const { protect } = require("../middleware/authMiddleware");

router.post("/create", protect, createOrder);
// Client gọi api này để lấy link thanh toán (Cần đăng nhập)
router.post("/create-url", protect, createVNPayUrl);
// VNPAY redirect user về đây sau khi thanh toán xong trên cổng VNPAY (Không cần protect)
router.get("/vnpay-return", vnpayReturn);
// VNPAY server tự động gọi ngầm vào API này (Webhook) để báo trạng thái cập nhật DB (Không cần protect)
router.get("/vnpay-ipn", vnpayIpn);

module.exports = router;
