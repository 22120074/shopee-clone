const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/authMiddleware");
const {
  checkShop,
  registerShop,
  isFollowShop,
  followShop,
  unfollowShop,
  getShop,
} = require("../controllers/shopController");
const { createProduct } = require("../controllers/shopProductController");

router.get("/check/:userId", protect, checkShop);
router.post("/register", protect, registerShop);

router.post("/product", protect, createProduct);

router.get("/:userId", getShop);
router.get("/is-follow/:followingId", protect, isFollowShop);
router.post("/follow/:followingId", protect, followShop);
router.post("/unfollow/:followingId", protect, unfollowShop);

module.exports = router;
