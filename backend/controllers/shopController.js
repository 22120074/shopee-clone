const { checkExistingShop, addShop } = require("../services/shop.service");
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
