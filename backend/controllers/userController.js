const {
  updateEmail,
  updatePhone,
  updateProfile,
  updateAvatar,
  getPublicId,
} = require("../services/user.service");
const { NotFound, BadRequest } = require("../utils/appErrors");
const { Success, Created } = require("../utils/responseHelper");
const { deleteSingleImage } = require("../services/media.service");

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
    return Success(
      res,
      {
        email: updatedUser.email,
      },
      "Cập nhật email thành công",
    );
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
    return Success(
      res,
      {
        phone: updatedUser.phone,
      },
      "Cập nhật số điện thoại thành công",
    );
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
    return Success(
      res,
      {
        displayName: updatedUser.displayName,
        name: updatedUser.name,
        gender: updatedUser.gender,
        date: updatedUser.dateOfBirth,
      },
      "Cập nhật hồ sơ thành công",
    );
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
    const publicId = await getPublicId(userId);
    if (publicId) {
      await deleteSingleImage(publicId);
    }
    const updatedUser = await updateAvatar(userId, req.file);
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
    if (req.file && req.file.filename) {
      await deleteSingleImage(req.file.filename);
    }
    next(error);
  }
};
