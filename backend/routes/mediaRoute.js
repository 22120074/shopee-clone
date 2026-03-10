const express = require('express');
const router = express.Router();
const mediaController = require('../controllers/mediaController');
const { uploadSingleMiddleware, uploadArrayMiddleware } = require('../middleware/errorHandle');

router.post('/upload-single', uploadSingleMiddleware, mediaController.uploadSingleImage);
router.post('/upload-multiple', uploadArrayMiddleware, mediaController.uploadMultipleImages);
module.exports = router;