const express = require('express');
const router = express.Router();
const { createOrUpdateCart, getCart } = require('../controllers/cartController');
const { protect } = require('../middleware/authMiddleware');

router.post('/addCart', protect, createOrUpdateCart);
router.get('/getCart', protect, getCart);
// router.put('/updateCart', createOrUpdateCart);
// router.delete('/deleteCart', )

module.exports = router;
