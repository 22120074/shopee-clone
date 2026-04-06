const {
  checkExistingShop,
  addShop,
  getShop,
  isFollowShop,
  followShop,
  unfollowShop,
} = require("../services/shop.service");
const { BadRequest, Conflict } = require("../utils/appErrors");
const { Success, Created } = require("../utils/responseHelper");

exports.checkShop = async (req, res, next) => {
  try {
    const { userId } = req.params;

    if (!userId) throw BadRequest("Thiếu userId để kiểm tra.");

    const shop = await checkExistingShop(userId);

    return Success(res, shop, "Kiểm tra cửa hàng thành công");
  } catch (error) {
    next(error);
  }
};

exports.registerShop = async (req, res, next) => {
  try {
    const { userId, nameShop, address } = req.body;

    const isExist = await checkExistingShop(userId);
    if (isExist) throw Conflict("Cửa hàng đã tồn tại.");

    if (
      !userId ||
      !nameShop ||
      !address ||
      !Array.isArray(address) ||
      address.length === 0
    ) {
      throw BadRequest(
        "Vui lòng cung cấp đầy đủ: ID người dùng, tên Shop và ít nhất 1 địa chỉ.",
      );
    }

    const newShop = await addShop(userId, nameShop, address);

    return Created(res, newShop, "Đăng ký thông tin cửa hàng thành công!");
  } catch (error) {
    next(error);
  }
};

exports.getShop = async (req, res, next) => {
  try {
    const { userId } = req.params;

    if (!userId) throw BadRequest("Thiếu userId để lấy thông tin cửa hàng.");

    const shop = await getShop(userId);

    return Success(res, shop, "Lấy thông tin cửa hàng thành công");
  } catch (error) {
    next(error);
  }
};

exports.isFollowShop = async (req, res, next) => {
  try {
    const followerId = req.user.userId;
    const { followingId } = req.params;

    if (!followerId || !followingId)
      throw BadRequest("Thiếu followerId hoặc followingId để kiểm tra.");

    const isFollowing = await isFollowShop(followerId, followingId);

    return Success(res, isFollowing, "Kiểm tra theo dõi cửa hàng thành công");
  } catch (error) {
    next(error);
  }
};

exports.followShop = async (req, res, next) => {
  try {
    const followerId = req.user.userId;
    const { followingId } = req.params;

    if (!followerId || !followingId)
      throw BadRequest("Thiếu followerId hoặc followingId để theo dõi.");

    const isFollowing = await isFollowShop(followerId, followingId);
    if (isFollowing) throw Conflict("Bạn đã theo dõi cửa hàng này rồi!");

    await followShop(followerId, followingId);

    return Success(res, null, "Theo dõi cửa hàng thành công");
  } catch (error) {
    next(error);
  }
};

exports.unfollowShop = async (req, res, next) => {
  try {
    const followerId = req.user.userId;
    const { followingId } = req.params;

    if (!followerId || !followingId)
      throw BadRequest("Thiếu followerId hoặc followingId để bỏ theo dõi.");

    const isFollowing = await isFollowShop(followerId, followingId);
    if (!isFollowing) throw Conflict("Bạn chưa theo dõi cửa hàng này!");

    await unfollowShop(followerId, followingId);

    return Success(res, null, "Bỏ theo dõi cửa hàng thành công");
  } catch (error) {
    next(error);
  }
};
