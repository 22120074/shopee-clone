const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/authMiddleware");
const {
  getNotificationsController,
  markAsReadController,
  markAllAsReadController,
  getUnreadCountController,
} = require("../controllers/notificationController");

router.get("/get-notifications", protect, getNotificationsController);
router.patch("/mark-as-read/:notificationId", protect, markAsReadController);
router.patch("/mark-all-as-read", protect, markAllAsReadController);
router.get("/get-unread-count", protect, getUnreadCountController);

module.exports = router;
