const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema({
  title: { type: String, required: true },
  code: { type: String, required: true },
  description: String,
  credits: Number,
  instructorId: { type: mongoose.Schema.Types.ObjectId, ref: "Instructor" },
  semester: String,
  department: String,
}, { timestamps: true });

module.exports = mongoose.model("Course", courseSchema);
