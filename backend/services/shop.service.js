const Shop = require("../models/Mongoose/Shop");
const mongoose = require("mongoose");

const checkExistingShop = async (userId) => {
  try {
    let shop;
    const projection = { nameShop: 1, address: 1, _id: 0 };
    if (
      typeof userId === "string" &&
      !mongoose.Types.ObjectId.isValid(userId)
    ) {
      shop = await Shop.findOne({ googleID: userId }, projection);
    } else {
      shop = await Shop.findOne({ userId: userId }, projection);
    }
    return shop;
  } catch (error) {
    throw error;
  }
};

const addShop = async (userId, nameShop, addresses) => {
  try {
    const isExist = await checkExistingShop(userId);
    if (isExist) {
      throw new Error("Người dùng này đã sở hữu một cửa hàng rồi!");
    }

    const shopData = {
      nameShop: nameShop,
      address: addresses,
    };
    if (mongoose.Types.ObjectId.isValid(userId)) {
      shopData.userId = userId;
    } else {
      shopData.googleID = userId;
    }

    const newShop = new Shop(shopData);
    const savedShop = await newShop.save();

    return savedShop;
  } catch (error) {
    console.error("Lỗi khi thêm Shop:", error.message);
    throw error;
  }
};

module.exports = { checkExistingShop, addShop };
