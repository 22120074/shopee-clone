const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/authMiddleware");
const { checkShop, registerShop } = require("../controllers/shopController");
const { createProduct } = require("../controllers/shopProductController");

router.get("/check/:userId", protect, checkShop);
router.post("/register", protect, registerShop);

router.post("/product", protect, createProduct);

module.exports = router;
