const mongoose = require("mongoose");

const profileSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  bio: {
    type: String,
    required: false,
  },
  skillsOffered: [String], // List of skills the user offers
  skillsNeeded: [String], // List of skills the user needs
});

module.exports = mongoose.model("Profile", profileSchema);
