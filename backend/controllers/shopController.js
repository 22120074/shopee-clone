const { checkExistingShop, addShop } = require("../services/shop.service");

exports.checkShop = async (req, res, next) => {
  try {
    const { userId } = req.params;

    if (!userId) {
      return res.status(400).json({
        success: false,
        message: "Thiếu userId để kiểm tra.",
      });
    }

    const shop = await checkExistingShop(userId);

    return res.status(200).json({
      success: true,
      shop: shop,
    });
  } catch (error) {
    next(error);
  }
};

exports.registerShop = async (req, res, next) => {
  try {
    const { userId, nameShop, address } = req.body;

    const isExist = await checkExistingShop(userId);
    if (isExist) {
      return res.status(400).json({
        success: false,
        message: "Shop đã tồn tại.",
      });
    }

    if (
      !userId ||
      !nameShop ||
      !address ||
      !Array.isArray(address) ||
      address.length === 0
    ) {
      return res.status(400).json({
        success: false,
        message:
          "Vui lòng cung cấp đầy đủ: ID người dùng, tên Shop và ít nhất 1 địa chỉ.",
      });
    }

    const newShop = await addShop(userId, nameShop, address);

    return res.status(201).json({
      success: true,
      message: "Đăng ký thông tin cửa hàng thành công!",
      data: newShop,
    });
  } catch (error) {
    next(error);
  }
};
