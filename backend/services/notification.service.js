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

const getNotifications = async (userId, limit = 10, page = 1) => {
  const offset = (page - 1) * limit;

  const notifications = await Notification.findAndCountAll({
    where: { userId },
    limit,
    offset,
    order: [["createdAt", "DESC"]],
  });

  return {
    rows: notifications.rows,
    totalPages: Math.ceil(notifications.count / limit),
    currentPage: page,
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

module.exports = {
  createAndSendNotification,
  getNotifications,
  markAsRead,
  markAllAsRead,
  deleteNotification,
};
