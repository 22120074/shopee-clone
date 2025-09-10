const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const { getAllProduct, getProduct, likeProduct, unlikeProduct, isLikedProduct } = require('../controllers/productController');

router.get('/getAll', getAllProduct);
router.get('/getDataProduct', getProduct);
router.get('/isLiked', protect, isLikedProduct);
router.post('/like', protect, likeProduct);
router.delete('/unlike', protect, unlikeProduct);

module.exports = router;
