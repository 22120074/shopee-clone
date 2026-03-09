const mongoose = require("mongoose");

// Nếu người dùng đăng nhập bằng GG thì chỉ có dataUserScheme thôi, nhưng id sẽ là ggID gửi cho.

const shopSchema = new mongoose.Schema(
  {
    userId: {
      // tham chiếu đến _id của collection users
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: false,
    },
    googleID: {
      type: String,
      unique: true,
      required: false,
    },
    nameShop: {
      type: String,
      required: true,
    },
    address: {
      type: [String],
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    collection: "shops",
  },
);

const Shop = mongoose.model("Shop", shopSchema);
module.exports = Shop;
