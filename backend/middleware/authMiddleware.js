// middlewares/authMiddleware.js
const jwt = require('jsonwebtoken');

exports.protect = (req, res, next) => {
  try {
    const token = req.cookies.access_token;
    if (!token) return res.status(401).json({ message: 'Bạn chưa đăng nhập.' });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // Lưu payload vào req.user
    req.user = { userId: decoded.userId, phone: decoded.phone };
    
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Token không hợp lệ hoặc đã hết hạn.' });
  }
};
