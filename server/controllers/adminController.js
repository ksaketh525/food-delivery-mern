// server/controllers/adminController.js
const Restaurant = require("../models/Restaurant");
const Order = require("../models/Order");
const FoodItem = require("../models/FoodItem");

// @desc    Add a new restaurant
// @route   POST /api/admin/restaurants
const addRestaurant = async (req, res) => {
  try {
    const { name, address, imageUrl } = req.body;
    const restaurant = await Restaurant.create({ name, address, imageUrl });
    res.status(201).json(restaurant);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get all orders from all users
// @route   GET /api/admin/orders
const getAllOrders = async (req, res) => {
  try {
    // .populate() pulls in the specific user's name and email
    const orders = await Order.find({})
      .populate("user", "name email")
      .sort({ createdAt: -1 });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update order status
// @route   PUT /api/admin/orders/:id/status
const updateOrderStatus = async (req, res) => {
  try {
    const { status } = req.body; 
    const order = await Order.findById(req.params.id);

    if (order) {
      order.status = status;
      const updatedOrder = await order.save();
      res.json(updatedOrder);
    } else {
      res.status(404).json({ message: "Order not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Add a new food item to a specific restaurant
// @route   POST /api/admin/food
const addFoodItem = async (req, res) => {
  try {
    const { restaurant, name, description, price, category } = req.body;
    
    // Create the food item and link it to the restaurant's ID
    const food = await FoodItem.create({
      restaurant, 
      name,
      description,
      price: Number(price),
      category
    });
    
    res.status(201).json(food);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { addRestaurant, getAllOrders, updateOrderStatus, addFoodItem };