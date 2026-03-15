const express = require("express");
const router = express.Router();
const {
  updateEmailAPI,
  updatePhoneAPI,
  updateProfileAPI,
  updateAvatarAPI,
} = require("../controllers/userController");
const { protect } = require("../middleware/authMiddleware");
const { uploadSingleMiddleware } = require("../middleware/errorHandle");

router.patch("/update-email", protect, updateEmailAPI);
router.patch("/update-phone", protect, updatePhoneAPI);
router.patch("/update-profile", protect, updateProfileAPI);
router.patch(
  "/update-avatar",
  protect,
  uploadSingleMiddleware,
  updateAvatarAPI,
);

module.exports = router;
