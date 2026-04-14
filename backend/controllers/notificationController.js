const {
  getNotifications,
  markAsRead,
} = require("../services/notification.service");
const { Success } = require("../utils/responseHelper");
const { BadRequest } = require("../utils/appErrors");

const getNotifications = async (req, res) => {
  try {
    const userId = req.user.userId;
    const { limit, page } = req.query;
    const notifications = await getNotifications(userId, limit, page);
    return Success(res, notifications, "Lấy danh sách thông báo thành công");
  } catch (error) {
    throw error;
  }
};

const markAsRead = async (req, res) => {
  try {
    const { notificationId } = req.params;
    if (!notificationId) {
      throw BadRequest("Notification Id is required");
    }
    const notification = await markAsRead(notificationId);
    return Success(res, notification, "Đánh dấu thông báo đã đọc thành công");
  } catch (error) {
    throw error;
  }
};

module.exports = {
  getNotifications,
  markAsRead,
};
