const express = require('express');
const router = express.Router();
const { updateEmailAPI, updatePhoneAPI, updateProfileAPI } = require('../controllers/userController');

router.patch('/update-email', updateEmailAPI);
router.patch('/update-phone', updatePhoneAPI);
router.patch('/update-profile', updateProfileAPI);

module.exports = router;