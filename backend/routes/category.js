const express = require("express");
const router = express.Router();
const User = require("../models/User");

// Correct API route to get all users for the category page
router.get("/", async (req, res) => {
  // Use / instead of /category
  try {
    const users = await User.find({});
    res.status(200).json({ users });
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
