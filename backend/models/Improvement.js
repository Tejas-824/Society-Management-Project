const mongoose = require("mongoose");

const improvementSchema = new mongoose.Schema({
  improvementTitle: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
  },
  estimatedCost: {
    type: Number,
    required: true,
  },
  startDate: {
    type: Date,
    required: true,
  },
  completionDate: {
    type: Date,
    required: true,
  },
  status: {
    type: String,
    enum: ["Planned", "Ongoing", "Completed"],
    default: "Planned",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Improvement", improvementSchema);
