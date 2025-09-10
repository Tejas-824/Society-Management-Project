const mongoose = require("mongoose");

const repairSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    category: {
      type: String,
      enum: ["Electrical", "Plumbing", "Carpentry", "General"],
      required: true,
    },
    message: { type: String, required: true }, 
    date: { type: Date, required: true }, 
    priority: {
      type: String,
      enum: ["Low", "Medium", "High"],
      default: "Low",
    },
    status: {
      type: String,
      enum: ["Pending", "In Progress", "Completed"],
      default: "Pending",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Repairs", repairSchema);
