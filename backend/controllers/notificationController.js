const {
  getNotifications,
  markAsRead,
} = require("../services/notification.service");
const { Success } = require("../utils/responseHelper");
const { BadRequest } = require("../utils/appErrors");

const getNotificationsController = async (req, res, next) => {
  try {
    const userId = req.user.userId;
    const { limit, cursor } = req.query;
    const notifications = await getNotifications(userId, limit, cursor);
    return Success(res, notifications, "Lấy danh sách thông báo thành công");
  } catch (error) {
    next(error);
  }
};

const markAsReadController = async (req, res, next) => {
  try {
    const { notificationId } = req.params;
    if (!notificationId) {
      throw BadRequest("Notification Id is required");
    }
    const notification = await markAsRead(notificationId);
    return Success(res, notification, "Đánh dấu thông báo đã đọc thành công");
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getNotificationsController,
  markAsReadController,
};
