const express = require("express");
const router = express.Router();
const User = require("../models/User"); // Assuming you have a User model
const { verifyToken } = require("../middleware/auth"); // Assuming verifyToken middleware

// PUT: Update User Profile
router.put("/profile/:userId", verifyToken, async (req, res) => {
  const { userId } = req.params;
  const { bio, skillsOffered, skillsNeeded } = req.body;

  try {
    // Ensure the userId in the URL matches the logged-in user (optional check)
    if (userId !== req.user.id) {
      return res.status(403).json({ message: "Unauthorized action" });
    }

    // Find and update the user's profile
    const user = await User.findByIdAndUpdate(
      userId,
      { bio, skillsOffered, skillsNeeded },
      { new: true, runValidators: true } // `new: true` returns the updated document
    );

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({ updatedUser: user });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

module.exports = router;
