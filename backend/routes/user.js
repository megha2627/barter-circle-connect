const express = require("express");
const router = express.Router();
const User = require("../models/User");
const {
  updateUserProfileController,
  getUsersByCategoryController,
} = require("../controllers/userController");

// Update user profile
router.put("/profile/:userId", updateUserProfileController);

// Get users by category
router.get("/category/:categoryName", getUsersByCategoryController);

// Get user by ID
router.get("/:userId", async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    if (!user) return res.status(404).json({ error: "User not found" });
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ error: "Server error", message: err.message });
  }
});

module.exports = router;
