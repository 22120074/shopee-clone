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
    unique: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  name: {
    type: String,
    required: true,
    trim: true
  },
  gender: {
    type: String,
    enum: ['male','female','other'],
    default: 'other'
  },
  dateOfBirth: {
    type: Date
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

const DataUser = mongoose.model('DataUser', dataUserSchema);
const User = mongoose.model('User', userSchema);

module.exports = { User, DataUser };
