// server/routes/foodRoutes.js
const express = require("express");
const router = express.Router();
const { getFoodByRestaurant } = require("../controllers/foodController");

router.get("/:restaurantId", getFoodByRestaurant);

module.exports = router;