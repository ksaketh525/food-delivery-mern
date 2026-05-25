// server/routes/adminRoutes.js
const express = require("express");
const router = express.Router();
const { addRestaurant, getAllOrders, updateOrderStatus, addFoodItem} = require("../controllers/adminController");
const { protect, admin } = require("../middleware/authMiddleware");

// All routes are protected and require admin privileges
router.post("/restaurants", protect, admin, addRestaurant);
router.get("/orders", protect, admin, getAllOrders);
router.put("/orders/:id/status", protect, admin, updateOrderStatus);
router.post("/food", protect, admin, addFoodItem);
module.exports = router;