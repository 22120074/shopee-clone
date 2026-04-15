const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/authMiddleware");
const {
  getNotificationsController,
  markAsReadController,
} = require("../controllers/notificationController");

router.get("/get-notifications", protect, getNotificationsController);
router.patch("/mark-as-read/:notificationId", protect, markAsReadController);

module.exports = router;
