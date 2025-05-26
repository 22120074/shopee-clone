const { User, DataUser } = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.register = async (req, res, next) => {
  try {
    const { phone, password } = req.body;

    // 1. Kiểm tra dữ liệu đầu vào
    if (!phone || !password) {
      return res.status(400).json({ message: 'Vui lòng điền đầy đủ thông tin.' });
    }

    // 2. Kiểm tra xem user đã tồn tại chưa
    const existingUser = await User.findOne({ phone });
    if (existingUser) {
      return res.status(409).json({ message: 'Số điện thoại đã được đăng ký.' });
    }

    // 3. Mã hóa mật khẩu
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // 4. Tạo user mới và lưu vào DB
    const newUser = new User({
      phone,
      password: hashedPassword
    });
    await newUser.save();

    // 5. Tạo luôn profile mặc định trong collection 'dataUser'
    const newProfile = new DataUser({
      userId:      newUser._id, // tham chiếu đến user vừa tạo
      phone:       newUser.phone,
      email:       '',          // để trống
      name:        '',          // để trống
      gender:      'other',     // theo default enum
      dateOfBirth: null,        // để trống
      avatarUrl:   ''           // để trống
      // createdAt tự động theo schema
    });
    await newProfile.save();

    // 6. Trả về kết quả
    return res.status(201).json({ message: 'Đăng ký thành công!' });

  } catch (error) {
    next(error); // Gọi middleware xử lý lỗi
  }
};

exports.login = async (req, res, next) => {
  try {
    const { phone, password } = req.body;
    if (!phone || !password) {
      return res.status(400).json({ message: 'Vui lòng nhập đủ số điện thoại và mật khẩu.' });
    }

    const user = await User.findOne({ phone });
    if (!user) {
      return res.status(401).json({ message: 'Số điện thoại hoặc mật khẩu không đúng.' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Số điện thoại hoặc mật khẩu không đúng.' });
    }

    // Nếu muốn trả token JWT
    const token = jwt.sign(
      { userId: user._id, phone: user.phone },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    res
      .cookie('token', token, {
        httpOnly: true,                                 // Không cho JS client truy cập
        secure: process.env.NODE_ENV === 'production', // HTTPS khi deploy
        sameSite: 'Lax',                              // hoặc 'Strict'
        maxAge: 60 * 60 * 1000                        // 1 giờ (ms)
      })
      .json({ message: 'Đăng nhập thành công!' });  
    } catch (err) {
      next(err);
  }
};

exports.getMe = async (req, res) => {
  try {
    const userId = req.user.userId;

    // console.log('Lấy thông tin người dùng:', userId);
    // console.log('Payload từ middleware:', req.user);

    // Tìm thông tin người dùng chi tiết từ collection dataUser dựa theo userId
    const userData = await DataUser.findOne({ userId });

    if (!userData) {
      return res.status(404).json({ message: 'Không tìm thấy dữ liệu người dùng' });
    }

    // console.log(userData);

    // Trả về toàn bộ dữ liệu trong document dataUser
    res.json({ dataUser: userData });
    
  } catch (error) {
    console.error('Lỗi khi lấy thông tin người dùng:', error);
    res.status(500).json({ message: 'Lỗi server' });
  }
};

exports.logout = (req, res) => {
  res
    .clearCookie('token', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'Lax'
    })
    .json({ message: 'Đăng xuất thành công' });
};
