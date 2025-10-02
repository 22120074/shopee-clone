const express = require('express');
const router = express.Router();
const { register, login, getMe, logout, refreshToken, getUserListRating, sendOtpEmail, vertifyOtpEmail } = require('../controllers/authController');
const { protect } = require('../middleware/authMiddleware');
const { googleLogin } = require("../controllers/authGG-Fb");

// Logic Đăng nhập/Đăng kí, [Lấy thông tin User], [Làm mới token], [Đăng xuất] cho User thông thường
router.post('/register', register);
router.post('/login', login);
router.get('/me', protect, getMe);
router.post('/refreshToken', refreshToken);
router.post('/logout', logout);
// Logic [Lấy danh sách đánh giá của User] của 1 Product
router.get('/data_list_rating', getUserListRating);
// Logic [Đăng nhập], [Lỗi đăng nhập] bằng Google
router.post("/google", googleLogin);
// Logic [Gửi mã OTP về email], [Xác thực mã OTP email]
router.post('/send-otp-email', sendOtpEmail);
router.post('/vertify-otp-email', vertifyOtpEmail);

module.exports = router;
