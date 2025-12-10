// Load environment variables first
require('dotenv').config();

const mongoose = require("mongoose");
const express = require("express");

const app = express();
const PORT = process.env.PORT || 3000;

// Get MongoDB URI from .env
const uri = process.env.MONGODB_URI;
if (!uri) {
  console.error("❌ MongoDB URI is missing. Check your .env file.");
  process.exit(1);
}

// Connect to MongoDB
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("✅ Connected to MongoDB"))
  .catch(err => console.error("MongoDB connection error:", err));

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
