const { User, DataUser } = require("../models/Mongoose/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const redisClient = require('./../config/redisConfig');
const nodemailer = require('nodemailer');

exports.register = async (req, res, next) => {
  try {
    const { phone, password } = req.body;

    // 1. Kiểm tra dữ liệu đầu vào
    if (!phone || !password) {
      return res
        .status(400)
        .json({ message: "Vui lòng điền đầy đủ thông tin." });
    }

    // 2. Kiểm tra xem user đã tồn tại chưa
    const existingUser = await User.findOne({ phone });
    if (existingUser) {
      return res
        .status(409)
        .json({ message: "Số điện thoại đã được đăng ký." });
    }

    // 3. Mã hóa mật khẩu
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // 4. Tạo user mới và lưu vào DB
    const newUser = new User({
      phone,
      password: hashedPassword,
    });
    await newUser.save();

    // 5. Tạo luôn profile mặc định trong collection 'dataUser'
    const newProfile = new DataUser({
      userId: newUser._id, // tham chiếu đến user vừa tạo
      phone: newUser.phone,
      email: "", // để trống
      name: "", // để trống
      displayName: "", // để trống
      gender: "other", // theo default enum
      dateOfBirth: null, // để trống
      avatarUrl: "", // để trống
      // createdAt tự động theo schema
    });
    await newProfile.save();

    // 6. Trả về kết quả
    return res.status(201).json({ message: "Đăng ký thành công!" });
  } catch (error) {
    next(error); // Gọi middleware xử lý lỗi
  }
};

exports.login = async (req, res, next) => {
  try {
    const { phone, password } = req.body;

    if (!phone || !password) {
      return res
        .status(400)
        .json({ message: "Vui lòng nhập đủ số điện thoại và mật khẩu." });
    }

    const user = await User.findOne({ phone });
    if (!user) {
      return res
        .status(401)
        .json({ message: "Số điện thoại không tìm thấy." });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res
        .status(401)
        .json({ message: "Mật khẩu không khớp với tài khoản." });
    }

    // Tạo access token (1 ngày)
    const accessToken = jwt.sign(
      { userId: user._id, phone: user.phone },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    // Tạo refresh token (7 ngày)
    const refreshToken = jwt.sign(
      { userId: user._id, phone: user.phone },
      process.env.JWT_REFRESH_SECRET,
      { expiresIn: "7d" }
    );

    res
      .cookie("access_token", accessToken, {
        httpOnly: true,
        // Đổi để test trên điện thoại với localhost
        secure: false,
        sameSite: "Lax",
        // secure: process.env.NODE_ENV === 'production',
        maxAge: 1 * 24 * 60 * 60 * 1000, // 1 ngày
      })
      .cookie("refresh_token", refreshToken, {
        httpOnly: true,
        secure: false,
        sameSite: "Lax",
        // secure: process.env.NODE_ENV === 'production',
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 ngày
      })
      .json({ message: "Đăng nhập thành công!" });
  } catch (err) {
    next(err);
  }
};

exports.getMe = async (req, res, next) => {
  try {
    const userId = req.user.userId;
    let userData;
    if (typeof userId === "string" && !mongoose.Types.ObjectId.isValid(userId)) {
      userData = await DataUser.findOne({ googleID: userId });
    } else {
      userData = await DataUser.findOne({ userId: userId });
    }

    if (!userData) {
      return res
        .status(404)
        .json({ message: "Không tìm thấy dữ liệu người dùng" });
    }

    // Trả về toàn bộ dữ liệu trong document dataUser
    res.json({ dataUser: userData });
  } catch (error) {
    next(error);
  }
};

exports.logout = (req, res) => {
  res
    .clearCookie("access_token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "Lax",
    })
    .clearCookie("refresh_token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "Lax",
    })
    .json({ message: "Đăng xuất thành công!" });
};

exports.refreshToken = (req, res) => {
  try {
    const refreshToken = req.cookies?.refresh_token;
    if (!refreshToken) {
      return res.status(401).json({ message: "Không có refresh token" });
    }

    // Xác thực refresh token
    const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);

    // Tạo access token mới
    const newAccessToken = jwt.sign(
      { userId: decoded.userId, phone: decoded.phone },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    // Gửi access token mới vào cookie
    res.cookie("access_token", newAccessToken, {
      httpOnly: true,
      // Đổi để test trên điện thoại với localhost
      secure: false,
      sameSite: "Lax",
      // secure: process.env.NODE_ENV === 'production',
      maxAge: 1 * 24 * 60 * 60 * 1000, // 1 ngày
    });

    return res.json({ message: "Access token mới đã được cấp" });
  } catch (err) {
    console.error("Lỗi refresh token:", err);
    return res
      .status(401)
      .json({ message: "Refresh token không hợp lệ hoặc đã hết hạn" });
  }
};

exports.getUserListRating = async (req, res, next) => {
  try {
    let userList = req.query["data[]"];
    if (!Array.isArray(userList)) {
      userList = [userList];
    }
    if (!userList || !Array.isArray(userList) || userList.length === 0) {
      return res.status(400).json({ message: "Dữ liệu không hợp lệ" });
    }
    const ratings = await DataUser.find({ _id: { $in: userList } });
    const ratingsMap = new Map(ratings.map((r) => [r._id.toString(), r]));
    const result = userList.map((id) => ratingsMap.get(id));

    return res.json({ ratings: result });
  } catch (error) {
    next(error);
  }
};

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS_APP
  }
});

exports.sendOtpEmail = async (req, res, next) => {
  try {
    const { email } = req.body;
    if (!email) return res.status(400).json({ message: 'Bắt buộc phải có Email.' });

    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    // Lưu OTP vào Redis với TTL 5 phút (300 giây)
    await redisClient.set(`otp:${email}`, otp, { EX: 300 });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Your OTP Code',
      html: `
        <div style="font-family: Arial, sans-serif; text-align: center; padding: 20px;">
          <h2 style="color: #333;">🔒 Your OTP Code</h2>
          <p style="font-size: 18px;">Use the following OTP to verify your account:</p>
          <p style="font-size: 32px; font-weight: bold; color: #1a73e8; margin: 20px 0;">${otp}</p>
          <p style="font-size: 14px; color: #666;">This OTP expires in 5 minutes.</p>
        </div>
      `
    };

    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: 'OTP Email được gửi thành công.' });
  } catch (error) {
    next(error);
  }
};

exports.vertifyOtpEmail = async (req, res, next) => {
  try {
    const { email, otp } = req.body;
    if (!email || !otp) {
      return res.status(400).json({ message: 'Bắt buộc phải có Email và OTP.' });
    }

    // Kiểm tra OTP trong Redis
    const storedOtp = await redisClient.get(`otp:${email}`);
    if (!storedOtp) {
      return res.status(400).json({ message: 'OTP không hợp lệ hoặc đã hết hạn.' });
    }

    // Trim OTP để bỏ " " thừa nếu có
    const cleanOtp = otp.trim();

    if (storedOtp !== cleanOtp) {
      return res.status(400).json({ message: 'OTP không đúng.' });
    }

    // Xóa OTP đã xác thực
    await redisClient.del(`otp:${email}`);

    res.status(200).json({ message: 'Xác thực OTP thành công.' });
  } catch (error) {
    next(error);
  }
};
