const express = require('express');
const router = express.Router();
const { register, login, getMe, logout, refreshToken, getUserListRating } = require('../controllers/authController');
const { protect } = require('../middleware/authMiddleware');

router.post('/register', register);
router.post('/login', login);
router.get('/me', protect, getMe);
router.post('/refreshToken', refreshToken);
router.post('/logout', logout);
router.get('/data_list_rating', getUserListRating)


module.exports = router;
