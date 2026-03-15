const {
  updateEmail,
  updatePhone,
  updateProfile,
  updateAvatar,
  removeOldAvatar,
} = require("../services/user.service");
const { NotFound, BadRequest } = require("../utils/appErrors");
const { Success, Created } = require("../utils/responseHelper");

exports.updateEmailAPI = async (req, res, next) => {
  try {
    const { userId, email } = req.body;
    let newEmail = email.trim();
    if (!userId || !email) {
      throw BadRequest("Thiếu userId hoặc newEmail");
    }
    const updatedUser = await updateEmail(userId, newEmail);
    if (!updatedUser) {
      throw NotFound("Người dùng không tồn tại");
    }
    return Success(res, null, "Cập nhật email thành công");
  } catch (error) {
    next(error);
  }
};

exports.updatePhoneAPI = async (req, res, next) => {
  try {
    const { userId, phone } = req.body;
    let newPhone = phone.trim();
    if (!userId || !phone) {
      throw BadRequest("Thiếu userId hoặc newPhone");
    }
    const updatedUser = await updatePhone(userId, newPhone);
    if (!updatedUser) {
      throw NotFound("Người dùng không tồn tại");
    }
    return Success(res, null, "Cập nhật số điện thoại thành công");
  } catch (error) {
    next(error);
  }
};

exports.updateProfileAPI = async (req, res, next) => {
  try {
    const { userId, displayName, name, gender, date } = req.body;
    let newDisplayName = displayName.trim();
    let newName = name.trim();
    let newGender = gender.trim();
    if (!userId || !displayName || !name || !gender || !date) {
      throw BadRequest("Thiếu thông tin cập nhật hồ sơ");
    }
    const updatedUser = await updateProfile(
      userId,
      newDisplayName,
      newName,
      newGender,
      date,
    );
    if (!updatedUser) {
      throw NotFound("Người dùng không tồn tại");
    }
    return Success(res, null, "Cập nhật hồ sơ thành công");
  } catch (error) {
    next(error);
  }
};

exports.updateAvatarAPI = async (req, res, next) => {
  try {
    const userId = req.user.userId;
    if (!req.file) {
      throw BadRequest("Không có file nào được tải lên");
    }
    const file = req.file;
    const updatedUser = await updateAvatar(userId, file);
    if (!updatedUser) {
      throw NotFound("Người dùng không tồn tại");
    }
    return Success(
      res,
      {
        avatarUrl: updatedUser.avatarUrl,
      },
      "Cập nhật avatar thành công",
    );
  } catch (error) {
    next(error);
  }
};
