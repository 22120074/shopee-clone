const Shop = require("../models/Mongoose/Shop");
const mongoose = require("mongoose");
const { Conflict } = require("../utils/appErrors");
const dbPostgre = require("../models/PostgreSql/index");

const Follow = dbPostgre.Follow;
const Product = dbPostgre.Product;

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
      throw Conflict("Người dùng này đã sở hữu một cửa hàng rồi!");
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

const getShop = async (userId) => {
  try {
    const shopQuery =
      typeof userId === "string" && !mongoose.Types.ObjectId.isValid(userId)
        ? { googleID: userId }
        : { userId: userId };

    const [shopData, productCount, followerCount, followingCount] =
      await Promise.all([
        Shop.findOne(shopQuery).lean(),
        Product.count({ where: { fromStore: userId } }),
        Follow.count({ where: { following: userId } }),
        Follow.count({ where: { follower: userId } }),
      ]);

    if (!shopData) return null;

    return {
      ...shopData,
      productCount,
      followerCount,
      followingCount,
    };
  } catch (error) {
    throw error;
  }
};

const isFollowShop = async (followerId, followingId) => {
  try {
    console.log(followerId, followingId);
    console.log(typeof followerId, typeof followingId);
    const isFollowing = await Follow.findOne({
      where: { follower: followerId, following: followingId },
    });
    console.log(isFollowing);
    return !!isFollowing;
  } catch (error) {
    throw error;
  }
};

const followShop = async (followerId, followingId) => {
  try {
    await Follow.create({ follower: followerId, following: followingId });
  } catch (error) {
    throw error;
  }
};

const unfollowShop = async (followerId, followingId) => {
  try {
    await Follow.destroy({
      where: { follower: followerId, following: followingId },
    });
  } catch (error) {
    throw error;
  }
};

module.exports = {
  checkExistingShop,
  addShop,
  getShop,
  isFollowShop,
  followShop,
  unfollowShop,
};
