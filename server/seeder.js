// server/seeder.js
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const Restaurant = require("./models/Restaurant");
const FoodItem = require("./models/FoodItem");

dotenv.config();
connectDB();

const seedData = async () => {
  try {
    // Clear existing data to avoid duplicates
    await Restaurant.deleteMany();
    await FoodItem.deleteMany();

    // 1. Create a Restaurant
    const pizzaPlace = await Restaurant.create({
      name: "The Slice Lab",
      address: "123 University Ave",
      imageUrl: "https://images.unsplash.com/photo-1604381538336-b54ce29a8d43?w=500",
      rating: 4.5,
    });

    const burgerJoint = await Restaurant.create({
      name: "The Burger Lab",
      address: "Student Union Building",
      imageUrl: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=500",
      rating: 4.8,
    });

    // 2. Create Food Items linked to those restaurants
    await FoodItem.insertMany([
      {
        name: "Pepperoni Pizza",
        description: "Classic slice with extra cheese.",
        price: 12.99,
        category: "Mains",
        restaurant: pizzaPlace._id, // Relational link
        imageUrl: "https://images.unsplash.com/photo-1628840042765-356cda07504e?w=500"
      },
      {
        name: "Garlic Knots",
        description: "6 pieces served with marinara.",
        price: 4.99,
        category: "Starters",
        restaurant: pizzaPlace._id,
      },
      {
        name: "Lab Burger",
        description: "Double patty with secret sauce.",
        price: 14.99,
        category: "Mains",
        restaurant: burgerJoint._id,
        imageUrl: "https://images.unsplash.com/photo-1550547660-d9450f859349?w=500"
      }
    ]);

    console.log("Database Seeded Successfully!");
    process.exit();
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

seedData();