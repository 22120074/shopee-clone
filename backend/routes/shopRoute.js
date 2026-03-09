const express = require("express");
const router = express.Router();
const { checkShop, registerShop } = require("../controllers/shopController");
const { protect } = require("../middleware/authMiddleware");

router.get("/check/:userId", checkShop);

router.post("/register", registerShop);

module.exports = router;
