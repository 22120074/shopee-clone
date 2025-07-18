// models/User.js
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  phone: {
    type: String,
    required: true,
    unique: true,      // Đảm bảo số điện thoại không trùng
    trim: true
  },
  password: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
},{
  collection: 'users'  // đặt tên collection rõ ràng
});

const dataUserSchema = new mongoose.Schema({
  userId: {               // tham chiếu đến _id của collection users
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  },
  phone: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    trim: true,
    default: ''
  },
  name: {
    type: String,
    trim: true,
    default: ''  
  },
  gender: {
    type: String,
    enum: ['male','female','other'],
    default: 'other'
  },
  dateOfBirth: {
    type: Date,
    default: null
  },
  avatarUrl: {
    type: String,
    default: ''
  },
  // ... các trường khác nếu cần
  createdAt: {
    type: Date,
    default: Date.now
  }
}, {
  collection: 'dataUser'  // đặt tên collection rõ ràng
});

const productSchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: true 
  }, // Tên sản phẩm

  images: [
    String
  ], // Mảng chứa nhiều URL hoặc tên file ảnh

  favorite: { 
    type: Boolean, 
    default: false 
  }, // Yêu thích (true/false)

  likes: { 
    type: Number, 
    default: 0
  }, // Số lượt thích (số nguyên)

  rating: { 
    type: Number, 
    default: 0 
  }, // Điểm đánh giá (số thực)

  ratingCount: { 
    type: Number, 
    default: 0 
  }, // Số lượt đánh giá (số nguyên)

  sold: { 
    type: Number, 
    default: 0 
  }, // Số lượng đã bán (số nguyên)

  discount: { 
    type: Number, 
    default: 0 
  }, // Giảm giá (%) – ví dụ: 20 nghĩa là 20%

  attributes: {
    name: { 
      type: String, 
      required: true 
    }, // Tên đặc tính, ví dụ: "color"

    values: [
      {
        valueName: { 
          type: String, 
          required: true 
        }, // Tên option, ví dụ: "Đen da lộn"

        image: String,  // URL hoặc tên file ảnh cho option đó
        price: Number   // Giá tương ứng với option đó
      }
    ]
  }, // Mảng Đặc tính, mỗi phần tử có name và mảng values

  sizes: [
    Number
  ], // Dãy số size, ví dụ [35, 36, 37, 38, 39]

  fromStore: {
    type: String, // Tên cửa hàng hoặc kho hàng
    required: true,
  },

  details: {
    stock: Number,      // Thông tin kho: ví dụ “Còn 50 đôi”
    material: String,   // Chất liệu: ví dụ “Da lộn”
    origin: String,     // Xuất xứ: ví dụ “Việt Nam”  
    shippedFrom: String // Gửi từ: ví dụ “Hà Nội”
  },

  description: { 
    type: String 
  } // Mô tả chi tiết sản phẩm (chuỗi text dài)
}, { 
  timestamps: true,
  collection: 'dataProduct'
  // Tự động thêm createdAt và updatedAt
});

const DataUser = mongoose.model('DataUser', dataUserSchema);
const User = mongoose.model('User', userSchema);
const Product = mongoose.model('Product', productSchema);

module.exports = { User, DataUser, Product };
