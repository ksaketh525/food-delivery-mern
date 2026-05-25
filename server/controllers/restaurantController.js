const Restaurant = require("../models/Restaurant");
const FoodItem = require("../models/FoodItem");

// @desc    Get all restaurants for the homepage
// @route   GET /api/restaurants
const getRestaurants = async (req, res) => {
  try {
    const restaurants = await Restaurant.find({});
    res.json(restaurants);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get single restaurant and its menu
// @route   GET /api/restaurants/:id
const getRestaurantMenu = async (req, res) => {
  try {
    console.log("-----------------------------------------");
    console.log("🔍 React is asking for Restaurant ID:", req.params.id);

    const restaurant = await Restaurant.findById(req.params.id);
    const foodItems = await FoodItem.find({ restaurant: req.params.id });
    
    console.log("📦 Found this many food items:", foodItems.length);
    console.log("-----------------------------------------");

    if (restaurant) {
      res.json({ restaurant, foodItems });
    } else {
      res.status(404).json({ message: "Restaurant not found" });
    }
  } catch (error) {
    console.log("❌ Error:", error.message);
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getRestaurants, getRestaurantMenu };