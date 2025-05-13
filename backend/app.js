const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config(); // <-- load .env variables

const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/user");
const matchesRoutes = require("./routes/matches");
const filterRoutes = require("./routes/filter");
const categoryRoutes = require("./routes/category");

//const userRou = require("./routes/user");
//const profileRoutes = require("./routes/profile");
//const { verifyToken } = require("./middleware/auth"); // assuming you have some token verification middleware

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Connect to MongoDB Atlas using MONGO_URI from .env
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB Atlas connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

// API Routes
app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/matches", matchesRoutes);
app.use("/api/filter", filterRoutes);
app.use("/api/category", categoryRoutes);

//app.use("/api/profile", profileRoutes);
 // adjust path if needed

// Use userRoutes

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Backend server running on port ${PORT}`);
});
