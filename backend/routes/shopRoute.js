const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/authMiddleware");
const { checkShop, registerShop } = require("../controllers/shopController");
const { createProduct } = require("../controllers/shopProductController");

router.get("/check/:userId", protect, checkShop);
router.post("/register", protect, registerShop);

router.post("/product", protect, createProduct);

router.get("/:userId", protect, getShop);
router.get("/is-follow/:followerId/:followingId", protect, isFollowShop);
router.post("/follow/:followerId/:followingId", protect, followShop);
router.post("/unfollow/:followerId/:followingId", protect, unfollowShop);

module.exports = router;
