const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const { getAllProduct, getProduct } = require('../controllers/productController');

router.get('/getAll', getAllProduct);
router.get('/getDataProduct', getProduct)

module.exports = router;
