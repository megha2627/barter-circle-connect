const express = require("express");
const router = express.Router();
const User = require("../models/User");

// Filter users by category
router.get("/", async (req, res) => {
  const { category } = req.query;
  try {
    const users = await User.find({ categories: category });
    res.status(200).json({ users });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
