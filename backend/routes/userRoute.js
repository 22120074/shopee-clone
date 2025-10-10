const express = require('express');
const router = express.Router();
const { updateEmailAPI, updatePhoneAPI, updateProfileAPI, updateAvatarAPI } = require('../controllers/userController');
const upload = require("../middleware/upload");

router.patch('/update-email', updateEmailAPI);
router.patch('/update-phone', updatePhoneAPI);
router.patch('/update-profile', updateProfileAPI);
router.patch('/update-avatar', upload.single("avatar"), updateAvatarAPI);

module.exports = router;