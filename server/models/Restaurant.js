// server/models/Restaurant.js
const mongoose = require("mongoose");

const restaurantSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    address: { type: String, required: true },
    imageUrl: { type: String }, // URL for the restaurant image
    rating: { type: Number, default: 0 },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Restaurant", restaurantSchema);