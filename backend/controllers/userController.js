// controllers/userController.js
const User = require("../models/User");

// Controller to update user profile
const updateUserProfileController = async (req, res) => {
  const { userId } = req.params;
  const { bio, skillsOffered, skillsNeeded } = req.body;

  try {
    const user = await User.findByIdAndUpdate(
      userId,
      { bio, skillsOffered, skillsNeeded },
      { new: true }
    );

    if (!user) return res.status(404).json({ error: "User not found" });

    res.json(user);
  } catch (err) {
    res.status(500).json({ error: "Server error", message: err.message });
  }
};

// Controller to get users by category
const getUsersByCategoryController = async (req, res) => {
  const { categoryName } = req.params;

  try {
    const users = await User.find({ category: categoryName });

    if (!users || users.length === 0)
      return res.status(404).json({ error: "No users found in this category" });

    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ error: "Server error", message: err.message });
  }
};

module.exports = { updateUserProfileController, getUsersByCategoryController };
