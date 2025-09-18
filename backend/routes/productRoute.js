const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const { getAllProduct, getProduct, likeProduct, unlikeProduct, isLikedProduct, getReviews, getEachNumofTypeRating } = require('../controllers/productController');

router.get('/getAll', getAllProduct);
router.get('/getDataProduct', getProduct);
router.get('/isLiked', protect, isLikedProduct);
router.post('/like', protect, likeProduct);
router.delete('/unlike', protect, unlikeProduct);
router.get('/reviews', getReviews);
router.get('/eachNumReviews', getEachNumofTypeRating);

module.exports = router;
