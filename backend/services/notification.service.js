const { Op } = require("sequelize");
const dbPostgre = require("../models/PostgreSql/index");
const { sendNotification } = require("../config/socketConfig");

const Notification = dbPostgre.Notification;

const createAndSendNotification = async (notificationData) => {
  try {
    const newNotification = await Notification.create({
      userId: notificationData.userId,
      senderId: notificationData.senderId,
      content: notificationData.content,
      type: notificationData.type,
    });

    sendNotification(notificationData.userId, newNotification);

    return newNotification;
  } catch (error) {
    throw error;
  }
};

const getNotifications = async (userId, limit = 10, cursor) => {
  const limitNumber = parseInt(limit, 10);
  const whereClause = { userId };

  if (cursor) {
    whereClause.createdAt = {
      [Op.lt]: new Date(cursor),
    };
  }

  const notifications = await Notification.findAll({
    where: whereClause,
    limit: limitNumber + 1, // Lấy dư 1 item để check xem còn trang tiếp theo không
    order: [["createdAt", "DESC"]],
  });

  let hasNextPage = false;
  let nextCursor = null;

  if (notifications.length > limitNumber) {
    hasNextPage = true;
    notifications.pop();
  }

  if (notifications.length > 0) {
    nextCursor = notifications[notifications.length - 1].createdAt;
  }

  return {
    rows: notifications,
    nextCursor,
    hasNextPage,
  };
};

const markAsRead = async (notificationId) => {
  await Notification.update(
    { isRead: true },
    { where: { id: notificationId } },
  );
};

const markAllAsRead = async (userId) => {
  await Notification.update({ isRead: true }, { where: { userId } });
};

const deleteNotification = async (notificationId) => {
  await Notification.destroy({ where: { id: notificationId } });
};

const getUnreadCount = async (userId) => {
  return await Notification.count({ where: { userId, isRead: false } });
};

module.exports = {
  createAndSendNotification,
  getNotifications,
  markAsRead,
  markAllAsRead,
  deleteNotification,
  getUnreadCount,
};
