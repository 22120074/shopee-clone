const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/authMiddleware");
const {
  getNotifications,
  markAsRead,
} = require("../controllers/notificationController");

router.get("/get-notifications", protect, getNotifications);
router.put("/mark-as-read/:notificationId", protect, markAsRead);

module.exports = router;
