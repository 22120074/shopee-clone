const express = require('express');
const router = express.Router();
const { createOrUpdateCart, getCart } = require('../controllers/cartController');

router.post('/addCart', createOrUpdateCart);
router.get('/getCart', getCart);
// router.put('/updateCart', createOrUpdateCart);
// router.delete('/deleteCart', )

module.exports = router;
