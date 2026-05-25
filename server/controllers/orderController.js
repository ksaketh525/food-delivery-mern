// server/controllers/orderController.js
const Order = require("../models/Order");

// @desc    Create new order
// @route   POST /api/orders
// @access  Private (Requires Token)
const placeOrder = async (req, res) => {
  try {
    const { orderItems, deliveryAddress, totalPrice } = req.body;

    if (orderItems && orderItems.length === 0) {
      return res.status(400).json({ message: "No order items" });
    }

    // Create the order in the database, attaching the logged-in user's ID
    const order = new Order({
      user: req.user._id,
      orderItems,
      deliveryAddress,
      totalPrice,
    });

    const createdOrder = await order.save();
    res.status(201).json(createdOrder);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get logged in user orders
// @route   GET /api/orders/myorders
// @access  Private
const getMyOrders = async (req, res) => {
  try {
    // Find all orders that belong to the user who made the request
    const orders = await Order.find({ user: req.user._id }).sort({ createdAt: -1 }); // Newest first
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { placeOrder, getMyOrders };