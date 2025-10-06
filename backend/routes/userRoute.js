const express = require('express');
const router = express.Router();
const { updateEmailAPI, updatePhoneAPI } = require('../controllers/userController');

router.put('/update-email', updateEmailAPI);
router.put('/update-phone', updatePhoneAPI);

module.exports = router;