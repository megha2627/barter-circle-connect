const mongoose = require("mongoose");
const User = require("./models/User");
require("dotenv").config();
// Replace with your actual MongoDB connection string
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB Atlas connected"))
  .catch((err) => console.error("MongoDB connection error:", err));


    // Dummy data array
    async function insertDummyData() {
      try {
        await mongoose.connect(process.env.MONGO_URI, {
          useNewUrlParser: true,
          useUnifiedTopology: true,
        });
        console.log("MongoDB connected...");

        const dummyUsers = [
          {
            name: "Alice Johnson",
            email: "alice@example.com",
            password: "password123",
            bio: "I am a graphic designer offering logo design services.",
            skillsOffered: ["Logo Design", "Photoshop", "Illustrator"],
            skillsNeeded: ["Web Development", "SEO"],
            categories: ["Design", "Marketing"],
          },
          {
            name: "Bob Smith",
            email: "bob@example.com",
            password: "password123",
            bio: "Full-stack developer looking to learn guitar.",
            skillsOffered: ["React", "Node.js", "MongoDB"],
            skillsNeeded: ["Guitar", "Photography"],
            categories: ["Development", "Music"],
          },
          {
            name: "Clara Brown",
            email: "clara@example.com",
            password: "password123",
            bio: "SEO expert seeking help with mobile app development.",
            skillsOffered: ["SEO", "Content Marketing"],
            skillsNeeded: ["Android Development", "Flutter"],
            categories: ["Marketing", "Development"],
          },
        ];
    

        await User.insertMany(dummyUsers);

        console.log("Dummy users inserted successfully!");
      } catch (error) {
        console.error("Error inserting dummy data:", error);
      } finally {
        mongoose.connection.close();
      }
    }

    insertDummyData();
    