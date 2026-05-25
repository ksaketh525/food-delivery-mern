// server/routes/orderRoutes.js
const express = require("express");
const router = express.Router();
const { placeOrder, getMyOrders } = require("../controllers/orderController");
const { protect } = require("../middleware/authMiddleware");

// Both routes require the user to be logged in
router.post("/", protect, placeOrder);
router.get("/myorders", protect, getMyOrders);

module.exports = router;