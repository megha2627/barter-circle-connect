
const express = require("express");
const router = express.Router();
const User = require("../models/User");

// Match users based on skills
router.get("/match/:userId", async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    if (!user) return res.status(404).json({ error: "User not found" });

    // Match users whose skillsOffered are needed by others, and vice versa
    const matches = await User.find({
      skillsOffered: { $regex: user.skillsNeeded, $options: "i" },
      skillsNeeded: { $regex: user.skillsOffered, $options: "i" },
      _id: { $ne: user._id }, // Exclude the current user
    });

    res.status(200).json({ matches });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;


