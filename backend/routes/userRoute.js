const express = require('express');
const router = express.Router();
const { updateEmailAPI } = require('../controllers/userController');

router.put('/update-email', updateEmailAPI);

module.exports = router;