// server/controllers/foodController.js
const FoodItem = require("../models/FoodItem");

// @desc    Get food items for a specific restaurant
// @route   GET /api/food/:restaurantId
const getFoodByRestaurant = async (req, res) => {
  try {
    const food = await FoodItem.find({ restaurant: req.params.restaurantId });
    res.json(food);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getFoodByRestaurant };