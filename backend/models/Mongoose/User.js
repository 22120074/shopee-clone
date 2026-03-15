// models/User.js
const mongoose = require("mongoose");

// Nếu người dùng đăng nhập bằng GG thì chỉ có dataUserScheme thôi, nhưng id sẽ là ggID gửi cho.

const userSchema = new mongoose.Schema(
  {
    phone: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    collection: "users",
  },
);

const dataUserSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      require: false,
    },
    googleID: {
      type: String,
      unique: true,
      required: false,
    },
    phone: {
      type: String,
      trim: true,
      default: "",
    },
    email: {
      type: String,
      trim: true,
      default: "",
    },
    name: {
      type: String,
      trim: true,
      default: "",
    },
    displayName: {
      type: String,
      trim: true,
      default: "",
    },
    gender: {
      type: String,
      enum: ["male", "female", "other"],
      default: "other",
    },
    dateOfBirth: {
      type: Date,
      default: null,
    },
    avatarUrl: {
      type: String,
      default: "",
    },
    publicId: {
      type: String,
      default: "",
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    collection: "dataUser",
  },
);

const DataUser = mongoose.model("DataUser", dataUserSchema);
const User = mongoose.model("User", userSchema);

module.exports = { User, DataUser };
