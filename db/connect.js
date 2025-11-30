const mongoose = require("mongoose");

const initDb = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI); // no extra options needed
    console.log("Database connected successfully");
  } catch (err) {
    console.error("🚨 Database connection error:", err);
    throw err;
  }
};

module.exports = { initDb };
