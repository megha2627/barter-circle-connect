const mongoose = require("mongoose");
const User = require("../models/User");
const express = require("express");
const bodyParser = require("body-parser");

const cors = require("cors")// path to your User model
const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Connect to MongoDB Atlas u
// Connect to your MongoDB
require("dotenv").config();
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB Atlas connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Dummy data
const dummyUsers = [
  {
    name: "John Doe",
    email: "john@example.com",
    password: "hashedpassword1", // Note: use bcrypt in real use
    bio: "Passionate gardener.",
    skillsOffered: ["Gardening"],
    skillsNeeded: ["Plumbing"],
    categories: ["Home Services"],
  },
  {
    name: "Jane Smith",
    email: "jane@example.com",
    password: "hashedpassword2",
    bio: "Experienced grocery supplier.",
    skillsOffered: ["Grocery"],
    skillsNeeded: ["Delivery Services"],
    categories: ["Grocery"],
  },
  {
    name: "Alice Johnson",
    email: "alice@example.com",
    password: "hashedpassword3",
    bio: "Cooking and recipes expert.",
    skillsOffered: ["Cooking"],
    skillsNeeded: ["Grocery"],
    categories: ["Food"],
  },
];

// Insert data
async function seed() {
  try {
    await User.deleteMany({});
    await User.insertMany(dummyUsers);
    console.log("Dummy users inserted");
    process.exit();
  } catch (error) {
    console.error("Error inserting dummy data:", error);
    process.exit(1);
  }
}

seed();
